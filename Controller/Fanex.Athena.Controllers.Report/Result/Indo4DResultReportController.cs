namespace Fanex.Athena.Controllers.Report.Result
{
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Logging;

    using Model.Report.DTO.Result;

    using System.Threading.Tasks;
    using System.Web.Mvc;

    using Web.ActionFilter;

    [FunctionAuthorization(PermissionKeys.ReportResults)]
    public class Indo4DResultReportController : ReportBaseController
    {
         private readonly ILogger _logger;

        private readonly IBetListApiClient _betListApiClient;

        public Indo4DResultReportController(
            ILogger logger,
            IBetListApiClient betListApiClient)
        {
            _logger = logger;
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
