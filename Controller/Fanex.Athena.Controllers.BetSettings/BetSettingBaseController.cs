// -----------------------------------------------------------------------
// <copyright file="BetSettingBaseController.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.BetSettings
{
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.BetSettings.DTO;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Model.BetSettings.MetaModel;
    using Model.BetSettings.ViewModel;
    using Model.Core.DTO.Common;
    using Model.Customer.DTO;

    using ONEbook.UM.Filters;

    using Resources;

    using Service.BetSettings.Interfaces;

    using System.Threading.Tasks;
    using System.Web.Mvc;
    using System.Web.SessionState;

    using Web.ActionFilter;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    [FunctionAuthorization(PermissionKeys.CustomerInfoCustomerList)]
    public class BetSettingBaseController : CultureBaseController
    {
        private readonly ICoreBetSettingService _coreBetSettingService;

        private readonly IProductService _productService;

        protected BetSettingBaseController(
            ICoreBetSettingService coreBetSettingService,
            IProductService productService)
        {
            _coreBetSettingService = coreBetSettingService;
            _productService = productService;
        }

        protected ProductAccess GetProductAccess()
        {
            return _productService.GetProductAccess(
                    SessionServiceInstance.LicenseeSession.LicenseeId,
                    SessionServiceInstance.UserSession.Language);
        }

        protected JsonResult AccessDenied()
        {
            return Json(new ResultInfo { Code = -1, Message = ViewResources.AccessDeniedMsg });
        }

        protected CustomerInfo GetCustomerInfo(int custId)
        {
            return _coreBetSettingService.GetCustomerInfo(custId);
        }

        protected async Task AssignRequiredPropertiesAsync(BetSettingBaseViewModel viewModel, BetSettingMetaModel metaModel)
        {
            var licensee = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            metaModel.IsFakeLicensee = IsFakeLicensee(licensee.LicenseeName);
            viewModel.Param = metaModel;
            viewModel.Editable = IsBetSettingEditable(userSession);
            viewModel.BetSettingProducts =
                await _coreBetSettingService.GetBetSettingProductsAsync(metaModel.CustId,
                licensee.LicenseeId);
        }

        protected CommonBetSetting GetBetSettingCommonParam(int userId, int licenseeId, string language)
        {
            var commonItem = new CommonBetSetting
            {
                LicenseeId = licenseeId,
                Ip = Request.UserHostAddress,
                Language = language,
                UserId = userId,
                CustId = int.Parse(Request["custid"])
            };

            return commonItem;
        }

        protected bool IsBetSettingEditable(UserAuthInfo userSession)
        {
            return _coreBetSettingService.IsBetSettingEditable(userSession);
        }

        protected decimal GetDecimalRequest(string name, decimal defaultValue)
        {
            if (string.IsNullOrEmpty(HttpContext.Request[name]))
            {
                return defaultValue;
            }

            return !decimal.TryParse(HttpContext.Request[name], out decimal value)
                       ? defaultValue
                       : value;
        }

        protected int GetIntRequest(string name, int defaultValue)
        {
            if (string.IsNullOrEmpty(HttpContext.Request[name]))
            {
                return defaultValue;
            }

            return !int.TryParse(HttpContext.Request[name], out int value)
                       ? defaultValue
                       : value;
        }

        protected bool CheckPermission(UserAuthInfo userSession, int productId)
        {
            if (!IsBetSettingEditable(userSession))
            {
                return false;
            }

            var productAccess = GetProductAccess();
            if (!productAccess.IsAllow(productId))
            {
                return false;
            }

            return true;
        }
    }
}