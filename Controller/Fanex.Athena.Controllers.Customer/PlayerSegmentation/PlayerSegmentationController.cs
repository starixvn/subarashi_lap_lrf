namespace Fanex.Athena.Controllers.Customer
{
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Web.ActionFilter;
    using ONEbook.UM.Filters;
    using System.Web.Mvc;
    using System.Web.SessionState;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    [FunctionAuthorization(PermissionKeys.CustomerInfoCustomerLog)]
    public class PlayerSegmentationController : CultureBaseController
    {
        private static readonly string VIP_LIST_TEMPLATE_PATH = "~/App_Data/Template/Customers/PlayerSegmentation/VipPlayerUploadTemplate.xls";

        public PlayerSegmentationController()
        {
        }

        public ViewResult Index()
        {
            return View("~/Views/Desktop/Customer/PlayerSegmentation/Main.cshtml");
        }

        [HttpGet]
        public FileResult DowloadVipListTemplate()
        {
            var templatePath = Server.MapPath(VIP_LIST_TEMPLATE_PATH);
            return File(templatePath, "application/vnd.ms-excel", "VipPlayerList.xls");
        }
    }
}