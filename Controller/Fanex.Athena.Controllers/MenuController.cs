// -----------------------------------------------------------------------
// <copyright file="MenuController.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers
{
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Auth.Enum;
    using Fanex.Athena.Model.Core.ViewModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using System.Linq;
    using System.Web.Mvc;

    using Web.ActionFilter;

    [AuthorizeRestriction(AppMode.Self)]
    public class MenuController : CultureBaseController
    {
        private readonly IFunctionService _functionService;

        public MenuController(
            IFunctionService functionService
            )
        {
            _functionService = functionService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var userSession = SessionServiceInstance.UserSession;
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var systemFunctions = userSession.FunctionList;

            var canManageMember = userSession.FunctionList.Any(x => x.FunctionKey == PermissionKeys.CustomerInfoCustomerList);

            var viewModel = new MenuViewModel
            {
                UserFunctions = _functionService.Functions.Where(i => systemFunctions.Any(x => x.FunctionKey == i.FunctionKey)).ToList(),
                IsAllowedCustonmerCommission = licenseeSession.IsAllowedCustomerComm,
                IsInternalLogin = userSession.IsInternal,
                IsAllowedManagementMember = canManageMember,
                IsFakeLicensee = IsFakeLicensee(licenseeSession.LicenseeName)
            };

            viewModel.MasterFunctions = _functionService.GetMasterFunctions(viewModel.UserFunctions);
            viewModel.UserDetailFunctions = _functionService.GetSubMenus(viewModel.UserFunctions);

            return View("~/Views/Desktop/Menu/Index.cshtml", viewModel);
        }
    }
}