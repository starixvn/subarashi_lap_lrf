using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Core.MetaModel.Product;
using Fanex.Athena.Model.Report.MetaModel;
using Fanex.Athena.Model.Report.ViewModel;
using Fanex.Athena.Service.Core.Common.Interfaces;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Controllers.Report
{
    public class DailyBetsReportController : ReportBaseController
    {
        private readonly IReportAPIClient _reportAPIClient;

        private readonly IDictionary<string, string> _siteNameList = new Dictionary<string, string>
        {
            { "IvoryBet", "ivorysport" }
        };

        public DailyBetsReportController(
            ILanguageService languageService,
            ISessionService sessionService,
            IProductService productService,
            IReportAPIClient reportAPIClient) : base(languageService, sessionService, productService)
        {
            _reportAPIClient = reportAPIClient;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var userSession = SessionService.UserSession;
            var viewModel = new DailyBetsViewModel
            {
                CurrencyList = userSession.CurrencyList,
                ProductOptions = GetProductAccess().ProductList.Select(i => new ProductOption
                {
                    Code = i.ProductCode,
                    Name = i.ProductCode.Equals(Product.CS, StringComparison.InvariantCultureIgnoreCase) ? "RNG" : i.ProductName,
                    Status = true
                }).ToList()
            };

            return View("~/Views/Desktop/Report/DailyBets/Index.cshtml", viewModel);
        }

        [HttpPost]
        public async Task<ActionResult> Index(DailyBetsMetaModel metaModel)
        {
            if (!IsValidProduct(metaModel.ProductCodes) || string.IsNullOrEmpty(metaModel.SelectedCurrency))
            {
                return JsonNet(new
                {
                    dataList = DBNull.Value,
                    total = DBNull.Value,
                    totalRows = 0
                });
            }

            var licenseeName = SessionService.LicenseeSession.LicenseeName;
            metaModel.SiteName = _siteNameList.GetValueOrDefault(licenseeName, defaultValue: licenseeName);
            metaModel.CurrencyList = GenerateCurrencyListXml(metaModel.SelectedCurrency);

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

        private string GenerateCurrencyListXml(string selectedCurrency)
        {
            var selectedCurrencyList = selectedCurrency.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            var currencyList = SessionService.UserSession.CurrencyList
               .Where(i => selectedCurrencyList.Contains(i.Key.ToString()))
               .Select(i => $"<CR Id=\"{i.Key}\" Code=\"{i.Value}\" />");

            return $"<ROOT>{string.Join("", currencyList)}</ROOT>";
        }

        private bool IsValidProduct(string selectedProduct)
        {
            if (string.IsNullOrEmpty(selectedProduct))
            {
                return false;
            }

            var selectedProductList = selectedProduct.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            var productList = GetProductAccess().ProductList.Select(x => x.ProductCode);

            return productList.Intersect(selectedProductList).Count() == selectedProductList.Count();
        }

        private ProductAccess GetProductAccess()
        {
            return ProductService.GetSingleWalletProductAccess(
                SessionService.LicenseeSession.LicenseeId,
                SessionService.UserSession.Language,
                FunctionNames.SpecialLicenseeWinLoss);
        }
    }
}