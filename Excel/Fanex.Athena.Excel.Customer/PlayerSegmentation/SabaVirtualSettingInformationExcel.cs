using Fanex.Athena.Excel.Base;
using Fanex.Athena.Excel.Base.Extension;
using Fanex.Athena.Model.Customer.DTO;
using Fanex.Athena.Resources;
using NPOI.SS.UserModel;
using System.Collections.Generic;
using System.Linq;

namespace Fanex.Athena.Excel.Customer.CustomerClass
{
    public class SabaVirtualSettingInformationExcel : ReportBase
    {
        private const int ColumnTemplateCount = 7;
        private const int RowContentTemplate = 2;

        private const int LevelColumn = 0;
        private const int SportTypeColumn = 1;
        private const int LeagueGroupColumn = 2;
        private const int ApplyParlay = 3;
        private const int MaxPerMaxColumn = 4;
        private const int BetDelayColumn = 5;
        private const int NextBetIntervalColumn = 6;

        private const string CURRENCY = "MYR";
        private const string DEFAULT_VALUE = "-";

        private readonly string _reporTitle;
        private readonly IList<string> _headerTexts;

        private readonly IEnumerable<SabaVirtualSettingInformationModel> _data;

        private readonly IDictionary<int, string> _gridCommonColumNames = new Dictionary<int, string>
        {
            { LevelColumn, "DangerLevel" },
            { SportTypeColumn, "SportTypeName" },
            { LeagueGroupColumn, "LicLeagueGroupName" },
            { ApplyParlay, "ApplyParlay" },
            { MaxPerMaxColumn, "MaxPerMatch" },
            { BetDelayColumn, "BetDelay" },
            { NextBetIntervalColumn, "NextBetInterval" }
        };

        public SabaVirtualSettingInformationExcel(string templatePath, string reportTitle, IEnumerable<SabaVirtualSettingInformationModel> data)
            : base(templatePath, data.Count())
        {
            _reporTitle = reportTitle;
            _data = data;
            _headerTexts = new List<string>
            {
                ViewResources.Level,
                ViewResources.SportType,
                ViewResources.LeagueGroup,
                ViewResources.ApplyParlay,
                ViewResources.MaxPerMatch + $" ({CURRENCY})",
                ViewResources.BetDelay + $" (%)",
                ViewResources.NextBetInteval
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
                var item = _data.ElementAt(index);

                var row = sheet.CopyRow(TemplateSheet, RowContentTemplate, rowIndex);
                AssignCommonColumns(item, row);
                rowIndex++;
            }
        }

        protected void AssignCommonColumns(SabaVirtualSettingInformationModel item, IRow row)
        {
            var itemType = item.GetType();
            foreach (var columnName in _gridCommonColumNames)
            {
                var cellValue = itemType.GetProperty(columnName.Value).GetValue(item, null);
                if (columnName.Value.Equals("ApplyParlay"))
                {
                    var text = item.ApplyParlay ? ViewResources.Yes : ViewResources.No;
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
    }
}