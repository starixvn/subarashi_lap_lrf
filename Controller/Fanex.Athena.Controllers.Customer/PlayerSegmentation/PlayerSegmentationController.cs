namespace Fanex.Athena.Controllers.Customer
{
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Customer.ViewModel;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Web.ActionFilter;
    using ONEbook.UM.Filters;
    using System.Collections.Generic;
    using System.Web.Mvc;
    using System.Web.SessionState;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    public class PlayerSegmentationController : CultureBaseController
    {
        private static readonly string VIP_LIST_TEMPLATE_PATH = "~/App_Data/Template/Customers/PlayerSegmentation/VipPlayerUploadTemplate.xls";

        public PlayerSegmentationController()
        {
        }

        public ViewResult Index()
        {
            var currencyList = SessionServiceInstance.UserSession.CurrencyList;
            var model = new PlayerSegmentationViewModel
            {
                ProblemPlayerVM = new ProblemPlayerViewModel
                {
                    CurrencyList = currencyList,
                },
                VipPlayerVM = new VipPlayerViewModel
                {
                    CurrencyList = currencyList,
                    VipOptions = GetVipOptions()
                }
            };

            return View("~/Views/Desktop/Customer/PlayerSegmentation/Main.cshtml", model);
        }

        [HttpGet]
        public FileResult DowloadVipListTemplate()
        {
            var templatePath = Server.MapPath(VIP_LIST_TEMPLATE_PATH);
            return File(templatePath, "application/vnd.ms-excel", "VipPlayerList.xls");
        }

        private static IDictionary<int, string> GetVipOptions()
        {
            return new Dictionary<int, string>
            {
                { 0, ViewResources.All },
                { 1, ViewResources.Yes },
                { 2, ViewResources.No },
            };
        }
    }
}