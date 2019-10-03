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
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    public class ContentBaseController : CultureBaseController
    {
        protected ContentBaseController(
                  ILanguageService languageService,
                  ISessionService sessionService
                  ) : base(languageService, sessionService)
        {
        }

        protected ContentBaseController(
          ILanguageService languageService,
          ISessionService sessionService,
          ILicenseeSettingService licenseeSettingService
          )
          : base(languageService, sessionService, licenseeSettingService)
        {
        }

        protected ContentBaseController(
           ILanguageService languageService,
           ISessionService sessionService,
           IAppSettings appSetting,
           ILicenseeSettingService licenseeSettingService
           )
           : base(languageService, sessionService, appSetting, licenseeSettingService)
        {
        }
    }
}