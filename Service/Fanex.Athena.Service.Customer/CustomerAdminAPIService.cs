using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Fanex.Athena.Extension.Helpers;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Model.Customer.DTO.CustomerAdmin;
using Fanex.Athena.Model.Customer.Enum;
using Fanex.Athena.Model.Customer.MetaModel.CustomerAdmin;
using Fanex.Athena.Service.Customer.Interfaces;
using Fanex.Logging;
using Newtonsoft.Json;
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
            const string relativePath = "/Get12BCustomerData";
            var uri = new Uri($"{_appSettings.GetValue("12BCustomerApi")}{relativePath}?username={metaModel.UserName}");

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

        public async Task<HttpResponseMessage> GetKYCInfoByUserName(GetCustomerInfoMetaModel metaModel)
        {
            const string relativePath = "/GetMemberImage";

            var uri = new Uri($"{_appSettings.GetValue("12BCustomerApi")}{relativePath}?username={metaModel.UserName}");

            try
            {
                var proxyUrl = _appSettings.GetValue("Portal_Proxy");
                var response = await _webClientService.SendRequest(uri, proxyUrl);
                response.EnsureSuccessStatusCode();
                return response;
            }
            catch (Exception exception)
            {
                _logger.Error($"Send request incorrectly! Url:" + $" {uri.AbsoluteUri}; \n {LogMessageHelper.GenerateMessage(exception)}");
                return null;
            }
        }

        public CustomerInfoIvory GetCustomerInfoIvoryByUserName(GetCustomerInfoMetaModel metaModel, string siteName)
        {
            var uri = new Uri(_appSettings.GetValue("IvoryCustomerDataApi") + "/GetCustInfo");

            try
            {
                var json = PostIvoryAPIWithProxy(uri, siteName, metaModel.UserName, metaModel.SabaId);
                var jobject = JObject.Parse(json);

                if (jobject.HasValues && jobject["ibcCustID"].Value<int>() != 0)
                {
                    var customerInfo = new CustomerInfoIvory(jobject)
                    {
                        SabaId = metaModel.SabaId,
                        APISiteId = siteName
                    };

                    return customerInfo;
                }

                return null;
            }
            catch (Exception exception)
            {
                _logger.Error($"Send request incorrectly! Url:" + $" {uri.AbsoluteUri}; UserName:\" + $\" " +
                    $"{metaModel.UserName}; SiteName:\" + $\" {siteName}; \n {LogMessageHelper.GenerateMessage(exception)}");
            }

            return null;
        }

        public IEnumerable<CustomerDepositHistory> GetIvoryDepositHistoryByUserName(GetCustomerInfoMetaModel metaModel, string siteName)
        {
            var uri = new Uri(_appSettings.GetValue("IvoryCustomerDataApi") + "/GetFinancialLog");

            try
            {
                var json = PostIvoryAPIWithProxy(uri, siteName, metaModel.UserName, metaModel.SabaId);
                var apiResult = JsonConvert.DeserializeObject<List<IvoryFinancialLog>>(json)
                    .Where(_ => _.FinancialType == (int)FinancialType.Deposit);

                if (apiResult.Any())
                {
                    var result = apiResult.Select(_ => new CustomerDepositHistory
                    {
                        Amount = _.Amount,
                        TransID = _.TransID,
                        TransDate = _.Time
                    }).ToList();

                    return result;
                }

                return null;
            }
            catch (Exception exception)
            {
                _logger.Info($"Send request incorrectly! Url:" + $" {uri.AbsoluteUri}; UserName:\" + $\" " +
                    $"{metaModel.UserName}; SiteName:\" + $\" {siteName}; \n {LogMessageHelper.GenerateMessage(exception)}");
            }

            return null;
        }

        public IEnumerable<CustomerWithdrawHistory> GetIvoryWithdrawHistoryByUserName(GetCustomerInfoMetaModel metaModel, string siteName)
        {
            var uri = new Uri(_appSettings.GetValue("IvoryCustomerDataApi") + "/GetFinancialLog");

            try
            {
                var json = PostIvoryAPIWithProxy(uri, siteName, metaModel.UserName, metaModel.SabaId);
                var apiResult = JsonConvert.DeserializeObject<List<IvoryFinancialLog>>(json)
                    .Where(_ => _.FinancialType == (int)FinancialType.Withdrawal);

                if (apiResult.Any())
                {
                    var result = apiResult.Select(_ => new CustomerWithdrawHistory
                    {
                        Amount = _.Amount,
                        TransID = _.TransID,
                        TransDate = _.Time
                    }).ToList();

                    return result;
                }

                return null;
            }
            catch (Exception exception)
            {
                _logger.Info($"Send request incorrectly! Url:" + $" {uri.AbsoluteUri}; UserName:\" + $\" " +
                    $"{metaModel.UserName}; SiteName:\" + $\" {siteName}; \n {LogMessageHelper.GenerateMessage(exception)}");
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

        private string PostIvoryAPIWithProxy(Uri uri, string siteId, string userName, string sabaId)
        {
            var proxyUrl = _appSettings.GetValue("Portal_Proxy");
            userName = !string.IsNullOrEmpty(sabaId) ? string.Empty : userName;

            var body = JsonConvert.SerializeObject(
                new
                {
                    siteId,
                    userName,
                    sabaId
                }
            );

            var header = new Dictionary<HttpRequestHeader, string>
            {
                { HttpRequestHeader.ContentType, "application/json" }
            };

            return _webClientService.UploadString(uri, body, header, proxyUrl);
        }
    }
}