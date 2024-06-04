namespace Fanex.Athena.Controllers
{
    using System.Web.Mvc;
    using System.Web.SessionState;
    using Fanex.Athena.Model.Core;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [UMFilter]
    public class NonCultureBaseController : Controller
    {
        public ISessionService SessionServiceInstance { get; set; }

        public bool IsHideSaba => SabaHelper.IsHideSaba(SessionServiceInstance.LicenseeSession.SpecialPlatform);
    }
}