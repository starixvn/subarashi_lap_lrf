namespace Fanex.Athena.Service.Core.Utility
{
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Service.Core.Utility.Interfaces;
    using Newtonsoft.Json;
    using RestSharp;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Net.Http;
    using System.Text;
    using System.Threading;
    using System.Threading.Tasks;

    public class BetListApiClient : IBetListApiClient
    {
        private const string KEYNAME = "BETLIST_TOKEN_KEY";

        private const string LANGUAGEKEY = "Language";

        private readonly IAppSettings _appSetting;

        private static readonly IDictionary<string, HttpClient> _clients = new Dictionary<string, HttpClient>();

        public BetListApiClient(IAppSettings appSettings)
        {
            _appSetting = appSettings;

        }
        private HttpClient GetHttpClient(string language)
        {
            if (_clients.ContainsKey(language))
            {
                return _clients[language];
            }

            var client = new HttpClient();

            client.DefaultRequestHeaders.Add(KEYNAME, _appSetting.GetValue("BetListApiTokenValue"));
            client.DefaultRequestHeaders.Add(LANGUAGEKEY, language);
            _clients.Add(language, client);

            return client;
        }
        private async Task<T> HandleAsync<T>(string path, object value, string language, Func<HttpResponseMessage, Task<T>> codeBlock)
        {
            var client = GetHttpClient(language);
            var url = new Uri(_appSetting.BetListApiHostUrl + path);
            var stringContent = new StringContent(JsonConvert.SerializeObject(value), Encoding.UTF8, "application/json");
            var response = await client.PostAsync(url, stringContent);
            response.EnsureSuccessStatusCode();
            return await codeBlock(response);

        }
        private T Handle<T>(string path, object value, string language, Func<HttpResponseMessage, T> codeBlock)
        {
            Logging.LogService.Info("Start Call BTC");
            var client = new RestClient(new Uri(_appSetting.BetListApiHostUrl));

            var request = new RestRequest(path)
            {
                Method = Method.POST

            };

            request.AddJsonBody(value);

            request.AddHeader(KEYNAME, _appSetting.GetValue("BetListApiTokenValue"));
            request.AddHeader(LANGUAGEKEY, language);

            var data = client.Post(request);

            HttpResponseMessage response = new HttpResponseMessage(data.StatusCode);
            var mem = new MemoryStream(data.RawBytes);
            response.Content = new StreamContent(mem);

            Logging.LogService.Info("End Call BTC");

            return codeBlock(response);

        }

        public Task<HttpResponseMessage> PostAsync(string path, object value, string language)
        {
            return HandleAsync(path, value, language, x => Task.FromResult(x));
        }
        public HttpResponseMessage Post(string path, object value, string language)
        {
            return Handle(path, value, language, x => x
            );

        }
        public Task<T> PostAsync<T>(string path, object value, string language)
        {
            return HandleAsync<T>(
                path,
                value,
                language,
                 async (x) =>
             {
                 var data = await x.Content.ReadAsStringAsync();
                 return JsonConvert.DeserializeObject<T>(data);
             });
        }

        public Task<Stream> PostAsyncStream(string path, object value, string language)
        {
            return HandleAsync(path, value, language, async (x) => await x.Content.ReadAsStreamAsync());
        }

        public Task<string> PostAsyncString(string path, object value, string language)
        {
            return HandleAsync(path, value, language, async (x) => await x.Content.ReadAsStringAsync());
        }
    }
}