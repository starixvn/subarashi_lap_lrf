using System;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Security.Policy;
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
            var uri = new Uri($"{_appSettings.GetValue("12BCustomerDataApi")}?username={metaModel.UserName}");

            try
            {
                var proxyUrl = _appSettings.GetValue("Portal_Proxy");
                var json = await _webClientService.DownloadStringAsync(uri, proxyUrl);
                var jobject = JObject.Parse(json);

                if (jobject.HasValues && ValidateResponse(jobject))
                {
                    return new CustomerInfo(jobject["Data"]);
                }

                return null;
            }
            catch (Exception exception)
            {
                _logger.Error($"Send request incorrectly! Url:" + $" {uri.AbsoluteUri}; \n {LogMessageHelper.GenerateMessage(exception)}");
            }

            return null;
        }

        private static bool ValidateResponse(JObject jobject)
        {
            var errorCode = jobject["ErrorCode"].Value<int>();
            var errorMessage = jobject["ErrorMessage"].Value<string>();

            if (errorCode == 0 && jobject["Data"].Any())
                return true;

            if (errorCode == 404)
                return false;

            throw new Exception($"Detail response: ErrorCode:{errorCode}, ErrorMessage:{errorMessage}");
        }
    }
}