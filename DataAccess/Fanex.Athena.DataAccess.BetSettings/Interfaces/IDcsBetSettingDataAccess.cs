namespace Fanex.Athena.DataAccess.BetSettings.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.Model.BetSettings.MetaModel;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Model.BetSettings.DTO;

    public interface IDcsBetSettingDataAccess
    {
        Task<bool?> GetStatusAsync(int custId, int productId);

        Task<IResultInfo> UpdateStatusAsync(int userId, string ip, UpdateStatusMetaModel metaModel);

        Task<IList<BetSetting>> GetBetSettingAsync(int custId, int productId);

        Task<IResultInfo> UpdateBetSettingAsync(CommonBetSetting metaModel, string xmlData);
    }
}
