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
        public async Task<ActionResult> Index(int vendorProductId)
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

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        public async Task<string> KeepSession(string userId, int vendorProductId)
        {
            var userSession = SessionServiceInstance.UserSession;
            if (string.IsNullOrEmpty(userId) || !userSession.UserId.ToString().Equals(userId))
            {
                _logger.Error("Indo 4D Result page just submited invalid userId");

                return Url.Action("AccessDenied", "Utility", null, Request.Url.Scheme);
            }

            var model = new
            {
                VendorProductId = vendorProductId,
                UserId = userId
            };

            var result = await _betListApiClient.PostAsync<KenoExtendedToken>("/ResultKenoReport/KeepSession",
                model, userSession.Language).ConfigureAwait(false);

            if (result.ErrorCode > 0)
            {
                _logger.Info($"Keno Session: {result.ErrorMsg}"
                    + $"\nError Code: {result.ErrorCode}"
                    + $"\nUser Name: {userSession.UserName}"
                    + $"\nProduct Id: {vendorProductId}");
                return Url.Action("AccessDenied", "Utility", null, Request.Url.Scheme);
            }

            return string.Empty;
        }
    }
}
