namespace Fanex.Athena.Api.Report
{
    using System.Threading.Tasks;
    using System.Web.Http;

    using Base.Attributes;

    using DataAccess.Report.Interfaces;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Model.Core.DataDomain;
    using Model.Report.MetaModel;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    [ApiFunctionAuthorization(PermissionKeys.ReportCasinoTurnover)]
    public class CasinoTurnoverReportController : ApiReportBaseController
    {
        private readonly ICasinoTurnoverDataAccess _casinoTurnoverDataAccess;

        public CasinoTurnoverReportController(
            ILanguageService langService,
            ICasinoTurnoverDataAccess dataAccess)
            : base(langService)
        {
            _casinoTurnoverDataAccess = dataAccess;
        }

        [HttpPost]
        [ValidationApiRequest(IsValidCurrency = true, IsIncludeKeanOcean = true,
            IsValidProductCodeList = true, FunctionConfig = FunctionNames.CasinoTurnover, IsSingleWalletProduct = true)]
        [ApiAutoBindMetaModel(BindAgent = true)]
        public async Task<dynamic> GetData(CasinoTurnoverMetaModel metaModel)
        {
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