namespace Fanex.Athena.Service.Core.Users
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Core.Users.Interfaces;
    using DataAccess.Core.Users.Interfaces;
    using Extension.Utility.Interfaces;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Auth.Enum;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.DTO.Users;
    using Fanex.Athena.Resources;
    using Fanex.Logging;
    using Model.Core.DataDomain;
    using Model.Core.DTO.Configuration;
    using Model.Report.DTO;

    public class SubsidiaryService : ISubsidiaryService
    {
        private const int CurrencyAll = 0;

        private const string OtherWhiteaLableId = "-2147483648";

        private const int CacheTimeoutSeconds = 60;

        private readonly ICustomMemoryCacheService _cache;

        private readonly ISubsidiaryDataAccess _subLicenseeDataAccess;

        public SubsidiaryService(ISubsidiaryDataAccess subsidiaryDataAccess, ICustomMemoryCacheService cache)
        {
            _cache = cache;
            _subLicenseeDataAccess = subsidiaryDataAccess;
        }

        public bool IsIgnoredSubsidiarySearch(bool subsidiarySearch, string subsidiaryList, UserAuthInfo userInfo)
            => !subsidiarySearch || string.IsNullOrWhiteSpace(subsidiaryList) 
                || (userInfo.ApplicationMode == AppMode.Parasitic ? userInfo.SubsidiaryViewType == (byte)SubsidiaryViewType.NotManagement
                : !userInfo.FunctionList.IsPresent(_ => string.Equals(_.FunctionKey, PermissionKeys.Subsidiary, StringComparison.InvariantCultureIgnoreCase)));

        public IDictionary<int, int[]> GetCurrencyAgentList(string siteName, IDictionary<int, int[]> agentList, string subsidiaryList)
        {
            var needSubsidiaryList = subsidiaryList.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            var userSubsidiaryAgents = GetUserSubsidiaries(agentList, siteName);
            return userSubsidiaryAgents
                .Where(_ => needSubsidiaryList.Contains(_.OperatorId, StringComparer.OrdinalIgnoreCase))
                .GroupBy(_ => _.CurrencyId, (key, group) => new KeyValuePair<int, int[]>(key, group.Select(_ => _.AgentId).ToArray()))
                .ToDictionary(_ => _.Key, _ => _.Value);
        }

        public IDictionary<int, IEnumerable<int>> GetCurrencyAgentList(UserAuthInfo user, string licenseeName,
            string subsidiaryNames, bool isExcludeTest = false, int currencyId = CurrencyAll)
        {
            if (string.IsNullOrWhiteSpace(subsidiaryNames) || (isExcludeTest && currencyId == CurrencyType.Uus))
            {
                return new Dictionary<int, IEnumerable<int>>();
            }

            var subsidiaryNameList = subsidiaryNames.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

            var subsidiaryData = GetUserSubsidiaries(user.CurrencyAgentList, licenseeName).ToList();
            var isFilterByCurrencyId = currencyId != CurrencyAll;
            var result = new List<Subsidiary>();
            for (var i = 0; i < subsidiaryData.Count; i++)
            {
                var item = subsidiaryData[i];
                if (!subsidiaryNameList.Any(x => x.Equals(item.OperatorId, StringComparison.OrdinalIgnoreCase)))
                {
                    continue;
                }
                if (isFilterByCurrencyId && item.CurrencyId != currencyId)
                {
                    continue;
                }
                if (isExcludeTest && item.CurrencyId == CurrencyType.Uus)
                {
                    continue;
                }

                result.Add(item);
            }

            return result.GroupBy(x => x.CurrencyId).ToDictionary(x => x.Key, x => x.Select(i => i.AgentId));
        }

        public IEnumerable<CheckedItem> GetSubsidiaryTree(UserAuthInfo user, string licenseeName, bool ignoreViewType = false)
        {
            if (user.UserLevel == UserLevelType.Subsidiary && !string.IsNullOrWhiteSpace(user.OperatorId))
            {
                return new List<CheckedItem>
                {
                    new CheckedItem
                    {
                        Value = user.OperatorId,
                        Name = user.OperatorId,
                        Checked = true
                    }
                };
            }

            if (!ignoreViewType && user.SubsidiaryViewType == (int)SubsidiaryViewType.NotManagement)
            {
                return Enumerable.Empty<CheckedItem>();
            }

            var groupSub = GetAllGroupSubsidiaries(user, licenseeName);

            return user.SubsidiaryViewType == (int)SubsidiaryViewType.MasterManagement
                ? GetWhiteLabelTree(groupSub)
                : GetOperatorTree(groupSub);
        }
        public IEnumerable<CheckedItem> GetWhiteLabelTree(UserAuthInfo user, string licenseeName)
        {
            var groupSub = GetAllGroupSubsidiaries(user, licenseeName);
            return GetWhiteLabelTree(groupSub);
        }

        public IEnumerable<Subsidiary> GetSubsidiaryList(UserAuthInfo user, string licenseeName, string subsidiaryList)
        {
            var allSubsidiaries = GetUserSubsidiaries(user.CurrencyAgentList, licenseeName);

            if (user.UserLevel == UserLevelType.Subsidiary)
            {
                return allSubsidiaries
                    .Where(x => x.OperatorId.Equals(user.OperatorId, StringComparison.OrdinalIgnoreCase))
                    .ToList();
            }

            var selectedSubsidiaries = subsidiaryList.Split(',');
            return allSubsidiaries
                .Where(x => selectedSubsidiaries.Any(s => s.Equals(x.OperatorId, StringComparison.OrdinalIgnoreCase)))
                .ToList();
        }

        public IEnumerable<GroupSubsidiary> GetGroupSubsidiaryList(UserAuthInfo user, string licenseeName, string subsidiaryList, string whiteLabelList)
        {
            var selectedSubsidiaries = subsidiaryList.Split(',');
            var selectedWhiteLabels = whiteLabelList.Split(',').Select(x => x == OtherWhiteaLableId ? (int?)null : int.Parse(x));

            var allGroups = GetAllGroupSubsidiaries(user, licenseeName);

            return allGroups
                .Where(x => selectedSubsidiaries.Any(s => s.Equals(x.OperatorId, StringComparison.OrdinalIgnoreCase)) && selectedWhiteLabels.Contains(x.WhiteLabelID))
                .ToList();
        }

        private static IEnumerable<CheckedItem> GetWhiteLabelTree(IEnumerable<GroupSubsidiary> groupSubsidiaries)
        {
            return groupSubsidiaries
                .OrderByDescending(x => x.WhiteLabelID)
                .GroupBy(
                    x => new { x.WhiteLabelID, x.WhiteLabelName },
                    (key, group) => new CheckedItem
                    {
                        Value = key.WhiteLabelID?.ToString() ?? OtherWhiteaLableId,
                        Name = key.WhiteLabelName ?? ViewResources.Others,
                        Checked = true,
                        Children = group.Select(x => new CheckedItem { Value = x.OperatorId, Name = x.OperatorId, Checked = true }).ToList()
                    }).ToList();
        }

        private static IEnumerable<CheckedItem> GetOperatorTree(IEnumerable<GroupSubsidiary> groupSubsidiaries)
        {
            return groupSubsidiaries
                .GroupBy(x => x.OperatorId, (key, group) => new CheckedItem { Value = key, Name = key, Checked = true }, StringComparer.OrdinalIgnoreCase)
                .ToList();
        }

        private IEnumerable<GroupSubsidiary> GetAllGroupSubsidiaries(UserAuthInfo user, string licenseeName)
        {
            var cacheKey = string.Format(CacheKey.MemorycacheGroupSubsidiaryListByLicensee, licenseeName);
            var groupSubsidiaryList = _cache.Get(cacheKey, () => _subLicenseeDataAccess.GetGroupSubsidiaries(licenseeName), CacheTimeoutSeconds);
            var operators = GetUserSubsidiaries(user.CurrencyAgentList, licenseeName).Select(o => o.OperatorId.ToLower()).Distinct();
            var hashSetOperator = new HashSet<string>(operators);
            var whiteLabelId = user.WhiteLabelID;
            return groupSubsidiaryList
                .Where(x =>
                    (!whiteLabelId.HasValue || x.WhiteLabelID == whiteLabelId)
                    && hashSetOperator.Contains(x.OperatorId.ToLower()))
                .ToList();
        }

        private IEnumerable<Subsidiary> GetUserSubsidiaries(IDictionary<int, int[]> currencyAgentList, string licenseeName)
        {
            var cacheKey = string.Format(CacheKey.MemorycacheSubsidiaryListByLicensee, licenseeName);
            var subsidiaryList = _cache.Get(cacheKey, () => _subLicenseeDataAccess.GetSubsidiaryList(licenseeName), CacheTimeoutSeconds);
            var userAgentList = currencyAgentList.SelectMany(i => i.Value);
            return subsidiaryList.Where(i => userAgentList.Contains(i.AgentId));
        }
    }
}
