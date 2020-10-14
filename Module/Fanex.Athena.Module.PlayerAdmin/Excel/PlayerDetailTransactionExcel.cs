using System.Linq;
using Fanex.Athena.Module.PlayerAdmin.ViewModels;
using Fanex.Athena.Resources;
using NPOI.SS.UserModel;

namespace Fanex.Athena.Module.PlayerAdmin.Excel
{
    public class PlayerDetailTransactionExcel : BaseExcel, IPlayerDetailTransactionExcel
    {
        private PlayerDetailTransactionReportViewModel _data;
        private const int ColumnTemplateCount = 7;
        private const int RowContentTemplate = 2;

        public void SetData(string templatePath, PlayerDetailTransactionReportViewModel data)
        {
            SetData(templatePath, data.DetailTransactions.Count());
            _data = data;
        }

        protected internal override void AssignHeader(ISheet sheet)
        {
            var row = sheet.CopyRow(TemplateSheet, RowHeaderTemplate);
            var columnIndex = 0;
            row.Cells[columnIndex++].SetCellValue(ViewResources.TransactionID);
            row.Cells[columnIndex++].SetCellValue(ViewResources.TransactionTime);
            row.Cells[columnIndex++].SetCellValue(ViewResources.Transaction);
            row.Cells[columnIndex++].SetCellValue(ViewResources.BalanceChange);
            row.Cells[columnIndex++].SetCellValue(ViewResources.AfterBalance);
            row.Cells[columnIndex++].SetCellValue(ViewResources.Resettled);
            row.Cells[columnIndex].SetCellValue(ViewResources.Remark);
        }

        protected internal override void AssignTitle(ISheet sheet)
        {
            var title = $"{ViewResources.DetailTransaction}, {_data.FromDateStr} -> {_data.ToDateStr}";
            sheet.SetTextRowValue(TemplateSheet, RowTitleTemplate, ColumnTemplateCount, title);
            sheet.CreateFreezePane(0, RowContentTemplate);
            ClearTemplate(sheet, RowContentTemplate);
        }

        protected internal override void AssignNoInfoRow(ISheet sheet)
        {
            sheet.SetTextRowValue(TemplateSheet, RowContentTemplate, RowContentTemplate, ColumnTemplateCount, ViewResources.NoInfo);
        }

        protected internal override void AssignSheetData(ISheet sheet)
        {
            for (int index = 0; index < TotalRows; index++)
            {
                var item = _data.DetailTransactions.ElementAt(index);
                var rowIndex = index + RowContentTemplate;
                var row = sheet.CopyRow(TemplateSheet, RowContentTemplate, rowIndex);
                var columnIndex = 0;

                row.Cells[columnIndex++].SetCellValue(item.TransactionId);
                row.Cells[columnIndex++].SetCellValue(item.TransactionTimeStr);
                row.Cells[columnIndex++].SetCellValue(item.TransactionType);
                row.Cells[columnIndex++].SetCellValue(item.BalanceChangeStr);
                row.Cells[columnIndex++].SetCellValue(item.AfterBalanceStr);
                row.Cells[columnIndex++].SetCellValue(item.IsResettled ? "v" : string.Empty);
                row.Cells[columnIndex].SetCellValue(item.Remark);
            }
        }
    }
}
