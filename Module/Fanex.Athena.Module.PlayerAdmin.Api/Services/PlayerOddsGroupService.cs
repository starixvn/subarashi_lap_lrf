using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Repository.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Utilities;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Services
{
    public class PlayerOddsGroupService : IPlayerOddsGroupService
    {
        private readonly IPlayerOddsGroupRepository _playerOddsGroupRepository;

        private readonly IAuthorizationService _authorizationService;

        public PlayerOddsGroupService(IPlayerOddsGroupRepository playerOddsGroupRepository, IAuthorizationService authorizationService)
        {
            _playerOddsGroupRepository = playerOddsGroupRepository;
            _authorizationService = authorizationService;
        }

        public IResultInfo Update(OddsGroupUpdatingMetaModel metaModel)
        {
            if (!_authorizationService.HasPermissionOnData(metaModel.LicenseeId, metaModel.CustId, 0))
            {
                return UpdatingUtils.CreateErrorResult();
            }

            return _playerOddsGroupRepository.Update(metaModel);
        }
    }
}