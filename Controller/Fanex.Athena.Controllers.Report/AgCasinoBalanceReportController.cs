// -----------------------------------------------------------------------
// <copyright file="ReportController.AgCasinoWinLoss.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Report
{
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Web.ActionFilter;

    using Model.Core.DataDomain;

    using System;
    using System.Linq;
    using System.Web.Mvc;

    [FunctionAuthorization(PermissionKeys.ReportAGCasinoBalance)]
    public class AgCasinoBalanceReportController : ReportBaseController
    {
        [HttpGet]
        public ActionResult Index()
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var toDate = DateTime.Now.AddDays(-2);

            var metaModel = new ThirdPartyWinLossMetaModel
            {
                FromDate = new DateTime(toDate.Year, toDate.Month, 1),
                ToDate = toDate,
                LicenseeId = licenseeSession.LicenseeId,
                IsExcludedTestData = true,
                BaseCurrency = userSession.DefaultBaseCurrency,
                CurrencyId = SystemConstants.BaseCurrencyList
                .FirstOrDefault(x => x.Value.Equals(userSession.DefaultBaseCurrency, StringComparison.OrdinalIgnoreCase))
                .Key
            };

            var model = new AgCasinoBalanceViewModel
            {
                Param = metaModel,
                CurrencyList = userSession.CurrencyList
            };

            return View("~/Views/Report/AgCasinoBalance/Main.cshtml", model);
        }
    }
}