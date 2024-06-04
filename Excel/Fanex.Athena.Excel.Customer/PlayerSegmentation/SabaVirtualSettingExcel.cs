namespace Fanex.Athena.Excel.Customer
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Hosting;
    using Fanex.Athena.Excel.Base;
    using Fanex.Athena.Excel.Base.Extension;
    using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Resources;
    using NPOI.SS.UserModel;

    public class SabaVirtualSettingExcel : ReportBase
    {
        private const string ExcelTemplatePath = "~/App_Data/Template/Customers/PlayerSegmentation/SabaVirtualSetting.xls";

        private const int ColumnSubsidiary = 0;
        private const int ColumnExternalId = 1;
        private const int ColumnSystemId = 2;
        private const int ColumnSabaVirtualSetting = 3;
        private const int ColumnSoccer = 3;
        private const int ColumnBasketball = 4;
        private const int ColumnLastModifiedDate = 5;

        private const int ColumnTemplateCount = 6;
        private const int RowContentTemplate = 3;

        private readonly IEnumerable<SabaVirtualPlayer> _data;
        private readonly SabaVirtualPlayerListMetaModel _metaModel;

        public SabaVirtualSettingExcel(
            IEnumerable<SabaVirtualPlayer> data,
            SabaVirtualPlayerListMetaModel metaModel)
            : base(HostingEnvironment.MapPath(ExcelTemplatePath), data.Count())
        {
            _data = data;
            _metaModel = metaModel;
        }

        protected override void AssignHeader(ISheet sheet)
        {
            var row = sheet.CopyRow(TemplateSheet, sourceRowIndex: RowHeaderTemplate, destRowIndex: RowHeaderTemplate);
            row.Cells[ColumnSubsidiary].SetCellValue(ViewResources.Subsidiary);
            row.Cells[ColumnExternalId].SetCellValue(ViewResources.ExternalId);
            row.Cells[ColumnSystemId].SetCellValue(ViewResources.SystemId);
            row.Cells[ColumnSabaVirtualSetting].SetCellValue(_metaModel.IsHideSaba ? ViewResources.SabaVirtualSetting_HideSaba : ViewResources.SabaVirtualSetting);
            row.Cells[ColumnLastModifiedDate].SetCellValue(ViewResources.LastModifiedDate);

            var row2 = sheet.CopyRow(TemplateSheet, sourceRowIndex: RowHeaderTemplate + 1, destRowIndex: RowHeaderTemplate + 1);
            row2.Cells[ColumnSoccer].SetCellValue(ViewResources.Soccer);
            row2.Cells[ColumnBasketball].SetCellValue(ViewResources.Basketball);
        }

        protected override void AssignTitle(ISheet sheet)
        {
            var title = _metaModel.IsHideSaba ? ViewResources.SabaVirtualSetting_HideSaba : ViewResources.SabaVirtualSetting;

            sheet.SetTextRowValue(TemplateSheet, RowTitleTemplate, destRowIndex: RowTitleTemplate, 1, title, CellTitleIndex);
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
                row.Cells[ColumnSoccer].SetCellValue(item.SoccerLevel);
                row.Cells[ColumnBasketball].SetCellValue(item.BasketballLevel);
                row.Cells[ColumnLastModifiedDate].SetCellValue(item.LastModifiedDate);

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