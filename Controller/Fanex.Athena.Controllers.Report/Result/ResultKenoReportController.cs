namespace Fanex.Athena.Controllers.Report.Result
{
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Web.ActionFilter;

    [FunctionAuthorization(PermissionKeys.ReportResults)]
    public class ResultKenoReportController : ReportBaseController
    {
        private readonly IBetListApiClient _betListApiClient;

        public ResultKenoReportController(IBetListApiClient betListApiClient)
        {
            _betListApiClient = betListApiClient;
        }

        [HttpGet]
        [AjaxRequest]
        public async Task<ActionResult> Index(int vendorProductId)
        {
            var userSession = SessionServiceInstance.UserSession;

            var obj = new { vendorProductId, custId = userSession.UserId.ToString(), languageCode = SessionServiceInstance.UserSession.Language, isDesktop = true };
            if (ModelState.IsValid)
            {
                var data = await _betListApiClient.PostStringAsync(
                    "/ResultKenoReport/GetResultPage",
                     obj,
                     SessionServiceInstance.UserSession.Language
                    ).ConfigureAwait(false);

                return this.Content(data, "text/html");
            }

            return this.Content(string.Empty, "text/html");
        }
    }
}