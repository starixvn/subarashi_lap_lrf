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
        private readonly ICustomerClassDataAccess _dataAccess;
        private readonly IWebClientService _webClientService;
        private readonly IAppSettings _appSettings;
        private readonly ILogger _logger;
        private const string DefaultTextValue = "-";

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

        public async Task<IEnumerable<CustomerClassModel>> GetCustomerClassInformation(GetCustomerClassInformationMetaModel metaModel)
        {
            var custClasses = new Dictionary<string, CustomerClassModel>();
            var result = await GroupLimitPolicies(metaModel, custClasses);
            var groups = await _dataAccess.GetGroupPolicies(metaModel);

            foreach (var g in groups)
            {
                var id = g.Id;
                if (!custClasses.ContainsKey(id))
                {
                    var c = new CustomerClassModel(id);
                    custClasses[id] = c;
                    result.Add(c);
                }

                custClasses[id].OddsGroup = string.IsNullOrWhiteSpace(g.OddsGroup) ? DefaultTextValue : g.OddsGroup;
            }

            await MapCustomerClassCategories(metaModel, result);
            return result.OrderBy(r => int.Parse(r.Id));
        }

        private async Task<List<CustomerClassModel>> GroupLimitPolicies(
            GetCustomerClassInformationMetaModel metaModel,
            Dictionary<string, CustomerClassModel> custClasses)
        {
            var result = new List<CustomerClassModel>();
            var limits = await _dataAccess.GetLimitPolicies(metaModel);
            foreach (var l in limits)
            {
                l.Currency = metaModel.CurrencyList.ContainsKey(l.CurrencyId) ? metaModel.CurrencyList[l.CurrencyId] : DefaultTextValue;

                var id = l.Id;
                if (!custClasses.ContainsKey(id))
                {
                    var c = new CustomerClassModel(id);
                    custClasses[id] = c;
                    result.Add(c);
                }

                custClasses[id].LimitPolicies.Add(l);
            }

            return result;
        }

        private async Task<List<CustomerClassCategoryModel>> GetCustomerClassCategories()
        {
            var result = new List<CustomerClassCategoryModel>();
            try
            {
                var uri = new Uri(_appSettings.GetValue("CustomerClassCategoryApi"));
                var apiResult = await _webClientService.DownloadStringAsync(uri);
                result = JsonConvert.DeserializeObject<List<CustomerClassCategoryModel>>(apiResult);
            }
            catch (Exception exception)
            {
                _logger.Error(LogMessageHelper.GenerateMessage(exception));
            }

            return result;
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
