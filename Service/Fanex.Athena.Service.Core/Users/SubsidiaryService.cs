namespace Fanex.Athena.Service.Core.Users
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Core.Users.Interfaces;
    using DataAccess.Core.Users.Interfaces;
    using Extension.Utility.Interfaces;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Core.DTO.Users;
    using Model.Core.DataDomain;
    using Model.Core.DTO.Configuration;
    using Model.Report.DTO;

    public class SubsidiaryService : ISubsidiaryService
    {
        private const int CacheTimeoutSeconds = 60;

        private readonly ICustomMemoryCacheService _cache;

        private readonly ISubsidiaryDataAccess _subLicenseeDataAccess;

        public SubsidiaryService(ISubsidiaryDataAccess subsidiaryDataAccess, ICustomMemoryCacheService cache)
        {
            _cache = cache;
            _subLicenseeDataAccess = subsidiaryDataAccess;
        }

        public IEnumerable<GroupSubsidiary> GetGroupSubsidiaries(string licenseeName, int? whitteLabelId)
        {
            var cacheKey = string.Format(CacheKey.MemorycacheGroupSubsidiaryListByLicensee, licenseeName);
            var groupSubsidiaryList = _cache.Get(cacheKey, () => _subLicenseeDataAccess.GetGroupSubsidiaries(licenseeName), CacheTimeoutSeconds);
            return whitteLabelId.HasValue ? groupSubsidiaryList.Where(x => x.WhiteLabelID == whitteLabelId.Value).ToList() : groupSubsidiaryList;
        }

        public IEnumerable<Subsidiary> GetAllSubsidiaries(UserAuthInfo user, string licenseeName)
        {
            var cacheKey = string.Format(CacheKey.MemorycacheSubsidiaryListByLicensee, licenseeName);
            var subsidiaryList = _cache.Get(cacheKey, () => _subLicenseeDataAccess.GetSubsidiaryList(licenseeName), CacheTimeoutSeconds);
            var userAgentList = user.CurrencyAgentList.SelectMany(i => i.Value);
            return subsidiaryList.Where(i => userAgentList.Contains(i.AgentId));
        }

        public IDictionary<int, IEnumerable<int>> GetCurrencyAgentList(UserAuthInfo user, string licenseeName, string subsidiaryNames, bool isExcludeTest = false, int currencyId = 0)
        {
            var currencyAgentList = new Dictionary<int, IEnumerable<int>>();

            if (string.IsNullOrWhiteSpace(subsidiaryNames) || (isExcludeTest && currencyId == CurrencyType.Uus))
            {
                return currencyAgentList;
            }

            const int CurrencyAll = 0;
            const string OtherMembersKey = "(others)";

            var subsidiaryNameList = subsidiaryNames.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

            var subsidiaryData = GetAllSubsidiaries(user, licenseeName);
            var dataGroupByCurrency = subsidiaryData
                .Where(x => (currencyId == CurrencyAll || x.CurrencyId == currencyId) && subsidiaryNameList.Contains(x.OperatorId))
                .GroupBy(x => x.CurrencyId);

            foreach (var item in dataGroupByCurrency)
            {
                currencyAgentList.Add(item.Key, item.Select(x => x.AgentId));
            }

            if (subsidiaryNameList.Contains(OtherMembersKey))
            {
                var exceptedAgentList = subsidiaryData
                    .Where(x => !subsidiaryNameList.Contains(x.OperatorId)).Select(x => x.AgentId).ToList();
                var otherAgentList = user.CurrencyAgentList
                    .Where(x => x.Key == currencyId || currencyId == CurrencyAll).ToDictionary(x => x.Key, x => x.Value.AsEnumerable());

                currencyAgentList = currencyAgentList.Union(otherAgentList).GroupBy(x => x.Key)
                    .ToDictionary(x => x.Key, x => x.SelectMany(g => g.Value).Except(exceptedAgentList).Distinct());
                currencyAgentList = currencyAgentList.Where(x => x.Value.Any()).ToDictionary(x => x.Key, x => x.Value);
            }

            if (isExcludeTest && currencyAgentList.ContainsKey(CurrencyType.Uus))
            {
                currencyAgentList.Remove(CurrencyType.Uus);
            }

            return currencyAgentList;
        }
    }
}