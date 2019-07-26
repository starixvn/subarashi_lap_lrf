using Fanex.Athena.Api.StatelessBase;
using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Utilities;

using System.Web.Http;

namespace Fanex.Athena.Module.PlayerAdmin.Api
{
    public class PlayerBaStatusController : ExternalApiBaseController
    {
        private readonly IPlayerBaStatusService _playerBaStatusService;

        public PlayerBaStatusController(IPlayerBaStatusService playerBaStatusService)
        {
            _playerBaStatusService = playerBaStatusService;
        }

        [HttpPost]
        public ResultViewModel Update(BaStatusUpdatingMetaModel metaModel)
        {
            AssignCommonProperties(metaModel);

            var updateResult = _playerBaStatusService.Update(metaModel);

            if (updateResult.IsSuccessful)
            {
                return CreateUpdatingBaResult(true, updateResult.Message, updateResult.ExtendedData);
            }

            return CreateUpdatingBaResult(false, updateResult.Message);
        }

        private void AssignCommonProperties(PlayerUpdatingBaseMetaModel param)
        {
            param.LicenseeId = LicenseeId;
            param.UserId = UserId;
            param.Language = UpdatingUtils.GetLanguageCode(Language);
            param.Ip = string.Empty;
        }

        private static ResultViewModel CreateUpdatingBaResult(bool isSuccessful, string message, string oddsGroup = null)
        {
            return new ResultViewModel
            {
                Success = isSuccessful,
                Message = message,
                ExtendedData = oddsGroup
            };
        }
    }
}