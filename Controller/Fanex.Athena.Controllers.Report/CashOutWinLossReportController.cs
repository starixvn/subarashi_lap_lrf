// -----------------------------------------------------------------------
// <copyright file="CashOutWinLossReportController.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Report
{
    using System;
    using System.Linq;
    using System.Web.Mvc;
    using Extension.Utility;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Core.DataDomain;
    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;
    using Web.ActionFilter;

    [FunctionAuthorization(PermissionKeys.ReportCashOutWinLoss)]
    public class CashOutWinLossReportController : ReportBaseController
    {
        public CashOutWinLossReportController(
            ILanguageService languageService,
            ISessionService sessionService,
            IAppSettings appSetting,
            IProductService productService)
        : base(languageService, sessionService, appSetting, productService)
        {
        }

        [HttpGet]
        public ActionResult Index()
        {
            var licenseeSession = this.SessionService.LicenseeSession;
            var userSession = SessionService.UserSession;

            var metaModel = new ThirdPartyWinLossMetaModel
            {
                FromDate = DateTime.Now,
                ToDate = DateTime.Now,
                LicenseeId = licenseeSession.LicenseeId,
                IsExcludedTestData = true,
                ReportBy = 1,
                BaseCurrency = userSession.DefaultBaseCurrency,
                CurrencyId = SystemConstants.BaseCurrencyList
                .FirstOrDefault(x => x.Value.Equals(userSession.DefaultBaseCurrency, StringComparison.OrdinalIgnoreCase))
                .Key
            };

            var model = new CashOutWinLossViewModel
            {
                IsLicenseeOfferBA = licenseeSession.IsEnableBA,
                Param = metaModel,
                CurrencyList = userSession.CurrencyList
            };

            return View("~/Views/Desktop/Report/CashOutWinLoss/Main.cshtml", model);
        }
    }
}