namespace Fanex.Athena.Excel.Customer
{
    using System.Collections.Generic;
    using System.Linq;
    using Base;
    using Fanex.Athena.Excel.Base.Extension;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Model.Customer.ViewModel.CommissionGroupList;
    using NPOI.SS.UserModel;
    using Resources;

    public class CustomerCommGroupExcel : ReportBase
    {
        private readonly int ColumnTemplateCount;
        private const int ColumnProductSBIndex = 4;
        private const int RowContentTemplate = 2;
        private const int RowNoInfoTemplate = 5;

        private readonly IList<GroupCommMetaModel> _exportData;
        private readonly IEnumerable<string> _products;

        public CustomerCommGroupExcel(
            string templatePath,
            CommissionGroupListViewModel viewModel)
            : base(templatePath, viewModel.Groups.Count, null)
        {
            _exportData = viewModel.Groups;
            _products = viewModel.ProductList;

            ColumnTemplateCount = ColumnProductSBIndex + _products.Count();
        }

        protected override void AssignHeader(ISheet sheet)
        {
            var headerTextList = new List<string>
            {
                "#",
                ViewResources.GroupName,
                ViewResources.DefaultGroup,
                ViewResources.NoOfCustmer
            };

            foreach (var p in _products)
            {
                headerTextList.Add(ViewResources.ResourceManager.GetString("Product" + p));
            }

            var row = sheet.CopyRow(TemplateSheet, RowHeaderTemplate);
            sheet.CopyColumn(TemplateSheet, RowHeaderTemplate, RowHeaderTemplate, ColumnProductSBIndex, ColumnTemplateCount);

            for (int i = 0; i < headerTextList.Count; i++)
            {
                row.Cells[i].SetCellValue(headerTextList[i]);
            }
        }

        protected override void AssignNoInfoRow(ISheet sheet)
        {
            sheet.SetTextRowValue(TemplateSheet, RowNoInfoTemplate, RowContentTemplate, ColumnTemplateCount, ViewResources.NoInfo);
        }

        protected override void AssignSheetData(ISheet sheet)
        {
            var rowCount = _exportData.Count;
            int index, currentColumn;

            for (index = 0; index < rowCount; index++)
            {
                currentColumn = 0;
                var row = sheet.CopyRow(TemplateSheet, RowContentTemplate, index + RowContentTemplate);
                var exportRow = _exportData[index];

                row.Cells[currentColumn++].SetCellValue(index + 1);
                row.Cells[currentColumn++].SetCellValue(exportRow.GroupName);
                row.Cells[currentColumn++].SetCellValue(exportRow.IsDefaultGroup ? "X" : string.Empty);
                row.Cells[currentColumn++].SetCellValue(exportRow.NumberOfCustomer);

                sheet.CopyColumn(TemplateSheet, RowContentTemplate, index + RowContentTemplate, ColumnProductSBIndex, ColumnTemplateCount);
                foreach (var productCode in _products)
                {
                    var commValue = exportRow.CommValues.Where(_ => _.ProductCode == productCode).FirstOrDefault()?.Discount ?? 0;
                    row.Cells[currentColumn++].SetCellValue(GetCommValue(commValue));
                }
            }
        }

        protected override void AssignTitle(ISheet sheet)
        {
            sheet.SetTextRowValue(TemplateSheet, RowTitleTemplate, ColumnTemplateCount, ViewResources.CommissionGroupList);

            // Freeze 2 rows title and header
            sheet.CreateFreezePane(0, RowContentTemplate);

            // Remove content below header before insert new data
            ClearTemplate(sheet, RowContentTemplate);
        }

        public string GetCommValue(decimal value)
        {
            const int percent = 100;
            return (value * percent).ToString("#,##0.00") + "%";
        }
    }
}