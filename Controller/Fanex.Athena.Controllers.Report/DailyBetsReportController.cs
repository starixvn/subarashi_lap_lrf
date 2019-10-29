using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Core.MetaModel.Product;
using Fanex.Athena.Model.Report.MetaModel;
using Fanex.Athena.Model.Report.ViewModel;
using Fanex.Athena.Service.Core.Common.Interfaces;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.Web.ActionFilter;

namespace Fanex.Athena.Controllers.Report
{
    public class DailyBetsReportController : ReportBaseController
    {
        private readonly IReportAPIClient _reportAPIClient;

        public DailyBetsReportController(
            ILanguageService languageService,
            ISessionService sessionService,
            IProductService productService,
            ILicenseeSettingService licenseeSettingService,
            IReportAPIClient reportAPIClient) : base(languageService, sessionService, productService, licenseeSettingService)
        {
            _reportAPIClient = reportAPIClient;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var userSession = SessionService.UserSession;
            var productAccess = ProductService.GetSingleWalletProductAccess(
                SessionService.LicenseeSession.LicenseeId,
                userSession.Language,
                FunctionNames.SpecialLicenseeWinLoss);

            var viewModel = new DailyBetsViewModel
            {
                CurrencyList = userSession.CurrencyList,
                ProductOptions = GetFakeProductOptions(productAccess.ProductList)
            };

            return View("~/Views/Desktop/Report/DailyBets/Index.cshtml", viewModel);
        }

        [HttpPost]
        [AutoBindMetaModel(BindAgent = true)]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Index(DailyBetsMetaModel metaModel)
        {
            var userSession = SessionService.UserSession;
            if (metaModel.IsExportExcel)
            {
                //AssignMetaModelForExcel(metaModel);
                const string FileName = "DailyBets.xls";
                var stream = await _reportAPIClient.PostByteContentAsync("api/DailyBets/ExportExcel",
                    metaModel, userSession.Language).ConfigureAwait(false);

                return File(stream, "application/octet-stream", FileName);
            }

            return JsonString(await _reportAPIClient.PostAsyncString("api/DailyBets/Index", metaModel, userSession.Language).ConfigureAwait(false));
        }

        private static IList<ProductOption> GetFakeProductOptions(IEnumerable<Product> productList)
        {
            return productList.Select(i => new ProductOption
            {
                Code = i.ProductCode,
                Name = i.ProductCode.Equals(Product.CS, StringComparison.InvariantCultureIgnoreCase) ? "RNG" : i.ProductName,
                Status = true
            }).ToList();
        }
    }
}