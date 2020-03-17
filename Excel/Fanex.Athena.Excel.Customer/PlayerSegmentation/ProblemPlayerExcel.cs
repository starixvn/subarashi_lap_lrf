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

        private readonly bool _haveVIPPermission;

        public ProblemPlayerExcel(IEnumerable<PlayerInfo> _dataSource, bool hasVIPPermission = true)
        : base(GetTemplatePath(hasVIPPermission), string.Empty, _dataSource)
        {
            _infoHeaders.Add(new Tuple<string, string>(ViewResources.MarkDate, nameof(ViewResources.MarkDate)));
            if (hasVIPPermission)
            {
                _infoHeaders.Add(new Tuple<string, string>(ViewResources.Vip, "IsVip"));
                _infoHeaders.Add(new Tuple<string, string>($"{ViewResources.AbnormalBet} (*)", "IsMarkVoid"));
            }
            _haveVIPPermission = hasVIPPermission;
        }

        protected override void AddRowDescription(ISheet sheet, int lastRowIndex)
        {
            if (_haveVIPPermission)
            {
                var row = sheet.CreateRow(lastRowIndex + 1);
                row.CreateCell(0).SetCellValue(ViewResources.AbnormalBetDescriptionReport);
            }
        }

        private static string GetTemplatePath(bool haveVIPPermission)
        {
            var templatePath = HostingEnvironment.MapPath(haveVIPPermission ? ExcelTemplatePath : ExcelTemplateNoneVIPPath);
            return templatePath;
        }
    }
}