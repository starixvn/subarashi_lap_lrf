using System.Collections.Generic;
using System.Linq;
using Fanex.Athena.Excel.Base;
using Fanex.Athena.Excel.Base.Extension;
using Fanex.Athena.Model.Customer.DTO;
using Fanex.Athena.Resources;
using NPOI.SS.UserModel;
using NPOI.SS.Util;

namespace Fanex.Athena.Excel.Customer.CustomerClass
{
    public class CustomerClassSettingPolicyExcel : ReportBase
    {
        private const int ColumnTemplateCount = 13;
        private const int RowContentTemplate = 2;

        private const int CustomerClassColumn = 0;
        private const int CategoryColumn = 1;
        private const int SportTypeColumn = 2;
        private const int PolicyColumn = 3;
        private const int RuleColumn = 4;
        private const int LivePreMatchColumn = 5;
        private const int CurrencyColumn = 6;
        private const int DisableParlay = 7;
        private const int PlatformColumn = 8;
        private const int LeagueGroupColumn = 9;
        private const int BetIntervalColumn = 10;
        private const int AgentBetIntervalColumn = 11;
        private const int MinBetColumn = 12;
        private const int MaxPerBetColumn = 13;
        private const int MaxPerMatchColumn = 14;
        private const int RepeatedBetColumn = 15;
        private const int BetDeplayColumn = 16;

        private const string CURRENCY = "MYR";
        private const string DEFAULT_VALUE = "-";

        private readonly string _reporTitle;
        private readonly IList<string> _headerTexts;

        private readonly IEnumerable<CustomerClassModel> _data;

        private readonly IDictionary<int, string> _gridCommonColumNames = new Dictionary<int, string>
        {
            { SportTypeColumn, "SportTypeName" },
            { PolicyColumn, "PolicyTitle" },
            { RuleColumn, "RuleTitle" },
            { LivePreMatchColumn, "LiveTypeText" },
            { CurrencyColumn, "Currency" },
            { DisableParlay, "DisableParlay" },
            { PlatformColumn, "Platform" },
            { LeagueGroupColumn, "LeagueGroups" },
            { BetIntervalColumn, "BetInterval" },
            { AgentBetIntervalColumn, "AgentBetInterval" },
            { MinBetColumn, "MinBet" },
            { MaxPerBetColumn, "MaxBet" },
            { MaxPerMatchColumn, "MaxPerMatch" },
            { RepeatedBetColumn, "RepeatedBets" },
            { BetDeplayColumn, "BetDelay" }
        };

        public CustomerClassSettingPolicyExcel(string templatePath, string reportTitle, IEnumerable<CustomerClassModel> data)
            : base(templatePath, data.SelectMany(d => d.Policies).Count())
        {
            _reporTitle = reportTitle;
            _data = data;
            _headerTexts = new List<string>
            {
                ViewResources.CustomerClass,
                ViewResources.Category,
                ViewResources.SportType,
                ViewResources.Policy,
                ViewResources.Rule,
                ViewResources.Live2 + "/" + ViewResources.PreMatch,
                ViewResources.Currency,
                ViewResources.DisableParlay,
                ViewResources.Platform,
                ViewResources.LeagueGroup,
                ViewResources.BetInterval,
                ViewResources.AgentBetInterval,
                ViewResources.MinBet + $" ({CURRENCY})",
                ViewResources.MaxPerBet + $" ({CURRENCY})",
                ViewResources.MaxPerMatch2 + $" ({CURRENCY})",
                ViewResources.RepeatedBets,
                ViewResources.BetDelay,
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
                if (columnName.Value.Equals("DisableParlay"))
                {
                    var text = item.DisableParlay ? ViewResources.Yes : ViewResources.No;
                    row.Cells[columnName.Key].SetCellValue(text);
                }
                else if (columnName.Value.Equals("LeagueGroups"))
                {
                    var text = string.Join(", ", item.LeagueGroups.Select(x => x.LeagueGroupName).ToList());
                    row.Cells[columnName.Key].SetCellValue(text);
                }
                else
                {
                    if (cellValue == null)
                    {
                        row.Cells[columnName.Key].SetCellValue(DEFAULT_VALUE);
                    }
                    else
                    {
                        row.Cells[columnName.Key].SetCellValue(cellValue);
                    }
                }
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