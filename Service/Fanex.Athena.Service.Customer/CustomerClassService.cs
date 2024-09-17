namespace Fanex.Athena.Service.Customer
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using DataAccess.Customer;
    using Extension.Helpers;
    using Extension.Utility;
    using Extension.Utility.Interfaces;
    using Interfaces;
    using Logging;
    using Model.Core.DTO.Common;
    using Model.Core.DTO.Configuration;
    using Model.Customer.DTO;
    using Model.Customer.MetaModel;
    using Newtonsoft.Json;
    using Resources;
    using StatelessCore.Interfaces;

    public class CustomerClassService : ICustomerClassService
    {
        private const string DefaultTextValue = "-";
        private const string ChineseCulture = "zh-CN";
        private readonly IAppSettings _appSettings;
        private readonly ICustomMemoryCacheService _cache;

        private readonly ICustomerClassDataAccess _dataAccess;
        private readonly ILogger _logger;
        private readonly IPortalApiService _portalApiService;
        private readonly IWebClientService _webClientService;

        public CustomerClassService(
            ICustomerClassDataAccess dataAccess,
            IWebClientService webClientService,
            IPortalApiService portalApiService,
            IAppSettings appSettings,
            ICustomMemoryCacheService cache,
            ILogger logger)
        {
            _dataAccess = dataAccess;
            _webClientService = webClientService;
            _portalApiService = portalApiService;
            _appSettings = appSettings;
            _cache = cache;
            _logger = logger;
        }

        public async Task<RiskLevelModel> GetRiskLevelPolicyByCustomerClass(GetCustomerClassInformationMetaModel metaModel)
        {
            if (string.IsNullOrEmpty(metaModel.CustomerClass) || metaModel.CustomerClass.Equals("0"))
            {
                return new RiskLevelModel();
            }

            var customerClassLimitPolicies = (await _dataAccess.GetSettingPoliciesMember(metaModel)).ToList();
            await MapLicLeagueGroup(customerClassLimitPolicies, metaModel.Language, metaModel.IsHideSaba);
            MapCurrencyName(metaModel, customerClassLimitPolicies);

            return new RiskLevelModel
            {
                CustomerClassLimitPolicies = customerClassLimitPolicies
            };
        }

        public async Task<IEnumerable<CustomerClassModel>> GetSettingPolicy(GetCustomerClassInformationMetaModel metaModel)
        {
            var policies = await _dataAccess.GetSettingPolicies(metaModel);
            await MapLicLeagueGroup(policies, metaModel.Language, metaModel.IsHideSaba);

            var result = GroupPolicies(metaModel, policies);
            await MapCustomerClassCategories(metaModel, result);
            return result.OrderBy(r => int.Parse(r.Id));
        }

        public async Task<IEnumerable<CustomerClassModel>> GetSpreadSettingPolicy(GetCustomerClassInformationMetaModel metaModel)
        {
            var limitPolicies = await _dataAccess.GetSpreadSettingPolicies(metaModel);
            var result = GroupPolicies(metaModel, limitPolicies);
            await MapCustomerClassCategories(metaModel, result);
            return result;
        }

        public async Task<IEnumerable<CustomerClassModel>> GetAllCustomerClass(string language)
        {
            var customerClassCategories = await GetCustomerClassCategories();
            return customerClassCategories.Select(_ =>
            {
                var translatedCategory = string.Equals(language, ChineseCulture, StringComparison.OrdinalIgnoreCase)
                    ? _.CategoryNameCN
                    : _.CategoryName;
                return new CustomerClassModel(_.CustomerClass.ToString())
                {
                    Category = translatedCategory
                };
            });
        }

        public async Task<IEnumerable<string>> GetAllCustomerClassId()
        {
            var result = new List<string> { "0" };
            var listCategory = await GetCustomerClassCategories();
            result.AddRange(listCategory
                .OrderBy(_ => _.CustomerClass)
                .Select(_ => _.CustomerClass.ToString())
            );
            return result.Distinct();
        }

        public async Task<IEnumerable<RiskLevel>> GetAllRiskLevel()
        {
            var customerClassCategories = await GetCustomerClassCategories();

            customerClassCategories.Add(
                new CustomerClassCategoryModel
                {
                    CustomerClass = 0,
                    CustomerClassName = RiskLevel.Uncategorized,
                    SabaRiskLevel = RiskLevel.Uncategorized
                }
            );

            var riskLevelList = customerClassCategories.GroupBy(_ => _.SabaRiskLevel).Select((_, index) => new RiskLevel
            {
                Id = index.ToString(),
                Key = _.Key,
                Name = ViewResources.ResourceManager.GetString(_.Key) ?? _.Key,
                CustomerClassList = _.OrderBy(cc => cc.CustomerClass).Select(cc => cc.CustomerClass.ToString()).Distinct()
            }).OrderBy(_ => _, new RiskLevelComparer());

            return riskLevelList;
        }

        private async Task MapLicLeagueGroup(IEnumerable<CustomerClassLimitPolicyModel> policies, string langCode, bool isHideSaba)
        {
            foreach (var policy in policies)
            {
                var hasLeagueGroup = !string.IsNullOrEmpty(policy.LeagueGroupId);
                var isAllLeagueGroup = string.Equals(policy.LeagueGroupId, "-1", StringComparison.OrdinalIgnoreCase);
                var defaultLeagueGroups = new List<LeagueGroup> { new LeagueGroup { LeagueGroupName = DefaultTextValue } };

                if (hasLeagueGroup && int.TryParse(policy.SportType, out var sportType))
                {
                    var leagueGroups = await _portalApiService.GetLeagueGroupsAsync(sportType, langCode, isHideSaba);
                    var leagueGroupIdList = policy.LeagueGroupId.Split(',');
                    var leagueGroupListByPolicy = (isAllLeagueGroup
                            ? leagueGroups
                            : leagueGroups.Where(_ => leagueGroupIdList.Contains(_.InHouseLeagueGroupID.ToString())))
                        .Select(x => new LeagueGroup { LeagueGroupId = x.LicLeagueGroupID, LeagueGroupName = x.LicGroupName })
                        .GroupBy(elem => elem.LeagueGroupId).Select(group => group.First()).ToList(); //get distinct by LeagueGroupId

                    policy.LeagueGroups = leagueGroupListByPolicy.Any() ? leagueGroupListByPolicy : defaultLeagueGroups;
                }
                else
                {
                    policy.LeagueGroups = defaultLeagueGroups;
                }
            }
        }

        private List<CustomerClassModel> GroupPolicies(
            GetCustomerClassInformationMetaModel metaModel,
            IEnumerable<CustomerClassLimitPolicyModel> policies)
        {
            var result = policies.GroupBy(
                source => source.Id,
                source =>
                {
                    source.Currency = metaModel.CurrencyList.ContainsKey(source.CurrencyId)
                        ? metaModel.CurrencyList[source.CurrencyId]
                        : DefaultTextValue;
                    return source;
                },
                (key, source) => new CustomerClassModel(key)
                {
                    Policies = source.ToList()
                }).ToList();
            return result;
        }

        private async Task<List<CustomerClassCategoryModel>> GetCustomerClassCategories()
        {
            try
            {
                var customerClassCategory = _cache.Get<List<CustomerClassCategoryModel>>(CacheKey.MemorycacheCustomerClassCategories);

                if (customerClassCategory != null)
                {
                    return customerClassCategory;
                }

                var uri = new Uri(_appSettings.GetValue("CustomerClassCategoryApi"));
                var apiResult = await _webClientService.DownloadStringAsync(uri);
                var result = JsonConvert.DeserializeObject<List<CustomerClassCategoryModel>>(apiResult);

                if (result.Any())
                {
                    _cache.Set(CacheKey.MemorycacheCustomerClassCategories, result);
                    _cache.SetWithoutExpired(CacheKey.MemorycacheCustomerClassCategories + "_backup", result);
                    return result;
                }

                customerClassCategory = _cache.Get<List<CustomerClassCategoryModel>>(CacheKey.MemorycacheCustomerClassCategories + "_backup");

                return customerClassCategory ?? new List<CustomerClassCategoryModel>();
            }
            catch (Exception exception)
            {
                _logger.Error(LogMessageHelper.GenerateMessage(exception));
            }

            return new List<CustomerClassCategoryModel>();
        }

        private async Task MapCustomerClassCategories(
            GetCustomerClassInformationMetaModel metaModel,
            List<CustomerClassModel> groups)
        {
            var categories = await GetCustomerClassCategories();
            var isChinese = string.Equals(metaModel.Language, ChineseCulture, StringComparison.OrdinalIgnoreCase);
            foreach (var g in groups)
            {
                var category = categories.Where(c => c.CustomerClass.ToString() == g.Id)
                    .Select(c => isChinese ? c.CategoryNameCN : c.CategoryName);
                g.Category = category.Any() ? string.Join(", ", category) : DefaultTextValue;
            }
        }

        private static void MapCurrencyName(GetCustomerClassInformationMetaModel metaModel, IEnumerable<CustomerClassLimitPolicyModel> policies)
        {
            policies.ToList().ForEach(policy => policy.Currency = metaModel.CurrencyList.GetValueOrDefault(policy.CurrencyId, DefaultTextValue));
        }
    }
}