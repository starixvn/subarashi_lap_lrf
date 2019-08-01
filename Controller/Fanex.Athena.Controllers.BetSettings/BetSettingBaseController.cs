// -----------------------------------------------------------------------
// <copyright file="BetSettingBaseController.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.BetSettings
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using System.Web.SessionState;

    using Autofac.Integration.Mvc;

    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.BetSettings.DTO;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Model.BetSettings.MetaModel;
    using Model.BetSettings.ViewModel;
    using Model.Core.DTO.Common;
    using Model.Customer.DTO;

    using ONEbook.UM.Filters;

    using Resources;

    using Service.BetSettings.Interfaces;
    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    using Web.ActionFilter;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    [FunctionAuthorization(PermissionKeys.CustomerInfoCustomerList)]
    public class BetSettingBaseController : ContentBaseController
    {
        private readonly ICoreBetSettingService _coreBetSettingService;

        private readonly IProductService _productService;

        protected BetSettingBaseController(
            ILanguageService languageService,
            ISessionService sessionService,
            ICoreBetSettingService coreBetSettingService,
            IProductService productService,
            ILicenseeSettingService licenseeSettingService)
        : base(languageService, sessionService, licenseeSettingService)
        {
            _coreBetSettingService = coreBetSettingService ?? AutofacDependencyResolver.Current.GetService<ICoreBetSettingService>();
            _productService = productService ?? AutofacDependencyResolver.Current.GetService<IProductService>();
        }

        protected ProductAccess GetProductAccess()
        {
            return _productService.GetProductAccess(
                    SessionService.LicenseeSession.LicenseeId,
                    SessionService.UserSession.Language);
        }

        protected JsonResult AccessDenied()
        {
            return Json(new ResultInfo { Code = -1, Message = ViewResources.AccessDeniedMsg });
        }

        protected CustomerInfo GetCustomerInfo(int custId)
        {
            return _coreBetSettingService.GetCustomerInfo(custId, SessionService.UserSession.CurrencyAgentList);
        }

        protected async Task AssignRequiredProperties(BetSettingBaseViewModel viewModel, BetSettingMetaModel metaModel)
        {
            var licensee = SessionService.LicenseeSession;
            var userSession = SessionService.UserSession;
            metaModel.IsFakeLicensee = IsFakeLicensee(licensee.LicenseeName);
            viewModel.Param = metaModel;
            viewModel.Editable = IsBetSettingEditable(userSession);
            viewModel.BetSettingProducts =
                await _coreBetSettingService.GetBetSettingProductsAsync(metaModel.CustId,
                licensee.LicenseeId, userSession.CurrencyAgentList);
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

            decimal value;
            return !decimal.TryParse(HttpContext.Request[name], out value)
                       ? defaultValue
                       : value;
        }

        protected int GetIntRequest(string name, int defaultValue)
        {
            if (string.IsNullOrEmpty(HttpContext.Request[name]))
            {
                return defaultValue;
            }

            int value;
            return !int.TryParse(HttpContext.Request[name], out value)
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