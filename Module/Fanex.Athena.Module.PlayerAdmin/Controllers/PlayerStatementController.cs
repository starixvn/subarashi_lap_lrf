using Fanex.Athena.Controllers;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Service.Core.Common.Interfaces;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Web.ActionFilter;
using ONEbook.UM.Filters;
using System.Web.Mvc;
using System.Web.SessionState;

namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    [FunctionAuthorization(PermissionKeys.PlayerAdminStatement)]
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