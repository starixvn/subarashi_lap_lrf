using Fanex.Athena.Api.StatelessBase;
using Fanex.Athena.Extension.Helpers;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Utilities;
using Fanex.Athena.Resources;
using Fanex.Athena.Service.StatelessCore.Interfaces;
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
        private readonly ILicenseeSettingService _licenseeSettingService;

        public PlayerSpecialLevelController(
            IPlayerSpecialLevelService playerSpecialLevelService,
            ILogger logger,
            ILicenseeSettingService licenseeSettingService)
        {
            _playerSpecialLevelService = playerSpecialLevelService;
            _logger = logger;
            _licenseeSettingService = licenseeSettingService;
        }

        [HttpPost]
        public dynamic Update(SpecialLevelUpdatingMetaModel metaModel)
        {
            AssignCommonProperties(metaModel);

            if (!_licenseeSettingService.IsFakeLicensee(SiteName))
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

            return new ResultViewModel
            {
                Success = false,
                Message = ViewResources.FunctionDeniedMsg,
                ErrorCode = 1,
                ErrorMessage = ViewResources.FunctionDeniedMsg
            };
        }

        private void AssignCommonProperties(PlayerUpdatingBaseMetaModel param)
        {
            param.LicenseeId = LicenseeId;
            param.UserId = UserId;
            param.Language = Util.MapIetfLanguageCodes[Language];
            param.Ip = string.Empty;
        }


    }
}