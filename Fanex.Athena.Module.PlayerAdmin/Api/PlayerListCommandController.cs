using Fanex.Athena.Api.Base;
using Fanex.Athena.Extension.Helpers;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
using Fanex.Athena.Resources;
using Fanex.Athena.Service.Core.Common.Interfaces;
using Fanex.Logging;
using System;
using System.Linq;
using System.Web.Http;

namespace Fanex.Athena.Module.PlayerAdmin.Api
{
    public class PlayerListCommandController : ExternalApiBaseController
    {
        private readonly IPlayerListCommandService _playerListCommandService;
        private readonly IProductService _productService;
        private readonly ILogger _logger;
        private readonly IAppSettings _appSetting;

        public PlayerListCommandController(
            IPlayerListCommandService playerListCommandService,
            IProductService productService,
            ILogger logger,
            IAppSettings appSetting)
        {
            _playerListCommandService = playerListCommandService;
            _productService = productService;
            _logger = logger;
            _appSetting = appSetting;
        }

        [HttpPost]
        public dynamic UpdateBaStatus(UpdateBaStatusMetaModel metaModel)
        {
            AssignCommonProperties(metaModel);

            var productAccess = _productService.GetProductAccess(metaModel.LicenseeId, metaModel.Language);
            if (!productAccess.IsAllowBA)
            {
                return CreateUpdatingBaResult(metaModel.IsBa, false, ViewResources.NotAllowBA);
            }

            var updateResult = _playerListCommandService.UpdateBaStatus(metaModel);

            if (updateResult.IsSuccessful)
            {
                return CreateUpdatingBaResult(metaModel.IsBa, true, updateResult.Message, updateResult.ExtendedData);
            }

            return CreateUpdatingBaResult(metaModel.IsBa, false, updateResult.Message);
        }

        [HttpPost]
        public dynamic UpdateOddsGroup(UpdateOddsGroupMetaModel metaModel)
        {
            AssignCommonProperties(metaModel);

            var isFakeLicensee = IsFakeLicensee(metaModel.LicenseeId);

            if (!isFakeLicensee)
            {
                try
                {
                    var dataResult = _playerListCommandService.UpdateOddsGroup(metaModel);

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

        [HttpPost]
        public dynamic UpdateSpecialLevel(UpdateSpecialLevelMetaModel metaModel)
        {
            AssignCommonProperties(metaModel);

            var isFakeLicensee = IsFakeLicensee(metaModel.LicenseeId);

            if (!isFakeLicensee)
            {
                try
                {
                    var dataResult = _playerListCommandService.UpdateSpecialLevel(metaModel);

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

        private void AssignCommonProperties(PlayerListCommandBaseDbParam param)
        {
            param.LicenseeId = LicenseeId;
            param.UserId = UserId;
            param.Language = Language;
            param.Ip = string.Empty;
        }

        protected internal virtual dynamic CreateUpdatingBaResult(bool isAllowBA, bool isSuccessful, string message, string oddsGroup = null)
        {
            return new
            {
                IsSuccessful = isSuccessful,
                Message = message,
                IsBA = isAllowBA,
                BAStatus = isAllowBA ? "On" : "Off",
                ConfirmMessage = isAllowBA ? ViewResources.AlertTurnOffBAMsg : ViewResources.AlertTurnOnBAMsg,
                Tooltip = isAllowBA ? ViewResources.TurnOffBaTooltip : ViewResources.TurnOnBaTooltip,
                OddsGroup = oddsGroup
            };
        }

        private bool IsFakeLicensee(int licenseeId)
        {
            return _appSetting.FakeLicenseeList.Contains(licenseeId);
        }
    }
}