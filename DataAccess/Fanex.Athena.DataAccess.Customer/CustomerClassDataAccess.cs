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

    public class CustomerClassDataAccess : BaseDataAccess, ICustomerClassDataAccess
    {
        private const string NumberStyle = "{0:#,##0.##}";

        private readonly ICacheRefAdapter _cacheRefAdapter;

        public CustomerClassDataAccess(ICacheRefAdapter cacheRefAdapter)
        {
            _cacheRefAdapter = cacheRefAdapter;
        }

        public async Task<IEnumerable<CustomerClassLimitPolicyModel>> GetLimitPolicies(GetCustomerClassInformationMetaModel metaModel)
        {
            var result = new List<CustomerClassLimitPolicyModel>();

            using (var db = GetObjectDb("Lrf_CustomerClassPolicySel", 180))
            {
                db.SetParameterValue("Site", metaModel.SiteName);

                using (var reader = await db.ExecuteReaderAsync())
                {
                    while (reader.Read())
                    {
                        var id = Convert.ToString(reader["CustomerClass"]);
                        var betDelay = reader.ToNullableDecimal("BetDelay");
                        var leadgroupId = Convert.ToString(reader["LeagueGroupId"]);
                        var platform = reader.ToNullableInt("Platform");

                        var policy = new CustomerClassLimitPolicyModel
                        {
                            Id = id,
                            LiveType = Convert.ToInt16(reader["Liveindicator"]),
                            SportTypeName = _cacheRefAdapter.GetSportName(Convert.ToString(reader["SportType"])),
                            LeagueGroupId = string.Equals(leadgroupId, "0") ? "-" : leadgroupId,
                            BetDelay = FormatNumber(betDelay.HasValue ? betDelay * 100 : null, "{0:#,##0.##}%"),
                            BetInterval = FormatNumber(reader.ToNullableDecimal("NextBetInterval"), NumberStyle),
                            MaxBet = FormatNumber(reader.ToNullableDecimal("MaxBet"), NumberStyle),
                            MaxPerMatch = FormatNumber(reader.ToNullableDecimal("MaxPerMatch"), NumberStyle),
                            RepeatedBets = FormatNumber(reader.ToNullableInt("RepeatedBets"), NumberStyle),
                            MinBet = FormatNumber(reader.ToNullableDecimal("MinBet"), "{0:#,##0}"),
                            Platform = platform == null ? "-" : ViewResources.ResourceManager.GetString($"Platform_{platform}"),

                            AgentBetInterval = FormatNumber(reader.ToNullableDecimal("AgentBetInterval"), NumberStyle),
                            CurrencyId = reader.ToNullableInt("CurrencyId") ?? 0
                        };

                        result.Add(policy);
                    }
                }
            }

            return result;
        }

        public async Task<IEnumerable<CustomerClassModel>> GetGroupPolicies(GetCustomerClassInformationMetaModel metaModel)
        {
            var result = new List<CustomerClassModel>();

            using (var db = GetObjectDb("Lrf_CustomerClassSitePolicySel", 180))
            {
                db.SetParameterValue("Site", metaModel.SiteName);

                using (var reader = await db.ExecuteReaderAsync())
                {
                    while (reader.Read())
                    {
                        var id = Convert.ToString(reader["CustomerClass"]);
                        var c = new CustomerClassModel(id);
                        c.OddsGroup = Convert.ToString(reader["SpreadGroup"]).ToUpperInvariant();
                        result.Add(c);
                    }
                }
            }

            return result;
        }

        public static string FormatNumber(decimal? value, string format)
            => value == null ? "-" : string.Format(format, value);
    }
}
