namespace Fanex.Athena.Controllers
{
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using System.Web.Mvc;
    using System.Web.SessionState;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [UMFilter]
    public class NonCultureBaseController : Controller
    {
        public ISessionService SessionServiceInstance { get; set; }
    }
}