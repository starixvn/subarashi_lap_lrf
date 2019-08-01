using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Repository.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Utilities;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Services
{
    public class PlayerBaStatusService : IPlayerBaStatusService
    {
        private readonly IPlayerBaStatusRepository _playerBaStatusRepository;

        private readonly IAuthorizationService _authorizationService;

        public PlayerBaStatusService(
            IPlayerBaStatusRepository playerBaStatusRepository,
            IAuthorizationService authorizationService
           )
        {
            _playerBaStatusRepository = playerBaStatusRepository;
            _authorizationService = authorizationService;
        }

        public ResultViewModel Update(BaStatusUpdatingMetaModel metaModel)
        {
            if (!_authorizationService.HasPermissionOnData(metaModel.CurrencyPermission, metaModel.CustId, 0))
            {
                return CreateErrorResult(ResourceKeyConstants.InvalidData);
            }

            var result = _playerBaStatusRepository.Update(metaModel);

            return new ResultViewModel
            {
                Success = result.IsSuccessful,
                Message = result.Message,
                ErrorCode = result.Code,
                ExtendedData = result.ExtendedData
            };
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