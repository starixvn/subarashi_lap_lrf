using Fanex.Athena.Excel.Base;
using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
using NPOI.SS.UserModel;
using System;
using System.Collections.Generic;
using System.Linq;
using Fanex.Athena.Excel.Base.Extension;
using System.Text;
using System.Threading.Tasks;
using Fanex.Athena.Resources;
using Fanex.Athena.Model.Customer.MetaModel;
using Fanex.Athena.Model.Core.DataDomain;
using System.Globalization;
using System.Web.Hosting;
using Fanex.Athena.Model.Core.Helper;

namespace Fanex.Athena.Excel.Customer
{
    public class MonitoredPlayerExcel : ReportBase
    {
        const string ExcelTemplatePath = "~/App_Data/Template/Customers/PlayerSegmentation/MonitoredPlayerList.xls";

        const int ColumnSubsidiary = 0;
        const int ColumnExternalId = 1;
        const int ColumnSystemId = 2;
        const int ColumnCurrency = 3;
        const int ColumnWinningThreshold = 4;
        const int ColumnNoOfReached = 5;
        const int ColumnLastReachedDate = 6;
        const int ColumnProblemPlayer = 7;
        const int ColumnVipPlayer = 8;

        const int ColumnTemplateCount = 9;
        const int RowContentTemplate = 2;

        private readonly IEnumerable<MonitoredPlayerInfo> _data;
        private readonly MonitoredPlayerListMetaModel _metaModel;

        public MonitoredPlayerExcel(IEnumerable<MonitoredPlayerInfo> data, MonitoredPlayerListMetaModel metaModel)
            : base(HostingEnvironment.MapPath(ExcelTemplatePath), data.Count())
        {
            _data = data;
            _metaModel = metaModel;
        }

        protected override void AssignHeader(ISheet sheet)
        {
            var row = sheet.CopyRow(TemplateSheet, RowHeaderTemplate);
            row.Cells[ColumnSubsidiary].SetCellValue(ViewResources.Subsidiary);
            row.Cells[ColumnExternalId].SetCellValue(ViewResources.ExternalId);
            row.Cells[ColumnSystemId].SetCellValue(ViewResources.ExternalId);
            row.Cells[ColumnCurrency].SetCellValue(ViewResources.Currency);
            row.Cells[ColumnWinningThreshold].SetCellValue(ViewResources.CurrentWinningThreshold);
            row.Cells[ColumnNoOfReached].SetCellValue(ViewResources.NoOfReached);
            row.Cells[ColumnLastReachedDate].SetCellValue(ViewResources.LastReachedDate);
            row.Cells[ColumnProblemPlayer].SetCellValue(ViewResources.ProblemPlayer);
            row.Cells[ColumnVipPlayer].SetCellValue(ViewResources.VIPPlayer);
        }

        protected override void AssignTitle(ISheet sheet)
        {

            var titleBuilder = new StringBuilder(ViewResources.MonitoredPlayerList);
            if(!_metaModel.IsGetAll)
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
                row.Cells[ColumnProblemPlayer].SetCellValue(item.ProblemPlayer ? ViewResources.Yes : ViewResources.No);
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
        }

        private int CellTitleIndex => _metaModel.SubsidiarySearch ? ColumnSubsidiary : ColumnExternalId;
    }
}
