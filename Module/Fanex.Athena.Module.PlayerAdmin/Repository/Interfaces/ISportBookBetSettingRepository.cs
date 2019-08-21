namespace Fanex.Athena.Module.PlayerAdmin.Repository.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.Module.PlayerAdmin.DTO;

    public interface ISportBookBetSettingRepository
    {
        Task<IEnumerable<PlayerBetSetting>> GetSettingAsync(int custId, bool isShowMixedSport);
    }
}
