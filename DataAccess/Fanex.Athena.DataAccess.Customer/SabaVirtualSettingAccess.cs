namespace Fanex.Athena.DataAccess.Customer
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.DataAccess.Core;
    using Fanex.Athena.DataAccess.Core.Extensions;
    using Fanex.Athena.Model.Customer.DTO;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Resources;
    using Fanex.Athena.VendorAdapter.Interfaces;
    using Fanex.Common.Extensions;

    public class SabaVirtualSettingAccess : BaseDataAccess, ISabaVirtualSettingDataAccess
    {
        private const string NumberStyle = "{0:#,##0.##}";
        private const string DefaultTextValue = "-";

        private readonly ICacheRefAdapter _cacheRefAdapter;

        public SabaVirtualSettingAccess(ICacheRefAdapter cacheRefAdapter)
        {
            _cacheRefAdapter = cacheRefAdapter;
        }

        public async Task<IEnumerable<SabaVirtualSettingInformationModel>> GetSabaVirtualSettingInformation(SabaVirtuaSettingInformationMetaModel metaModel)
        {
            var result = new List<SabaVirtualSettingInformationModel>();

            using (var db = GetObjectDb("Lrf_SabaVirtualSettingSel"))
            {
                db.SetParameterValue("DangerLevel", metaModel.LevelList);

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    while (reader.Read())
                    {
                        var dangerLevel = Convert.ToString(reader["DangerLevel"]);
                        var sportType = Convert.ToString(reader["SportType"]);
                        int.TryParse(dangerLevel, out int id);

                        var setting = new SabaVirtualSettingInformationModel
                        {
                            Id = id,
                            DangerLevel = dangerLevel,
                            SportType = sportType,
                            SportTypeName = _cacheRefAdapter.GetSportName(sportType),
                            LeagueGroupId = reader.ToInt("LeagueGroupId"),
                            BetDelay = FormatNumber(reader.ToNullableDecimal("BetDelay"), NumberStyle),
                            NextBetInterval = FormatNumber(reader.ToNullableDecimal("NextBetInterval"), NumberStyle),
                            MaxPerMatch = FormatNumber(reader.ToNullableDecimal("MaxPerMatch"), NumberStyle),
                            ApplyParlay = reader.ToBool("ApplyParlay")
                        };

                        result.Add(setting);
                    }
                }
            }

            return result;
        }

        public static string FormatNumber(decimal? value, string format)
            => value == null ? DefaultTextValue : string.Format(format, value);
    }
}