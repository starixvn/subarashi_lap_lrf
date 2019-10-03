namespace Fanex.Athena.Module.PlayerAdmin.Services.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.Module.PlayerAdmin.DTO;

    public interface IAGCasinoBetLimitService
    {
        Task<IList<AgCasinoGame>> GetGroupBettingsAsync(string siteName, int currency);
    }
}
