namespace Fanex.Athena.Controllers
{
    using DataAccess.Core.Users.Interfaces;

    using Fanex.Athena.Model.Auth.Enum;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using System.Threading.Tasks;
    using System.Web.Mvc;

    using Web.ActionFilter;

    [AuthorizeRestriction(AppMode.Self)]
    public class LicenseeListController : CultureBaseController
    {
        private readonly ILicenseeDataAccess _licenseeDataAccess;
        private readonly IInternalAuthService _authService;

        public LicenseeListController(
            ILicenseeDataAccess licenseeDataAccess,
            IInternalAuthService authService)
        {
            _licenseeDataAccess = licenseeDataAccess;
            _authService = authService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> Index(int? licenseeId)
        {
            var userSession = SessionServiceInstance.UserSession;
            if (userSession == null || userSession.UserId <= 0)
            {
                return RedirectToAction("SignIn", "Authorization");
            }

            if (licenseeId.HasValue && licenseeId.Value > 0)
            {
                return await RedirectToHome(licenseeId.Value);
            }
            else
            {
                var licenseeList = _licenseeDataAccess.GetByUser(userSession.UserId);

                if (licenseeList.Count <= 0)
                {
                    return RedirectToAction("SignIn", "Authorization");
                }

                if (licenseeList.Count == 1)
                {
                    return await RedirectToHome(licenseeList[0].Id);
                }

                ViewBag.CurrentUsername = userSession.UserName;
                ViewBag.LicenseeList = licenseeList;
            }

            return View("~/Views/Desktop/LicenseeList/Index.cshtml");
        }

        private async Task<ActionResult> RedirectToHome(int licenseeId)
        {
            var oauthInfo = await _authService.RenewOAuthInfoAsync(licenseeId, SessionServiceInstance.UserSession.AccessToken);
            if (!oauthInfo.IsError)
            {
                _authService.ReSignIn(oauthInfo);
            }

            return RedirectToAction(nameof(Index), "Home");
        }
    }
}