namespace Fanex.Athena.Controllers.Customer
{
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Customer.ViewModel;
    using Fanex.Athena.Web.ActionFilter;
    using System.Web.Mvc;

    public partial class PlayerSegmentationController
    {
        [FunctionAuthorization(PermissionKeys.PlayerProblemManagement, PermissionKeys.PlayerVIPManagement)]
        public ViewResult BetList(int custId, string externalId, string systemId, string baseCurrency)
        {
            var viewModel = new PlayerSegmentationBetListViewModel
            {
                CustId = custId,
                BaseCurrency = baseCurrency,
                ExternalId = externalId,
                SystemId = systemId,
                IsAllowedCustomerComm = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm,
            };
            return View("~/Views/Desktop/Customer/PlayerSegmentation/BetList.cshtml", viewModel);
        }
    }
}