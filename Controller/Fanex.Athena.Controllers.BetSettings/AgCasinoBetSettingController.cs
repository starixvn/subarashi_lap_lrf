// --------------------------------------------------------------------------
// <copyright file="AgCasinoBetSettingController.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Controllers.BetSettings
{
    using System.Threading.Tasks;
    using System.Web.Mvc;

    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    using Model.BetSettings.MetaModel;
    using Model.Core.DataDomain;

    using Resources;

    using Service.BetSettings.Interfaces;
    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    public class AgCasinoBetSettingController : BetSettingBaseController
    {
        private readonly IAgCasinoBetSettingService _betSettingService;
        private readonly IAuthorizationService _authorizationService;
        public AgCasinoBetSettingController(
            ILanguageService languageService,
            ISessionService sessionService,
            ICoreBetSettingService coreBetSettingService,
            IProductService productService,
            IAgCasinoBetSettingService betSettingService,
             ILicenseeSettingService licenseeSettingService,
            IAuthorizationService authorizationService
            )
        : base(languageService, sessionService, coreBetSettingService, productService, licenseeSettingService)
        {
            _betSettingService = betSettingService;
            _authorizationService = authorizationService;
        }

        [HttpGet]
        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public async Task<ActionResult> Index(BetSettingMetaModel metaModel)
        {
            if (!_authorizationService.HasPermissionOnData(SessionService.UserSession.CurrencyAgentList, metaModel.CustId, 0))
            {
                return Redirect("~/Utility/AccessDenied");
            }

            var viewModel = await _betSettingService.GetViewModelAsync(metaModel.CustId, SessionService.LicenseeSession.LicenseeName);

            await AssignRequiredProperties(viewModel, metaModel).ConfigureAwait(false);
            return View("~/Views/Desktop/Customer/BetSetting/AgCasino.cshtml", viewModel);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        public async Task<JsonResult> UpdateStatus(int custId, string nickName, int status)
        {
            var userSession = SessionService.UserSession;

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
        public async Task<JsonResult> UpdateBetSetting(string nickName, string group)
        {
            var userSession = SessionService.UserSession;
            var licenseeId = SessionService.LicenseeSession.LicenseeId;

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