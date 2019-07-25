using Fanex.Athena.Controllers;
using Fanex.Athena.Service.Core.Common.Interfaces;
using Fanex.Athena.Service.Core.Users.Interfaces;

using ONEbook.UM.Filters;

using System.Web.Mvc;
using System.Web.SessionState;

namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    /// <summary>
    /// Iframe function support both single & batch
    /// </summary>
    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    public class BetLimitController : CultureBaseController
    {
        public BetLimitController(ILanguageService languageService,
           ISessionService sessionService
           )
        : base(languageService, sessionService)
        {

        }


    }
}
