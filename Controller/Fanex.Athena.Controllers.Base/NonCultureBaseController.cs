namespace Fanex.Athena.Controllers
{
    using Fanex.Athena.Service.Core.Users.Interfaces;

    using ONEbook.UM.Filters;

    using System.Web.Mvc;
    using System.Web.SessionState;

    using Web.ActionFilter;

    [CustomAuthorize]
    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    public class NonCultureBaseController : Controller
    {
        public ISessionService SessionServiceInstance { get; set; }
    }
}