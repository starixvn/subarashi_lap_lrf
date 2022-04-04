namespace Fanex.Athena.Controllers
{
    using Fanex.Athena.Model.Auth.Enum;

    using ONEbook.UM.Filters;
    using System.Text;
    using System.Web.Mvc;
    using System.Web.UI;
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

        [HttpGet]
        [OutputCache(NoStore = true, Location = OutputCacheLocation.None, Duration = 0, VaryByParam = "*")]
        public ContentResult Checking()
        {
            var content = new StringBuilder();

            BuildTokenCheckingScript(content);
            if (SessionServiceInstance.UserSession.ApplicationMode == AppMode.Parasitic)
            {
                BuildSessionCheckingScript(content);
            }

            return new ContentResult
            {
                Content = content.ToString(),
                ContentEncoding = Encoding.UTF8,
                ContentType = "application/javascript"
            };
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

        private void BuildTokenCheckingScript(StringBuilder content)
        {
            const string tokenCheckingContent = "function getTopSameOriginWindow(e){try{e.name}catch(n){return getTopSameOriginWindow(e.frames[0])}return e}"
             + "var topSameOriginWindow=getTopSameOriginWindow(top);topSameOriginWindow.lrf={access_token:'<0>'};";
            content.Append(tokenCheckingContent.Replace("<0>", SessionServiceInstance.UserSession.AccessToken));
        }

        private void BuildSessionCheckingScript(StringBuilder content)
        {
            const string sessionCheckingContent = "function getJSON(e,t){var n=new XMLHttpRequest;n.open('GET',e,!0),n.onreadystatechange=function()" +
               "{if(4==n.readyState&&200==n.status&&'function'==typeof t){var e=JSON.parse(n.responseText);t(e)}},n.send(null)}window.onload=function(){" +
               "var n='<0>',e='<1>',t='<2>';setInterval(function(){getJSON(n,function(n){n.IsUM===!0?document.location.href=t:n.IsAuthenticated===!1?document.location.href=e:" +
               "n.AccessToken&&window.topSameOriginWindow?.lrf&&(window.topSameOriginWindow.lrf.access_token=n.AccessToken)})},3e4)}";

            content.Append(sessionCheckingContent.Replace("<0>", Url.Content($"~/Utility/SessionIsAlive?identityName={User.Identity.Name}"))
                .Replace("<1>", Url.Content("~/Authorization/InternalSignOut"))
                .Replace("<2>", Url.Content("~/Utility/UnderMaintenance")));
        }
    }
}