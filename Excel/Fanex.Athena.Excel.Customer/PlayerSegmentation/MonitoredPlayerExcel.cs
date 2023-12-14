using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Hosting;
using Fanex.Athena.Excel.Base;
using Fanex.Athena.Excel.Base.Extension;
using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
using Fanex.Athena.Model.Customer.MetaModel;
using Fanex.Athena.Resources;
using NPOI.SS.UserModel;

namespace Fanex.Athena.Excel.Customer
{
    public class MonitoredPlayerExcel : ReportBase
    {
        private const string ExcelTemplatePath = "~/App_Data/Template/Customers/PlayerSegmentation/MonitoredPlayerList.xls";

        private const int ColumnSubsidiary = 0;
        private const int ColumnExternalId = 1;
        private const int ColumnSystemId = 2;
        private const int ColumnCurrency = 3;
        private const int ColumnWinningThreshold = 4;
        private const int ColumnNoOfReached = 5;
        private const int ColumnLastReachedDate = 6;
        private const int ColumnVipPlayer = 7;

        private const int ColumnTemplateCount = 8;
        private const int RowContentTemplate = 2;

        private readonly IEnumerable<MonitoredPlayerInfo> _data;
        private readonly MonitoredPlayerListMetaModel _metaModel;
        private readonly bool _hasVIPPlayerPermission;

        public MonitoredPlayerExcel(IEnumerable<MonitoredPlayerInfo> data, MonitoredPlayerListMetaModel metaModel,
            bool hasVIPPlayerPermission)
            : base(HostingEnvironment.MapPath(ExcelTemplatePath), data.Count())
        {
            _data = data;
            _metaModel = metaModel;
            _hasVIPPlayerPermission = hasVIPPlayerPermission;
        }

        protected override void AssignHeader(ISheet sheet)
        {
            var row = sheet.CopyRow(TemplateSheet, RowHeaderTemplate);
            row.Cells[ColumnSubsidiary].SetCellValue(ViewResources.Subsidiary);
            row.Cells[ColumnExternalId].SetCellValue(ViewResources.ExternalId);
            row.Cells[ColumnSystemId].SetCellValue(ViewResources.SystemId);
            row.Cells[ColumnCurrency].SetCellValue(ViewResources.Currency);
            row.Cells[ColumnWinningThreshold].SetCellValue(ViewResources.CurrentWinningThreshold);
            row.Cells[ColumnNoOfReached].SetCellValue(ViewResources.NoOfReached);
            row.Cells[ColumnLastReachedDate].SetCellValue(ViewResources.LastReachedDate);
            row.Cells[ColumnVipPlayer].SetCellValue(ViewResources.VIPPlayer);
        }

        protected override void AssignTitle(ISheet sheet)
        {
            var titleBuilder = new StringBuilder(ViewResources.MonitoredPlayer);
            if (!_metaModel.IsGetAll)
            {
                titleBuilder.Append($", {ViewResources.ReachedDate}: {_metaModel.FromDate.ToString(FormatDate)} --> {_metaModel.ToDate.ToString(FormatDate)}");
            }
            titleBuilder.Append($", {ViewResources.Currencies}: {_metaModel.SelectedCurrencyCodes}");

            sheet.SetTextRowValue(TemplateSheet, RowTitleTemplate, destRowIndex: RowTitleTemplate, 1, titleBuilder.ToString(), CellTitleIndex);
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

                row.Cells[ColumnSubsidiary].SetCellValue(item.Subsidiary);
                row.Cells[ColumnExternalId].SetCellValue(item.ExternalId);
                row.Cells[ColumnSystemId].SetCellValue(item.SystemId);
                row.Cells[ColumnCurrency].SetCellValue(item.Currency);
                row.Cells[ColumnWinningThreshold].SetCellValue(item.CurrentWinningThreshold);
                row.Cells[ColumnNoOfReached].SetCellValue(item.NoOfReached?.ToString() ?? string.Empty);
                row.Cells[ColumnLastReachedDate].SetCellValue(item.LastReachedDateDisplay);
                row.Cells[ColumnVipPlayer].SetCellValue(item.VipPlayer ? ViewResources.Yes : ViewResources.No);

                dataIndex++;
            }
        }

        protected override void ProcessUI(ISheet sheet)
        {
            if (!_metaModel.SubsidiarySearch)
            {
                sheet.HideColumn(ColumnSubsidiary);
            }

            if (!_hasVIPPlayerPermission)
            {
                sheet.HideColumn(ColumnVipPlayer);
            }
        }

        private int CellTitleIndex => _metaModel.SubsidiarySearch ? ColumnSubsidiary : ColumnExternalId;
    }
}