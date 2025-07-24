using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using Fanex.Athena.Service.StatelessCore.Abstraction;
using Newtonsoft.Json;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Service.StatelessCore
{
    public class ApiResponse<T>
    {
        public int ErrorCode { get; set; }
        public string ErrorMessage { get; set; }
        public T Result { get; set; }
    }

    public class CommonApiClient : BaseApiClient, ICommonApiClient
    {
        protected override string ApiName => "Common API Client";

        public CommonApiClient(HttpClient client) : base(client)
        {
        }

        public async Task<T> GetAsync<T>(string path, string languageCode = "en-US", object value = null, int timeOut = 100)
        {
            var queryString = value != null ? $"?{BuildQueryString(value)}" : string.Empty;
            var url = $"{path}{queryString}";

            var response = await GetStringAsync(url, languageCode, timeOut).ConfigureAwait(false);

            var apiResponse = JsonConvert.DeserializeObject<ApiResponse<T>>(response);
            return apiResponse?.ErrorCode == 0 ? apiResponse.Result : default;
        }

        private static string BuildQueryString(object value)
        {
            var properties = value.GetType().GetProperties();
            var queryParams = new System.Collections.Specialized.NameValueCollection();

            foreach (var prop in properties)
            {
                var propValue = prop.GetValue(value);
                if (propValue != null)
                {
                    queryParams.Add(prop.Name, propValue.ToString());
                }
            }

            return string.Join("&", Array.ConvertAll(queryParams.AllKeys, key => $"{HttpUtility.UrlEncode(key)}={HttpUtility.UrlEncode(queryParams[key])}"));
        }
    }
}