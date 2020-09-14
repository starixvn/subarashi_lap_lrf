namespace Fanex.Athena.Excel.Customer
{
    using System;
    using System.Collections.Generic;
    using System.Web.Hosting;
    using Fanex.Athena.Excel.Base.Extension;
    using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
    using Fanex.Athena.Resources;
    using NPOI.SS.UserModel;

    public class ProblemPlayerExcel : PlayerExcel<PlayerInfo>
    {
        private const string ExcelTemplatePath = @"~/App_Data/Template/Customers/PlayerSegmentation/ProblemPlayerList.xls";
        private const int ColumnVIP = 6;

        private readonly bool _hasVIPPermission;

        public ProblemPlayerExcel(IEnumerable<PlayerInfo> _dataSource, string baseCurrency, bool isNormalView, bool hasVIPPermission)
        : base(HostingEnvironment.MapPath(ExcelTemplatePath), GetReportTitle(baseCurrency), _dataSource, isNormalView)
        {
            _hasVIPPermission = hasVIPPermission;
            AddCommonHeaders();
            if (hasVIPPermission)
            {
                AddVIPHeaders();
            }
        }

        protected override void ProcessUI(ISheet sheet)
        {
            base.ProcessUI(sheet);
            if (!_hasVIPPermission)
            {
                sheet.HideColumn(ColumnVIP);
            }
        }

        private void AddCommonHeaders()
        {
            _infoHeaders.Add(new Tuple<string, string, Func<object, object>>(ViewResources.CustomerClass, nameof(ViewResources.CustomerClass), null));
            _infoHeaders.Add(new Tuple<string, string, Func<object, object>>(ViewResources.Reason, "ReasonList", DataParsers.ParseToBreaklineText));
            _infoHeaders.Add(new Tuple<string, string, Func<object, object>>(ViewResources.MarkDate, nameof(ViewResources.MarkDate), null));
        }

        private void AddVIPHeaders()
        {
            _infoHeaders.Add(new Tuple<string, string, Func<object, object>>(ViewResources.Vip, "IsVip", DataParsers.ParseToYesNo));
        }

        private static string GetReportTitle(string baseCurrency) => $"{ViewResources.ProblemPlayer} - {string.Format(ViewResources.Viewin, baseCurrency.ToUpperInvariant())}";
    }
}
