using System.Collections.Generic;
using System.Linq;
using System.Web.Hosting;
using Fanex.Athena.Excel.Base;
using Fanex.Athena.Excel.Base.Extension;
using Fanex.Athena.Module.Notification.DTO;
using Fanex.Athena.Resources;
using NPOI.SS.UserModel;

namespace Fanex.Athena.Module.Notification.Excels
{
    public class AmendmentTicketListingMultipleExcel : ReportBase
    {
        private const string ExcelTemplatePath = @"~/App_Data/Template/Notification/Resettlement/TicketListing.xls";

        private const int MaxExcelRowPerSheet = 65536;
        private const int RowContentTemplate = 2;
        private const int RowNoInfoTemplate = 3;
        private const int ColumnRefNo = 1;
        private const int ColumnExternalId = 2;
        private const int ColumnSystemId = 3;
        private const int ColumnTemplateCount = 4;

        private int RowIndex;

        private readonly IEnumerable<AmendmentTicketListing> _dataList;
        private AmendmentTicketListing _data;

        public AmendmentTicketListingMultipleExcel(IEnumerable<AmendmentTicketListing> dataList)
           : base(HostingEnvironment.MapPath(ExcelTemplatePath), MaxExcelRowPerSheet)
        {
            _dataList = dataList;
            IsMultiSheet = true;
        }

        protected override void AssignDataMultiSheet()
        {
            var currentSheetNumber = 1;
            var sheet = CreateNewSheet(ref currentSheetNumber);

            foreach (var data in _dataList)
            {
                var totalRows = RowIndex + data.Data.Count() + RowContentTemplate;

                if (totalRows > MaxExcelRowPerSheet)
                {
                    sheet = CreateNewSheet(ref currentSheetNumber);
                }

                _data = data;
                AssignTitle(sheet);
                AssignHeader(sheet);
                AssignSheetData(sheet);
                ProcessUI(sheet);
                RowIndex++;
            }
        }

        private ISheet CreateNewSheet(ref int number)
        {
            var suffixText = number == 1 ? string.Empty : number.ToString();
            var sheet = Workbook.CloneSheet(TemplateSheetName, "Data" + suffixText);
            ClearTemplate(sheet, RowTitleTemplate);
            RowIndex = 0;
            number++;

            return sheet;
        }

        protected override void AssignNoInfoRow(ISheet sheet)
        {
            sheet.SetTextRowValue(TemplateSheet, RowNoInfoTemplate, RowIndex++, ColumnTemplateCount, ViewResources.NoInfo);
        }

        protected override void AssignTitle(ISheet sheet)
        {
            sheet.SetTextRowValue(TemplateSheet, RowTitleTemplate, RowIndex++, ColumnTemplateCount, $"{ViewResources.TicketList} - {_data.MatchInfo}");
        }

        protected override void AssignHeader(ISheet sheet)
        {
            var rowExcel = sheet.CopyRow(TemplateSheet, RowHeaderTemplate, RowIndex++);
            rowExcel.Cells[ColumnIndex].SetCellValue("#");
            rowExcel.Cells[ColumnRefNo].SetCellValue(ViewResources.RefNo);
            rowExcel.Cells[ColumnExternalId].SetCellValue(ViewResources.ExternalId);
            rowExcel.Cells[ColumnSystemId].SetCellValue(ViewResources.SystemId);
        }

        protected override void AssignSheetData(ISheet sheet)
        {
            if (!_data.Data.Any())
            {
                AssignNoInfoRow(sheet);
                return;
            }

            for (var rowIndex = 0; rowIndex < _data.Data.Count; rowIndex++)
            {
                var rowExcel = sheet.CopyRow(TemplateSheet, RowContentTemplate, RowIndex++);
                AssignRowData(rowExcel, _data.Data.ElementAt(rowIndex), rowIndex + 1);
            }
        }

        private static void AssignRowData(IRow rowExcel, AmendmentTicket rowData, int rowIndex)
        {
            rowExcel.Cells[ColumnIndex].SetCellValue(rowIndex);
            rowExcel.Cells[ColumnRefNo].SetCellValue(rowData.RefNo);
            rowExcel.Cells[ColumnExternalId].SetCellValue(rowData.ExternalId);
            rowExcel.Cells[ColumnSystemId].SetCellValue(rowData.SystemId);
        }
    }
}