namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.BetSettings.MetaModel;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Customer.DTO;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.BetSettings.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    [ValidateProductPermission(ProductTypes.RngCasino)]
    public class RngCasinoBetLimitController : PlayerBetLimitBaseControler
    {
        private readonly IRngCasinoBetLimitService _rngCasinoBetLimitService;

        private readonly ICoreBetSettingService _coreBetSettingService;

        public RngCasinoBetLimitController(
            IRngCasinoBetLimitService rngCasinoBetLimitService,
            ICoreBetSettingService coreBetSettingService)
        {
            _rngCasinoBetLimitService = rngCasinoBetLimitService;
            _coreBetSettingService = coreBetSettingService;
        }

        [HttpPost]
        [AjaxRequest]
        [ValidatePermissionOnData(isObject: true)]
        public JsonResult GetSetting(PlayerBetLimitSelectMetaModel metaModel)
        {
            var customer = _coreBetSettingService.GetCustomerInfo(metaModel.CustId);

            var isEditable = HasEditPermission();

            return Json(new
            {
                StatusEnable = IsRngCasinoEnabled(customer),
                IsStatusEnable = isEditable
            });
        }

        [HttpPost]
        [AjaxRequest]
        [ValidationWebRequest(HandlingAjaxRequestWithJsonResult = true)]
        [AutoBindMetaModel(BindIp = true, BindLanguage = true, BindSiteName = true, BindUserId = true)]
        [ValidatePermissionOnData(isObject: true)]
        [FunctionAuthorization(PermissionKeys.PlayerAdminBetLimit_Write)]
        public async Task<JsonResult> UpdateStatus(PlayerBetLimitProductStatusUpdateMetaModel metaModel)
        {
            var customer = _coreBetSettingService.GetCustomerInfo(metaModel.CustId);
            var userSession = SessionServiceInstance.UserSession;

            if (customer == null || !customer.SyncCasino)
            {
                return Json(new ResultInfo { Code = -1, Message = ViewResources.AccessDeniedMsg });
            }

            var param = new BetSettingCasinoStatusMetaModel
            {
                currencyAgents = userSession.CurrencyAgentList,
                UserId = userSession.UserId,
                CustId = metaModel.CustId,
                Status = metaModel.Status ? 1 : 0,
                Language = userSession.Language,
                Ip = Request.UserHostAddress,
                UserName = userSession.UserName,
                IsSyncCasino = customer.SyncCasino
            };

            var result = await _rngCasinoBetLimitService.UpdateStatusAsync(metaModel, param, customer.SyncCasino).ConfigureAwait(false);

            result.Message = result.Code == 0 ? ViewResources.UpdateSuccess : result.Message;

            return Json(result);
        }

        private static bool? IsRngCasinoEnabled(CustomerInfo customer)
        {
            if (!customer.DisableCasino && customer.SyncCasino)
            {
                return true;
            }

            if (!customer.SyncCasino)
            {
                return null;
            }

            return false;
        }
    }
}