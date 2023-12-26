using System;
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
            var licenseeName = SessionServiceInstance.LicenseeSession.LicenseeName;

            if (string.Equals(licenseeName, "IvoryBet", StringComparison.InvariantCultureIgnoreCase))
            {
                return View("~/Views/Desktop/Customer/CustomerAdministration/MainIvoryBet.cshtml");
            }

            return View("~/Views/Desktop/Customer/CustomerAdministration/Main.cshtml");
        }
    }
}