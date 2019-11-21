namespace Fanex.Athena.Controllers.Base.UnitTests
{
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    internal class FakeCultureBaseController : CultureBaseController
    {
        internal FakeCultureBaseController(ILanguageService languageService, ISessionService sessionService)
        {
            LangService = languageService;
            SessionServiceInstance = sessionService;
        }

        internal new void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
        }
    }
}