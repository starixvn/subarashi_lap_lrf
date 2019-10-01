using System;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Service.StatelessCore.CustomException;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.Service.StatelessCore.RestSharpExtension;
using Newtonsoft.Json;

using RestSharp;

namespace Fanex.Athena.Service.StatelessCore
{
    public class LGAPIClient : ILGAPIClient
    {
        private const string KEYNAME = "LGAPI_TOKEN_KEY";

        private const string LANGUAGEKEY = "Language";

        private readonly IAppSettings _appSetting;
        private readonly IRestClient _restClient;
        public LGAPIClient(IAppSettings appSettings, IRestClient restClient)
        {
            _appSetting = appSettings;
            _restClient = restClient;
        }
        public async Task<T> PostAsync<T>(string path, object value, string language)
        {
            _restClient.BaseUrl = new Uri(_appSetting.GetValue("LGAPIHostUrl"));

            var request = new RestRequest(path)
            {
                JsonSerializer = NewtonsoftJsonSerializer.Default
            };
            request.AddHeader(KEYNAME, _appSetting.GetValue("LGAPITokenValue"));
            request.AddHeader(LANGUAGEKEY, language);
            request.AddJsonBody(value);
            request.Method = Method.POST;

            var result = await _restClient.ExecuteTaskAsync(request).ConfigureAwait(false);

            if (result.ResponseStatus != ResponseStatus.Completed || result.StatusCode != HttpStatusCode.OK)
            {
                var errorMessage = new StringBuilder($"Http Error ={result.ErrorMessage}\n Error occur when query report data");
                errorMessage.AppendLine($"HTTP status code ={ result.StatusCode }");
                throw new InvalidOperationException(errorMessage.ToString(), result.ErrorException);
            }

            return JsonConvert.DeserializeObject<T>(result.Content);

        }
    }
}
