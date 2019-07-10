using Fanex.Athena.Model.Core.DTO.Common;
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

        public PlayerBaStatusService(IPlayerBaStatusRepository playerBaStatusRepository, IAuthorizationService authorizationService)
        {
            _playerBaStatusRepository = playerBaStatusRepository;
            _authorizationService = authorizationService;
        }

        public IResultInfo Update(BaStatusUpdatingMetaModel metaModel)
        {
            if (!_authorizationService.HasPermissionOnData(metaModel.LicenseeId, metaModel.CustId, 0))
            {
                return UpdatingUtils.CreateErrorResult();
            }

            return _playerBaStatusRepository.Update(metaModel);
        }
    }
}