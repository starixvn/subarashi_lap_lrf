namespace Fanex.Athena.Service.Core.Users
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Core.Users.Interfaces;
    using DataAccess.Core.Users.Interfaces;
    using Extension.Utility.Interfaces;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.DTO.Users;
    using Fanex.Athena.Resources;
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

        public IDictionary<int, IEnumerable<int>> GetCurrencyAgentList(UserAuthInfo user, string licenseeName,
            string subsidiaryNames, bool isExcludeTest = false, int currencyId = CurrencyAll)
        {
            if (string.IsNullOrWhiteSpace(subsidiaryNames) || (isExcludeTest && currencyId == CurrencyType.Uus))
            {
                return new Dictionary<int, IEnumerable<int>>();
            }

            var subsidiaryNameList = subsidiaryNames.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

            var subsidiaryData = GetUserSubsidiaries(user, licenseeName).ToList();
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

        public IEnumerable<CheckedItem> GetSubsidiaryTree(UserAuthInfo user, string licenseeName)
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

            if (user.SubsidiaryViewType == (int)SubsidiaryViewType.NotManagement)
            {
                return Enumerable.Empty<CheckedItem>();
            }

            var groupSub = GetAllGroupSubsidiaries(user, licenseeName, user.WhiteLabelID);

            return user.SubsidiaryViewType == (int)SubsidiaryViewType.MasterManagement
                ? GetWhiteLableTree(groupSub)
                : GetOperatorTree(groupSub);
        }

        public IEnumerable<Subsidiary> GetSubsidiaryList(UserAuthInfo user, string licenseeName, string subsidiaryList)
        {
            var allSubsidiaries = GetUserSubsidiaries(user, licenseeName);

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

            var allGroups = GetAllGroupSubsidiaries(user, licenseeName, user.WhiteLabelID);

            return allGroups
                .Where(x => selectedSubsidiaries.Any(s => s.Equals(x.OperatorId, StringComparison.OrdinalIgnoreCase)) && selectedWhiteLabels.Contains(x.WhiteLabelID))
                .ToList();
        }

        private static IEnumerable<CheckedItem> GetWhiteLableTree(IEnumerable<GroupSubsidiary> groupSubsidiaries)
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

        private IEnumerable<GroupSubsidiary> GetAllGroupSubsidiaries(UserAuthInfo user, string licenseeName, int? whitteLabelId)
        {
            var cacheKey = string.Format(CacheKey.MemorycacheGroupSubsidiaryListByLicensee, licenseeName);
            var groupSubsidiaryList = _cache.Get(cacheKey, () => _subLicenseeDataAccess.GetGroupSubsidiaries(licenseeName), CacheTimeoutSeconds);
            var operators = this.GetUserSubsidiaries(user, licenseeName);

            return groupSubsidiaryList
                .Where(x =>
                    (!whitteLabelId.HasValue || x.WhiteLabelID == whitteLabelId)
                    && operators.Any(o => o.OperatorId.Equals(x.OperatorId, StringComparison.OrdinalIgnoreCase)))
                .ToList();
        }

        private IEnumerable<Subsidiary> GetUserSubsidiaries(UserAuthInfo user, string licenseeName)
        {
            var cacheKey = string.Format(CacheKey.MemorycacheSubsidiaryListByLicensee, licenseeName);
            var subsidiaryList = _cache.Get(cacheKey, () => _subLicenseeDataAccess.GetSubsidiaryList(licenseeName), CacheTimeoutSeconds);
            var userAgentList = user.CurrencyAgentList.SelectMany(i => i.Value);
            return subsidiaryList.Where(i => userAgentList.Contains(i.AgentId));
        }
    }
}