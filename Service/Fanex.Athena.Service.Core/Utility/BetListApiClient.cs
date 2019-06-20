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
        private async Task<T> HandleAsync<T>(string path, object value, string language, Func<IRestResponse, Task<T>> codeBlock)
        {
            LogService.Info("Start to query BTC/Mutilple cust");

            var client = new RestClient
            {
                BaseUrl = new Uri(_appSetting.BetListApiHostUrl)
            };
            var request = new RestRequest(path);
            request.AddHeader(KEYNAME, _appSetting.GetValue("BetListApiTokenValue"));
            request.AddHeader(LANGUAGEKEY, language);
            request.AddJsonBody(value);
            request.Method = Method.POST;

            var task = await client.ExecuteTaskAsync(request);
            return await codeBlock(task);


        }

        public Task<HttpResponseMessage> PostAsync(string path, object value, string language)
        {
            return HandleAsync<HttpResponseMessage>(path, value, language, (x) =>
           {
               var result = new HttpResponseMessage(x.StatusCode)
               {
                   Content = new StreamContent(new MemoryStream(x.RawBytes)),

               };
               if (x.ContentType.IndexOf("application/json") > -1)
               {
                   result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
               }else if(x.ContentType.IndexOf("application/zip") >-1)
               {
                   result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/zip");

               }else
               {
                   result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/xls");

               }
               LogService.Info("End to query BTC/Mutilple cust");

               return Task.FromResult(result);
           });

        }

        public Task<T> PostAsync<T>(string path, object value, string language)
        {
            return HandleAsync<T>(
                path,
                value,
                language,
                  (x) =>
             {
                 LogService.Info("End to query BTC/Mutilple cust");

                 return Task.FromResult(JsonConvert.DeserializeObject<T>(x.Content));
             });
        }

        public Task<Stream> PostAsyncStream(string path, object value, string language)
        {
            return HandleAsync(path, value, language, (x) =>
            {

                LogService.Info("End to query BTC/Mutilple cust");

                Stream stream = new MemoryStream(x.RawBytes);
                return Task.FromResult(stream);

            });
        }

        public Task<string> PostAsyncString(string path, object value, string language)
        {
            LogService.Info("End to query BTC/Mutilple cust");

            return HandleAsync(path, value, language, (x) => Task.FromResult(x.Content));
        }
    }
}