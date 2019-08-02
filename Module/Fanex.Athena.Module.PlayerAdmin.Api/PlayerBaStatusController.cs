using Fanex.Athena.Api.Base.Attributes;
using Fanex.Athena.Api.StatelessBase;
using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Utilities;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using System.Web.Http;

namespace Fanex.Athena.Module.PlayerAdmin.Api
{
    [ApiOneAuthorization]
    public class PlayerBaStatusController : ExternalApiBaseController
    {
        private readonly IPlayerBaStatusService _playerBaStatusService;

        private readonly IAuthorizationService _authorizationService;

        public PlayerBaStatusController(IPlayerBaStatusService playerBaStatusService, IAuthorizationService authorizationService)
        {
            _playerBaStatusService = playerBaStatusService;
            _authorizationService = authorizationService;
        }

        [HttpPost]
        public ResultViewModel Update(BaStatusUpdatingMetaModel metaModel)
        {
            if (!_authorizationService.HasPermissionOnData(CurrencyAgentList, metaModel.CustId, 0))
            {
                return CreateErrorResult(ResourceKeyConstants.InvalidData);
            }

            AssignCommonProperties(metaModel);
            metaModel.SiteName = SiteName;

            return _playerBaStatusService.Update(metaModel);
        }

        private void AssignCommonProperties(PlayerUpdatingBaseMetaModel param)
        {
            param.UserId = UserId;
            param.Language = UpdatingUtils.GetLanguageCode(Language);
            param.Ip = ClientHelper.GetClientIpAddress(Request);
        }

        private static ResultViewModel CreateErrorResult(string errMsg)
        {
            return new ResultViewModel
            {
                Success = false,
                ErrorMessage = errMsg
            };
        }
    }
}