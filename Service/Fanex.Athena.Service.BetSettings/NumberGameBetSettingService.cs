// -----------------------------------------------------------------------
// <copyright file="NumberGameBetSettingService.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Service.BetSettings
{
    using System.Collections;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using BetSettings.Interfaces;

    using DataAccess.BetSettings.Interfaces;

    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Model.BetSettings.DTO;
    using Model.BetSettings.ViewModel;
    using Model.Core.DTO.Common;

    using Resources;

    public class NumberGameBetSettingService : BetSettingBaseService, INumberGameBetSettingService
    {
        private readonly INumberGameBetSettingDataAccess _betSettingDataAccess;

        public NumberGameBetSettingService(
            INumberGameBetSettingDataAccess betSettingDataAccess)
        {
            _betSettingDataAccess = betSettingDataAccess;
        }

        public async Task<BetSettingViewModel> GetViewModelAsync(int custId)
        {
            var betSettings = await _betSettingDataAccess.GetBetSettingAsync(custId).ConfigureAwait(false);

            return new BetSettingViewModel
            {
                MainData = betSettings
            };
        }

        public async Task<IResultInfo> UpdateBetSettingAsync(CommonBetSetting setting, Hashtable data
            )
        {
            var numberGameBetSetting = new NumberGameBetSetting
            {
                CustId = setting.CustId,
                UserId = setting.UserId,
                Language = setting.Language,
                Ip = setting.Ip,
                MinBet = (decimal)data["minbet161"],
                MaxBet = (decimal)data["maxbet161"],
                MaxPerMatch = (decimal)data["maxpermatch161"],
                IsDataChange =
                                                !string.IsNullOrEmpty(data["minbet161"].ToString()) &&
                                                !string.IsNullOrEmpty(data["maxbet161"].ToString()) &&
                                                !string.IsNullOrEmpty(data["maxpermatch161"].ToString()) &&
                                                !string.IsNullOrEmpty(data["maxperball"].ToString()),
                MaxPerBall = (decimal)data["maxperball"]
            };

            return await _betSettingDataAccess.UpdateBetSettingAsync(numberGameBetSetting);
        }
    }
}