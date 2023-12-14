using System.Linq;
using System.Web.Hosting;
using Fanex.Athena.Excel.Base;
using Fanex.Athena.Excel.Base.Extension;
using Fanex.Athena.Module.Notification.DTO;
using Fanex.Athena.Resources;
using NPOI.SS.UserModel;

namespace Fanex.Athena.Module.Notification.Excels
{
    public class AmendmentTicketListingExcel : ReportBase
    {
        private const string ExcelTemplatePath = @"~/App_Data/Template/Notification/Resettlement/TicketListing.xls";

        private const int RowContentTemplate = 2;

        private const int ColumnRefNo = 1;
        private const int ColumnExternalId = 2;
        private const int ColumnSystemId = 3;

        private readonly AmendmentTicketListing _data;

        public AmendmentTicketListingExcel(AmendmentTicketListing data)
            : base(HostingEnvironment.MapPath(ExcelTemplatePath), data.Data.Count())
        {
            _data = data;
        }

        protected override void AssignTitle(ISheet sheet)
        {
            sheet.SetTextRowValue(TemplateSheet, RowTitleTemplate, destRowIndex: RowTitleTemplate, 1, $"{ViewResources.TicketList} - {_data.MatchInfo}");
            sheet.CreateFreezePane(0, RowContentTemplate);
            ClearTemplate(sheet, RowContentTemplate);
        }

        protected override void AssignHeader(ISheet sheet)
        {
            var rowExcel = sheet.CopyRow(TemplateSheet, RowHeaderTemplate);
            rowExcel.Cells[ColumnIndex].SetCellValue("#");
            rowExcel.Cells[ColumnRefNo].SetCellValue(ViewResources.RefNo);
            rowExcel.Cells[ColumnExternalId].SetCellValue(ViewResources.ExternalId);
            rowExcel.Cells[ColumnSystemId].SetCellValue(ViewResources.SystemId);
        }

        protected override void AssignSheetData(ISheet sheet)
        {
            for (var rowIndex = 0; rowIndex < TotalRows; rowIndex++)
            {
                var rowExcel = sheet.CopyRow(TemplateSheet, RowContentTemplate, rowIndex + RowContentTemplate);
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