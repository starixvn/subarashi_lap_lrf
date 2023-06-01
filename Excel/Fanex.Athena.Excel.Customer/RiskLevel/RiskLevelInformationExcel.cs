using Fanex.Athena.Excel.Base;
using Fanex.Athena.Excel.Base.Extension;
using Fanex.Athena.Model.Customer.DTO;
using Fanex.Athena.Resources;
using NPOI.SS.UserModel;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Fanex.Athena.Excel.Customer.CustomerClass
{
    public class RiskLevelInformationExcel : ReportBase
    {
        private const int ColumnTemplateCount = 12;
        private const int RowRiskLevelOddsGroupTitleTemplate = 2;
        private const int RowRiskLevelOddsGroupHeaderTemplate = 3;
        private const int RowRiskLevelOddsGroupContentTemplate = 4;
        private const int RowCCSettingPolicyTitleTemplate = 6;
        private const int RowCCSettingPolicyHeaderTemplate = 7;
        private const int RowCCSettingPolicyContentTemplate = 8;

        private const int RiskLevelOddsGroupColumn = 0;
        private const int RiskLevelPlatformColumn = 1;

        private const int SportTypeColumn = 0;
        private const int LivePreMatchColumn = 1;
        private const int CurrencyColumn = 2;
        private const int DisableParlay = 3;
        private const int PlatformColumn = 4;
        private const int LeagueGroupColumn = 5;
        private const int BetIntervalColumn = 6;
        private const int AgentBetIntervalColumn = 7;
        private const int MinBetColumn = 8;
        private const int MaxPerBetColumn = 9;
        private const int MaxPerMatchColumn = 10;
        private const int RepeatedBetColumn = 11;

        private const string CURRENCY = "MYR";
        private const string DEFAULT_VALUE = "-";

        private readonly string _reporTitle;
        private readonly IList<string> _CCSettingPolicyHeaderTexts;
        private readonly IList<string> _RiskLevelOddsGroupHeaderTexts;
        private readonly int _siteMemberPoliciesRowCount;

        private readonly RiskLevelModel _data;

        private readonly IDictionary<int, string> _CCSettingPolicyGridCommonColumNames = new Dictionary<int, string>
        {
            { SportTypeColumn, "SportTypeName" },
            { LivePreMatchColumn, "LiveType" },
            { CurrencyColumn, "Currency" },
            { DisableParlay, "DisableParlay" },
            { PlatformColumn, "Platform" },
            { LeagueGroupColumn, "LicLeagueGroupName" },
            { BetIntervalColumn, "BetInterval" },
            { AgentBetIntervalColumn, "AgentBetInterval" },
            { MinBetColumn, "MinBet" },
            { MaxPerBetColumn, "MaxBet" },
            { MaxPerMatchColumn, "MaxPerMatch" },
            { RepeatedBetColumn, "RepeatedBets" }
        };

        public RiskLevelInformationExcel(string templatePath, string reportTitle, RiskLevelModel data)
            : base(templatePath, data.CustomerClassLimitPolicies.Count() + data.SiteMemberPolicies.Count())
        {
            _reporTitle = reportTitle;
            _data = data;
            _siteMemberPoliciesRowCount = data.SiteMemberPolicies.Any() ? data.SiteMemberPolicies.Count() - 1 : 0;

            _CCSettingPolicyHeaderTexts = new List<string>
            {
                ViewResources.SportType,
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
            _RiskLevelOddsGroupHeaderTexts = new List<string>
            {
                ViewResources.OddsGroup,
                ViewResources.Platform
            };
        }

        protected override void AssignHeader(ISheet sheet)
        {
            ClearTemplate(sheet, RowTitleTemplate);
            var row = sheet.CopyRow(TemplateSheet, RowRiskLevelOddsGroupHeaderTemplate);

            for (int i = 0; i < _RiskLevelOddsGroupHeaderTexts.Count; i++)
            {
                row.Cells[i].SetCellValue(_RiskLevelOddsGroupHeaderTexts[i]);
            }

            var row2 = sheet.CopyRow(TemplateSheet, RowCCSettingPolicyHeaderTemplate, RowCCSettingPolicyHeaderTemplate + _siteMemberPoliciesRowCount);

            for (int i = 0; i < _CCSettingPolicyHeaderTexts.Count; i++)
            {
                row2.Cells[i].SetCellValue(_CCSettingPolicyHeaderTexts[i]);
            }
        }

        protected override void AssignTitle(ISheet sheet)
        {
            var rowCCSettingPolicyTitle = RowCCSettingPolicyTitleTemplate + _siteMemberPoliciesRowCount;

            sheet.SetTextRowValue(TemplateSheet, RowTitleTemplate, ColumnTemplateCount, _reporTitle);
            sheet.SetTextRowValue(TemplateSheet, RowRiskLevelOddsGroupTitleTemplate, RiskLevelPlatformColumn, ViewResources.RiskLevelOddsGroup);

            var row = sheet.CopyRow(TemplateSheet, RowCCSettingPolicyTitleTemplate, rowCCSettingPolicyTitle);
            row.Cells[ColumnIndex].SetCellValue(ViewResources.RiskLevelBetSetting);

            sheet.MergeCells(firstRow: RowRiskLevelOddsGroupTitleTemplate, lastRow: RowRiskLevelOddsGroupTitleTemplate, firstCol: RiskLevelOddsGroupColumn, lastCol: RiskLevelPlatformColumn);
            sheet.MergeCells(firstRow: rowCCSettingPolicyTitle, lastRow: rowCCSettingPolicyTitle, firstCol: SportTypeColumn, lastCol: RepeatedBetColumn);
        }

        protected override void AssignSheetData(ISheet sheet)
        {
            var rowIndex = RowRiskLevelOddsGroupContentTemplate;

            if (_data.SiteMemberPolicies.Any())
            {
                foreach (var item in _data.SiteMemberPolicies)
                {
                    var row = sheet.CopyRow(TemplateSheet, RowRiskLevelOddsGroupContentTemplate, rowIndex);
                    row.Cells[RiskLevelOddsGroupColumn].SetCellValue(item.OddsGroup);
                    row.Cells[RiskLevelPlatformColumn].SetCellValue(item.Platform);
                    rowIndex++;
                }
            }
            else
            {
                var row = sheet.CopyRow(TemplateSheet, RowRiskLevelOddsGroupContentTemplate, rowIndex);
                BuildNoInfomationRow(sheet, row, rowIndex, rowIndex, RiskLevelOddsGroupColumn, RiskLevelPlatformColumn);
            }

            rowIndex = RowCCSettingPolicyContentTemplate + _siteMemberPoliciesRowCount;

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
                if (columnName.Value.Equals("LiveType"))
                {
                    var text = item.LiveType == 1 ? ViewResources.Live2 : ViewResources.PreMatch;
                    row.Cells[columnName.Key].SetCellValue(text);
                }
                else if (columnName.Value.Equals("DisableParlay"))
                {
                    var text = item.DisableParlay ? ViewResources.Yes : ViewResources.No;
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

        protected override void AssignNoInfoRow(ISheet sheet)
        {
            var rowRiskLevelOddsGroupNoInfo = sheet.CopyRow(TemplateSheet, RowRiskLevelOddsGroupContentTemplate, RowRiskLevelOddsGroupContentTemplate);
            BuildNoInfomationRow(sheet, rowRiskLevelOddsGroupNoInfo, RowRiskLevelOddsGroupContentTemplate, RowRiskLevelOddsGroupContentTemplate, RiskLevelOddsGroupColumn, RiskLevelPlatformColumn);

            var rowCCSettingPolicyNoInfo = sheet.CopyRow(TemplateSheet, RowCCSettingPolicyContentTemplate, RowCCSettingPolicyContentTemplate);
            BuildNoInfomationRow(sheet, rowCCSettingPolicyNoInfo, RowCCSettingPolicyContentTemplate, RowCCSettingPolicyContentTemplate, SportTypeColumn, RepeatedBetColumn);
        }

        private void BuildNoInfomationRow(ISheet sheet, IRow row, int firstRow, int endRow, int starCol, int endCol)
        {
            var style = Workbook.CreateCellStyle();
            style.Alignment = HorizontalAlignment.Center;

            row.Cells[starCol].SetCellValue(ViewResources.NoInfo);
            row.Cells[starCol].CellStyle = style;
            sheet.MergeCells(firstRow: firstRow, lastRow: endRow, firstCol: starCol, lastCol: endCol);
        }
    }
}