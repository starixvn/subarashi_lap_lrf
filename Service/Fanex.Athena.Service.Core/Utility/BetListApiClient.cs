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
        private HttpClient GetHttpClient(string language)
        {
            var client = new HttpClient();

            client.DefaultRequestHeaders.Add(KEYNAME, _appSetting.GetValue("BetListApiTokenValue"));
            client.DefaultRequestHeaders.Add(LANGUAGEKEY, language);

            return client;
        }
        private async Task<T> HandleAsync<T>(string path, object value, string language, Func<IRestResponse, Task<T>> codeBlock)
        {
            //var client = GetHttpClient(language);
            LogService.Info("Start to query BTC/Mutilple cust");
            try
            {

                var url = new Uri(_appSetting.BetListApiHostUrl + path);
                //var stringContent = new StringContent(JsonConvert.SerializeObject(value), Encoding.UTF8, "application/json");
                //var response = await client.PostAsync(url, stringContent);
                //response.EnsureSuccessStatusCode();
                //return await codeBlock(response);

                var client = new RestClient();
                var request = new RestRequest(url);
                request.AddHeader(KEYNAME, _appSetting.GetValue("BetListApiTokenValue"));
                request.AddHeader(LANGUAGEKEY, language);
                request.AddJsonBody(value);
                request.Method = Method.POST;

                var task = await client.ExecuteTaskAsync(request);
                return await codeBlock(task);
            }
            catch (TaskCanceledException ex)
            {
                LogService.Error(ex.Message, ex);
                throw;
            }
            finally
            {
                //if (client != null)
                //{
                //    client.Dispose();
                //}
                LogService.Info("End query BTC/Mutilple cust");
            }

        }

        public Task<HttpResponseMessage> PostAsync(string path, object value, string language)
        {
            return HandleAsync<HttpResponseMessage>(path, value, language, (x) =>
           {
               var result = new HttpResponseMessage(x.StatusCode)
               {
                   Content = new StreamContent(new MemoryStream(x.RawBytes))
               };

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
                 return Task.FromResult(JsonConvert.DeserializeObject<T>(x.Content));
             });
        }

        public Task<Stream> PostAsyncStream(string path, object value, string language)
        {
            return HandleAsync(path, value, language, (x) =>
            {

                Stream stream = new MemoryStream(x.RawBytes);
                return Task.FromResult(stream);

            });
        }

        public Task<string> PostAsyncString(string path, object value, string language)
        {
            return HandleAsync(path, value, language, (x) => Task.FromResult(x.Content));
        }
    }
}