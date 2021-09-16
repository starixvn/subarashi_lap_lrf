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

    public class CustomerClassDataAccess : BaseDataAccess, ICustomerClassDataAccess
    {
        private const string NumberStyle = "{0:#,##0.##}";
        private const string DefaultTextValue = "-";

        private readonly ICacheRefAdapter _cacheRefAdapter;

        public CustomerClassDataAccess(ICacheRefAdapter cacheRefAdapter)
        {
            _cacheRefAdapter = cacheRefAdapter;
        }

        public async Task<IEnumerable<CustomerClassLimitPolicyModel>> GetSettingPolicies(GetCustomerClassInformationMetaModel metaModel)
        {
            var result = new List<CustomerClassLimitPolicyModel>();

            using (var db = GetObjectDb("Lrf_CustomerClassPolicySel", 180))
            {
                db.SetParameterValue("Site", metaModel.SiteName);

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    while (reader.Read())
                    {
                        var id = Convert.ToString(reader["CustomerClass"]);
                        var betDelay = reader.ToNullableDecimal("BetDelay");
                        var leagueGroupId = reader.ToInt("LeagueGroupId");
                        var platform = reader.ToNullableInt("Platform");
                        var sportType = Convert.ToString(reader["SportType"]);

                        var policy = new CustomerClassLimitPolicyModel
                        {
                            Id = id,
                            LiveType = Convert.ToInt16(reader["Liveindicator"]),
                            SportType = sportType,
                            SportTypeName = _cacheRefAdapter.GetSportName(sportType),
                            LeagueGroupId = leagueGroupId,
                            BetDelay = FormatNumber(betDelay.HasValue ? betDelay * 100 : null, "{0:#,##0.##}%"),
                            BetInterval = FormatNumber(reader.ToNullableDecimal("NextBetInterval"), NumberStyle),
                            MaxBet = FormatNumber(reader.ToNullableDecimal("MaxBet"), NumberStyle),
                            MaxPerMatch = FormatNumber(reader.ToNullableDecimal("MaxPerMatch"), NumberStyle),
                            RepeatedBets = FormatNumber(reader.ToNullableInt("RepeatedBets"), NumberStyle),
                            MinBet = FormatNumber(reader.ToNullableDecimal("MinBet"), "{0:#,##0}"),
                            Platform = platform == null ? DefaultTextValue : ViewResources.ResourceManager.GetString($"Platform_{platform}"),
                            AgentBetInterval = FormatNumber(reader.ToNullableDecimal("AgentBetInterval"), NumberStyle),
                            CurrencyId = reader.ToNullableInt("CurrencyId") ?? 0
                        };

                        result.Add(policy);
                    }
                }
            }

            return result;
        }

        public async Task<IEnumerable<CustomerClassLimitPolicyModel>> GetSpreadSettingPolicies(GetCustomerClassInformationMetaModel metaModel)
        {
            var result = new List<CustomerClassLimitPolicyModel>();

            using (var db = GetObjectDb("Lrf_CustomerClassSitePolicySel", 180))
            {
                db.SetParameterValue("Site", metaModel.SiteName);

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    while (reader.Read())
                    {
                        var platform = reader.ToNullableInt("Platform");
                        var policy = new CustomerClassLimitPolicyModel
                        {
                            Id = Convert.ToString(reader["CustomerClass"]),
                            OddsGroup = Convert.ToString(reader["SpreadGroup"]).ToUpperInvariant(),
                            CurrencyId = reader.ToNullableInt("CurrencyId") ?? 0,
                            Platform = platform == 0 ? ViewResources.All : ViewResources.ResourceManager.GetString($"Platform_{platform}"),
                        };
                        result.Add(policy);
                    }
                }
            }

            return result;
        }

        public static string FormatNumber(decimal? value, string format)
            => value == null ? DefaultTextValue : string.Format(format, value);
    }
}
