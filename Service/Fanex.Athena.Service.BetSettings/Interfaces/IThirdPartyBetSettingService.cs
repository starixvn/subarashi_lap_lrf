namespace Fanex.Athena.Service.BetSettings.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Fanex.Athena.Model.BetSettings.ViewModel;
    using Fanex.Athena.Model.Core.DTO.Common;

    public interface IThirdPartyBetSettingService
    {
        Task<ThirdPartyBetSettingViewModel> GetViewModelAsync(int custId, int productid);

        Task<IResultInfo> UpdateStatusAsync(
            int productId, int userId, int custId, string language, string ip, bool isEnabled);
    }
}