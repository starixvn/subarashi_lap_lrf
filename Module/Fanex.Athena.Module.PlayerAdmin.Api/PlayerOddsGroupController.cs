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
    public class PlayerOddsGroupController : ExternalApiBaseController
    {
        private readonly IPlayerOddsGroupService _playerOddsGroupService;
        private readonly ILogger _logger;

        public PlayerOddsGroupController(IPlayerOddsGroupService playerOddsGroupService, ILogger logger)
        {
            _playerOddsGroupService = playerOddsGroupService;
            _logger = logger;
        }

        [HttpPost]
        public ResultViewModel Update(OddsGroupUpdatingMetaModel metaModel)
        {
            AssignCommonProperties(metaModel);
            metaModel.SiteName = SiteName;

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
            param.LicenseeId = LicenseeId;
            param.UserId = UserId;
            param.Language = Util.MapIetfLanguageCodes[Language];
            param.Ip = string.Empty;
        }
    }
}