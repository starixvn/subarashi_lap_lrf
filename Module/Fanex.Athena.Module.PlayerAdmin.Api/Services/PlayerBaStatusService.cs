using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Repository.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Services
{
    public class PlayerBaStatusService : IPlayerBaStatusService
    {
        private readonly IPlayerBaStatusRepository _playerBaStatusRepository;

        public PlayerBaStatusService(IPlayerBaStatusRepository playerBaStatusRepository)
        {
            _playerBaStatusRepository = playerBaStatusRepository;
        }

        public ResultViewModel Update(BaStatusUpdatingMetaModel metaModel)
        {
            var result = _playerBaStatusRepository.Update(metaModel);

            return new ResultViewModel
            {
                Success = result.IsSuccessful,
                Message = result.Message,
                ErrorCode = result.Code,
                ExtendedData = result.ExtendedData
            };
        }
    }
}