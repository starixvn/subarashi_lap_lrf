namespace Fanex.Athena.Api.Report
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Http;

    using Base.Attributes;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Utility;

    using Model.Core.DataDomain;
    using Model.Report.DTO.SubsidiaryPerformance;
    using Model.Report.MetaModel;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;
    using Service.Report.Interfaces;

    [ApiFunctionAuthorization(PermissionKeys.ReportSubsidiaryPerformance)]
    public class SubsidiaryPerformanceReportController : ApiReportBaseController
    {
        private readonly ISubsidiaryService _subsidiaryService;

        private readonly ISubsidiaryPerformanceService _subsidiaryPerformanceService;

        public SubsidiaryPerformanceReportController(
            ILanguageService langService,
            ISubsidiaryService subsidiaryService,
            ISubsidiaryPerformanceService subLicenseePerformanceService)
            : base(langService)
        {
            _subsidiaryService = subsidiaryService;
            _subsidiaryPerformanceService = subLicenseePerformanceService;
        }

        [HttpPost]
        [ValidationApiRequest(IsValidProductCodeList = true,
            FunctionConfig = FunctionNames.SubsidiaryPerformance, IsSingleWalletProduct = true)]
        public async Task<dynamic> Index(SubsidiaryPerformanceMetaModel metaModel)
        {
            var userSession = SessionService.UserSession;
            var isSubsidiary = userSession.UserLevel == UserLevelType.Subsidiary;

            metaModel.LicenseeName = SessionService.LicenseeSession.LicenseeName;

            string agentListXml = null;
            if (isSubsidiary)
            {
                agentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList, isExcludeTestData: metaModel.IsExcludeTest);
            }
            else
            {
                var agentIdListByCurrency = _subsidiaryService.GetCurrencyAgentList(userSession, metaModel.LicenseeName, metaModel.SubsidiaryList, metaModel.IsExcludeTest);
                agentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyList, agentIdListByCurrency);
            }

            metaModel.AgentListXml = agentListXml;
            return await _subsidiaryPerformanceService.GetData(metaModel, userSession.CurrencyList).ConfigureAwait(false);
        }

        [HttpPost]
        [ValidationApiRequest(IsValidProductCodeList = true,
            FunctionConfig = FunctionNames.SubsidiaryPerformance, IsSingleWalletProduct = true)]
        public async Task<dynamic> Detail(SubsidiaryPerformanceMetaModel metaModel)
        {
            var licenseeName = SessionService.LicenseeSession.LicenseeName;
            var userSession = SessionService.UserSession;
            metaModel.LicenseeName = licenseeName;
            var agentIdListByCurrency = _subsidiaryService.GetCurrencyAgentList(userSession, licenseeName, metaModel.SubsidiaryId, metaModel.IsExcludeTest);

            if (agentIdListByCurrency.Any())
            {
                metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyList, agentIdListByCurrency);

                var result = await _subsidiaryPerformanceService.GetDetailData(metaModel, userSession.CurrencyList).ConfigureAwait(false);

                return new
                {
                    Data = result.DataList,
                    Total = result.SummaryTotal,
                    GrandTotal = result.TotalData
                };
            }

            return new
            {
                Data = new List<SubsidiaryPerformanceDetail>()
            };
        }
    }
}