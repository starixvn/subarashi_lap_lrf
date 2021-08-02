namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.ViewModels;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Web.ActionFilter;

    [ValidateProductPermission(limitedProductIds: new[] { ProductTypes.ColossusBets, ProductTypes.CashOut })]
    public class ThirdPartyBetLimitController : PlayerBetLimitBaseControler
    {
        private readonly IThirdPartyBetLimitService _service;

        public ThirdPartyBetLimitController(
            IThirdPartyBetLimitService thirdPartyBetLimitService)
        {
            _service = thirdPartyBetLimitService;
        }

        [HttpPost]
        [AjaxRequest]
        [ValidatePermissionOnData(isObject: true)]
        public async Task<JsonResult> GetSetting(PlayerBetLimitSelectMetaModel metaModel)
        {
            var isEditable = HasEditPermission();
            var setting = await _service.GetBetSettingAsync(metaModel.CustId, metaModel.ProductId);

            var viewModel = new PlayerBetLimitViewModel
            {
                IsStatusEnable = isEditable,
                StatusEnable = setting.IsEnabled
            };

            return Json(viewModel);
        }

        [HttpPost]
        [AjaxRequest]
        [ValidationWebRequest(HandlingAjaxRequestWithJsonResult = true)]
        [AutoBindMetaModel(BindIp = true, BindLanguage = true, BindSiteName = true, BindUserId = true)]
        [ValidatePermissionOnData(isObject: true)]
        [FunctionAuthorization(PermissionKeys.PlayerAdminBetLimit_Write)]
        public async Task<JsonResult> UpdateStatus(PlayerBetLimitProductStatusUpdateMetaModel metaModel)
        {
            var result = await _service.UpdateStatusAsync(metaModel);

            result.Message = result.Code == 0 ? ViewResources.UpdateSuccess : result.Message;

            return Json(result);
        }
    }
}