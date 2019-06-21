namespace Fanex.Athena.Service.Core.Utility
{
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Service.Core.Utility.Interfaces;
    using Fanex.Logging;
    using Newtonsoft.Json;
    using RestSharp;
    using System;
    using System.IO;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Threading.Tasks;
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
         
            var request = new RestRequest(path);
            request.AddHeader(KEYNAME, _appSetting.GetValue("BetListApiTokenValue"));
            request.AddHeader(LANGUAGEKEY, language);
            request.AddJsonBody(value);
            request.Method = Method.POST;
            if (timeout > 0)
            {
                client.Timeout = oneMinInMillisecond * timeout;
            }
            var task = await client.ExecuteTaskAsync(request).ConfigureAwait(false);
            return await codeBlock(task).ConfigureAwait(false);

        }

        public async Task<HttpResponseMessage> PostAsync(string path, object value, string language, int timeout = 0)
        {
            return await HandleAsync<HttpResponseMessage>(path, value, language, (x) =>
          {
              var result = new HttpResponseMessage(x.StatusCode)
              {
                  Content = new StreamContent(new MemoryStream(x.RawBytes)),

              };
              var contentType = x.ContentType.Split(';')[0];

              result.Content.Headers.ContentType = new MediaTypeHeaderValue(contentType);

              return Task.FromResult(result);
          }, timeout).ConfigureAwait(false);

        }

        public async Task<T> PostAsync<T>(string path, object value, string language, int timeout = 0)
        {
            return await HandleAsync<T>(
                path,
                value,
                language,
                  (x) =>
             {
                 return Task.FromResult(JsonConvert.DeserializeObject<T>(x.Content));
             }, timeout).ConfigureAwait(false);
        }

        public async Task<Stream> PostAsyncStream(string path, object value, string language, int timeout = 0)
        {
            return await HandleAsync(path, value, language, (x) =>
            {
                Stream stream = new MemoryStream(x.RawBytes);
                return Task.FromResult(stream);

            }, timeout).ConfigureAwait(false);
        }

        public async Task<string> PostAsyncString(string path, object value, string language, int timeout = 0)
        {
            return await HandleAsync(path, value, language, (x) => Task.FromResult(x.Content), timeout).ConfigureAwait(false);
        }
    }
}