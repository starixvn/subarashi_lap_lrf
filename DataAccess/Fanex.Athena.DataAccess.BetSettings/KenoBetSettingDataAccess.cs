namespace Fanex.Athena.DataAccess.BetSettings
{
    using System.Collections.Generic;
    using System.Data;
    using System.Threading.Tasks;
    using Fanex.Athena.DataAccess.Core;
    using Fanex.Athena.Model.BetSettings.DTO;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Common;
    using Interfaces;

    public class KenoBetSettingDataAccess : BaseDataAccess, IKenoBetSettingDataAccess
    {
        public async Task<IList<BetSetting>> GetBetSettingsAsync(int custId)
        {
            const string UspName = "Lrf_CustomerSelEditKN";

            using (var db = this.GetObjectDb(UspName))
            {
                db.SetParameterValue("CustID", custId);
                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    return ReadBetSetting(reader);
                }
            }
        }

        public async Task<IResultInfo> UpdateBetSettingAsync(CommonBetSetting metaModel, string xmlData)
        {
            const string UspName = "Lrf_CustomerUpdMember_MinMaxBetKN";

            using (var db = this.GetObjectDb(UspName))
            {
                db.SetParameterValue("custid", metaModel.CustId);
                db.SetParameterValue("userid", metaModel.UserId);
                db.SetParameterValue("language", metaModel.Language);
                db.SetParameterValue("ip", metaModel.Ip);
                db.SetParameterValue("dataxml", xmlData);
                db.SetParameterValue("errcode", null);
                db.SetParameterValue("errmsg", null);

                await db.ExecuteNonQueryAsync().ConfigureAwait(false);

                return GetResult(db);
            }
        }

        private IList<BetSetting> ReadBetSetting(IDataReader reader)
        {
            var betSettings = new List<BetSetting>();
            while (reader.Read())
            {
                var gameTypeId = Converter.ToString2(reader["GameTypeID"]);
                var sport = new BetSetting
                {
                    MaxBet = Converter.ToDecimal(reader["MaxBet"]),
                    MinBet = Converter.ToDecimal(reader["MinBet"]),
                    MaxPerMatchMax = Converter.ToDecimal(reader["MaxPerMatch_Max"]),
                    MaxPerMatch = Converter.ToDecimal(reader["MaxPerMatch"]),
                    BetValueMax = Converter.ToDecimal(reader["MaxBet_Min"]),
                    BetValueMin = Converter.ToDecimal(reader["MinBet_Max"]),
                    SportId = gameTypeId
                };

                betSettings.Add(sport);
            }

            return betSettings;
        }
    }
}
