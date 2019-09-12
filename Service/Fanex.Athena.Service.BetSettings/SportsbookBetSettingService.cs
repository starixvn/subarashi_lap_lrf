namespace Fanex.Athena.Service.BetSettings
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using DataAccess.BetSettings.Interfaces;
    using Fanex.Athena.Model.BetSettings.DTO;
    using Fanex.Athena.Model.BetSettings.ViewModel;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Service.BetSettings.Interfaces;
    using Model.Core.DataDomain;


    public class SportsbookBetSettingService : BetSettingBaseService, ISportsbookBetSettingService
    {
        private readonly ISportsbookBetSettingDataAccess _betSettingDataAccess;

        private readonly IDcsBetSettingService _dcsBetSettingService;

        public SportsbookBetSettingService(
            ISportsbookBetSettingDataAccess betSettingDataAccess,
            IDcsBetSettingService dcsBetSettingService)
        {
            _betSettingDataAccess = betSettingDataAccess;
            _dcsBetSettingService = dcsBetSettingService;
        }

        public async Task<BetSettingViewModel> GetViewModelAsync(int custId)
        {
            const int EsportIndex = 2;
            var viewModel = await _betSettingDataAccess.GetBetSettingAsync(custId).ConfigureAwait(false);

            // Esport must be inserted in this "Feng Shui" position.
            var betSetting = await GetESportsSettingAsync(custId).ConfigureAwait(false);
            viewModel.MainData.Insert(EsportIndex, betSetting);
            return viewModel;
        }

        public async Task<IResultInfo> UpdateBetSettingAsync(
            CommonBetSetting setting,
            IDictionary<string, object> hashParam,
            DcsBetSetting esportSetting)
        {
            if (setting == null || esportSetting == null)
            {
                return ErrorResult("Invalid parameters. bet setting is null");
            }

            var result = await _betSettingDataAccess.UpdateBetSettingAsync(setting, hashParam);

            if (!result.IsSuccessful)
            {
                return result;
            }

            return await _dcsBetSettingService.UpdateBetSettingAsync(setting.CustId, setting.UserId, setting.Ip, new[] { esportSetting });
        }

        private async Task<BetSetting> GetESportsSettingAsync(int custId)
        {
            var dataList = await _dcsBetSettingService.GetBetSettingsAsync(custId, ProductTypes.Sportsbooks2).ConfigureAwait(false);
            if (!dataList.Any())
            {
                throw new InvalidOperationException("There is no E-sport setting data.");
            }

            return dataList.First();
        }
    }
}