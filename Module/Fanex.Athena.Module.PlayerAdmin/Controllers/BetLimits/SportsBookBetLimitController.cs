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
    using Fanex.Athena.Web.ActionFilter;

    public class SportsBookBetLimitController : PlayerBetLimitBaseControler
    {
        private readonly ISportsBookBetLimitService _service;

        public SportsBookBetLimitController(
            ISportsBookBetLimitService sportBookBetLimitService)
        {
            _service = sportBookBetLimitService;
        }

        [HttpPost]
        [AjaxRequest]
        [ValidatePermissionOnData(isObject: true)]
        public async Task<JsonResult> GetSetting(PlayerBetLimitSelectMetaModel metaModel)
        {
            var isEditable = HasEditPermission();
            var data = await _service.GetSettingAsync(metaModel.CustId, AppSettingInstance.IsShowMixedSport).ConfigureAwait(false);
            var copySportId = ((int)SportType.Soccer).ToString();

            var viewModel = new PlayerBetLimitViewModel
            {
                Data = AddSettingTypeName(data),
                Editable = isEditable,
                CopyId = copySportId,
                EnableCopy = data.Any(x => x.Id == copySportId)
            };

            return Json(viewModel);
        }

        [HttpPost]
        [AjaxRequest]
        [ValidationWebRequest(HandlingAjaxRequestWithJsonResult = true)]
        [AutoBindMetaModel(BindIp = true, BindLanguage = true, BindSiteName = true, BindUserId = true)]
        [ValidatePermissionOnData(isObject: true)]
        [FunctionAuthorization(PermissionKeys.PlayerAdminBetLimit_Write)]
        public async Task<JsonResult> UpdateSetting(PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>> metaModel)
        {
            var result = await _service.UpdateSettingAsync(metaModel, AppSettingInstance.IsShowMixedSport).ConfigureAwait(false);

            result.Message = result.Code == 0 ? ViewResources.UpdateSuccess : result.Message;

            return Json(result);
        }
    }
}