namespace Fanex.Athena.Api.Report
{
    using System.Threading.Tasks;
    using System.Web.Http;

    using Base.Attributes;

    using DataAccess.Report.Interfaces;

    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Utility;

    using Model.Core.DataDomain;
    using Model.Report.MetaModel;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    [ApiFunctionAuthorization(PermissionKeys.ReportCasinoTurnover)]
    public class CasinoTurnoverReportController : ApiReportBaseController
    {
        private readonly ICasinoTurnoverDataAccess _casinoTurnoverDataAccess;

        public CasinoTurnoverReportController(
            ISessionService sessionService,
            IProductService productService,
            ILanguageService langService,
            ICasinoTurnoverDataAccess dataAccess)
            : base(sessionService, productService, langService)
        {
            _casinoTurnoverDataAccess = dataAccess;
        }

        [HttpPost]
        [ValidationApiRequest(IsValidCurrency = true, IsIncludeKeanOcean = true,
            IsValidProductCodeList = true, FunctionConfig = FunctionNames.CasinoTurnover, IsSingleWalletProduct = true)]
        public async Task<dynamic> GetData(CasinoTurnoverMetaModel metaModel)
        {
            var userSession = SessionService.UserSession;
            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList, metaModel.CurrencyId);
            var result = await _casinoTurnoverDataAccess.GetData(metaModel).ConfigureAwait(false);
            return new
            {
                Data = result.DataList,
                Total = result.TotalData,
                result.TotalRows
            };
        }
    }
}