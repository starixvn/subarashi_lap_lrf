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

        public IEnumerable<GroupSubsidiary> GetAllGroupSubsidiaries(string licenseeName, int? whitteLabelId)
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

            var subsidiaryNameList = subsidiaryNames.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

            var subsidiaryData = GetAllSubsidiaries(user, licenseeName);
            var dataGroupByCurrency = subsidiaryData
                .Where(x => (currencyId == CurrencyAll || x.CurrencyId == currencyId) && (!isExcludeTest || x.CurrencyId != CurrencyType.Uus) && subsidiaryNameList.Contains(x.OperatorId))
                .GroupBy(x => x.CurrencyId);

            foreach (var item in dataGroupByCurrency)
            {
                currencyAgentList.Add(item.Key, item.Select(x => x.AgentId));
            }

            return currencyAgentList;
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

            var groupSub = GetAllGroupSubsidiaries(licenseeName, user.WhiteLabelID);

            return user.SubsidiaryViewType == (int)SubsidiaryViewType.MasterManagement
                ? GetWhiteLableTree(groupSub)
                : GetOperatorTree(groupSub);
        }

        public IEnumerable<Subsidiary> GetSubsidiaryList(UserAuthInfo user, string licenseeName, string subsidiaryList)
        {
            return user.UserLevel == UserLevelType.Subsidiary
                ? GetOperatorIdListForSubsidiaryUser(user, licenseeName)
                : GetOperatorIdListForLicenseeUser(user, licenseeName, subsidiaryList);
        }

        public IEnumerable<GroupSubsidiary> GetGroupSubsidiaryList(UserAuthInfo user, string licenseeName, string subsidiaryList, string whiteLabelList)
        {
            var selectedSubsidiaries = subsidiaryList.Split(',');
            var selectedWhiteLabels = whiteLabelList.Split(',').Select(x => x == OtherWhiteaLableId ? (int?)null : int.Parse(x));

            var allGroups = GetAllGroupSubsidiaries(licenseeName, user.WhiteLabelID);

            return allGroups.Where(x => selectedSubsidiaries.Contains(x.OperatorId) && selectedWhiteLabels.Contains(x.WhiteLabelID)).ToList();
        }

        private IEnumerable<Subsidiary> GetOperatorIdListForLicenseeUser(UserAuthInfo user, string licenseeName, string subsidiaryList)
        {
            var allSubsidiaries = GetAllSubsidiaries(user, licenseeName);
            var selectedSubsidiaries = subsidiaryList.Split(',');

            return allSubsidiaries.Where(x => selectedSubsidiaries.Contains(x.OperatorId)).ToList();
        }

        private IEnumerable<Subsidiary> GetOperatorIdListForSubsidiaryUser(UserAuthInfo user, string licenseeName)
        {
            var allSubsidiaries = GetAllSubsidiaries(user, licenseeName);

            return allSubsidiaries.Where(x => x.OperatorId.Equals(user.OperatorId, StringComparison.OrdinalIgnoreCase)).ToList();
        }

        private IEnumerable<CheckedItem> GetWhiteLableTree(IEnumerable<GroupSubsidiary> groupSubsidiaries)
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

        private IEnumerable<CheckedItem> GetOperatorTree(IEnumerable<GroupSubsidiary> groupSubsidiaries)
        {
            var tree = groupSubsidiaries.GroupBy(x => x.OperatorId, (key, group) => new CheckedItem { Value = key, Name = key, Checked = true }).ToList();
        }
    }
}