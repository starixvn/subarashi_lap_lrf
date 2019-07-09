using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Repository;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Resources;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Services
{
    public class PlayerListCommandService : IPlayerListCommandService
    {
        private readonly IPlayerListCommandRepository _playerListCommandRepository;

        private readonly IAuthorizationService _authorizationService;

        public PlayerListCommandService(IPlayerListCommandRepository playerListCommandRepository, IAuthorizationService authorizationService)
        {
            _playerListCommandRepository = playerListCommandRepository;
            _authorizationService = authorizationService;
        }

        public IResultInfo UpdateBaStatus(UpdateBaStatusMetaModel metaModel)
        {
            if (!_authorizationService.HasPermissionOnData(metaModel.LicenseeId, metaModel.CustId, 0))
            {
                return CreateErrorResult();
            }

            return _playerListCommandRepository.UpdateBaStatus(metaModel);
        }

        public IResultInfo UpdateOddsGroup(UpdateOddsGroupMetaModel metaModel)
        {
            if (!_authorizationService.HasPermissionOnData(metaModel.LicenseeId, metaModel.CustId, 0))
            {
                return CreateErrorResult();
            }

            return _playerListCommandRepository.UpdateOddsGroup(metaModel);
        }

        public IResultInfo UpdateSpecialLevel(UpdateSpecialLevelMetaModel metaModel)
        {
            if (!_authorizationService.HasPermissionOnData(metaModel.LicenseeId, metaModel.CustId, 0))
            {
                return CreateErrorResult();
            }

            return _playerListCommandRepository.UpdateSpecialLevel(metaModel);
        }

        private static IResultInfo CreateErrorResult()
        {
            return new ResultInfo
            {
                Code = 1,
                Message = ViewResources.UpdateSpecialLevelMsg
            };
        }
    }
}