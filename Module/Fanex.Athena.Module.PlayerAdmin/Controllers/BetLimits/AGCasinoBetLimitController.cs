namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Web.ActionFilter;

    [ValidateProductPermission(ProductTypes.AgCasino)]
    public class AGCasinoBetLimitController : PlayerBetLimitBaseControler
    {
        private readonly IAGCasinoBetLimitService _service;

        public AGCasinoBetLimitController(
            IAGCasinoBetLimitService agCasinoBetLimitService)
        {
            _service = agCasinoBetLimitService;
        }

        [HttpPost]
        [AjaxRequest]
        [ValidatePermissionOnData(isObject: true)]
        public async Task<JsonResult> GetSetting(PlayerBetLimitSelectMetaModel metaModel)
        {
            var isEditable = HasEditPermission();
            var getGroupBettingsTask = _service.GetGroupBettingsAsync(SessionServiceInstance.LicenseeSession.LicenseeName, metaModel.CurrencyId);
            var getSettingTask = _service.GetBetSettingAsync(metaModel.CustId);

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
        [ValidationWebRequest(HandlingAjaxRequestWithJsonResult = true)]
        [AutoBindMetaModel(BindIp = true, BindLanguage = true, BindSiteName = true, BindUserId = true)]
        [ValidatePermissionOnData(isObject: true)]
        [FunctionAuthorization(PermissionKeys.PlayerAdminBetLimit_Write)]
        public async Task<JsonResult> UpdateSetting(PlayerBetLimitUpdateMetaModel<AgCasinoBetLimitMetaModel> metaModel)
        {
            var setting = await _service.GetBetSettingAsync(metaModel.CustId).ConfigureAwait(false);

            if (!setting.IsEnabled)
            {
                return Json(new ResultInfo { Code = 1, Message = ViewResources.FunctionDeniedMsg });
            }
            var result = await _service.UpdateSettingAsync(metaModel).ConfigureAwait(false);
            result.Message = result.Code == 0 ? ViewResources.UpdateSuccess : result.Message;

            return Json(result);
        }
    }
}