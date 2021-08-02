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

    [ValidateProductPermission(limitedProductIds: new[] { ProductTypes.VirtualSports, ProductTypes.VirtualSports2, ProductTypes.Lottery, ProductTypes.TG, ProductTypes.I4D, ProductTypes.SLT,
            ProductTypes.AllBet, ProductTypes.Voidbridge, ProductTypes.CashOut, ProductTypes.Exchange, ProductTypes.PP, ProductTypes.SXG, ProductTypes.GDG, ProductTypes.HB, ProductTypes.JK,
            ProductTypes.SAG, ProductTypes.PGS, ProductTypes.SBC, ProductTypes.WM, ProductTypes.SG, ProductTypes.VRG, ProductTypes.CC, ProductTypes.CG })]
    public class DcsBetLimitController : PlayerBetLimitBaseControler
    {
        private readonly IDcsBetLimitService _service;

        private static readonly IEnumerable<int> ProductsHasStatus = new[]
        {
            ProductTypes.I4D, ProductTypes.SLT, ProductTypes.AllBet, ProductTypes.Voidbridge, ProductTypes.CashOut, ProductTypes.Exchange, ProductTypes.PP, ProductTypes.SXG, ProductTypes.GDG,
            ProductTypes.HB, ProductTypes.JK, ProductTypes.SAG, ProductTypes.PGS, ProductTypes.SBC, ProductTypes.WM, ProductTypes.SG, ProductTypes.VRG, ProductTypes.CC, ProductTypes.CG
        };

        public DcsBetLimitController(
            IDcsBetLimitService dcsBetLimitService)
        {
            _service = dcsBetLimitService;
        }

        [HttpPost]
        [AjaxRequest]
        [ValidatePermissionOnData(isObject: true)]
        public async Task<JsonResult> GetSetting(PlayerBetLimitSelectMetaModel metaModel)
        {
            var isEditable = HasEditPermission();
            var data = _service.GetSettingAsync(metaModel.CustId, metaModel.ProductId);
            var status = _service.GetStatusAsync(metaModel.CustId, metaModel.ProductId);

            await Task.WhenAll(data, status).ConfigureAwait(false);

            var viewModel = new PlayerBetLimitViewModel
            {
                Data = AddSettingTypeName(await data),
                Editable = isEditable && (await status).GetValueOrDefault(),
                IsStatusEnable = isEditable && ProductsHasStatus.Contains(metaModel.ProductId) && (await status).HasValue,
                StatusEnable = (await status).GetValueOrDefault()
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