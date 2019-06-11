namespace Fanex.Athena.Api.Report
{
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Base.Attributes;
    using DataAccess.Report.Interfaces;
    using Fanex.Athena.Resources;
    using Model.Core.DataDomain;
    using Model.Report.DTO;
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
        [ValidationApiRequest]
        public async Task<dynamic> GetData(CasinoTurnoverMetaModel metaModel)
        {
            if (!IsValidCurrency(metaModel.CurrencyId)
                || !IsValidProducts(FunctionNames.CasinoTurnover, metaModel.ProductCode))
            {
                return BadRequest(ViewResources.InvalidRequestMsg);
            }

            metaModel.AgentListXml = SessionService.GenerateAgentListXml(metaModel.CurrencyId);
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