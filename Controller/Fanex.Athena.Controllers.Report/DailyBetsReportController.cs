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
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.Web.ActionFilter;

namespace Fanex.Athena.Controllers.Report
{
    [FunctionAuthorization(PermissionKeys.ReportDailyBets)]
    public class DailyBetsReportController : ReportBaseController
    {
        private readonly IReportAPIClient _reportAPIClient;

        private const int DefaultLimitedMonthRange = 3;

        public DailyBetsReportController(
            IReportAPIClient reportAPIClient)
        {
            _reportAPIClient = reportAPIClient;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var userSession = SessionServiceInstance.UserSession;
            var licenseeSetting = LicenseeSettingServiceInstance.GetFakeLicenseeSetting(SessionServiceInstance.LicenseeSession.LicenseeName);
            var today = licenseeSetting != null && licenseeSetting.TimeZone.HasValue ?
                DateTime.UtcNow.AddHours(licenseeSetting.TimeZone.Value) : DateTime.Now;

            var productAccess = ProductServiceInstance.GetSingleWalletProductAccess(
                SessionServiceInstance.LicenseeSession.LicenseeId,
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
            metaModel.SiteName = SessionServiceInstance.LicenseeSession.LicenseeName;

            var userSession = SessionServiceInstance.UserSession;
            if (metaModel.IsExportExcel)
            {
                var httpResponse = await _reportAPIClient.PostAsync("api/DailyBets/Export",
                    metaModel, userSession.Language).ConfigureAwait(false);

                return File(httpResponse.Item1, httpResponse.Item2);
            }

            return JsonString(await _reportAPIClient.PostStringAsync("api/DailyBets/Index", metaModel, userSession.Language).ConfigureAwait(false));
        }
    }
}