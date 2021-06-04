namespace Fanex.Athena.DataAccess.BetSettings.Interfaces
{
    using System.Threading.Tasks;
    using Fanex.Athena.Model.BetSettings.DTO;
    using Fanex.Athena.Model.BetSettings.DTO.AgCasino;
    using Fanex.Athena.Model.BetSettings.MetaModel;
    using Fanex.Athena.Model.Core.DTO.Common;

    public interface IAgCasinoBetSettingDataAccess
    {
        Task<AgCasinoBetSetting> GetBetSettingAsync(int custId);

        Task<IResultInfo> UpdateStatusAsync(int userId, string language, string ip, UpdateStatusMetaModel metaModel);

        Task<IResultInfo> UpdateBetSettingAsync(CommonBetSetting data, string group);
    }
}
