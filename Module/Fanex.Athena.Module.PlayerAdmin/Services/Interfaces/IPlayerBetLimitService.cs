namespace Fanex.Athena.Module.PlayerAdmin.Services.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.Module.PlayerAdmin.DTO;

    public interface IPlayerBetLimitService
    {
        Task<IEnumerable<PlayerBetLimitProduct>> GetEnableBetLimitProducts(string siteName);
    }
}
