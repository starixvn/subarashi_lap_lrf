using System.Web.Mvc;
using System.Web.SessionState;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Web.ActionFilter;

namespace Fanex.Athena.Controllers.Customer
{
    [SessionState(SessionStateBehavior.ReadOnly)]
    [UMFilter]
    [FunctionAuthorization(PermissionKeys.PlayerReport)]
    public class CustomerAdministrationController : CultureBaseController
    {
        public ViewResult Index()
        {
            return View("~/Views/Desktop/Customer/CustomerAdministration/Main.cshtml");
        }
    }
}