namespace Fanex.Athena.DataAccess.Customer
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Common.Extensions;
    using Core;
    using Core.Extensions;
    using Model.Core;
    using Model.Core.DataDomain;
    using Model.Customer.DTO;
    using Model.Customer.MetaModel;
    using Resources;
    using VendorAdapter.Interfaces;

    public class CustomerClassDataAccess : BaseDataAccess, ICustomerClassDataAccess
    {
        private const string NumberStyle = "{0:#,##0.##}";
        private const string DefaultTextValue = "-";
        private const string CustomerClass = "CustomerClass";

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
                db.SetParameterValue("IsTest", metaModel.IsTest);

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    while (reader.Read())
                    {
                        var id = Convert.ToString(reader[CustomerClass]);
                        var betDelay = reader.ToNullableDecimal("BetDelay");
                        var leagueGroupId = Convert.ToString(reader["LeagueGroupId"]);
                        var platform = reader.ToNullableInt("Platform");
                        var sportType = Convert.ToString(reader["SportType"]);
                        var liveType = Convert.ToInt16(reader["Liveindicator"]);
                        var currencyId = reader.ToNullableInt("CurrencyId") ?? 0;

                        var policy = new CustomerClassLimitPolicyModel
                        {
                            Id = id,
                            LiveType = liveType,
                            LiveTypeText = GetLiveTypeText(liveType),
                            SportType = sportType,
                            SportTypeName = _cacheRefAdapter.GetSportName(sportType),
                            LeagueGroupId = leagueGroupId,
                            BetDelay = FormatNumber(betDelay.HasValue ? betDelay : null, "{0:#,##0.##}%"),
                            BetInterval = FormatNumber(reader.ToNullableDecimal("NextBetInterval"), NumberStyle),
                            MaxBet = FormatNumber(reader.ToNullableDecimal("MaxBet"), NumberStyle),
                            MaxPerMatch = FormatNumber(reader.ToNullableDecimal("MaxPerMatch"), NumberStyle),
                            RepeatedBets = FormatNumber(reader.ToNullableInt("RepeatedBets"), NumberStyle),
                            MinBet = FormatNumber(reader.ToNullableDecimal("MinBet"), "{0:#,##0}"),
                            Platform = platform == 0 ? DefaultTextValue : ViewResources.ResourceManager.GetString($"Platform_{platform}"),
                            AgentBetInterval = FormatNumber(reader.ToNullableDecimal("AgentBetInterval"), NumberStyle),
                            CurrencyId = currencyId,
                            DisableParlay = reader.ToBool("DisableParlay"),
                            RuleTitle = Convert.ToString(reader["RuleTitle"]),
                            PolicyTitle = Convert.ToString(reader["PolicyTitle"])
                        };

                        if (metaModel.CurrencyList.ContainsKey(currencyId) || currencyId == 0)
                        {
                            result.Add(policy);
                        }
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
                db.SetParameterValue("IsTest", metaModel.IsTest);

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    while (reader.Read())
                    {
                        var platform = reader.ToNullableInt("Platform");
                        var sportType = Convert.ToString(reader["SportType"]);
                        var currencyId = reader.ToNullableInt("Currency") ?? 0;

                        var policy = new CustomerClassLimitPolicyModel
                        {
                            Id = Convert.ToString(reader[CustomerClass]),
                            Spread = FormatNumber(reader.ToNullableDecimal("Spread"), "{0:#,##0.00}"),
                            CurrencyId = currencyId,
                            SportType = sportType,
                            SportTypeName = _cacheRefAdapter.GetSportName(sportType),
                            Platform = platform == 0 ? DefaultTextValue : ViewResources.ResourceManager.GetString($"Platform_{platform}")
                        };

                        if (metaModel.CurrencyList.ContainsKey(currencyId) || currencyId == 0)
                        {
                            result.Add(policy);
                        }
                    }
                }
            }

            return result;
        }

        public async Task<IEnumerable<CustomerClassLimitPolicyModel>> GetSettingPoliciesMember(GetCustomerClassInformationMetaModel metaModel)
        {
            var result = new List<CustomerClassLimitPolicyModel>();

            using (var db = GetObjectDb("Lrf_MemberCustomerClassPolicySel", 180))
            {
                db.SetParameterValue("Site", metaModel.SiteName);
                db.SetParameterValue("CurrencyID", metaModel.CurrencyId);
                db.SetParameterValue("CustomerClass", metaModel.CustomerClass);
                db.SetParameterValue("CustId", metaModel.CustId);
                db.SetParameterValue("IsTest", metaModel.IsTest);

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    while (reader.Read())
                    {
                        var id = Convert.ToString(reader[CustomerClass]);
                        var betDelay = reader.ToNullableDecimal("BetDelay");
                        var leagueGroupId = Convert.ToString(reader["LeagueGroupId"]);
                        var platform = reader.ToNullableInt("Platform");
                        var sportType = Convert.ToString(reader["SportType"]);
                        var liveType = Convert.ToInt16(reader["Liveindicator"]);
                        var currencyId = reader.ToNullableInt("CurrencyId") ?? 0;

                        var policy = new CustomerClassLimitPolicyModel
                        {
                            Id = id,
                            LiveType = liveType,
                            LiveTypeText = GetLiveTypeText(liveType),
                            SportType = sportType,
                            SportTypeName = GetSportNameText(sportType, metaModel.IsHideSaba),
                            LeagueGroupId = leagueGroupId,
                            BetDelay = FormatNumber(betDelay.HasValue ? betDelay : null, "{0:#,##0.##}%"),
                            BetInterval = FormatNumber(reader.ToNullableDecimal("NextBetInterval"), NumberStyle),
                            MaxBet = FormatNumber(reader.ToNullableDecimal("MaxBet"), NumberStyle),
                            MaxPerMatch = FormatNumber(reader.ToNullableDecimal("MaxPerMatch"), NumberStyle),
                            RepeatedBets = FormatNumber(reader.ToNullableInt("RepeatedBets"), NumberStyle),
                            MinBet = FormatNumber(reader.ToNullableDecimal("MinBet"), "{0:#,##0}"),
                            Platform = platform == 0 ? DefaultTextValue : ViewResources.ResourceManager.GetString($"Platform_{platform}"),
                            AgentBetInterval = FormatNumber(reader.ToNullableDecimal("AgentBetInterval"), NumberStyle),
                            CurrencyId = currencyId,
                            DisableParlay = reader.ToBool("DisableParlay"),
                            RuleTitle = Convert.ToString(reader["RuleTitle"]),
                            PolicyTitle = Convert.ToString(reader["PolicyTitle"])
                        };

                        if (metaModel.CurrencyList.ContainsKey(currencyId) || currencyId == 0)
                        {
                            result.Add(policy);
                        }
                    }
                }
            }

            return result;
        }

        public static string FormatNumber(decimal? value, string format)
            => value == null ? DefaultTextValue : string.Format(format, value);

        private string GetLiveTypeText(int type)
        {
            switch (type)
            {
                case 0:
                    return ViewResources.PreMatch;

                case 1:
                    return ViewResources.Live2;

                default:
                    return ViewResources.All;
            }
        }

        private string GetSportNameText(string sportId, bool isHideSaba)
        {
            if (!int.TryParse(sportId, out var id))
            {
                return string.Empty;
            }

            if (IsVirtualSport(id))
            {
                var prefixText = isHideSaba ? ViewResources.Virtual : ViewResources.Saba;
                var sportName = _cacheRefAdapter.GetSportNameByResourceData("DummySport", id.ToString());
                return $"{prefixText} {SabaHelper.RemoveSabaText(sportName)}";
            }

            return _cacheRefAdapter.GetSportName(id.ToString());
        }

        private static bool IsVirtualSport(int sportId)
        {
            return sportId == SabaSportType.SabaBasketBall
                   || sportId == SabaSportType.SabaSoccer
                   || sportId == SabaSportType.VirtualSports
                   || sportId == SabaSportType.SabaCricket;
        }
    }
}