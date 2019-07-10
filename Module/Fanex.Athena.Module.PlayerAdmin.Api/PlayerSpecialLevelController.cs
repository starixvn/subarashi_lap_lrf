using Fanex.Athena.Api.Base;
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
    public class PlayerSpecialLevelController : ExternalApiBaseController
    {
        private readonly IPlayerSpecialLevelService _playerSpecialLevelService;
        private readonly ILogger _logger;
        private readonly IAppSettings _appSetting;

        public PlayerSpecialLevelController(
            IPlayerSpecialLevelService playerSpecialLevelService,
            ILogger logger,
            IAppSettings appSetting)
        {
            _playerSpecialLevelService = playerSpecialLevelService;
            _logger = logger;
            _appSetting = appSetting;
        }

        [HttpPost]
        public dynamic Update(SpecialLevelUpdatingMetaModel metaModel)
        {
            AssignCommonProperties(metaModel);

            var isFakeLicensee = IsFakeLicensee(metaModel.LicenseeId);

            if (!isFakeLicensee)
            {
                try
                {
                    var dataResult = _playerSpecialLevelService.Update(metaModel);

                    return new ResultViewModel
                    {
                        Success = dataResult.IsSuccessful,
                        Message = dataResult.Message,
                        ErrorCode = dataResult.Code,
                        ErrorMessage = dataResult.Message
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