using System;
using System.Linq;
using System.Threading.Tasks;
using Fanex.Athena.Extension.Helpers;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Model.Customer.DTO.CustomerAdmin;
using Fanex.Athena.Model.Customer.MetaModel.CustomerAdmin;
using Fanex.Athena.Service.Customer.Interfaces;
using Fanex.Logging;
using Newtonsoft.Json.Linq;

namespace Fanex.Athena.Service.Customer
{
    public class CustomerAdminAPIService : ICustomerAdminAPIService
    {
        private readonly IWebClientService _webClientService;
        private readonly IAppSettings _appSettings;
        private readonly ILogger _logger;

        public CustomerAdminAPIService(
            IWebClientService webClientService,
            IAppSettings appSettings,
            ILogger logger)
        {
            _webClientService = webClientService;
            _appSettings = appSettings;
            _logger = logger;
        }

        public async Task<CustomerInfo> GetCustomerInfoByUserName(GetCustomerInfoMetaModel metaModel)
        {
            try
            {
                var uri = new Uri($"{_appSettings.GetValue("12BCustomerDataApi")}?username={metaModel.UserName}");
                var json = await _webClientService.DownloadStringAsync(uri);
                var jobject = JObject.Parse(json);

                if (jobject.HasValues && jobject["ErrorCode"].Value<int>() == 0 && jobject["Data"].Any())
                {
                    var data = jobject["Data"];
                    var customerInfoFromAPI = data.ToObject<CustomerInfoAPI>();

                    return new CustomerInfo(customerInfoFromAPI);
                }

                return null;
            }
            catch (Exception exception)
            {
                _logger.Error(LogMessageHelper.GenerateMessage(exception));
            }

            return null;
        }
    }
}