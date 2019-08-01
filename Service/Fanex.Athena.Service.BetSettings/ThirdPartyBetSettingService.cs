// -----------------------------------------------------------------------
// <copyright file="ThirdPartyBetSettingService.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Service.BetSettings
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using BetSettings.Interfaces;

    using DataAccess.BetSettings.Interfaces;

    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Model.BetSettings.ViewModel;
    using Model.Core.DTO.Common;

    using Resources;

    public class ThirdPartyBetSettingService : BetSettingBaseService, IThirdPartyBetSettingService
    {
        private readonly IThirdPartyBetSettingDataAccess _betSettingDataAccess;

        public ThirdPartyBetSettingService(
            IThirdPartyBetSettingDataAccess betSettingDataAccess)
        {
            _betSettingDataAccess = betSettingDataAccess;
        }

        public async Task<ThirdPartyBetSettingViewModel> GetViewModelAsync(int custId, int productid)
        {

            var setting = await _betSettingDataAccess.GetBetSettingAsync(custId, productid).ConfigureAwait(false);

            return new ThirdPartyBetSettingViewModel
            {
                IsLineEnabled = setting.IsLineEnabled,
                IsEnabled = setting.IsEnabled
            };
        }

        public async Task<IResultInfo> UpdateStatusAsync(int productId, int userId, int custId, string language, string ip, bool isEnabled)
        {
            var setting = await _betSettingDataAccess.GetBetSettingAsync(custId, productId).ConfigureAwait(false);
            if (!setting.IsLineEnabled)
            {
                return ErrorResult(ViewResources.AccessDeniedMsg);
            }

            return await _betSettingDataAccess.UpdateStatusAsync(productId, userId, custId, language, ip, isEnabled);
        }
    }
}