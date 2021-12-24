using Fanex.Athena.Excel.Base;
using Fanex.Athena.Excel.Base.Extension;
using Fanex.Athena.Model.Customer.DTO;
using Fanex.Athena.Resources;
using NPOI.SS.UserModel;
using NPOI.SS.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Athena.Excel.Customer.CustomerClass
{
    public class CustomerClassSpreadSettingPolicyExcel : ReportBase
    {

        private const int ColumnTemplateCount = 5;
        private const int RowContentTemplate = 2;

        private const int CustomerClassColumn = 0;
        private const int CategoryColumn = 1;
        private const int OddsGroupColumn = 2;
        private const int CurrencyColumn = 3;
        private const int PlatformColumn = 4;

        private readonly string _reporTitle;
        private readonly IList<string> _headerTexts;

        private readonly IEnumerable<CustomerClassModel> _data;

        private readonly IDictionary<int, string> _gridCommonColumNames = new Dictionary<int, string>
        {
            { OddsGroupColumn, "OddsGroup" },
            { CurrencyColumn, "Currency" },
            { PlatformColumn, "Platform" },
        };

        public CustomerClassSpreadSettingPolicyExcel(string templatePath, string reportTitle, IEnumerable<CustomerClassModel> data)
            : base(templatePath, data.SelectMany(d => d.Policies).Count())
        {
            _reporTitle = reportTitle;
            _data = data;
            _headerTexts = new List<string>
            {
                ViewResources.CustomerClass,
                ViewResources.Category,
                ViewResources.OddsGroup,
                ViewResources.Currency,
                ViewResources.Platform,
            };
        }

        protected override void AssignHeader(ISheet sheet)
        {
            var row = sheet.CopyRow(TemplateSheet, RowHeaderTemplate);

            for (int i = 0; i < _headerTexts.Count; i++)
            {
                row.Cells[i].SetCellValue(_headerTexts[i]);
            }
        }

        protected override void AssignTitle(ISheet sheet)
        {
            sheet.SetTextRowValue(TemplateSheet, RowTitleTemplate, ColumnTemplateCount, _reporTitle);

            /*Freeze 2 rows title and header*/
            sheet.CreateFreezePane(0, RowContentTemplate);

            /*Remove content below header before insert new data.*/
            ClearTemplate(sheet, RowContentTemplate);
        }

        protected override void AssignSheetData(ISheet sheet)
        {
            var rowIndex = RowContentTemplate;
            for (int index = 0; index < _data.Count(); index++)
            {
                var isFirstItemRow = true;
                var item = _data.ElementAt(index);
                var startIndex = rowIndex;
                foreach (var policy in item.Policies)
                {
                    var row = sheet.CopyRow(TemplateSheet, RowContentTemplate, rowIndex);
                    if (isFirstItemRow)
                    {
                        AssignMergeColumns(item, row);
                        isFirstItemRow = false;
                    }
                    AssignCommonColumns(policy, row);
                    rowIndex++;
                }
                MergeRow(sheet, startIndex, rowIndex - 1);
            }
        }

        private static void AssignMergeColumns(CustomerClassModel item, IRow row)
        {
            row.Cells[CustomerClassColumn].SetCellValue(item.Id);
            row.Cells[CategoryColumn].SetCellValue(item.Category);
        }

        protected void AssignCommonColumns(CustomerClassLimitPolicyModel item, IRow row)
        {
            var itemType = item.GetType();
            foreach (var columnName in _gridCommonColumNames)
            {
                var cellValue = itemType.GetProperty(columnName.Value).GetValue(item, null);
                row.Cells[columnName.Key].SetCellValue(cellValue);
            }
        }

        private static void MergeRow(ISheet sheet, int startRow, int endRow)
        {
            CellRangeAddress customerClassColCellRange = new CellRangeAddress(startRow, endRow, CustomerClassColumn, CustomerClassColumn);
            CellRangeAddress categoryColCellRange = new CellRangeAddress(startRow, endRow, CategoryColumn, CategoryColumn);

            sheet.AddMergedRegion(customerClassColCellRange);
            sheet.AddMergedRegion(categoryColCellRange);
        }
    }
}
