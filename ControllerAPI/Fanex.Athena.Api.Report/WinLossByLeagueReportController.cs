// --------------------------------------------------------------------------
// <copyright file="ReportController.WinLossByLeague.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Api.Report
{
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Hosting;
    using System.Web.Http;

    using Base.Attributes;

    using DataAccess.Report.Interfaces;

    using Extension.Utility;

    using Fanex.Athena.Excel.Report;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Report.DTO;
    using Fanex.Athena.Model.Report.MetaModel;

    using Model.Core.ResultModel;

    using Service.Core.Common.Interfaces;

    [ApiFunctionAuthorization(PermissionKeys.ReportWinLossByLeague)]
    public class WinLossByLeagueReportController : ApiReportBaseController
    {
        private readonly IWinLossByLeagueDataAccess _winlossByLeagueDataAccess;

        private readonly IAppSettings _appSettings;

        public WinLossByLeagueReportController(
            ILanguageService langService,
            IWinLossByLeagueDataAccess winlossByLeagueService,
            IAppSettings appSetting)
            : base(langService)
        {
            _winlossByLeagueDataAccess = winlossByLeagueService;
            _appSettings = appSetting;
        }

        [HttpPost]
        [ValidationApiRequest(IsValidCurrency = true, IsIncludeKeanOcean = true)]
        [ApiAutoBindMetaModel(BindAgent = true, BindBalanceUpAndMoveBet = true)]
        public async Task<dynamic> Index([FromBody] WinLossByLeagueMetaModel metaModel)
        {
            var resultModel = await GetData(metaModel).ConfigureAwait(false);
            return new
            {
                resultModel.TotalRows,
                Data = resultModel.DataList,
                Total = resultModel.TotalData
            };
        }

        [HttpPost]
        [ValidationApiRequest(IsValidCurrency = true, IsIncludeKeanOcean = true)]
        [ApiAutoBindMetaModel(BindAgent = true, BindBalanceUpAndMoveBet = true)]
        public async Task<HttpResponseMessage> Excel(WinLossByLeagueMetaModel metaModel)
        {
            metaModel.PageIndex = 1;
            metaModel.PageSize = int.MaxValue - 1;

            var resultModel = await GetData(metaModel).ConfigureAwait(false);
            const string FileName = "WinLossByLeague.xls";
            var templatePath = HostingEnvironment.MapPath("~/App_Data/Template/Reports/WinLossByLeagues.xls");

            var winlossByLeague = CreateExcel(templatePath, resultModel, metaModel);
            winlossByLeague.Export();

            return ExcelStream(winlossByLeague.Workbook, FileName);
        }

        protected internal virtual WinlossByLeagueExcel CreateExcel(
            string templatePath,
            ReportResultModel<WinLossByLeague> resultModel,
            WinLossByLeagueMetaModel metaModel)
        {
            return new WinlossByLeagueExcel(templatePath, resultModel, metaModel, _appSettings.HasAmountDueToColumn)
            {
                Level = metaModel.Level
            };
        }

        private static WinLossByLeague CalculateTotal(IEnumerable<WinLossByLeague> dataList)
        {
            var total = new WinLossByLeague();
            foreach (var item in dataList)
            {
                total.BetCount += item.BetCount;
                total.TurnOver += item.TurnOver;
                total.CustomerWinLoss += item.CustomerWinLoss;
                total.LicenseeWL += item.LicenseeWL;
                total.BACommission += item.BACommission;
                total.AmountDue += item.AmountDue;
            }

            return total;
        }

        private async Task<ReportResultModel<WinLossByLeague>> GetData(WinLossByLeagueMetaModel metaModel)
        {
            ReportResultModel<WinLossByLeague> resultModel;

            if (metaModel.Level == 0)
            {
                var dataList = await _winlossByLeagueDataAccess.GetSummary(metaModel).ConfigureAwait(false);

                resultModel = new ReportResultModel<WinLossByLeague>
                {
                    DataList = dataList,
                    TotalData = CalculateTotal(dataList)
                };
            }
            else
            {
                resultModel =
                    await _winlossByLeagueDataAccess.GetCustomers(metaModel).ConfigureAwait(false);
            }

            return resultModel;
        }
    }
}