using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Repository.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Utilities;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Services
{
    public class PlayerSpecialLevelService : IPlayerSpecialLevelService
    {
        private readonly IPlayerSpecialLevelRepository _playerSpecialLevelRepository;

        private readonly IAuthorizationService _authorizationService;

        public PlayerSpecialLevelService(IPlayerSpecialLevelRepository playerSpecialLevelRepository, IAuthorizationService authorizationService)
        {
            _playerSpecialLevelRepository = playerSpecialLevelRepository;
            _authorizationService = authorizationService;
        }

        public IResultInfo Update(SpecialLevelUpdatingMetaModel metaModel)
        {
            if (!_authorizationService.HasPermissionOnData(metaModel.LicenseeId, metaModel.CustId, 0))
            {
                return UpdatingUtils.CreateErrorResult();
            }

            return _playerSpecialLevelRepository.Update(metaModel);
        }
    }
}