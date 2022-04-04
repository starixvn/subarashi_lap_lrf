namespace Fanex.Athena.Controllers.Report
{
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Auth.Enum;
    using Fanex.Athena.Web.ActionFilter;
    using System.Web.Mvc;

    [AuthorizeRestriction(AppMode.Self)]
    [FunctionAuthorization(PermissionKeys.ReportCustomerSupportTask)]
    public class CustomerSupportTaskReportController : ReportBaseController
    {
        [HttpGet]
        public ActionResult Index()
            => View("~/Views/Desktop/Report/CustomerSupportTask/Main.cshtml", SessionServiceInstance.UserSession.CurrencyList);
    }
}