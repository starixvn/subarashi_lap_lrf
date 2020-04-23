namespace Fanex.Athena.Controllers.Report.Result
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using Fanex.Logging;

    [FunctionAuthorization(PermissionKeys.ReportResults)]
    public class VirtualGamesResultReportController : ReportBaseController
    {
        private readonly ILogger _logger;

        private readonly IBetListApiClient _betListApiClient;

        public VirtualGamesResultReportController(
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
            var obj = new { languageCode = SessionServiceInstance.UserSession.Language, platform = "d" };
            if (ModelState.IsValid)
            {
                var data = await _betListApiClient.PostStringAsync(
                    "/VirtualGamesResultPopup/GetResultPage",
                     obj,
                     SessionServiceInstance.UserSession.Language
                    ).ConfigureAwait(false);

                return this.Content(data, "text/html");
            }

            return this.Content(string.Empty, "text/html");
        }
    }
}