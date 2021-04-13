namespace Fanex.Athena.Service.BetSettings.Interfaces
{
    using System.Threading.Tasks;

    using Fanex.Athena.Model.BetSettings.DTO;
    using Fanex.Athena.Model.BetSettings.ViewModel;
    using Fanex.Athena.Model.Core.DTO.Common;

    public interface IKenoBetSettingService
    {
        Task<BetSettingViewModel> GetViewModelAsync(int custId);

        Task<IResultInfo> UpdateBetSettingAsync(CommonBetSetting metaModel, KenoBetSetting setting);
    }
}
