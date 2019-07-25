using Fanex.Athena.Controllers;
using Fanex.Athena.Service.Core.Common.Interfaces;
using Fanex.Athena.Service.Core.Users.Interfaces;

using ONEbook.UM.Filters;

using System.Web.Mvc;
using System.Web.SessionState;

namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{

    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    public class PlayerRunningBetlistController: CultureBaseController
    {
        public PlayerRunningBetlistController(ILanguageService languageService,
         ISessionService sessionService
         )
      : base(languageService, sessionService)
        {

        }
    }
}
