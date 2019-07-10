using Fanex.Athena.Controllers;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Service.Core.Common.Interfaces;
using Fanex.Athena.Service.Core.Users.Interfaces;

namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    /// <summary>
    /// Iframe function support both single & batch
    /// </summary>
    public class BetLimitController : CultureBaseController
    {
        public BetLimitController(ILanguageService languageService,
           ISessionService sessionService,
            IAppSettings appSetting
           )
        : base(languageService, sessionService, appSetting)
        {

        }


    }
}
