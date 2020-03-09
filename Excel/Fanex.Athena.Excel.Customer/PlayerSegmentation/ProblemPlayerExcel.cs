namespace Fanex.Athena.Excel.Customer
{
    using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
    using Fanex.Athena.Resources;
    using System;
    using System.Collections.Generic;
    using System.Web.Hosting;

    public class ProblemPlayerExcel : PlayerExcel<PlayerInfo>
    {
        private const string ExcelTemplatePath = @"~/App_Data/Template/Customers/PlayerSegmentation/ProblemPlayerList.xls";
        private const string ExcelTemplateNoneVIPPath = @"~/App_Data/Template/Customers/PlayerSegmentation/ProblemPlayerNoneVIPList.xls";

        public ProblemPlayerExcel(IEnumerable<PlayerInfo> _dataSource, bool haveVIPPermission = true)
        : base(GetTemplatePath(haveVIPPermission), string.Empty, _dataSource)
        {
            _infoHeaders.Insert(2, new Tuple<string, string>(ViewResources.MarkDate, nameof(ViewResources.MarkDate)));
            if (haveVIPPermission)
            {
                _infoHeaders.Insert(3, new Tuple<string, string>(ViewResources.Vip, "IsVip"));
            }
        }

        private static string GetTemplatePath(bool haveVIPPermission)
        {
            var templatePath = HostingEnvironment.MapPath(haveVIPPermission ? ExcelTemplatePath : ExcelTemplateNoneVIPPath);
            return templatePath;
        }
    }
}