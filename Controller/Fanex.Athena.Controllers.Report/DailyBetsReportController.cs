using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Core.MetaModel.Product;
using Fanex.Athena.Model.Report.ViewModel;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.Web.ActionFilter;

namespace Fanex.Athena.Controllers.Report
{
    [FunctionAuthorization(PermissionKeys.ReportDailyBets)]
    public class DailyBetsReportController : ReportBaseController
    {
        private const int DefaultLimitedMonthRange = 6;

        private readonly ISportService _sportService;

        public DailyBetsReportController(ISportService sportService)
        {
            _sportService = sportService;
        }

        [HttpGet]
        public async Task<ActionResult> Index()
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
            var minDate = limitedMonthRange == 0 && licenseeSetting != null ? Convert.ToDateTime(licenseeSetting.MinDate) : today.AddMonths(-limitedMonthRange);

            var siteName = SessionServiceInstance.LicenseeSession.LicenseeName;

            var productCode = String.Join(",", productAccess.ProductList.Select(p => p.ProductCode));
            var sportList = await _sportService.GetSportForProductAsync(siteName, productCode);

            var viewModel = new DailyBetsViewModel
            {
                CurrencyList = SessionServiceInstance.LicenseeSession.IsShowVND ? HardcodeVNDForFakeLicensee(userSession.CurrencyList) : userSession.CurrencyList,
                SportList = sportList,
                ProductOptions = productAccess.ProductList.Select(i => new ProductOption
                {
                    Code = i.ProductCode,
                    Name = i.ProductCode.Equals(Product.CS, StringComparison.InvariantCultureIgnoreCase) ? "RNG" : i.ProductName,
                    Status = true
                }).ToList(),
                TodayByGmt8 = today,
                MinDate = minDate
            };

            return View("~/Views/Desktop/Report/DailyBets/Index.cshtml", viewModel);
        }
    }
}