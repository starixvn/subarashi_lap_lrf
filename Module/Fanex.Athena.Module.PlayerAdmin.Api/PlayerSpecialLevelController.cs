using Fanex.Athena.Api.Base.Attributes;
using Fanex.Athena.Api.StatelessBase;
using Fanex.Athena.Extension.Helpers;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Utilities;
using Fanex.Logging;
using System;
using System.Web.Http;

namespace Fanex.Athena.Module.PlayerAdmin.Api
{
    [ApiOneAuthorization]
    public class PlayerSpecialLevelController : ExternalApiBaseController
    {
        private readonly IPlayerSpecialLevelService _playerSpecialLevelService;
        private readonly ILogger _logger;

        public PlayerSpecialLevelController(
            IPlayerSpecialLevelService playerSpecialLevelService,
            ILogger logger)
        {
            _playerSpecialLevelService = playerSpecialLevelService;
            _logger = logger;
        }

        [HttpPost]
        public ResultViewModel Update(SpecialLevelUpdatingMetaModel metaModel)
        {
            AssignCommonProperties(metaModel);
            metaModel.SiteName = SiteName;

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

        private void AssignCommonProperties(PlayerUpdatingBaseMetaModel param)
        {
            param.CurrencyPermission = CurrencyAgentList;
            param.UserId = UserId;
            param.Language = Util.MapIetfLanguageCodes[Language];
            param.Ip = ClientHelper.GetClientIpAddress(Request);
        }
    }
}