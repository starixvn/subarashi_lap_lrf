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
    public class ResultKenoReportController : ReportBaseController
    {
        private readonly ILogger _logger;

        private readonly IBetListApiClient _betListApiClient;

        public ResultKenoReportController(
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
            var userSession = SessionServiceInstance.UserSession;
            var model = new
            {
                vendorProductId,
                UserId = userSession.UserId.ToString()
            };
            var kenoUrl = await _betListApiClient.PostStringAsync("/ResultKenoReport/GetKenoResultUrl",
                model, userSession.Language).ConfigureAwait(false);

            return Json(
                new
                {
                    Url = kenoUrl,
                    userSession.UserId
                },
            JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        public async Task<string> KeepSession(string userId, int vendorProductId)
        {
            var userSession = SessionServiceInstance.UserSession;
            if (string.IsNullOrEmpty(userId) || !userSession.UserId.ToString().Equals(userId))
            {
                _logger.Error("Keno Result page just submited invalid userId");

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