namespace Fanex.Athena.Controllers.Customer
{
    using System.Web.Mvc;
    using System.Web.SessionState;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [UMFilter]
    [FunctionAuthorization(PermissionKeys.PlayerReport)]
    public class CustomerAdministrationController : CultureBaseController
    {
        private readonly IAuthorizationService _authService;

        public CustomerAdministrationController(IAuthorizationService authService)
        {
            _authService = authService;
        }

        public ViewResult Index()
        {
            return View("~/Views/Desktop/Customer/CustomerAdministration/Main.cshtml");
        }
    }
}