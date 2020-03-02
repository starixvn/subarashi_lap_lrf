namespace Fanex.Athena.Excel.Customer
{
    using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
    using Fanex.Athena.Resources;
    using System;
    using System.Collections.Generic;
    using System.Web.Hosting;

    public class VipPlayerExcel : PlayerExcel<PlayerInfo>
    {
        private const string ExcelTemplatePath = @"~/App_Data/Template/Customers/PlayerSegmentation/VipPlayerList.xls";

        public VipPlayerExcel(IEnumerable<PlayerInfo> _dataSource)
        : base(HostingEnvironment.MapPath(ExcelTemplatePath), string.Empty, _dataSource)
        {
            _infoHeaders.Insert(2, new Tuple<string, string>(ViewResources.Vip, "IsVip"));
        }
    }
}