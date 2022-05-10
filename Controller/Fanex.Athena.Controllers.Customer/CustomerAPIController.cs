namespace Fanex.Athena.Controllers.Customer
{
    #region Using

    using System;
    using System.Linq;
    using System.Net;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using System.Web.SessionState;
    using DataAccess.Core.Users.Interfaces;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Extension.Helpers;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.Helper;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Service.Customer.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using Fanex.Logging;
    using Model.Core.ViewModel;
    using Resources;
    using Service.Customer.Helpers;

    #endregion Using

    [SessionState(SessionStateBehavior.ReadOnly)]
    [UMFilter]
    [FunctionAuthorization(PermissionKeys.CustomerInfoCustomerList)]
    public class CustomerApiController : CultureBaseController
    {
        private readonly ILogger _logger;
        private readonly ICustomerListService _customerListService;
        private readonly ILicenseeDataAccess _licenseeDataAccess;
        private readonly IProductService _productService;
        private readonly IAuthorizationService _authorizationService;

        public CustomerApiController(
            ILogger logger,
            ICustomerListService customerListService,
            ILicenseeDataAccess licenseeDataAccess,
            IProductService productService,
            IAuthorizationService authorizationService)
        {
            _logger = logger;
            _licenseeDataAccess = licenseeDataAccess;
            _customerListService = customerListService;
            _productService = productService;
            _authorizationService = authorizationService;
        }

        #region Level & Status API

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        [ValidatePermissionOnData]
        public ActionResult UpdateCustStatus(int custId, bool isClosed, bool isSuspended)
        {
            try
            {
                var licenseeSession = SessionServiceInstance.LicenseeSession;
                if (AppSettingInstance.LicenseeOfferStatusFunction.Contains(licenseeSession.LicenseeId))
                {
                    var userSession = SessionServiceInstance.UserSession;
                    var customerStatusMetaModel = new CustomerStatusMetaModel
                    {
                        LicenseeId = licenseeSession.LicenseeId,
                        LicenseeName = licenseeSession.LicenseeName,
                        CustId = custId,
                        IsOn = isClosed,
                        ModifyById = userSession.UserId,
                        ModifyByUsername = userSession.UserName,
                        Ip = Request.UserHostAddress
                    };

                    var result = _customerListService.UpdateCustClosed(customerStatusMetaModel);

                    if (result.Code == 0)
                    {
                        customerStatusMetaModel.IsOn = isSuspended;
                        result = _customerListService.UpdateCustSuspend(customerStatusMetaModel);
                    }

                    return Json(result);
                }
                else
                {
                    return Json(new ResultInfo { Code = 1, Message = ViewResources.FunctionNoAvailableMsg });
                }
            }
            catch (Exception exception)
            {
                _logger.Error(LogMessageHelper.GenerateMessage(exception), exception);
            }

            return Json(new ResultInfo { Code = 1, Message = ViewResources.HttpError_Default });
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        [ValidatePermissionOnData]
        public ActionResult UpdateSpecialLevel(int custId, int level)
        {
            var licensee = SessionServiceInstance.LicenseeSession;
            var isFakeLicensee = IsFakeLicensee(licensee.LicenseeName);

            if (!isFakeLicensee)
            {
                var userSession = SessionServiceInstance.UserSession;

                try
                {
                    var dataResult = _customerListService.UpdateSpecialLevel(
                        userSession.UserId,
                        custId,
                        level,
                        Request.UserHostAddress,
                        userSession.Language);

                    return Json(new ResultViewModel
                    {
                        Success = dataResult.IsSuccessful,
                        Message = dataResult.Message,
                        ErrorCode = dataResult.Code,
                        ErrorMessage = dataResult.Message
                    });
                }
                catch (Exception exception)
                {
                    _logger.Error(LogMessageHelper.GenerateMessage(exception));
                }
            }

            var errorMessage = isFakeLicensee ? ViewResources.FunctionDeniedMsg : ViewResources.HttpError_Default;

            return Json(new ResultViewModel
            {
                Success = false,
                Message = errorMessage,
                ErrorCode = 1,
                ErrorMessage = errorMessage
            });
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        [ValidatePermissionOnData]
        public ActionResult UpdateOddsGroup(int custId, string oddsGroup)
        {
            var licensee = SessionServiceInstance.LicenseeSession;
            var isFakeLicensee = IsFakeLicensee(licensee.LicenseeName);

            if (!isFakeLicensee)
            {
                var userSession = SessionServiceInstance.UserSession;

                try
                {
                    var metaModel = new CustomerOddsGroupMetaModel
                    {
                        CustId = custId,
                        Ip = Request.UserHostAddress,
                        Language = userSession.Language,
                        OddsGroup = oddsGroup,
                        UserId = userSession.UserId
                    };
                    var dataResult = _customerListService.UpdateOddsGroup(metaModel);

                    var message = !dataResult.IsSuccessful && string.IsNullOrWhiteSpace(dataResult.Message) ?
                                   ViewResources.HttpError_Default : dataResult.Message;
                    return Json(new ResultViewModel
                    {
                        Success = dataResult.IsSuccessful,
                        Message = message,
                        ErrorCode = dataResult.Code,
                        ErrorMessage = message
                    });
                }
                catch (Exception exception)
                {
                    _logger.Error(LogMessageHelper.GenerateMessage(exception));
                }
            }

            var errorMessage = isFakeLicensee ? ViewResources.FunctionDeniedMsg : ViewResources.HttpError_Default;
            return Json(new ResultViewModel
            {
                Success = false,
                Message = errorMessage,
                ErrorCode = 1,
                ErrorMessage = errorMessage
            });
        }

        #endregion Level & Status API

        #region BA API

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        [ValidatePermissionOnData]
        public ActionResult UpdateBAStatus(int custId, bool isAllowBA)
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var productAccess = _productService.GetProductAccess(licenseeSession.LicenseeId, userSession.Language);
            if (!productAccess.IsAllowBA)
            {
                return CreateUpdatingBaResult(isAllowBA, false, ViewResources.NotAllowBA);
            }

            var request = new Request
            {
                Language = userSession.Language,
                Ip = Request.UserHostAddress
            };

            var specialBaPermission = _authorizationService.IsAllowedSpecialBA(userSession);
            if (!specialBaPermission)
            {
                var isAllowUpdateBaResult = _licenseeDataAccess.IsAllowUpdateMemberBAStatus(request, licenseeSession.LicenseeId);
                var isAllowUpdateBa = isAllowUpdateBaResult.ExtendedData;
                if (!isAllowUpdateBa)
                {
                    return CreateUpdatingBaResult(isAllowBA, false, isAllowUpdateBaResult.Message);
                }
            }

            var updateResult = _customerListService.UpdateCustomerBAStatus(
                licenseeSession.LicenseeId,
                custId,
                userSession.UserId,
                isAllowBA,
                request);

            if (updateResult.IsSuccessful)
            {
                return CreateUpdatingBaResult(isAllowBA, true, updateResult.Message, updateResult.ExtendedData);
            }

            return CreateUpdatingBaResult(isAllowBA, false, updateResult.Message);
        }

        #endregion BA API

        protected internal virtual ActionResult CreateUpdatingBaResult(bool isAllowBA, bool isSuccessful, string message, string oddsGroup = null)
        {
            return Json(new
            {
                IsSuccessful = isSuccessful,
                Message = message,
                IsBA = isAllowBA,
                BAStatus = isAllowBA ? "On" : "Off",
                ConfirmMessage = isAllowBA ? ViewResources.AlertTurnOffBAMsg : ViewResources.AlertTurnOnBAMsg,
                Tooltip = isAllowBA ? ViewResources.TurnOffBaTooltip : ViewResources.TurnOnBaTooltip,
                OddsGroup = oddsGroup
            });
        }
    }
}
