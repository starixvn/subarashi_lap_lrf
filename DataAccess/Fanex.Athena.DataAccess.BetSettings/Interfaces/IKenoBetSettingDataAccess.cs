namespace Fanex.Athena.DataAccess.BetSettings.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.Model.BetSettings.DTO;
    using Fanex.Athena.Model.Core.DTO.Common;

    public interface IKenoBetSettingDataAccess
    {
        Task<IList<BetSetting>> GetBetSettingsAsync(int custId);

        Task<IResultInfo> UpdateBetSettingAsync(CommonBetSetting metaModel, string xmlData);
    }
}
