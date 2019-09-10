// --------------------------------------------------------------------------
// <copyright file="PlatformWinLossReportController.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Api.Report
{
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Base.Attributes;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Core.DataDomain;
    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    [ApiFunctionAuthorization(PermissionKeys.ReportPlatformWinLoss)]
    public class PlatformWinLossReportController : ApiReportBaseController
    {
        private readonly IReportAPIClient _reportAPIClient;

        public PlatformWinLossReportController(
            ISessionService sessionService,
            IProductService productService,
            ILanguageService langService,
            IReportAPIClient reportAPIClient)
            : base(sessionService, productService, langService)
        {
            _reportAPIClient = reportAPIClient;
        }

        [HttpPost]
        [ValidationApiRequest(IsValidCurrency = true, IsIncludeKeanOcean = true)]
        public Task<dynamic> Index(PlatformWinLossMetaModel metaModel)
        {
            return ProcessRequest(metaModel);
        }

        private async Task<dynamic> ProcessRequest(PlatformWinLossMetaModel metaModel)
        {
            metaModel.AgentListXml = SessionService.GenerateAgentListXml(metaModel.CurrencyId, metaModel.IsExcludedTestData);
            metaModel.HasComm = SessionService.LicenseeSession.IsAllowedCustomerComm;

            var language = SessionService.UserSession.Language;

            return metaModel.Level == (int)ReportLevel.Main 
                ? await ProcessSummaryLevel(metaModel, language)
                : await ProcessMemberLevel(metaModel, language);
        }

        private async Task<dynamic> ProcessMemberLevel(PlatformWinLossMetaModel metaModel, string language)
        {
            const string FileName = "PlatformWinLossMember.xls";

            metaModel.CurrencyList = SessionService.UserSession.CurrencyList
                .Select(x => new Currency { ID = x.Key, Name = x.Value }).ToList();

            return metaModel.IsExportExcel
                ? await _reportAPIClient.PostFileAsync("api/PlatformWinLoss/ExportMemberData", metaModel, FileName, language).ConfigureAwait(false)
                : await _reportAPIClient.PostAsync<dynamic>("api/PlatformWinLoss/GetMemberData", metaModel, language).ConfigureAwait(false);
        }

        private async Task<dynamic> ProcessSummaryLevel(PlatformWinLossMetaModel metaModel, string language)
        {
            const string FileName = "PlatformWinLossSummary.xls";

            return metaModel.IsExportExcel
                ? await _reportAPIClient.PostFileAsync("api/PlatformWinLoss/ExportSummaryData", metaModel, FileName, language).ConfigureAwait(false)
                : await _reportAPIClient.PostAsync<dynamic>("api/PlatformWinLoss/GetSummaryData", metaModel, language).ConfigureAwait(false);
        }
    }
}