// --------------------------------------------------------------------------
// <copyright file="AgCasinoBetSettingController.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Controllers.BetSettings
{
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    using Model.BetSettings.MetaModel;
    using Model.Core.DataDomain;

    using Resources;

    using Service.BetSettings.Interfaces;

    using System.Threading.Tasks;
    using System.Web.Mvc;

    public class AgCasinoBetSettingController : BetSettingBaseController
    {
        private readonly IAgCasinoBetSettingService _betSettingService;

        public AgCasinoBetSettingController(
            ICoreBetSettingService coreBetSettingService,
            IProductService productService,
            IAgCasinoBetSettingService betSettingService
            )
        : base(coreBetSettingService, productService)
        {
            _betSettingService = betSettingService;
        }

        [HttpGet]
        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        [ValidatePermissionOnData(isObject: true)]
        public async Task<ActionResult> Index(BetSettingMetaModel metaModel)
        {
            var viewModel = await _betSettingService.GetViewModelAsync(metaModel.CustId, SessionServiceInstance.LicenseeSession.LicenseeName);

            await AssignRequiredPropertiesAsync(viewModel, metaModel).ConfigureAwait(false);
            return View("~/Views/Desktop/Customer/BetSetting/AgCasino.cshtml", viewModel);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidatePermissionOnData]
        public async Task<JsonResult> UpdateStatus(int custId, string nickName, int status)
        {
            var userSession = SessionServiceInstance.UserSession;

            if (!CheckPermission(userSession, ProductTypes.AgCasino))
            {
                return AccessDenied();
            }

            var result = await _betSettingService.UpdateStatusAsync(
                userSession.UserId,
                custId,
                userSession.Language,
                Request.UserHostAddress,
                status == 1).ConfigureAwait(false);

            if (result.Code == 0)
            {
                result.Message = string.Format(ViewResources.UpdateSuccess, nickName);
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidatePermissionOnData]
        public async Task<JsonResult> UpdateBetSetting(string nickName, string group)
        {
            var userSession = SessionServiceInstance.UserSession;
            var licenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;

            if (!CheckPermission(userSession, ProductTypes.AgCasino))
            {
                return AccessDenied();
            }

            var setting = GetBetSettingCommonParam(userSession.UserId, licenseeId, userSession.Language);
            var result = await _betSettingService.UpdateAgCasinoBetSettingAsync(setting, group);

            if (result.Code == 0)
            {
                result.Message = string.Format(ViewResources.UpdateAgCasinoBetSettingSuccessMsg, nickName);
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}