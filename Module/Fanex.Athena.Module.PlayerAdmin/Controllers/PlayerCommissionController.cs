using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;
using Fanex.Athena.Controllers;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.Helper;
using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerCommission;
using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.ViewModels.PlayerCommission;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.Web.ActionFilter;

namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    public class PlayerCommissionController : CultureBaseController
    {
        private const string AccessDeniedPath = "~/Utility/AccessDenied";
        private readonly IProductService productService;
        private readonly IPlayerCommissionService playerCommService;
        private readonly IAuthorizationService authService;
        private readonly string[] supportedProducts;

        public PlayerCommissionController(
            IProductService productService,
            IPlayerCommissionService playerCommService,
            IAuthorizationService authService)
        {
            this.productService = productService;
            this.playerCommService = playerCommService;
            this.authService = authService;

            supportedProducts = productService.GetAllowedProducts("CommissionGroups");
        }

        [HttpGet]
        [FunctionAuthorization(PermissionKeys.PlayerAdminCommissionGroup_Write)]
        public ActionResult MultipleMoveGroup(MultipleMoveGroupQuery query)
        {
            var hasPermission = CheckPermission();
            if (!hasPermission)
            {
                return Redirect(AccessDeniedPath);
            }

            AssignSessionToQuery(query);
            var groups = playerCommService.GetAllCommGroups(query);
            var viewModel = new MultipleMoveGroupViewModel(query, groups);

            return View("~/Views/Desktop/Module/PlayerAdmin/PlayerCommission/MultipleMoveGroup.cshtml", viewModel);
        }

        [HttpGet]
        [FunctionAuthorization(PermissionKeys.PlayerAdminCommissionGroup_Write)]
        public ActionResult MultipleRemoveFromGroup(MultipleRemoveFromGroupQuery query)
        {
            var hasPermission = CheckPermission();
            if (!hasPermission)
            {
                return Redirect(AccessDeniedPath);
            }

            AssignSessionToQuery(query);
            var viewModel = new MultipleRemoveFromGroupViewModel(query);

            return View("~/Views/Desktop/Module/PlayerAdmin/PlayerCommission/MultipleRemoveFromGroup.cshtml", viewModel);
        }

        [HttpGet]
        [FunctionAuthorization(PermissionKeys.PlayerAdminCommissionGroup_Write)]
        public ActionResult MultipleUpdateGroup(MultipleUpdateGroupQuery query)
        {
            var hasPermission = CheckPermission();
            if (!hasPermission)
            {
                return Redirect(AccessDeniedPath);
            }

            AssignSessionToQuery(query);
            var viewModel = new MultipleUpdateGroupViewModel(query);
            return View("~/Views/Desktop/Module/PlayerAdmin/PlayerCommission/MultipleUpdateGroup.cshtml", viewModel);
        }

        [HttpGet]
        [FunctionAuthorization(PermissionKeys.PlayerAdminCommissionGroup)]
        public ActionResult SingleMoveGroup(SingleMoveGroupQuery query)
        {
            var hasPermission = CheckPermission();
            if (!hasPermission)
            {
                return Redirect(AccessDeniedPath);
            }

            AssignSessionToQuery(query);
            var groups = playerCommService.GetAllCommGroups(query);
            var currentGroup = playerCommService.GetPlayerCommissionGroup(query);
            var hasCommPermissionWrite = authService.HasPermissions(SessionServiceInstance.UserSession, PermissionKeys.PlayerAdminCommissionGroup_Write);

            var viewModel = new SingleMoveGroupViewModel(query, groups, currentGroup, hasCommPermissionWrite);
            return View("~/Views/Desktop/Module/PlayerAdmin/PlayerCommission/SingleMoveGroup.cshtml", viewModel);
        }

        [HttpGet]
        [FunctionAuthorization(PermissionKeys.PlayerAdminCommissionGroup_Write)]
        public ActionResult SingleRemoveFromGroup(SingleRemoveFromGroupQuery query)
        {
            var hasPermission = CheckPermission();
            if (!hasPermission)
            {
                return Redirect(AccessDeniedPath);
            }

            query.CustIds = query.CustId.ToString();
            AssignSessionToQuery(query);
            var viewModel = new MultipleRemoveFromGroupViewModel(query);

            return View("~/Views/Desktop/Module/PlayerAdmin/PlayerCommission/SingleRemoveFromGroup.cshtml", viewModel);
        }

        [HttpGet]
        [FunctionAuthorization(PermissionKeys.PlayerAdminCommissionGroup_Write)]
        public ActionResult SingleUpdateGroup(SingleUpdateGroupQuery query)
        {
            var hasPermission = CheckPermission();
            if (!hasPermission)
            {
                return Redirect(AccessDeniedPath);
            }

            AssignSessionToQuery(query);
            var groups = playerCommService.GetAllCommGroups(query);
            var currentGroup = playerCommService.GetPlayerCommissionGroup(query);
            var viewModel = new SingleMoveGroupViewModel(query, groups, currentGroup, true);
            return View("~/Views/Desktop/Module/PlayerAdmin/PlayerCommission/SingleUpdateGroup.cshtml", viewModel);
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        [FunctionAuthorization(PermissionKeys.PlayerAdminCommissionGroup_Write)]
        public async Task<ActionResult> PostMultipleMoveGroup(MultipleMoveGroupQuery query)
        {
            var hasPermission = CheckPermission();
            if (!hasPermission)
            {
                return Redirect(AccessDeniedPath);
            }

            if (!query.IsValid())
            {
                return Json(new { IsSuccessful = false });
            }

            AssignSessionToQuery(query);
            var result = await playerCommService.MultipleMoveGroup(query);
            return Json(result);
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        [FunctionAuthorization(PermissionKeys.PlayerAdminCommissionGroup_Write)]
        public async Task<ActionResult> PostMultipleRemoveFromGroup(MultipleRemoveFromGroupQuery query)
        {
            var hasPermission = CheckPermission();
            if (!hasPermission)
            {
                return Redirect(AccessDeniedPath);
            }

            if (!query.IsValid())
            {
                return Json(new { IsSuccessful = false });
            }

            AssignSessionToQuery(query);
            var result = await playerCommService.MultipleRemoveFromGroup(query);

            return Json(result);
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        [FunctionAuthorization(PermissionKeys.PlayerAdminCommissionGroup_Write)]
        public async Task<ActionResult> PostMultipleUpdateGroup(MultipleUpdateGroupQuery query)
        {
            var hasPermission = CheckPermission();
            if (!hasPermission)
            {
                return Redirect(AccessDeniedPath);
            }

            if (!query.IsValid())
            {
                return Json(new { IsSuccessful = false });
            }

            AssignSessionToQuery(query);
            var result = await playerCommService.MultipleUpdateGroup(query);

            return Json(result);
        }

        private bool CheckPermission()
            => SessionServiceInstance.UserSession.UserLevel != UserLevelType.Subsidiary;

        private IDictionary<string, bool> GetProductPermissions()
        {
            var licenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;
            var productAccess = productService.GetProductAccess(licenseeId, SessionServiceInstance.UserSession.Language);
            return CommissionGroupHelper.GetProductPermissions(supportedProducts, productAccess);
        }

        private void AssignSessionToQuery(BasePlayerCommissionUpdateQuery query)
        {
            var licenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;
            var userSession = SessionServiceInstance.UserSession;
            query.LicenseeId = licenseeId;
            query.UserId = userSession.UserId;
            query.IP = Request?.UserHostAddress ?? string.Empty;
            query.Language = userSession.Language;
            query.Username = userSession.UserName;
            query.Permissions = GetProductPermissions();
        }
    }
}
