using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Fanex.Athena.Controllers;
using Fanex.Athena.DataAccess.Core.Users.Interfaces;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerBatchUpdate;
using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.ViewModels.PlayerBatchUpdate;
using Fanex.Athena.Resources;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.Web.ActionFilter;

namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    public class PlayerBatchUpdateController : CultureBaseController
    {
        private readonly IPlayerBatchUpdateService service;
        private readonly IProductService productService;
        private readonly IAuthorizationService authorizationService;
        private readonly ILicenseeDataAccess licenseeDataAccess;
        private readonly IAppSettings appSettings;

        public PlayerBatchUpdateController(
            IPlayerBatchUpdateService service,
            IProductService productService,
            IAuthorizationService authorizationService,
            ILicenseeDataAccess licenseeDataAccess,
            IAppSettings appSettings)
        {
            this.service = service;
            this.productService = productService;
            this.authorizationService = authorizationService;
            this.licenseeDataAccess = licenseeDataAccess;
            this.appSettings = appSettings;
        }

        [HttpGet]
        public ActionResult UpdateAccountStatus(BasePlayerBatchUpdateQuery query)
        {
            query.AssignSession(SessionServiceInstance, Request);
            var viewModel = new BasePlayerBatchUpdateViewModel(query);

            return View("~/Views/Desktop/Module/PlayerAdmin/PlayerBatchUpdate/UpdateAccountStatus.cshtml", viewModel);
        }

        [HttpGet]
        public ActionResult UpdateBetLimit(BasePlayerBatchUpdateQuery query)
        {
            query.AssignSession(SessionServiceInstance, Request);
            var viewModel = new BasePlayerBatchUpdateViewModel(query);

            return View("~/Views/Desktop/Module/PlayerAdmin/PlayerBatchUpdate/UpdateBetLimit.cshtml", viewModel);
        }

        [HttpGet]
        public ActionResult UpdateSpecialLevel(BasePlayerBatchUpdateQuery query)
        {
            query.AssignSession(SessionServiceInstance, Request);
            var viewModel = new BasePlayerBatchUpdateViewModel(query);

            return View("~/Views/Desktop/Module/PlayerAdmin/PlayerBatchUpdate/UpdateSpecialLevel.cshtml", viewModel);
        }

        [HttpGet]
        public ActionResult UpdateOddsGroup(BasePlayerBatchUpdateQuery query)
        {
            query.AssignSession(SessionServiceInstance, Request);
            var viewModel = new UpdateOddsGroupViewModel(query);

            return View("~/Views/Desktop/Module/PlayerAdmin/PlayerBatchUpdate/UpdateOddsGroup.cshtml", viewModel);
        }

        [HttpGet]
        public ActionResult UpdateBAStatus(BasePlayerBatchUpdateQuery query)
        {
            query.AssignSession(SessionServiceInstance, Request);
            var viewModel = new BasePlayerBatchUpdateViewModel(query);

            return View("~/Views/Desktop/Module/PlayerAdmin/PlayerBatchUpdate/UpdateBAStatus.cshtml", viewModel);
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        [FunctionAuthorization(PermissionKeys.PlayerAdminUpdateSpecialLevel)]
        public async Task<ActionResult> UpdateSpecialLevel(UpdateSpecialLevelQuery query)
        {
            if (!query.IsValid())
            {
                return Json(new { IsSuccessful = false });
            }

            query.AssignSession(SessionServiceInstance, Request);
            var result = await service.UpdateSpecialLevel(query);
            return Json(result);
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        [FunctionAuthorization(PermissionKeys.PlayerAdminUpdateOddsGroup)]
        public async Task<ActionResult> UpdateOddsGroup(UpdateOddsGroupQuery query)
        {
            if (!query.IsValid())
            {
                return Json(new { IsSuccessful = false });
            }

            query.AssignSession(SessionServiceInstance, Request);
            var result = await service.UpdateOddsGroup(query);
            return Json(result);
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        [FunctionAuthorization(PermissionKeys.PlayerAdminUpdateBaStatus)]
        public async Task<ActionResult> UpdateBAStatus(UpdateBAStatusQuery query)
        {
            if (!query.IsValid())
            {
                return Json(new { IsSuccessful = false });
            }

            var productAccess = productService.GetProductAccess(query.LicenseeId, query.Language);
            if (!productAccess.IsAllowBA)
            {
                return Json(new { IsSuccessful = false, Message = ViewResources.NotAllowBA });
            }

            query.AssignSession(SessionServiceInstance, Request);
            query.VendorId = SessionServiceInstance.UserSession.VendorID;
            query.LicenseeName = SessionServiceInstance.LicenseeSession.LicenseeName;

            var isAllowUpdateBA = IsAllowUpdateBA();
            if (!isAllowUpdateBA)
            {
                return Json(new
                {
                    IsSuccessful = true,
                    Code = 2,
                    Message = ViewResources.MessageLimitTimeUpdateBA
                });
            }

            var result = await service.UpdateBAStatus(query);
            return Json(result);
        }

        private bool IsAllowUpdateBA()
        {
            var specialBAAdmins = (appSettings.GetValue("SpecialBAAdmins") ?? string.Empty)
                .Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            var specialBaPermission = specialBAAdmins.Any(s => string.Equals(s, SessionServiceInstance.UserSession.UserName, StringComparison.OrdinalIgnoreCase));
            if (specialBaPermission)
            {
                return true;
            }

            var isAllowUpdateBaResult = licenseeDataAccess.IsAllowUpdateMemberBAStatus(SessionServiceInstance.UserSession.Language, SessionServiceInstance.LicenseeSession.LicenseeId);
            var isAllowUpdateBa = isAllowUpdateBaResult.ExtendedData;
            if (isAllowUpdateBa)
            {
                return true;
            }

            return false;
        }
    }
}
