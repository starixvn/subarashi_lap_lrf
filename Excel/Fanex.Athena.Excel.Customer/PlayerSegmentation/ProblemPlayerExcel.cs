namespace Fanex.Athena.Excel.Customer
{
    using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
    using Fanex.Athena.Resources;
    using NPOI.SS.UserModel;
    using System;
    using System.Collections.Generic;
    using System.Web.Hosting;

    public class ProblemPlayerExcel : PlayerExcel<PlayerInfo>
    {
        private const string ExcelTemplatePath = @"~/App_Data/Template/Customers/PlayerSegmentation/ProblemPlayerList.xls";
        private const string ExcelTemplateNoneVIPPath = @"~/App_Data/Template/Customers/PlayerSegmentation/ProblemPlayerNoneVIPList.xls";

        public ProblemPlayerExcel(IEnumerable<PlayerInfo> _dataSource, string baseCurrency, bool hasVIPPermission = true)
        : base(GetTemplatePath(hasVIPPermission), GetReportTitle(baseCurrency), _dataSource)
        {
            AddCommonHeaders();
            if (hasVIPPermission)
            {
                AddVIPHeaders();
            }
        }

        private void AddCommonHeaders()
        {
            _infoHeaders.Add(new Tuple<string, string, Func<object, object>>(ViewResources.ReducedMaxPerEvent, nameof(ViewResources.ReducedMaxPerEvent), null));
            _infoHeaders.Add(new Tuple<string, string, Func<object, object>>(ViewResources.ReducedMaxPerBet, nameof(ViewResources.ReducedMaxPerBet), null));
            _infoHeaders.Add(new Tuple<string, string, Func<object, object>>(ViewResources.Reason, "ReasonList", DataParsers.ParseToBreaklineText));
            _infoHeaders.Add(new Tuple<string, string, Func<object, object>>(ViewResources.MarkDate, nameof(ViewResources.MarkDate), null));
        }

        private void AddVIPHeaders()
        {
            _infoHeaders.Add(new Tuple<string, string, Func<object, object>>(ViewResources.Vip, "IsVip", DataParsers.ParseToYesNo));
        }

        private static string GetTemplatePath(bool haveVIPPermission)
        {
            var templatePath = HostingEnvironment.MapPath(haveVIPPermission ? ExcelTemplatePath : ExcelTemplateNoneVIPPath);
            return templatePath;
        }

        private static string GetReportTitle(string baseCurrency) => $"{ViewResources.ProblemPlayer} - {string.Format(ViewResources.Viewin, baseCurrency.ToUpperInvariant())}";
    }
}