namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.VendorAdapter.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    [ValidateProductPermission(ProductTypes.AgCasino)]
    public class AGCasinoBetLimitController : PlayerBetLimitBaseControler
    {
        private readonly IAGCasinoBetLimitService _service;

        private readonly IAGCasinoBetLimitRepository _repository;

        public AGCasinoBetLimitController(
            ILanguageService languageService,
            ISessionService sessionService,
            ICacheRefAdapter cacheRefAdapter,
            IAuthorizationService authorizationService,
            IAGCasinoBetLimitService agCasinoBetLimitService,
            IAGCasinoBetLimitRepository agCasinoBetLimitRepository)
            : base(languageService, sessionService, cacheRefAdapter, authorizationService)
        {
            _service = agCasinoBetLimitService;
            _repository = agCasinoBetLimitRepository;
        }

        [HttpPost]
        [AjaxRequest]
        [ValidatePermissionOnData(isObject: true)]
        public async Task<JsonResult> GetSetting(PlayerBetLimitSelectMetaModel metaModel)
        {
            var isEditable = HasEditPermission();
            var getGroupBettingsTask = _service.GetGroupBettingsAsync(SessionService.LicenseeSession.LicenseeName, metaModel.CurrencyId);
            var getSettingTask = _repository.GetBetSettingAsync(metaModel.CustId);

            await Task.WhenAll(getGroupBettingsTask, getSettingTask);

            var setting = await getSettingTask;
            if (!setting.CheckedGroups.Contains(setting.AgGroup))
            {
                setting.CheckedGroups = setting.CheckedGroups.Concat(new[] { setting.AgGroup }).OrderBy(x => x).ToArray();
            }

            return Json(new
            {
                Data = await getGroupBettingsTask,
                BetSetting = setting,
                Editable = isEditable && setting.IsEnabled && setting.IsLineEnabled
            });
        }

        [HttpPost]
        [AjaxRequest]
        [ValidatePermissionOnData(isObject: true)]
        [FunctionAuthorization(PermissionKeys.PlayerAdminBetLimit_Write)]
        public async Task<JsonResult> UpdateSetting(PlayerBetLimitUpdateMetaModel<AgCasinoBetLimitMetaModel> metaModel)
        {
            var user = SessionService.UserSession;
            var licenseeName = SessionService.LicenseeSession.LicenseeName;

            if (metaModel.Setting is null || string.IsNullOrWhiteSpace(metaModel.Setting.FirstOrDefault()?.Group))
            {
                return Json(new { Code = 1, Message = ViewResources.InvalidParams });
            }

            var setting = await _repository.GetBetSettingAsync(metaModel.CustId).ConfigureAwait(false);

            if (!setting.IsEnabled)
            {
                return Json(new { Code = 1, Message = ViewResources.FunctionDeniedMsg });
            }

            AddUpdateInfo(metaModel, user.UserId, user.Language, licenseeName, Request.UserHostAddress);
            var result = await _repository.UpdateSettingAsync(metaModel).ConfigureAwait(false);

            if (result.Code == 0)
            {
                result.Message = string.Format(ViewResources.UpdateSuccess);
            }

            return Json(result);
        }
    }
}
