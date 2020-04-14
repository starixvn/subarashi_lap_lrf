namespace Fanex.Athena.Excel.Customer
{
    using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
    using Fanex.Athena.Resources;
    using NPOI.SS.UserModel;
    using System;
    using System.Collections.Generic;
    using System.Web.Hosting;

    public class VipPlayerExcel : PlayerExcel<PlayerInfo>
    {
        private const string ExcelTemplatePath = @"~/App_Data/Template/Customers/PlayerSegmentation/VipPlayerList.xls";

        public VipPlayerExcel(IEnumerable<PlayerInfo> _dataSource)
        : base(HostingEnvironment.MapPath(ExcelTemplatePath), ViewResources.VipPlayerManagement, _dataSource)
        {
            _infoHeaders.Add(new Tuple<string, string, Func<object, object>>(ViewResources.Vip, "IsVip", DataParsers.ParseToYesNo));
            _infoHeaders.Add(new Tuple<string, string, Func<object, object>>($"{ViewResources.AbnormalBet} (*)", "IsMarkVoid", DataParsers.ParseToYesNo));
        }

        protected override void AddRowDescription(ISheet sheet, int lastRowIndex)
        {
            var row = sheet.CreateRow(lastRowIndex + 1);
            row.CreateCell(0).SetCellValue(ViewResources.AbnormalBetDescriptionReport);
        }
    }
}