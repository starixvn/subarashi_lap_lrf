namespace Fanex.Athena.Service.BetSettings.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Fanex.Athena.Model.Core.DTO.Common;

    using Model.BetSettings.DTO;

    public interface IDcsBetSettingService
    {
        Task<bool?> GetStatusAsync(IDictionary<int, int[]> currencyAgents, int custId, int productId);

        Task<IResultInfo> UpdateStatusAsync(IDictionary<int, int[]> currencyAgents, int userId, int custId, string ip, bool status, int productId);

        Task<IList<BetSetting>> GetBetSettingsAsync(IDictionary<int, int[]> currencyAgents, int custId, int productId);

        Task<IResultInfo> UpdateBetSettingAsync(IDictionary<int, int[]> currencyAgents, int custId, int userId, string ip, IEnumerable<DcsBetSetting> betSettings);
    }
}