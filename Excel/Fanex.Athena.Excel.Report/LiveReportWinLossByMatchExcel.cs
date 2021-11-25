namespace Fanex.Athena.Excel.Report
{
    using System.Collections.Generic;
    using Base;
    using Base.Entities;
    using Fanex.Athena.Excel.Base.Extension;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Report.DTO.LiveReports;
    using Fanex.Athena.Model.Report.ViewModel.LiveReports;
    using Helpers;
    using NPOI.SS.UserModel;
    using Resources;

    public class LiveReportWinLossByMatchExcel : ReportBase
    {
        private const int ColumnBetCount = 5;
        private const int ColumnCustomerComm = 2;
        private const int ColumnCustomerTotal = 3;
        private const int ColumnCustomerWl = 1;
        private const int ColumnLicenseeComm = 7;
        private const int ColumnAmountDue = 8;
        private const int ColumnLicenseeWl = 6;
        private const int ColumnMatch = 0;
        private const int ColumnTemplateCount = 9;
        private const int ColumnTurnover = 4;
        private const int RowSportType = 1;
        private const int RowContentTemplate = 4;
        private const int RowNoInfoTemplate = 5;
        private const int RowTableHeaderTemplate = 2;
        private readonly string SportName;

        private readonly LiveReportMatchListViewModel _viewModel;
        private readonly IList<LiveReportWinLossByMatch> _dataList;

        private readonly ConvertingOption _convertingOption;

        protected internal LiveReportWinLossByMatchExcel()
            : base(string.Empty, 0)
        {
        }

        public LiveReportWinLossByMatchExcel(
                                     string templatePath,
                                     ConvertingOption convertingOption,
                                     ShowingOption showingOption,
                                     LiveReportMatchListViewModel viewModel,
                                     string sportName)
            : base(templatePath, viewModel.MainResult.Count, showingOption)
        {
            _convertingOption = convertingOption;
            _viewModel = viewModel;
            _dataList = viewModel.MainResult;
            SportName = sportName;
        }

        protected override void AssignHeader(ISheet sheet)
        {
            var rowTplIdx = 2;
            var rowIndex = 2;

            var row1Header = new List<string>
            {
                ViewResources.Turnover,
                ViewResources.BetCount,
                ViewResources.LicenseeW_L,
                ViewResources.Comm,
                ViewResources.AmountDueTo
            };

            // header row 1
            var row = sheet.CopyRow(TemplateSheet, rowTplIdx++, rowIndex++);
            row.Cells[ColumnMatch].SetCellValue(ViewResources.Match);
            row.Cells[ColumnCustomerWl].SetCellValue(ViewResources.CustomerW_L);
            sheet.MergeRows(rowIndex - 1, rowIndex, ColumnMatch);
            sheet.MergeCols(ColumnCustomerWl, ColumnCustomerTotal, rowIndex - 1);

            var colIndex = ColumnTurnover;
            foreach (string item in row1Header)
            {
                sheet.MergeRows(rowIndex - 1, rowIndex, colIndex);
                row.Cells[colIndex++].SetCellValue(item);
            }

            // header row 2
            row = sheet.CopyRow(TemplateSheet, rowTplIdx, rowIndex);
            row.Cells[ColumnCustomerWl].SetCellValue(ViewResources.WinLoss);
            row.Cells[ColumnCustomerComm].SetCellValue(ViewResources.Comm);
            row.Cells[ColumnCustomerTotal].SetCellValue(ViewResources.Total);
        }

        protected override void AssignNoInfoRow(ISheet sheet)
        {
            sheet.SetTextRowValue(TemplateSheet, RowSportType, 1, SportName);
            sheet.SetTextRowValue(TemplateSheet, RowNoInfoTemplate, RowContentTemplate, ColumnTemplateCount, ViewResources.NoInfo);
            ProcessUI(sheet);
        }

        protected override void AssignSheetData(ISheet sheet)
        {
            var rowCount = _dataList.Count;

            sheet.SetTextRowValue(TemplateSheet, RowSportType, 1, SportName);

            for (int index = 0; index < rowCount; index++)
            {
                var dataItem = _dataList[index];

                var row = sheet.CopyRow(TemplateSheet, RowContentTemplate, index + RowContentTemplate);

                AssignCommonData(row, dataItem);
            }
        }

        protected override void AssignTitle(ISheet sheet)
        {
            var reportTitle = string.Format(
                                        ViewResources.LiveReportTitle,
                                        GetLiveIndicatorString(_viewModel.Param.LiveIndicator),
                                        _viewModel.Param.FromDate.ToString(FormatDate),
                                        _viewModel.Param.ToDate.ToString(FormatDate),
                                        ReportExcelHelper.GetTitleCurrencyName(_convertingOption));

            sheet.SetTextRowValue(TemplateSheet, RowTitleTemplate, ColumnTemplateCount, reportTitle);

            sheet.CreateFreezePane(0, RowContentTemplate);

            ClearTemplate(sheet, RowContentTemplate);
        }

        private static string GetLiveIndicatorString(int liveIndicator)
        {
            string title;
            switch (liveIndicator)
            {
                case LiveStatusTypes.NonLive:
                    title = ViewResources.NoneLive;
                    break;

                case LiveStatusTypes.Live:
                    title = ViewResources.Live;
                    break;

                case LiveStatusTypes.Mix:
                    title = ViewResources.LiveAndNonLive;
                    break;

                default:
                    title = string.Empty;
                    break;
            }

            return title + ViewResources.Data;
        }

        protected override void ProcessUI(ISheet sheet)
        {
            if (!ShowingOption.CustomerCommVisible)
            {
                sheet.HideColumn(ColumnCustomerTotal, ColumnCustomerComm);
                sheet.HideRow(RowTableHeaderTemplate + 1);
            }

            if (!ShowingOption.BAVisible)
            {
                sheet.HideColumn(ColumnLicenseeComm);
            }

            if (!ShowingOption.HasAmountDueToColumn)
            {
                sheet.HideColumn(ColumnAmountDue);
            }
        }

        private static void AssignCommonData(IRow row, LiveReportWinLossByMatch dataItem)
        {
            row.Cells[ColumnMatch].SetCellValue(dataItem.MatchName);
            row.Cells[ColumnCustomerWl].SetCellValue(dataItem.CustomerWinLoss);
            row.Cells[ColumnCustomerComm].SetCellValue(dataItem.CustomerComm);
            row.Cells[ColumnCustomerTotal].SetCellValue(dataItem.CustomerTotal);
            row.Cells[ColumnTurnover].SetCellValue(dataItem.TurnOver);
            row.Cells[ColumnBetCount].SetCellValue(dataItem.BetCount);
            row.Cells[ColumnLicenseeComm].SetCellValue(dataItem.LicenseeComm);
            row.Cells[ColumnLicenseeWl].SetCellValue(dataItem.LicenseeWinLoss);
            row.Cells[ColumnAmountDue].SetCellValue(dataItem.AmountDue);
        }
    }
}