namespace Fanex.Athena.Excel.Customer
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using Base;
    using Common;
    using Fanex.Athena.Excel.Base.Extension;
    using Fanex.Athena.Model.Core.Helper;
    using Fanex.Athena.Model.Customer.ViewModel.CommissionGroupList;
    using NPOI.SS.UserModel;
    using Resources;

    public class CustomerCommGroupExcel : ReportBase
    {
        private readonly int ColumnTemplateCount = 4;
        private const int RowContentTemplate = 2;
        private const int RowNoInfoTemplate = 5;

        private readonly DataTable _exportData;
        private readonly Dictionary<string, bool> hasColumnInTable;
        private readonly IDictionary<string, string> hardcodedColumns;
        private readonly IDictionary<string, bool> productPermissions;

        public CustomerCommGroupExcel(
            string templatePath,
            DataTable exportData,
            CommissionGroupListViewModel viewModel)
            : base(templatePath, exportData.Rows.Count, null)
        {
            _exportData = exportData;
            productPermissions = viewModel.ProductPermissions;
            hardcodedColumns = CommissionGroupHelper.MapHardcodedNameFromDB(viewModel.ProductPermissions, isUpdate: false);
            hasColumnInTable = new Dictionary<string, bool>();
            foreach (var p in hardcodedColumns)
            {
                hasColumnInTable.Add(p.Key, _exportData.Columns.Contains(p.Value + "Comm"));
            }

            const int columnTemplateCount = 4;
            ColumnTemplateCount = columnTemplateCount + productPermissions.Count;
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

            foreach (var p in hardcodedColumns)
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
            var rowCount = _exportData.Rows.Count;
            int index;
            var currentColumn = 0;

            for (index = 0; index < rowCount; index++)
            {
                currentColumn = 0;
                var row = sheet.CopyRow(TemplateSheet, RowContentTemplate, index + RowContentTemplate);
                var exportRow = _exportData.Rows[index];
                var isDefault = Convert.ToBoolean(exportRow["IsDefault"].ToString());

                row.Cells[currentColumn++].SetCellValue(index + 1);
                row.Cells[currentColumn++].SetCellValue(exportRow["GroupName"]);
                row.Cells[currentColumn++].SetCellValue(isDefault ? "X" : string.Empty);
                row.Cells[currentColumn++].SetCellValue(exportRow["NumberOfCustomer"]);

                foreach (var p in hardcodedColumns)
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

            foreach (var p in productPermissions)
            {
                if (!p.Value)
                {
                    sheet.HideColumn(currentColumn);
                }

                currentColumn++;
            }
        }

        public string GetCommValue(DataRow exportRow, string productCode)
        {
            var name = hardcodedColumns[productCode];
            var value = hasColumnInTable.ContainsKey(productCode) && hasColumnInTable[productCode]
                ? Converter.ToDecimal(exportRow[name + "Comm"].ToString())
                : 0;

            const int percent = 100;
            return (value * percent).ToString("#,##0.00") + "%";
        }
    }
}
