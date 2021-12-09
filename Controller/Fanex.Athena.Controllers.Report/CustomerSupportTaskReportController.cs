namespace Fanex.Athena.Controllers.Report
{
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Auth.Enum;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using System.Threading.Tasks;
    using System.Web.Mvc;

    [AuthorizeRestriction(AppMode.Self)]
    [FunctionAuthorization(PermissionKeys.ReportCustomerSupportTask)]
    public class CustomerSupportTaskReportController : ReportBaseController
    {
        private readonly IReportAPIClient _reportAPIClient;

        public CustomerSupportTaskReportController(IReportAPIClient reportAPIClient)
        {
            _reportAPIClient = reportAPIClient;
        }

        [HttpGet]
        public ActionResult Index()
            => View("~/Views/Desktop/Report/CustomerSupportTask/Main.cshtml", SessionServiceInstance.UserSession.CurrencyList);

        [HttpPost]
        [AutoBindMetaModel(BindAgent = true)]
        [ValidationWebRequest(IsValidCurrencyList = true)]
        public async Task<ActionResult> ExportExcel(CustomerSupportTaskMetaModel metaModel)
        {
            var userSession = SessionServiceInstance.UserSession;
            var httpResponse = await _reportAPIClient.PostAsync("Api/CustomerSupportTask/ExportExcel",
                metaModel, userSession.Language).ConfigureAwait(false);

            return File(httpResponse.Item1, httpResponse.Item2);
        }
    }
}