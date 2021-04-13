using System;
using System.Collections.Generic;
using System.Linq;
using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Repositories;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.ViewModels;
using Fanex.Athena.Resources;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Services
{
    public class PlayerSubsidiaryService : IPlayerSubsidiaryService
    {
        private const string SubsidiaryGroupsByLicenseeCacheKey = "SubsidiaryGroupsCacheKey_{0}";
        private const string SubsidiariesByLicenseeCacheKey = "SubsidiariesByLicenseeCacheKey_{0}";
        private const int SubsidiaryCacheTime = 60;
        private const string OtherWhiteLabelId = "-2147483648";

        private readonly ICustomMemoryCacheService cache;
        private readonly IPlayerSubsidiaryRepository repository;

        public PlayerSubsidiaryService(ICustomMemoryCacheService cache, IPlayerSubsidiaryRepository repository)
        {
            this.cache = cache;
            this.repository = repository;
        }

        public IEnumerable<SubsidiaryViewModel> GetSubsidiaries(GetSubsidiariesMetaModel param)
        {
            var isOperator = param.UserLevel == UserLevelType.Subsidiary && !string.IsNullOrWhiteSpace(param.OperatorId);
            if (isOperator)
            {
                return new List<SubsidiaryViewModel> { new SubsidiaryViewModel(param.OperatorId) };
            }

            switch (param.ViewType)
            {
                case (int)SubsidiaryViewType.NotManagement:
                    return Enumerable.Empty<SubsidiaryViewModel>();
                case (int)SubsidiaryViewType.MasterManagement:
                    return GetWhiteLabelTree(param);
                default:
                    return GetOperatorTree(param);
            }
        }

        public SubsidiaryViewType GetSubsidiaryViewType(GetSubsidiaryViewTypeMetaModel param)
        {
            if (param.UserLevel == UserLevelType.Subsidiary
                || param.ViewType == (byte)SubsidiaryViewType.NotManagement
                || !param.HasSubsidiary)
            {
                return SubsidiaryViewType.NotManagement;
            }

            if (param.ViewType == (byte)SubsidiaryViewType.NormalManagement || param.WhiteLabelID.HasValue)
            {
                return SubsidiaryViewType.NormalManagement;
            }

            return SubsidiaryViewType.MasterManagement;
        }

        public IDictionary<int, int[]> GetCurrencyAgentList(GetSubsidiariesMetaModel param, string subsidiaries)
        {
            if (string.IsNullOrWhiteSpace(subsidiaries))
            {
                return new Dictionary<int, int[]>();
            }

            var subsidiaryNameList = subsidiaries.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

            var subsidiaryData = GetUserSubsidiaries(param).ToList();
            var result = new List<SubsidiaryViewModel>();
            for (var i = 0; i < subsidiaryData.Count; i++)
            {
                var item = subsidiaryData[i];
                if (subsidiaryNameList.Any(x => x.Equals(item.OperatorId, StringComparison.OrdinalIgnoreCase)))
                {
                    result.Add(item);
                }
            }

            return result.GroupBy(x => x.CurrencyId).ToDictionary(x => x.Key, x => x.Select(i => i.AgentId).ToArray());
        }

        private IEnumerable<SubsidiaryViewModel> GetWhiteLabelTree(GetSubsidiariesMetaModel param)
        {
            var groups = GetSubsidaryGroups(param);
            return groups
               .OrderByDescending(x => x.WhiteLabelId)
               .GroupBy(
                   x => new { x.WhiteLabelId, x.WhiteLabelName },
                   (key, group) => new SubsidiaryViewModel
                   {
                       Id = key.WhiteLabelId?.ToString() ?? OtherWhiteLabelId,
                       Name = key.WhiteLabelName ?? ViewResources.Others,
                       Children = group.Select(x => new SubsidiaryViewModel(x.OperatorId))
                   });
        }

        private IEnumerable<SubsidiaryViewModel> GetOperatorTree(GetSubsidiariesMetaModel param)
        {
            var groups = GetSubsidaryGroups(param);
            return groups.GroupBy(x => x.OperatorId, (key, group) => new SubsidiaryViewModel(key), StringComparer.OrdinalIgnoreCase);
        }

        private IEnumerable<SubsidiaryViewModel> GetSubsidaryGroups(GetSubsidiariesMetaModel param)
        {
            var cacheKey = string.Format(SubsidiaryGroupsByLicenseeCacheKey, param.LicenseeName);
            var subsidaryGroups = cache.Get(cacheKey, () => repository.GetSubsidaryGroups(param), SubsidiaryCacheTime);
            var operators = GetUserSubsidiaries(param);

            return subsidaryGroups
                .Where(x =>
                    (!param.WhiteLabelId.HasValue || x.WhiteLabelId == param.WhiteLabelId)
                    && operators.Any(o => string.Equals(o.OperatorId, x.OperatorId, StringComparison.OrdinalIgnoreCase)));
        }

        private IEnumerable<SubsidiaryViewModel> GetUserSubsidiaries(GetSubsidiariesMetaModel param)
        {
            var cacheKey = string.Format(SubsidiariesByLicenseeCacheKey, param.LicenseeName);
            var subsidiaryList = cache.Get(cacheKey, () => repository.GetSubsidiaries(param), SubsidiaryCacheTime);
            var userAgentList = param.CurrencyAgentList.SelectMany(i => i.Value);
            return subsidiaryList.Where(i => userAgentList.Contains(i.AgentId));
        }
    }
}
