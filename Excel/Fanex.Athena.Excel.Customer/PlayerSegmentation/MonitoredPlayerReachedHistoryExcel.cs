using Fanex.Athena.Excel.Base;
using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
using NPOI.SS.UserModel;
using System.Collections.Generic;
using System.Linq;
using Fanex.Athena.Excel.Base.Extension;
using Fanex.Athena.Resources;
using Fanex.Athena.Model.Customer.MetaModel;
using System.Web.Hosting;

namespace Fanex.Athena.Excel.Customer
{
    public class MonitoredPlayerReachedHistoryExcel : ReportBase
    {
        const string ExcelTemplatePath = "~/App_Data/Template/Customers/PlayerSegmentation/MonitoredPlayerReachedHistory.xls";

        const int ColumnDate = 0;
        const int ColumnWinningThreshold = 1;
        const int ColumnWinningAmount = 2;

        const int ColumnTemplateCount = 3;
        const int RowContentTemplate = 2;

        private readonly IEnumerable<MonitoredPlayerReachedHistory> _data;
        private readonly MonitoredPlayerReachedHistoryMetaModel _metaModel;

        public MonitoredPlayerReachedHistoryExcel(IEnumerable<MonitoredPlayerReachedHistory> data, MonitoredPlayerReachedHistoryMetaModel metaModel)
            : base(HostingEnvironment.MapPath(ExcelTemplatePath), data.Count())
        {
            _data = data;
            _metaModel = metaModel;
        }

        protected override void AssignHeader(ISheet sheet)
        {
            var row = sheet.CopyRow(TemplateSheet, RowHeaderTemplate);
            row.Cells[ColumnDate].SetCellValue(ViewResources.Date);
            row.Cells[ColumnWinningThreshold].SetCellValue(ViewResources.DailyWinningThreshold);
            row.Cells[ColumnWinningAmount].SetCellValue(ViewResources.TotalWinningAmount);
        }

        protected override void AssignTitle(ISheet sheet)
        {
            var title = $"{ViewResources.NotificationHistory} {_metaModel.FromDate.ToString(FormatDate)} --> {_metaModel.ToDate.ToString(FormatDate)}"
                + $" - {_metaModel.ExternalId} ({_metaModel.SystemId})";
            sheet.SetTextRowValue(TemplateSheet, RowTitleTemplate, destRowIndex: RowTitleTemplate, ColumnTemplateCount, title);
            sheet.CreateFreezePane(0, RowContentTemplate);
            ClearTemplate(sheet, RowContentTemplate);
        }

        protected override void AssignNoInfoRow(ISheet sheet)
        {
            sheet.SetTextRowValue(TemplateSheet, sourceRowIndex: RowContentTemplate, destRowIndex: RowContentTemplate, ColumnTemplateCount, ViewResources.NoInfo);
        }

        protected override void AssignSheetData(ISheet sheet)
        {
            var dataIndex = 0;
            foreach (var item in _data)
            {
                var rowIndex = dataIndex + RowContentTemplate;
                var row = sheet.CopyRow(TemplateSheet, RowContentTemplate, rowIndex);

                row.Cells[ColumnDate].SetCellValue(item.ReachedDateDisplay);
                row.Cells[ColumnWinningThreshold].SetCellValue(item.DailyWinningThreshold);
                row.Cells[ColumnWinningAmount].SetCellValue(item.TotalWinningAmount);

                dataIndex++;
            }
        }
    }
}
