namespace Fanex.Athena.Excel.Customer.CustomerClass
{
    using System.Collections.Generic;
    using System.Linq;
    using Base;
    using Base.Extension;
    using Model.Customer.DTO;
    using NPOI.SS.UserModel;
    using Resources;

    public class RiskLevelInformationExcel : ReportBase
    {
        private const int ColumnTemplateCount = 12;
        private const int RowCCSettingPolicyTitleTemplate = 2;
        private const int RowCCSettingPolicyHeaderTemplate = 3;
        private const int RowCCSettingPolicyContentTemplate = 4;

        private const int SportTypeColumn = 0;
        private const int TopPriorityColumn = 1;
        private const int LivePreMatchColumn = 2;
        private const int CurrencyColumn = 3;
        private const int DisableParlay = 4;
        private const int PlatformColumn = 5;
        private const int LeagueGroupColumn = 6;
        private const int BetIntervalColumn = 7;
        private const int AgentBetIntervalColumn = 8;
        private const int MinBetColumn = 9;
        private const int MaxPerBetColumn = 10;
        private const int MaxPerMatchColumn = 11;
        private const int RepeatedBetColumn = 12;

        private const string CURRENCY = "MYR";
        private const string DEFAULT_VALUE = "-";

        private readonly IDictionary<int, string> _CCSettingPolicyGridCommonColumNames = new Dictionary<int, string>
        {
            { SportTypeColumn, "SportTypeName" },
            { TopPriorityColumn, "TopPriority" },
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
            { RepeatedBetColumn, "RepeatedBets" }
        };

        private readonly IList<string> _CCSettingPolicyHeaderTexts;

        private readonly RiskLevelModel _data;

        private readonly string _reporTitle;

        public RiskLevelInformationExcel(string templatePath, string reportTitle, RiskLevelModel data)
            : base(templatePath, data.CustomerClassLimitPolicies.Count())
        {
            _reporTitle = reportTitle;
            _data = data;

            _CCSettingPolicyHeaderTexts = new List<string>
            {
                ViewResources.SportType,
                ViewResources.TopPriority,
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
                ViewResources.RepeatedBets
            };
        }

        protected override void AssignHeader(ISheet sheet)
        {
            ClearTemplate(sheet, RowTitleTemplate);
            var row = sheet.CopyRow(TemplateSheet, RowCCSettingPolicyHeaderTemplate);

            for (var i = 0; i < _CCSettingPolicyHeaderTexts.Count; i++)
            {
                row.Cells[i].SetCellValue(_CCSettingPolicyHeaderTexts[i]);
            }
        }

        protected override void AssignTitle(ISheet sheet)
        {
            var rowCCSettingPolicyTitle = RowCCSettingPolicyTitleTemplate;

            sheet.SetTextRowValue(TemplateSheet, RowTitleTemplate, ColumnTemplateCount, _reporTitle);

            var row = sheet.CopyRow(TemplateSheet, RowCCSettingPolicyTitleTemplate, rowCCSettingPolicyTitle);
            row.Cells[ColumnIndex].SetCellValue(ViewResources.RiskLevelBetSetting);

            sheet.MergeCells(rowCCSettingPolicyTitle, lastRow: rowCCSettingPolicyTitle, firstCol: SportTypeColumn, lastCol: RepeatedBetColumn);
        }

        protected override void AssignSheetData(ISheet sheet)
        {
            var rowIndex = RowCCSettingPolicyContentTemplate;

            if (_data.CustomerClassLimitPolicies.Any())
            {
                foreach (var policy in _data.CustomerClassLimitPolicies)
                {
                    var row = sheet.CopyRow(TemplateSheet, RowCCSettingPolicyContentTemplate, rowIndex);
                    AssignCommonCCColumns(policy, row);
                    rowIndex++;
                }
            }
            else
            {
                var row = sheet.CopyRow(TemplateSheet, RowCCSettingPolicyContentTemplate, rowIndex);
                BuildNoInfomationRow(sheet, row, rowIndex, rowIndex, SportTypeColumn, RepeatedBetColumn);
            }
        }

        protected void AssignCommonCCColumns(CustomerClassLimitPolicyModel item, IRow row)
        {
            var itemType = item.GetType();
            foreach (var columnName in _CCSettingPolicyGridCommonColumNames)
            {
                var cellValue = itemType.GetProperty(columnName.Value).GetValue(item, null);

                switch (columnName.Value)
                {
                    case "DisableParlay":
                    {
                        var text = item.DisableParlay ? ViewResources.Yes : ViewResources.No;
                        row.Cells[columnName.Key].SetCellValue(text);
                        break;
                    }
                    case "LeagueGroups":
                    {
                        var text = string.Join(", ", item.LeagueGroups.Select(x => x.LeagueGroupName).ToList());
                        row.Cells[columnName.Key].SetCellValue(text);
                        break;
                    }
                    case "TopPriority":
                    {
                        var text = item.TopPriority ? ViewResources.Yes : ViewResources.No;
                        row.Cells[columnName.Key].SetCellValue(text);
                        break;
                    }
                    default:
                    {
                        if (cellValue == null)
                        {
                            row.Cells[columnName.Key].SetCellValue(DEFAULT_VALUE);
                        }
                        else
                        {
                            row.Cells[columnName.Key].SetCellValue(cellValue);
                        }

                        break;
                    }
                }
            }
        }

        protected override void AssignNoInfoRow(ISheet sheet)
        {
            var rowCCSettingPolicyNoInfo = sheet.CopyRow(TemplateSheet, RowCCSettingPolicyContentTemplate, RowCCSettingPolicyContentTemplate);
            BuildNoInfomationRow(sheet, rowCCSettingPolicyNoInfo, RowCCSettingPolicyContentTemplate, RowCCSettingPolicyContentTemplate,
                SportTypeColumn, RepeatedBetColumn);
        }

        private void BuildNoInfomationRow(ISheet sheet, IRow row, int firstRow, int endRow, int starCol, int endCol)
        {
            var style = Workbook.CreateCellStyle();
            style.Alignment = HorizontalAlignment.Center;

            row.Cells[starCol].SetCellValue(ViewResources.NoInfo);
            row.Cells[starCol].CellStyle = style;
            sheet.MergeCells(firstRow, lastRow: endRow, firstCol: starCol, lastCol: endCol);
        }
    }
}