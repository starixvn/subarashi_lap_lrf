namespace Fanex.Athena.Service.Customer
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.Athena.DataAccess.Customer;
    using Fanex.Athena.Extension.Helpers;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Extension.Utility.Interfaces;
    using Fanex.Athena.Model.Core.DTO.Configuration;
    using Fanex.Athena.Model.Customer.DTO;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.Customer.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Logging;
    using Newtonsoft.Json;

    public class CustomerClassService : ICustomerClassService
    {
        private const string DefaultTextValue = "-";
        private const string ChineseCulture = "zh-CN";
        private const int CacheTimeoutSeconds = 900; // 15 minutes

        private readonly ICustomerClassDataAccess _dataAccess;
        private readonly IWebClientService _webClientService;
        private readonly IPortalApiService _portalApiService;
        private readonly IAppSettings _appSettings;
        private readonly ICustomMemoryCacheService _cache;
        private readonly ILogger _logger;

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

            var customerClassLimitPolicies = (await GetSettingPolicy(metaModel)).FirstOrDefault(p => p.Id == metaModel.CustomerClass)?.Policies;
            var siteMemberPolicies = await _dataAccess.GetCustomerClassSitePolicyMember(metaModel);

            return new RiskLevelModel
            {
                CustomerClassLimitPolicies = customerClassLimitPolicies ?? Enumerable.Empty<CustomerClassLimitPolicyModel>(),
                SiteMemberPolicies = siteMemberPolicies ?? Enumerable.Empty<CustomerClassSitePolicyMemberModel>()
            };
        }

        public async Task<IEnumerable<CustomerClassModel>> GetSettingPolicy(GetCustomerClassInformationMetaModel metaModel)
        {
            var policies = await _dataAccess.GetSettingPolicies(metaModel);
            await MapLicLeagueGroup(policies, metaModel.Language);

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
                var translatedCategory = string.Equals(language, ChineseCulture, StringComparison.OrdinalIgnoreCase) ? _.CategoryNameCN : _.CategoryName;
                return new CustomerClassModel(_.CustomerClass.ToString())
                {
                    Category = translatedCategory,
                };
            });
        }

        private async Task MapLicLeagueGroup(IEnumerable<CustomerClassLimitPolicyModel> policies, string langCode)
        {
            foreach (var policy in policies)
            {
                if (policy.LeagueGroupId > 0 && int.TryParse(policy.SportType, out int sportType))
                {
                    var leagueGroups = await _portalApiService.GetLeagueGroupsAsync(sportType, langCode);
                    var matchedLeagueGroup = leagueGroups.FirstOrDefault(_ => _.InHouseLeagueGroupID == policy.LeagueGroupId);
                    policy.LicLeagueGroupId = matchedLeagueGroup?.LicLeagueGroupID ?? 0;
                    policy.LicLeagueGroupName = matchedLeagueGroup?.LicGroupName ?? DefaultTextValue;
                }
                else
                {
                    policy.LicLeagueGroupName = DefaultTextValue;
                }
            }
        }

        private List<CustomerClassModel> GroupPolicies(GetCustomerClassInformationMetaModel metaModel, IEnumerable<CustomerClassLimitPolicyModel> policies)
        {
            var result = policies.GroupBy(
                    source => source.Id,
                    source =>
                    {
                        source.Currency = metaModel.CurrencyList.ContainsKey(source.CurrencyId) ? metaModel.CurrencyList[source.CurrencyId] : DefaultTextValue;
                        return source;
                    },
                    (key, source) => new CustomerClassModel(key)
                    {
                        Policies = source.ToList()
                    }).ToList();
            return result;
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

        private async Task<List<CustomerClassCategoryModel>> GetCustomerClassCategories()
        {
            var customerClassCategory = new List<CustomerClassCategoryModel>();

            try
            {
                customerClassCategory = _cache.Get<List<CustomerClassCategoryModel>>(CacheKey.MemorycacheCustomerClassCategories);

                if (customerClassCategory != null)
                {
                    return customerClassCategory;
                }

                var uri = new Uri(_appSettings.GetValue("CustomerClassCategoryApi"));
                var apiResult = await _webClientService.DownloadStringAsync(uri);
                var result = JsonConvert.DeserializeObject<List<CustomerClassCategoryModel>>(apiResult);

                if (result.Any())
                {
                    _cache.Set(CacheKey.MemorycacheCustomerClassCategories, result, CacheTimeoutSeconds);
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

        private async Task MapCustomerClassCategories(
            GetCustomerClassInformationMetaModel metaModel, List<CustomerClassModel> groups)
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
    }
}