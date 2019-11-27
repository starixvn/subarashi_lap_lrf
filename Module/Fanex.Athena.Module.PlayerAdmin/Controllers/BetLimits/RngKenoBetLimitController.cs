namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.ViewModels;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Web.ActionFilter;

    [ValidateProductPermission(ProductTypes.Keno)]
    public class RngKenoBetLimitController : PlayerBetLimitBaseControler
    {
        private readonly IRngKenoBetLimitService _service;

        public RngKenoBetLimitController(
            IRngKenoBetLimitService rngKenoBetLimitService)
        {
            _service = rngKenoBetLimitService;
        }

        [HttpPost]
        [AjaxRequest]
        [ValidatePermissionOnData(isObject: true)]
        public async Task<JsonResult> GetSetting(PlayerBetLimitSelectMetaModel metaModel)
        {
            var isEditable = HasEditPermission();
            var data = await _service.GetSettingAsync(metaModel.CustId).ConfigureAwait(false);

            var viewModel = new PlayerBetLimitViewModel
            {
                Data = AddProductName(data),
                Editable = isEditable
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
            var result = await _service.UpdateSettingAsync(metaModel).ConfigureAwait(false);

            result.Message = result.Code == 0 ? ViewResources.UpdateSuccess : result.Message;

            return Json(result);
        }

        private static IEnumerable<PlayerBetLimit> AddProductName(IEnumerable<PlayerBetLimit> data)
        {
            foreach (var item in data)
            {
                item.BetSettingType = ViewResources.ProductKN;
            }

            return data;
        }
    }
}