// -----------------------------------------------------------------------
// <copyright file="ReportController.AgCasinoWinLoss.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Report
{
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Web.ActionFilter;

    using Model.Core.DataDomain;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    using System;
    using System.Linq;
    using System.Web.Mvc;

    [FunctionAuthorization(PermissionKeys.ReportAGCasinoWinLoss)]
    public class AgCasinoWinLossReportController : ReportBaseController
    {
        public AgCasinoWinLossReportController(
            ILanguageService languageService,
            ISessionService sessionService)
        : base(languageService, sessionService)
        {
        }

        [HttpGet]
        public ActionResult Index()
        {
            var licenseeSession = this.SessionService.LicenseeSession;
            var userSession = SessionService.UserSession;
            var date = DateTime.Now.AddDays(-1);

            var metaModel = new ThirdPartyWinLossMetaModel
            {
                FromDate = date,
                ToDate = date,
                LicenseeId = licenseeSession.LicenseeId,
                IsExcludedTestData = true,
                ReportBy = 1,
                BaseCurrency = userSession.DefaultBaseCurrency,
                CurrencyId = SystemConstants.BaseCurrencyList
                .FirstOrDefault(x => x.Value.Equals(userSession.DefaultBaseCurrency, StringComparison.OrdinalIgnoreCase))
                .Key

            };

            var model = new ThirdPartyWinLossViewModel
            {
                Param = metaModel,
                CurrencyList = userSession.CurrencyList
            };

            return View("~/Views/Desktop/Report/AgCasinoWinLoss/Main.cshtml", model);
        }
    }
}