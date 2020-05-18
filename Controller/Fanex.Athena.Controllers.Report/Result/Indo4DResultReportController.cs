namespace Fanex.Athena.Controllers.Report.Result
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Web.ActionFilter;

    [FunctionAuthorization(PermissionKeys.ReportResults)]
    public class Indo4DResultReportController : ReportBaseController
    {
        private readonly IBetListApiClient _betListApiClient;

        public Indo4DResultReportController(IBetListApiClient betListApiClient)
        {
            _betListApiClient = betListApiClient;
        }

        [HttpGet]
        [AjaxRequest]
        public async Task<ActionResult> Index()
        {
            var obj = new { languageCode = SessionServiceInstance.UserSession.Language };
            if (ModelState.IsValid)
            {
                var data = await _betListApiClient.PostStringAsync(
                    "/ResultIndo4DReport/GetResultUrl",
                     obj,
                     SessionServiceInstance.UserSession.Language
                    ).ConfigureAwait(false);

                return this.Content(data, "text/html");
            }

            return this.Content(string.Empty, "text/html");
        }
    }
}