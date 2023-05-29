namespace Fanex.Athena.Excel.Customer
{
    using System;
    using System.Collections.Generic;
    using System.Web.Hosting;
    using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
    using Fanex.Athena.Resources;

    public class VipPlayerExcel : PlayerExcel<PlayerInfo>
    {
        private const string ExcelTemplatePath = @"~/App_Data/Template/Customers/PlayerSegmentation/VipPlayerList.xls";

        public VipPlayerExcel(IEnumerable<PlayerInfo> _dataSource, bool isNormalView)
        : base(HostingEnvironment.MapPath(ExcelTemplatePath), ViewResources.VipPlayerManagement, _dataSource, isNormalView)
        {
            _infoHeaders.Add(new Tuple<string, string, Func<object, object>>(ViewResources.VIP, "IsVip", DataParsers.ParseToYesNo));
        }
    }
}