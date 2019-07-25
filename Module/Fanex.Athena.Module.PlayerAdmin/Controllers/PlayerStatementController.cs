using Fanex.Athena.Controllers;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Service.Core.Common.Interfaces;
using Fanex.Athena.Service.Core.Users.Interfaces;
using ONEbook.UM.Filters;
using System.Web.Mvc;
using System.Web.SessionState;

namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    public class PlayerStatementController : CultureBaseController
    {
        public PlayerStatementController(ILanguageService languageService,
          ISessionService sessionService
          )
       : base(languageService, sessionService)
        {

        }
    }
}
