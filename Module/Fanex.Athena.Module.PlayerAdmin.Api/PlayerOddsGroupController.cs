using Fanex.Athena.Api.Base.Attributes;
using Fanex.Athena.Api.StatelessBase;
using Fanex.Athena.Api.StatelessBase.Attributes;
using Fanex.Athena.Extension.Helpers;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Utilities;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Logging;
using System;
using System.Web.Http;

namespace Fanex.Athena.Module.PlayerAdmin.Api
{
    [ApiOneAuthorization]
    public class PlayerOddsGroupController : ExternalApiBaseController
    {
        private readonly IPlayerOddsGroupService _playerOddsGroupService;
        private readonly ILicenseeSettingService _licenseeSettingService;
        private readonly ILogger _logger;

        public PlayerOddsGroupController(
            IPlayerOddsGroupService playerOddsGroupService,
            ILicenseeSettingService licenseeSettingService,
            ILogger logger)
        {
            _playerOddsGroupService = playerOddsGroupService;
            _licenseeSettingService = licenseeSettingService;
            _logger = logger;
        }

        [HttpPost]
        [ApiPermissionOnData]
        public ResultViewModel Update(OddsGroupUpdatingMetaModel metaModel)
        {
            if (_licenseeSettingService.IsFakeLicensee(SiteName))
            {
                return new ResultViewModel
                {
                    Success = false,
                    ErrorMessage = ResourceKeyConstants.FunctionDenied
                };
            }

            AssignCommonProperties(metaModel);

            try
            {
                return _playerOddsGroupService.Update(metaModel);
            }
            catch (Exception exception)
            {
                _logger.Error(LogMessageHelper.GenerateMessage(exception));
            }

            return new ResultViewModel
            {
                Success = false,
                ErrorMessage = ResourceKeyConstants.HttpErrDefault
            };
        }

        private void AssignCommonProperties(PlayerUpdatingBaseMetaModel param)
        {
            param.CurrencyPermission = CurrencyAgentList;
            param.UserId = UserId;
            param.Language = Util.MapIetfLanguageCodes[Language];
            param.Ip = ClientHelper.GetClientIpAddress(Request);
        }
    }
}