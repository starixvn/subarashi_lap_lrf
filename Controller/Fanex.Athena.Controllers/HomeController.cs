// -----------------------------------------------------------------------
// <copyright file="HomeController.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers
{
    using Fanex.Athena.Model.Auth.Enum;

    using ONEbook.UM.Filters;

    using System.Web.Mvc;

    using Web.ActionFilter;

    [CheckUMFilter]
    public class HomeController : CultureBaseController
    {
        [AuthorizeRestriction(AppMode.Self)]
        public ActionResult Index()
        {
            AssignViewBagData();
            return ReAuthorize("~/Views/Desktop/Home/Index.cshtml");
        }

        [AuthorizeRestriction(AppMode.Self)]
        public ActionResult IndexIpad()
        {
            AssignViewBagData();
            return ReAuthorize("~/Views/Desktop/Home/IndexIpad.cshtml");
        }

        /// <summary>
        /// Checking existing user in the system.
        /// </summary>
        /// <param name="defaultView">The client device (IPAD or others).</param>
        /// <returns>Redirect to sign in page or the home page.</returns>
        private ActionResult ReAuthorize(string defaultView)
        {
            if (!HttpContext.Response.IsRequestBeingRedirected)
            {
                var user = SessionServiceInstance.UserSession;
                if (user == null || user.UserId <= 0
                    || string.IsNullOrEmpty(user.UserName) || SessionServiceInstance.LicenseeSession == null)
                {
                    Session.Clear();
                    return RedirectToAction("LocationRestriction", "Utility");
                }
            }

            return View(defaultView);
        }

        private void AssignViewBagData()
        {
            var returnPath = TempData["ReturnPath"];
            var userSession = SessionServiceInstance.UserSession;
            ViewBag.DefaultReportUrl = returnPath == null ? userSession.DefaultReportUrl : returnPath.ToString();
            ViewBag.OnUserId = userSession.OnUserId;
            ViewBag.IsInternal = userSession.IsInternal ? "1" : "0";
            ViewBag.HasRecheckIn = AppSettingInstance.LocalTest ? "0" : "1";
            ViewBag.IsEnabledMoveBetNotification = AppSettingInstance.IsEnabledMoveBetNotification
                && !IsFakeLicensee(SessionServiceInstance.LicenseeSession?.LicenseeName);
        }
    }
}