using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Fanex.Athena.Model.Auth.DataDomain;
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
    [FunctionAuthorization(PermissionKeys.ReportDailyBets)]
    public class DailyBetsReportController : ReportBaseController
    {
        private readonly IReportAPIClient _reportAPIClient;

        private readonly ILicenseeSettingService _licenseeSettingService;

        private const int DefaultLimitedMonthRange = 3;

        public DailyBetsReportController(
            ILanguageService languageService,
            ISessionService sessionService,
            IProductService productService,
            ILicenseeSettingService licenseeSettingService,
            IReportAPIClient reportAPIClient) : base(languageService, sessionService, productService, licenseeSettingService)
        {
            _reportAPIClient = reportAPIClient;
            _licenseeSettingService = licenseeSettingService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var userSession = SessionService.UserSession;
            var licenseeSetting = LicenseeSettingService.GetFakeLicenseeSetting(SessionService.LicenseeSession.LicenseeName);
            var today = licenseeSetting != null && licenseeSetting.TimeZone.HasValue ?
                DateTime.UtcNow.AddHours(licenseeSetting.TimeZone.Value) : DateTime.Now;

            var productAccess = ProductService.GetSingleWalletProductAccess(
                SessionService.LicenseeSession.LicenseeId,
                userSession.Language,
                FunctionNames.DailyBets);

            var limitedMonthRange = licenseeSetting != null ? licenseeSetting.LimitRecentMonths : DefaultLimitedMonthRange;
            var viewModel = new DailyBetsViewModel
            {
                CurrencyList = userSession.CurrencyList,
                ProductOptions = productAccess.ProductList.Select(i => new ProductOption
                {
                    Code = i.ProductCode,
                    Name = i.ProductCode.Equals(Product.CS, StringComparison.InvariantCultureIgnoreCase) ? "RNG" : i.ProductName,
                    Status = true
                }).ToList(),
                TodayByGmt8 = today,
                MinDate = today.AddMonths(-limitedMonthRange)
            };

            return View("~/Views/Desktop/Report/DailyBets/Index.cshtml", viewModel);
        }

        [HttpPost]
        [ValidationWebRequest(IsValidCurrencyList = true, IsValidProductCodeList = true, IsSingleWallet = true, FunctionConfig = FunctionNames.DailyBets, ObjectName = "metaModel")]
        [AutoBindMetaModel(BindCurrencyList = true)]
        public async Task<ActionResult> Index(DailyBetsMetaModel metaModel)
        {
            metaModel.SiteName = SessionService.LicenseeSession.LicenseeName;

            var userSession = SessionService.UserSession;
            if (metaModel.IsExportExcel)
            {
                var stream = await _reportAPIClient.PostByteContentAsync("api/DailyBets/Export",
                    metaModel, userSession.Language).ConfigureAwait(false);

                return File(stream, "application/octet-stream");
            }

            return JsonString(await _reportAPIClient.PostAsyncString("api/DailyBets/Index", metaModel, userSession.Language).ConfigureAwait(false));
        }
    }
}