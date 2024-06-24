namespace Fanex.Athena.Excel.Customer
{
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using Base;
    using Common;
    using Fanex.Athena.Excel.Base.Extension;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Model.Customer.ViewModel.CommissionGroupList;
    using NPOI.SS.UserModel;
    using Resources;

    public class CustomerCommGroupExcel : ReportBase
    {
        private readonly int ColumnTemplateCount = 4;
        private const int RowContentTemplate = 2;
        private const int RowNoInfoTemplate = 5;

        private readonly IList<GroupCommMetaModel> _exportData;
        private readonly IDictionary<string, bool> _productPermissions;

        public CustomerCommGroupExcel(
            string templatePath,
            CommissionGroupListViewModel viewModel)
            : base(templatePath, viewModel.Groups.Count, null)
        {
            _exportData = viewModel.Groups;
            _productPermissions = viewModel.ProductPermissions;

            const int columnTemplateCount = 4;
            ColumnTemplateCount = columnTemplateCount + _productPermissions.Count;
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

            foreach (var p in _productPermissions)
            {
                headerTextList.Add(ViewResources.ResourceManager.GetString("Product" + p.Key));
            }

            var row = sheet.CopyRow(TemplateSheet, RowHeaderTemplate);
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
            int index;
            var currentColumn = 0;

            for (index = 0; index < rowCount; index++)
            {
                currentColumn = 0;
                var row = sheet.CopyRow(TemplateSheet, RowContentTemplate, index + RowContentTemplate);
                var exportRow = _exportData[index];

                row.Cells[currentColumn++].SetCellValue(index + 1);
                row.Cells[currentColumn++].SetCellValue(exportRow.GroupName);
                row.Cells[currentColumn++].SetCellValue(exportRow.IsDefaultGroup ? "X" : string.Empty);
                row.Cells[currentColumn++].SetCellValue(exportRow.NumberOfCustomer);

                foreach (var p in _productPermissions)
                {
                    row.Cells[currentColumn++].SetCellValue(GetCommValue(exportRow, p.Key));
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

        protected override void ProcessUI(ISheet sheet)
        {
            const int startCommissionColumnIndex = 4;
            var currentColumn = startCommissionColumnIndex;

            foreach (var p in _productPermissions)
            {
                if (!p.Value)
                {
                    sheet.HideColumn(currentColumn);
                }

                currentColumn++;
            }
        }

        public string GetCommValue(GroupCommMetaModel exportRow, string productCode)
        {
            var value = exportRow.CommValues.TryGetValue(productCode, out GroupCommSettingMetaModel comm)
                ? Converter.ToDecimal(comm.Discount)
                : 0;

            const int percent = 100;
            return (value * percent).ToString("#,##0.00") + "%";
        }
    }
}