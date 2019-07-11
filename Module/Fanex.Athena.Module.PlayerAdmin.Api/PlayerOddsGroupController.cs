using Fanex.Athena.Api.StatelessBase;
using Fanex.Athena.Extension.Helpers;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Utilities;
using Fanex.Athena.Resources;
using Fanex.Logging;
using System;
using System.Linq;
using System.Web.Http;

namespace Fanex.Athena.Module.PlayerAdmin.Api
{
    public class PlayerOddsGroupController : ExternalApiBaseController
    {
        private readonly IPlayerOddsGroupService _playerOddsGroupService;
        private readonly ILogger _logger;
        private readonly IAppSettings _appSetting;

        public PlayerOddsGroupController(
            IPlayerOddsGroupService playerOddsGroupService,
            ILogger logger,
            IAppSettings appSetting)
        {
            _playerOddsGroupService = playerOddsGroupService;
            _logger = logger;
            _appSetting = appSetting;
        }

        [HttpPost]
        public dynamic Update(OddsGroupUpdatingMetaModel metaModel)
        {
            AssignCommonProperties(metaModel);

            var isFakeLicensee = IsFakeLicensee(metaModel.LicenseeId);

            if (!isFakeLicensee)
            {
                try
                {
                    var dataResult = _playerOddsGroupService.Update(metaModel);

                    var message = !dataResult.IsSuccessful && string.IsNullOrWhiteSpace(dataResult.Message) ?
                                   ViewResources.HttpError_Default : dataResult.Message;

                    return new ResultViewModel
                    {
                        Success = dataResult.IsSuccessful,
                        Message = message,
                        ErrorCode = dataResult.Code,
                        ErrorMessage = message
                    };
                }
                catch (Exception exception)
                {
                    _logger.Error(LogMessageHelper.GenerateMessage(exception));
                }
            }

            var errorMessage = isFakeLicensee ? ViewResources.FunctionDeniedMsg : ViewResources.HttpError_Default;

            return new ResultViewModel
            {
                Success = false,
                Message = errorMessage,
                ErrorCode = 1,
                ErrorMessage = errorMessage
            };
        }

        private void AssignCommonProperties(PlayerUpdatingBaseMetaModel param)
        {
            param.LicenseeId = LicenseeId;
            param.UserId = UserId;
            param.Language = UpdatingUtils.GetLanguageCode(Language);
            param.Ip = string.Empty;
        }

        private bool IsFakeLicensee(int licenseeId)
        {
            return _appSetting.FakeLicenseeList.Contains(licenseeId);
        }
    }
}