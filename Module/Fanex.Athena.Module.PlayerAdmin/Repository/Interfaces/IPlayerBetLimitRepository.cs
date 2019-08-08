namespace Fanex.Athena.Module.PlayerAdmin.Repository.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.Module.PlayerAdmin.DTO;

    public interface IPlayerBetLimitRepository
    {
        Task<IEnumerable<PlayerBetLimitProduct>> GetEnableBetLimitProducts(string siteName);
    }
}