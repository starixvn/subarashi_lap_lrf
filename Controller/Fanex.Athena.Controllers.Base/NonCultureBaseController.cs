namespace Fanex.Athena.Controllers
{
    using System.Web.Mvc;
    using System.Web.SessionState;

    using Autofac.Integration.Mvc;

    using Fanex.Athena.Service.Core.Users.Interfaces;

    using ONEbook.UM.Filters;

    using Web.ActionFilter;

    [CustomAuthorize]
    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    public class NonCultureBaseController : Controller
    {
        public ISessionService SessionServiceInstance { get; set; }
    }
}