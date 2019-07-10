// -----------------------------------------------------------------------
// <copyright file="BaseController.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers
{
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Fanex.Athena.Service.Core.Users.Interfaces;

    public class ContentBaseController : CultureBaseController
    {
        protected ContentBaseController(
           ILanguageService languageService,
           ISessionService sessionService,
           IAppSettings appSetting)
           : base(languageService, sessionService, appSetting)
        {
        }

    }
}