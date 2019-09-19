namespace Fanex.Athena.Service.StatelessCore.Utility
{
    using System;
    using System.IO;
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Text;
    using System.Threading.Tasks;

    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Service.StatelessCore.CustomException;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Service.StatelessCore.RestSharpExtension;
    using Newtonsoft.Json;

    using RestSharp;


    public class BetListApiClient : IBetListApiClient
    {
        private const string KEYNAME = "BETLIST_TOKEN_KEY";

        private const string LANGUAGEKEY = "Language";

        private readonly IAppSettings _appSetting;

        public BetListApiClient(IAppSettings appSettings)
        {
            _appSetting = appSettings;
        }

        private async Task<T> HandleAsync<T>(string path, object value,
            string language, Func<IRestResponse, Task<T>> codeBlock, int timeout = 0)
        {
            const int oneMinInMillisecond = 60000;
            var client = new RestClient
            {
                BaseUrl = new Uri(_appSetting.BetListApiHostUrl)
            };

            var request = new RestRequest(path)
            {
                JsonSerializer = NewtonsoftJsonSerializer.Default
            };
            request.AddHeader(KEYNAME, _appSetting.GetValue("BetListApiTokenValue"));
            request.AddHeader(LANGUAGEKEY, language);
            request.AddJsonBody(value);
            request.Method = Method.POST;
            if (timeout > 0)
            {
                client.Timeout = oneMinInMillisecond * timeout;
            }
            var result = await client.ExecuteTaskAsync(request).ConfigureAwait(false);

            if (result.ResponseStatus != ResponseStatus.Completed || result.StatusCode != HttpStatusCode.OK)
            {
                var errorMessage = new StringBuilder(
                    $"Http Error ={result.ErrorMessage}\n Error occur when query betlist data");
                errorMessage.AppendLine($"HTTP status code ={ result.StatusCode }");
                throw new ServiceException(errorMessage.ToString(), "BetListApiClient");
            }

            return await codeBlock(result).ConfigureAwait(false);
        }

        public async Task<HttpResponseMessage> PostAsync(string path, object value, string language, int timeout = 0)
        {
            return await HandleAsync<HttpResponseMessage>(path, value, language, async (x) =>
          {
              var result = new HttpResponseMessage(x.StatusCode)
              {
                  Content = new StreamContent(new MemoryStream(x.RawBytes)),
              };
              if (!string.IsNullOrEmpty(x.ContentType))
              {
                  var contentType = x.ContentType.Split(';')[0];
                  if (!string.IsNullOrEmpty(contentType))
                  {
                      result.Content.Headers.ContentType = new MediaTypeHeaderValue(contentType);
                  }
              }

              return await Task.FromResult(result).ConfigureAwait(false);
          }, timeout).ConfigureAwait(false);
        }

        public async Task<T> PostAsync<T>(string path, object value, string language, int timeout = 0)
        {
            return await HandleAsync<T>(
                path,
                value,
                language,
                  async (x) =>
             {
                 return await Task.FromResult(JsonConvert.DeserializeObject<T>(x.Content)).ConfigureAwait(false);
             }, timeout).ConfigureAwait(false);
        }

        public async Task<Stream> PostAsyncStream(string path, object value, string language, int timeout = 0)
        {
            return await HandleAsync(path, value, language, async (x) =>
            {
                Stream stream = new MemoryStream(x.RawBytes);
                return await Task.FromResult(stream).ConfigureAwait(false);
            }, timeout).ConfigureAwait(false);
        }

        public async Task<string> PostAsyncString(string path, object value, string language, int timeout = 0)
        {
            return await HandleAsync(path, value, language, async (x) => await Task.FromResult(x.Content).ConfigureAwait(false)
            , timeout).ConfigureAwait(false);
        }
    }
}