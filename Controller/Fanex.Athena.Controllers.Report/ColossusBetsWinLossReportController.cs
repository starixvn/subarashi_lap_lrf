// -----------------------------------------------------------------------
// <copyright file="ColossusBetsWinLossReportController.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Report
{
    using System;
    using System.Linq;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    using Model.Core.DataDomain;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    [FunctionAuthorization(PermissionKeys.ReportColossusBetsWinLoss)]
    public class ColossusBetsWinLossReportController : ReportBaseController
    {
        public ColossusBetsWinLossReportController(
            ILanguageService languageService,
            ISessionService sessionService,
            IProductService productService)
        : base(languageService, sessionService, productService)
        {
        }

        [HttpGet]
        public ActionResult Index()
        {
            var licenseeSession = this.SessionService.LicenseeSession;
            var userSession = SessionService.UserSession;
            var date = DateTime.Now;
            var productAccess = ProductService.GetProductAccess(licenseeSession.LicenseeId, userSession.Language);

            if (!productAccess.IsAllow(ProductTypes.ColossusBets))
            {
                return this.Redirect("~/Utility/AccessDenied");
            }

            var metaModel = new ThirdPartyWinLossMetaModel
            {
                FromDate = date,
                ToDate = date,
                ReportBy = 1,
                IsExcludedTestData = true,
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

            return View("~/Views/Desktop/Report/ColossusBetsWinLoss/Main.cshtml", model);
        }
    }
}