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
        private readonly ISessionService _sessionService;

        public NonCultureBaseController(ISessionService sessionService)
        {
            _sessionService = sessionService ?? AutofacDependencyResolver.Current.GetService<ISessionService>();
        }

        public ISessionService SessionService
        {
            get { return _sessionService; }
        }
    }
}