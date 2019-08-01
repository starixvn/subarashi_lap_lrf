// -----------------------------------------------------------------------
// <copyright file="DcsBetSettingService.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Service.BetSettings
{
    using System.Collections.Generic;
    using System.Text;
    using System.Threading.Tasks;

    using DataAccess.BetSettings.Interfaces;

    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Interfaces;

    using Model.BetSettings.DTO;
    using Model.Core.DTO.Common;

    using Resources;

    public class DcsBetSettingService : BetSettingBaseService, IDcsBetSettingService
    {
        private readonly IDcsBetSettingDataAccess _betSettingDataAccess;

        public DcsBetSettingService(IDcsBetSettingDataAccess betSettingDataAccess)
        {
            _betSettingDataAccess = betSettingDataAccess;
        }


        public async Task<bool?> GetStatusAsync(int custId, int productId)
        {
            return await _betSettingDataAccess.GetStatusAsync(custId, productId);
        }

        public async Task<IResultInfo> UpdateStatusAsync(int userId, int custId, string ip, bool status, int productId)
        {
            return await _betSettingDataAccess.UpdateStatusAsync(userId, custId, ip, status, productId);
        }

        public async Task<IList<BetSetting>> GetBetSettingsAsync(int custId, int productId)
        {
            return await _betSettingDataAccess.GetBetSettingAsync(custId, productId);
        }

        public async Task<IResultInfo> UpdateBetSettingAsync(int custId, int userId, string ip, IEnumerable<DcsBetSetting> betSettings)
        {
            const string XMLPattern = "<ROOT>{0}</ROOT>";
            const string XMLElement = "<BetLimit SportType=\"{0}\" BetType=\"{1}\" MinBet=\"{2}\" MaxBet=\"{3}\" MaxPerMatch=\"{4}\" ></BetLimit>";

            var xmlElementBuilder = new StringBuilder();

            foreach (var setting in betSettings)
            {
                xmlElementBuilder.Append(string.Format(XMLElement, setting.SportId, setting.BetType, setting.MinBet, setting.MaxBet, setting.MaxPerMatch));
            }

            var xmlparam = string.Format(XMLPattern, xmlElementBuilder);

            return await _betSettingDataAccess.UpdateBetSettingAsync(
                custId,
                userId,
                ip,
                xmlparam);
        }
    }
}