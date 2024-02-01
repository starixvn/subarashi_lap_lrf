using System;
using System.Web.Mvc;
using Fanex.Athena.Extension.Helper;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Report.ViewModel;
using Fanex.Athena.Web.ActionFilter;

namespace Fanex.Athena.Controllers.Report
{
    [FunctionAuthorization(PermissionKeys.ReportDailyBetDetails)]
    public class DailyBetDetailsReportController : ReportBaseController
    {
        private const int DefaultLimitedMonthRange = 6;

        [HttpGet]
        public ActionResult Index()
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var licenseeSetting = LicenseeSettingServiceInstance.GetFakeLicenseeSetting(licenseeSession.LicenseeName);

            var today = licenseeSetting != null && licenseeSetting.TimeZone.HasValue ?
                DateTimeHelper.UtcNow.AddHours(licenseeSetting.TimeZone.Value) : DateTimeHelper.Now;
            var yesterday = today.AddDays(-1);
            var minDate = yesterday.AddMonths(-DefaultLimitedMonthRange);

            var viewModel = new DailyBetDetailsViewModel
            {
                CurrencyList = BuildCurrencyList(),
                TodayByGmt8 = yesterday,
                MinDate = minDate
            };

            return View("~/Views/Desktop/Report/DailyBetDetails/Index.cshtml", viewModel);
        }
    }
}