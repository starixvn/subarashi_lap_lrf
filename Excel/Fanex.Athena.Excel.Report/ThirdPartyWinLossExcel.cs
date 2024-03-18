namespace Fanex.Athena.Excel.Report
{
    using System.Linq;
    using Base;
    using Fanex.Athena.Excel.Base.Extension;
    using Helpers;
    using Model.Core.ResultModel;
    using Model.Report.DTO;
    using Model.Report.MetaModel;
    using NPOI.SS.UserModel;
    using Resources;

    public class ThirdPartyWinLossExcel<T> : ReportBase where T : ThirdPartyWinLoss
    {
        private const int ColumnTemplateCount = 12;

        private const int ColumnDate = 1;
        private const int ColumnExternalId = 2;
        private const int ColumnSystemId = 3;
        private const int ColumnCurrency = 4;
        private const int ColumnTurnover = 5;
        private const int ColumnTotalTransaction = 6;
        private const int ColumnCustomerWl = 7;
        private const int ColumnLicenseeWl = 8;
        private const int ColumnContributionWl = 9;
        private const int ColumnPromotionWl = 10;
        private const int ColumnJackpotPrizeWl = 11;
        private const int ColumnTotalWl = 12;

        private const int RowContentTemplate = 3;
        private const int RowTotalSolidBorder = 4;
        private const int RowTotalNoSolidBorder = 5;
        private const int RowGrantTotal = 6;
        private const int RowNoInfoTemplate = 7;

        private readonly ThirdPartyWinLossMetaModel _metaModel;
        private readonly ReportResultModel<T> _resultData;

        public ThirdPartyWinLossExcel(
                string templatePath,
                ThirdPartyWinLossMetaModel metaModel,
                ReportResultModel<T> resultData)
            : base(templatePath, resultData.DataList.Count())
        {
            _metaModel = metaModel;
            _resultData = resultData;
        }

        protected override void AssignHeader(ISheet sheet)
        {
            var row = sheet.CopyRow(TemplateSheet, RowHeaderTemplate);
            row.Cells[ColumnIndex].SetCellValue("#");
            row.Cells[ColumnExternalId].SetCellValue(ViewResources.ExternalId);
            row.Cells[ColumnSystemId].SetCellValue(ViewResources.SystemId);
            row.Cells[ColumnDate].SetCellValue(ViewResources.Date);
            row.Cells[ColumnCurrency].SetCellValue(ViewResources.Currency);
            row.Cells[ColumnTurnover].SetCellValue(ViewResources.Turnover);
            row.Cells[ColumnTotalTransaction].SetCellValue(ViewResources.TotalTransaction);
            row.Cells[ColumnCustomerWl].SetCellValue(ViewResources.PlayerWL);
            row.Cells[ColumnLicenseeWl].SetCellValue(ViewResources.Licensee);

            var row2 = sheet.CopyRow(TemplateSheet, RowHeaderTemplate + 1);
            row2.Cells[ColumnLicenseeWl].SetCellValue(ViewResources.W_L);
            row2.Cells[ColumnContributionWl].SetCellValue(ViewResources.Contribution);
            row2.Cells[ColumnPromotionWl].SetCellValue(ViewResources.Promotion);
            row2.Cells[ColumnJackpotPrizeWl].SetCellValue(ViewResources.JackpotPrize);
            row2.Cells[ColumnTotalWl].SetCellValue(ViewResources.Total);

            PostAssignHeader(row);
        }

        protected virtual void PostAssignHeader(IRow row)
        {
            // implement in children
        }

        protected override void AssignNoInfoRow(ISheet sheet)
        {
            sheet.SetTextRowValue(TemplateSheet, RowNoInfoTemplate, RowContentTemplate, ColumnTemplateCount, ViewResources.NoInfo);
            ProcessUI(sheet);
        }

        protected override void AssignSheetData(ISheet sheet)
        {
            var rowIndex = 1;
            int index;
            var dataList = _resultData.DataList;
            var rowCount = dataList.Count();

            for (index = 0; index < rowCount; index++)
            {
                var item = dataList.ElementAt(index);

                var row = sheet.CopyRow(TemplateSheet, RowContentTemplate, index + RowContentTemplate);

                var dateStringFormat = _metaModel.ReportBy == 1 ? "MM/dd/yyyy" : "MM/yyyy";
                var reportDateString = item.Date.Value.ToString(dateStringFormat);

                row.Cells[ColumnIndex].SetCellValue(item.Index);
                row.Cells[ColumnDate].SetCellValue(reportDateString);
                row.Cells[ColumnExternalId].SetCellValue(item.ExternalId);
                row.Cells[ColumnSystemId].SetCellValue(item.SystemId);
                row.Cells[ColumnCurrency].SetCellValue(item.CurrencyName);
                AssignCommonData(row, item);
                rowIndex++;

                if (item.RowSpan > 1)
                {
                    var currentRow = index + RowContentTemplate;
                    sheet.MergeRows(currentRow, currentRow + item.RowSpan - 1, ColumnIndex);
                    sheet.MergeRows(currentRow, currentRow + item.RowSpan - 1, ColumnDate);
                }
            }

            rowIndex = AssignTotalData(sheet, index + RowContentTemplate);
            AssignGrandTotalInEurData(sheet, rowIndex);
        }

        protected override void AssignTitle(ISheet sheet)
        {
            var reportName = _metaModel.ProductName + " " + ViewResources.WinLoss;
            var currencyTitle = ReportExcelHelper.GetTitleCurrencyName(_metaModel.CurrencyId, _metaModel.CurrencyName);
            var reportTitle = ReportExcelHelper.GenerateReportTitle(reportName, _metaModel.FromDate, _metaModel.ToDate, currencyTitle);

            sheet.SetTextRowValue(TemplateSheet, RowTitleTemplate, ColumnTemplateCount, reportTitle);

            // Freeze 2 rows title and header
            sheet.CreateFreezePane(0, RowContentTemplate);

            // Remove content below header before insert new data
            ClearTemplate(sheet, RowContentTemplate);
        }

        protected override void ProcessUI(ISheet sheet)
        {
            switch (_metaModel.DrillDownLevel)
            {
                case 0:
                    sheet.HideColumn(ColumnExternalId, ColumnSystemId);
                    break;

                case 1:
                    sheet.HideColumn(ColumnExternalId, ColumnDate);
                    break;

                default:
                    sheet.HideColumn(ColumnDate);
                    break;
            }
        }

        protected virtual void AssignCommonData(IRow row, T data)
        {
            row.Cells[ColumnTurnover].SetCellValue(data.TurnOver);
            row.Cells[ColumnTotalTransaction].SetCellValue(data.TotalTransaction);
            row.Cells[ColumnCustomerWl].SetCellValue(data.CustomerWinLoss);
            row.Cells[ColumnLicenseeWl].SetCellValue(data.LicenseeWL);
            row.Cells[ColumnContributionWl].SetCellValue(data.ContributionWL);
            row.Cells[ColumnPromotionWl].SetCellValue(data.PromotionWL);
            row.Cells[ColumnJackpotPrizeWl].SetCellValue(data.JackpotWL);
            row.Cells[ColumnTotalWl].SetCellValue(data.TotalWL);
        }

        protected internal virtual void AssignGrandTotalInEurData(ISheet sheet, int rowIndex)
        {
            var currencyList = _resultData.SummaryTotal.Keys.ToList();
            currencyList.Reverse();

            foreach (string currency in currencyList)
            {
                // Copy template
                var row = sheet.CopyRow(TemplateSheet, RowGrantTotal, rowIndex);
                row.Cells[ColumnIndex].SetCellValue(ViewResources.Totalin + " " + currency.ToUpperInvariant());
                AssignCommonData(row, _resultData.SummaryTotal[currency]);

                // Merge first two column
                sheet.MergeCols(ColumnIndex, ColumnCurrency, rowIndex);
                rowIndex++;
            }
        }

        protected internal virtual int AssignTotalData(ISheet sheet, int rowIndex)
        {
            var beginTotalRow = rowIndex;
            var totalCurrencyList = _resultData.TotalDataList;

            foreach (T totalCurrency in totalCurrencyList)
            {
                // Copy template
                var row = sheet.CopyRow(TemplateSheet, RowTotalNoSolidBorder, rowIndex);

                if (rowIndex == beginTotalRow)
                {
                    row = sheet.CopyRow(TemplateSheet, RowTotalSolidBorder, rowIndex);
                    row.Cells[0].SetCellValue(ViewResources.Total);
                }

                row.Cells[ColumnCurrency].SetCellValue(totalCurrency.CurrencyName);

                AssignCommonData(row, totalCurrency);

                rowIndex++;
            }

            // Merge first two column
            const int LastIndexMergedCol = 3;
            sheet.MergeCells(rowIndex - totalCurrencyList.Count(), 0, rowIndex - 1, LastIndexMergedCol);

            return rowIndex;
        }
    }
}