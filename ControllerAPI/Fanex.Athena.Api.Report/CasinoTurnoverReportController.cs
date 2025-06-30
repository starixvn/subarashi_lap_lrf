namespace Fanex.Athena.Api.Report
{
    using System.Threading.Tasks;
    using System.Web.Http;

    using Base.Attributes;

    using DataAccess.Report.Interfaces;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Core.DataDomain;
    using Model.Report.MetaModel;

    using Service.Core.Common.Interfaces;

    [ApiFunctionAuthorization(PermissionKeys.ReportCasinoTurnover)]
    public class CasinoTurnoverReportController : ApiReportBaseController
    {
        private readonly ICasinoTurnoverDataAccess _casinoTurnoverDataAccess;
        private readonly IProductService _productService;

        public CasinoTurnoverReportController(
            ILanguageService langService,
            ICasinoTurnoverDataAccess dataAccess,
            IProductService productService)
            : base(langService)
        {
            _casinoTurnoverDataAccess = dataAccess;
            _productService = productService;
        }

        [HttpPost]
        [ValidationApiRequest(IsValidCurrency = true,
            IsValidProductCodeList = true, FunctionConfig = FunctionNames.CasinoTurnover, IsSingleWalletProduct = true)]
        [ApiAutoBindMetaModel(BindAgent = true)]
        public async Task<dynamic> GetData(CasinoTurnoverMetaModel metaModel)
        {
            var result = await _casinoTurnoverDataAccess.GetData(metaModel).ConfigureAwait(false);

            foreach (var item in result.DataList)
            {
                item.Product = _productService.GetProductName(item.Product);
            }

            //get product name
            return new
            {
                Data = result.DataList,
                Total = result.TotalData,
                result.TotalRows
            };
        }
    }
}