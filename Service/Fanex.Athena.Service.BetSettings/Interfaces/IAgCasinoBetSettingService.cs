namespace Fanex.Athena.Service.BetSettings.Interfaces
{
    using System.Threading.Tasks;
    using Fanex.Athena.Model.BetSettings.MetaModel;
    using Fanex.Athena.Model.BetSettings.ViewModel;
    using Fanex.Athena.Model.Core.DTO.Common;

    using Model.BetSettings.DTO;

    public interface IAgCasinoBetSettingService
    {
        Task<AgCasinoBetSettingViewModel> GetViewModelAsync(int custId, string licenseeName);

        Task<IResultInfo> UpdateAgCasinoBetSettingAsync(CommonBetSetting setting, string group);

        Task<IResultInfo> UpdateStatusAsync(int userId, string language, string ip, UpdateStatusMetaModel metaModel);
    }
}
