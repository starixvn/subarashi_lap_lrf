namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.ViewModels;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.VendorAdapter.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    [ValidateProductPermission(ProductTypes.NumberGame)]
    public class NumberGameBetLimitController : PlayerBetLimitBaseControler
    {
        private readonly INumberGameBetLimitService _service;

        public NumberGameBetLimitController(
            ILanguageService languageService,
            ISessionService sessionService,
            ICacheRefAdapter cacheRefAdapter,
            IAuthorizationService authorizationService,
            INumberGameBetLimitService numberGameBetLimitService)
            : base(languageService, sessionService, cacheRefAdapter, authorizationService)
        {
            _service = numberGameBetLimitService;
        }

        [HttpPost]
        [AjaxRequest]
        [ValidatePermissionOnData(isObject:true)]
        public async Task<JsonResult> GetSetting(PlayerBetLimitSelectMetaModel metaModel)
        {
            var isEditable = HasEditPermission();
            var data = await _service.GetSettingAsync(metaModel.CustId).ConfigureAwait(false);

            var viewModel = new PlayerBetLimitViewModel
            {
                Data = AddSettingTypeName(data),
                Editable = isEditable
            };

            return Json(viewModel);
        }

        [HttpPost]
        [AjaxRequest]
        [ValidatePermissionOnData(isObject:true)]
        [FunctionAuthorization(PermissionKeys.PlayerAdminBetLimit_Write)]
        public async Task<JsonResult> UpdateSetting(PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>> metaModel)
        {
            if (metaModel.Setting is null || !metaModel.Setting.Any())
            {
                return Json(new { Code = 1, Message = ViewResources.InvalidParams });
            }

            var user = SessionService.UserSession;
            AddUpdateInfo(metaModel, user.UserId, user.Language, SessionService.LicenseeSession.LicenseeName, Request.UserHostAddress);

            var result = await _service.UpdateSettingAsync(metaModel).ConfigureAwait(false);

            if (result.Code == 0)
            {
                result.Message = string.Format(ViewResources.UpdateSuccess);
            }

            return Json(result);
        }
    }
}