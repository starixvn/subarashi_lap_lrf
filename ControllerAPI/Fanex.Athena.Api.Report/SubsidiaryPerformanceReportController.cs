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
        private readonly ISubsidiaryPerformanceService _subsidiaryPerformanceService;

        public SubsidiaryPerformanceReportController(
            ILanguageService langService,
            ISubsidiaryPerformanceService subLicenseePerformanceService)
            : base(langService)
        {
            _subsidiaryPerformanceService = subLicenseePerformanceService;
        }

        [HttpPost]
        [ValidationApiRequest(IsValidProductCodeList = true,
            FunctionConfig = FunctionNames.SubsidiaryPerformance, IsSingleWalletProduct = true)]
        [ApiAutoBindMetaModel(BindProductCodeList = true)]
        public async Task<dynamic> Index(SubsidiaryPerformanceMetaModel metaModel)
        {
            var userSession = SessionService.UserSession;
            var licenseeSession = SessionService.LicenseeSession;
            var isSubsidiary = userSession.UserLevel == UserLevelType.Subsidiary;
            metaModel.LicenseeName = licenseeSession.LicenseeName;

            string agentListXml = null;
            if (isSubsidiary)
            {
                agentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList, isExcludeTestData: metaModel.IsExcludeTest);
            }
            else
            {
                var agentIdListByCurrency = SubsidiaryService.GetCurrencyAgentList(userSession, metaModel.LicenseeName, metaModel.SubsidiaryList, metaModel.IsExcludeTest);
                agentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyList, agentIdListByCurrency);
            }

            metaModel.AgentListXml = agentListXml;

            return await _subsidiaryPerformanceService.GetData(metaModel, userSession.CurrencyList).ConfigureAwait(false);
        }

        [HttpPost]
        [ValidationApiRequest(IsValidProductCodeList = true,
            FunctionConfig = FunctionNames.SubsidiaryPerformance, IsSingleWalletProduct = true)]
        [ApiAutoBindMetaModel(BindProductCodeList = true)]
        public async Task<dynamic> Detail(SubsidiaryPerformanceMetaModel metaModel)
        {
            var licenseeSession = SessionService.LicenseeSession;
            var userSession = SessionService.UserSession;
            metaModel.LicenseeName = licenseeSession.LicenseeName;

            var agentIdListByCurrency = SubsidiaryService.GetCurrencyAgentList(userSession, licenseeSession.LicenseeName, metaModel.SubsidiaryId, metaModel.IsExcludeTest);
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