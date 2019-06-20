namespace Fanex.Athena.Service.Core.Utility
{
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Service.Core.Utility.Interfaces;
    using Fanex.Logging;
    using Newtonsoft.Json;
    using System;
    using System.IO;
    using System.Net.Http;
    using System.Text;
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
        private async Task<T> HandleAsync<T>(string path, object value, string language, Func<HttpResponseMessage, Task<T>> codeBlock)
        {
            var client = GetHttpClient(language);
            LogService.Info("Start to query BTC/Mutilple cust");
            try
            {
                var url = new Uri(_appSetting.BetListApiHostUrl + path);
                var stringContent = new StringContent(JsonConvert.SerializeObject(value), Encoding.UTF8, "application/json");
                var response = await client.PostAsync(url, stringContent);
                response.EnsureSuccessStatusCode();
                return await codeBlock(response);

            }
            catch (TaskCanceledException ex)
            {
                LogService.Error(ex.Message, ex);
                throw;
            }
            finally
            {
                if (client != null)
                {
                    client.Dispose();
                }
                LogService.Info("End query BTC/Mutilple cust");
            }

        }

        public async Task<HttpResponseMessage> PostAsync(string path, object value, string language)
        {
            var client = GetHttpClient(language);
            LogService.Info("Start to query BTC/Mutilple cust");
            try
            {
                var url = new Uri(_appSetting.BetListApiHostUrl + path);
                var stringContent = new StringContent(JsonConvert.SerializeObject(value), Encoding.UTF8, "application/json");
                var response = await client.PostAsync(url, stringContent);
                response.EnsureSuccessStatusCode();
                return response;
            }
            catch (TaskCanceledException ex)
            {
                LogService.Error(ex.Message, ex);
                throw;
            }
            finally
            {
                if (client != null)
                {
                    client.Dispose();
                }
                LogService.Info("End query BTC/Mutilple cust");
            }
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