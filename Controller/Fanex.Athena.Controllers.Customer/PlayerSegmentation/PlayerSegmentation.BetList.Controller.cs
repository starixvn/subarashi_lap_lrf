namespace Fanex.Athena.Controllers.Customer
{
    using System.Web.Mvc;
    using Model.Auth.DataDomain;
    using Model.Customer.ViewModel;
    using Web.ActionFilter;

    public partial class PlayerSegmentationController
    {
        [FunctionAuthorization(PermissionKeys.PlayerVIPManagement)]
        public ViewResult BetList(int custId, string externalId, string systemId)
        {
            var viewModel = new PlayerSegmentationBetListViewModel
            {
                CustId = custId,
                ExternalId = externalId,
                SystemId = systemId,
                IsAllowedCustomerComm = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm
            };
            return View("~/Views/Desktop/Customer/PlayerSegmentation/BetList.cshtml", viewModel);
        }
    }
}