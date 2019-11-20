// -----------------------------------------------------------------------
// <copyright file="ReportController.ActiveCustomer.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Report
{
    using System;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    [FunctionAuthorization(PermissionKeys.ReportActiveCustomerSummary)]
    public class ActiveCustomerSummaryReportController : ReportBaseController
    {
        [HttpGet]
        public ActionResult Index()
        {
            var licenseeSession = this.SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var productAccess = this.ProductServiceInstance.GetProductAccessForActiveCustomerSummary(licenseeSession.LicenseeId, userSession.Language);
            var defaultDate = DateTime.Now.AddDays(-1);
            var metaModel = new ActiveCustomerMetaModel
            {
                FromDate = defaultDate,
                ToDate = defaultDate,
                LicenseeId = licenseeSession.LicenseeId,
                ProductOptions = ToProductOptions(productAccess.ProductList),
                BaseCurrency = userSession.DefaultBaseCurrency
            };

            var model = new ActiveCustomerViewModel
            {
                Param = metaModel,
                CurrencyList = userSession.CurrencyList,
                IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm,
                ProductAccess = productAccess,
            };

            return View("~/Views/Desktop/Report/ActiveCustomerSummary/Main.cshtml", model);
        }
    }
}