namespace Fanex.Athena.Controllers.Base.UnitTests
{
    using Extension.Utility;

    using Fanex.Athena.Service.Core.Common.Interfaces;

    using Service.Core.Users.Interfaces;

    internal class FakeContentBaseController : ContentBaseController
    {
        internal FakeContentBaseController(ILanguageService languageService, ISessionService sessionService)
        {
        }

    }
}