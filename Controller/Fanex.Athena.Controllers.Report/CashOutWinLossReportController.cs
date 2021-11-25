// -----------------------------------------------------------------------
// <copyright file="CashOutWinLossReportController.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Report
{
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Model.Core.DataDomain;

    using System;
    using System.Linq;
    using System.Web.Mvc;

    using Web.ActionFilter;

    [FunctionAuthorization(PermissionKeys.ReportCashOutWinLoss)]
    public class CashOutWinLossReportController : ReportBaseController
    {
        private readonly ISubsidiaryService _subsidiaryService;

        public CashOutWinLossReportController(ISubsidiaryService subsidiaryService)
        {
            _subsidiaryService = subsidiaryService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var licenseeSession = this.SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;

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

            var subsidiaryList = _subsidiaryService.GetSubsidiaryTree(userSession, licenseeSession.LicenseeName);
            var viewType = !subsidiaryList.Any() ? SubsidiaryViewType.NotManagement : (SubsidiaryViewType)userSession.SubsidiaryViewType;
            var model = new CashOutWinLossViewModel
            {
                IsLicenseeOfferBA = licenseeSession.IsEnableBA,
                Param = metaModel,
                CurrencyList = userSession.CurrencyList,
                SubsidiaryList = subsidiaryList,
                ViewType = viewType
            };

            return View("~/Views/Desktop/Report/CashOutWinLoss/Main.cshtml", model);
        }
    }
}