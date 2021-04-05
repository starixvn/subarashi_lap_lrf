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
    using Fanex.Athena.Model.Customer.DTO;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Service.Customer.Interfaces;
    using Fanex.Logging;
    using Newtonsoft.Json;

    public class CustomerClassService : ICustomerClassService
    {
        private const string DefaultTextValue = "-";

        private readonly ICustomerClassDataAccess _dataAccess;
        private readonly IWebClientService _webClientService;
        private readonly IAppSettings _appSettings;
        private readonly ILogger _logger;

        public CustomerClassService(
            ICustomerClassDataAccess dataAccess,
            IWebClientService webClientService,
            IAppSettings appSettings,
            ILogger logger)
        {
            _dataAccess = dataAccess;
            _webClientService = webClientService;
            _appSettings = appSettings;
            _logger = logger;
        }

        public async Task<IEnumerable<CustomerClassModel>> GetSettingPolicy(GetCustomerClassInformationMetaModel metaModel)
        {
            var policies = await _dataAccess.GetSettingPolicies(metaModel);
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

        private async Task<IEnumerable<CustomerClassCategoryModel>> GetCustomerClassCategories()
        {
            try
            {
                var uri = new Uri(_appSettings.GetValue("CustomerClassCategoryApi"));
                var apiResult = await _webClientService.DownloadStringAsync(uri);
                var result = JsonConvert.DeserializeObject<List<CustomerClassCategoryModel>>(apiResult);
                return result;
            }
            catch (Exception exception)
            {
                _logger.Error(LogMessageHelper.GenerateMessage(exception));
            }

            return Enumerable.Empty<CustomerClassCategoryModel>();
        }

        private async Task MapCustomerClassCategories(
            GetCustomerClassInformationMetaModel metaModel, List<CustomerClassModel> groups)
        {
            var categories = await GetCustomerClassCategories();
            var isEnglish = string.Equals(metaModel.Language, "en-US", StringComparison.OrdinalIgnoreCase);
            foreach (var g in groups)
            {
                var category = categories.Where(c => c.CustomerClass == g.Id)
                    .Select(c => isEnglish ? c.CategoryName : c.CategoryNameCN);
                g.Category = category.Any() ? string.Join(", ", category) : DefaultTextValue;
            }
        }
    }
}
