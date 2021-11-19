// -----------------------------------------------------------------------
// <copyright file="ColossusBetsWinLossReportController.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Report
{
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    using Model.Core.DataDomain;

    using System;
    using System.Linq;
    using System.Web.Mvc;

    [FunctionAuthorization(PermissionKeys.ReportColossusBetsWinLoss)]
    public class ColossusBetsWinLossReportController : ReportBaseController
    {
        private readonly ISubsidiaryService _subsidiaryService;

        public ColossusBetsWinLossReportController(ISubsidiaryService subsidiaryService)
        {
            _subsidiaryService = subsidiaryService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var licenseeSession = this.SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var date = DateTime.Now;
            var productAccess = ProductServiceInstance.GetProductAccess(licenseeSession.LicenseeId, userSession.Language);

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

            var subsidiaryList = _subsidiaryService.GetSubsidiaryTree(userSession, licenseeSession.LicenseeName);
            var viewType = !subsidiaryList.Any() ? SubsidiaryViewType.NotManagement : (SubsidiaryViewType)userSession.SubsidiaryViewType;
            var model = new ThirdPartyWinLossViewModel
            {
                Param = metaModel,
                CurrencyList = userSession.CurrencyList,
                SubsidiaryList = subsidiaryList,
                ViewType = viewType
            };

            return View("~/Views/Desktop/Report/ColossusBetsWinLoss/Main.cshtml", model);
        }
    }
}