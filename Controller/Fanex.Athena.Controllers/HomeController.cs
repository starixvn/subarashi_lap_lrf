namespace Fanex.Athena.Controllers
{
    using System;
    using System.Net.Http;
    using System.Text;
    using System.Web.Mvc;
    using System.Web.UI;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Auth.Enum;
    using Web.ActionFilter;

    [UMFilter]
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

        [AllowAnonymous]
        public ActionResult WhoAmI()
        {
            var builder = new StringBuilder();
            builder.AppendLine($"Client IP: {ClientHelper.GetClientIp(Request)}");
            return Content(builder.ToString(), "text/plain", Encoding.UTF8);
        }

        [HttpGet]
        [OutputCache(NoStore = true, Location = OutputCacheLocation.None, Duration = 0, VaryByParam = "*")]
        public ContentResult Token()
        {
            var fromReferer = Request.Headers["Referer"];
            if (string.IsNullOrEmpty(fromReferer) || !string.Equals(Request.Url.Host, new Uri(fromReferer).Host, StringComparison.InvariantCultureIgnoreCase))
            {
                return Content($"Request is invalid from {fromReferer} to {Request.Url.Host}", "application/javascript", Encoding.UTF8);
            }

            const string tokenCheckingContent = "function getTopSameOriginWindow(e){try{e.name}catch(n){return getTopSameOriginWindow(e.frames[0])}return e}"
             + "var topSameOriginWindow=getTopSameOriginWindow(top);topSameOriginWindow.lrf={access_token:'<0>'};";
            var content = tokenCheckingContent.Replace("<0>", SessionServiceInstance.UserSession.AccessToken);

            return Content(content, "application/javascript", Encoding.UTF8);
        }

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

            if (SessionServiceInstance.UserSession.AccessTokenLifeTime <= DateTimeHelper.Now)
            {
                return RedirectToAction("LocationRestriction", "Utility");
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
        }
    }
}