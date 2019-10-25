using System;
using System.Web.Http;
using Fanex.Athena.Api.StatelessBase;
using Fanex.Athena.Api.StatelessBase.Attributes;
using Fanex.Athena.Extension.Helpers;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Utilities;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Logging;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Controllers
{
    [ApiOneAuthorization(AllowFunctionKeys = PermissionKeys.PlayerAdminUpdateSpecialLevel)]
    public class PlayerSpecialLevelController : ExternalApiBaseController
    {
        private readonly IPlayerSpecialLevelService _playerSpecialLevelService;
        private readonly ILicenseeSettingService _licenseeSettingService;
        private readonly ILogger _logger;

        public PlayerSpecialLevelController(
            IPlayerSpecialLevelService playerSpecialLevelService,
            ILicenseeSettingService licenseeSettingService,
            ILogger logger)
        {
            _playerSpecialLevelService = playerSpecialLevelService;
            _licenseeSettingService = licenseeSettingService;
            _logger = logger;
        }

        [HttpPost]
        [ApiPermissionOnData]
        [StatelessApiAutoBindMetaModel(BindUserId = true, BindIp = true, BindLanguage = true, BindSiteName = true)]
        public ResultViewModel Update(SpecialLevelUpdatingMetaModel metaModel)
        {
            if (_licenseeSettingService.IsFakeLicensee(SiteName))
            {
                return new ResultViewModel
                {
                    Success = false,
                    ErrorMessage = ResourceKeyConstants.FunctionDenied
                };
            }

            try
            {
                return _playerSpecialLevelService.Update(metaModel);
            }
            catch (Exception exception)
            {
                _logger.Error(LogMessageHelper.GenerateMessage(exception));
            }

            return new ResultViewModel
            {
                Success = false,
                ErrorMessage = ResourceKeyConstants.FunctionDenied
            };
        }
    }
}