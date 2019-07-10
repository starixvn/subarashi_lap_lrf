using Fanex.Athena.Controllers;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Service.Core.Common.Interfaces;
using Fanex.Athena.Service.Core.Users.Interfaces;

namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    public class PlayerStatementController : CultureBaseController
    {
        public PlayerStatementController(ILanguageService languageService,
          ISessionService sessionService,
           IAppSettings appSetting
          )
       : base(languageService, sessionService, appSetting)
        {

        }
    }
}
