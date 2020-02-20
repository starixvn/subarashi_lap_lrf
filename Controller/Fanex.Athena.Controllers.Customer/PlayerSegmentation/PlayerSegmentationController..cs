using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Web.ActionFilter;
using ONEbook.UM.Filters;
using System.Web.Mvc;
using System.Web.SessionState;

namespace Fanex.Athena.Controllers.Customer.PlayerSegmentation
{
    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    [FunctionAuthorization(PermissionKeys.CustomerInfoCustomerLog)]
    public partial class PlayerSegmentationController : CultureBaseController
    {
        public PlayerSegmentationController()
        {
        }

        public ViewResult Index()
        {
            return View("~/Views/Desktop/Customer/PlayerSegmentation/Main.cshtml");
        }
    }
}