namespace Fanex.Athena.Module.PlayerAdmin.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Module.PlayerAdmin.Repository.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;

    public class PlayerBetLimitService : IPlayerBetLimitService
    {
        private readonly IPlayerBetLimitRepository _playerBetLimitRepository;

        public PlayerBetLimitService(IPlayerBetLimitRepository playerBetLimitRepository)
        {
            _playerBetLimitRepository = playerBetLimitRepository;
        }

        public async Task<IEnumerable<PlayerBetLimitProduct>> GetEnableBetLimitProducts(string siteName)
        {
            return await _playerBetLimitRepository.GetEnableBetLimitProducts(siteName).ConfigureAwait(false);
        }
    }
}
