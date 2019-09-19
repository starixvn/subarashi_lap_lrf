using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using MessagePack;
using MessagePack.Resolvers;
using Newtonsoft.Json;

namespace Fanex.Athena.Service.StatelessCore
{
    public class ReportAPIClient : IReportAPIClient
    {
        private const string KEYNAME = "AUTH_TOKEN";

        private const string LANGUAGEKEY = "Accept-Language";
        private const string MsgPackContentType = "application/x-msgpack";
        private const string JsonContentType = "application/json";

        private readonly IAppSettings _appSetting;
        private readonly IHttpClientFactory _httpClientFactory;

        public ReportAPIClient(IAppSettings appSettings, IHttpClientFactory httpClientFactory)
        {
            _appSetting = appSettings;
            _httpClientFactory = httpClientFactory;
        }

        private async Task<T> HandleAsync<T>(string path, object value, string language, MediaType mediaType, Func<HttpResponseMessage, Task<T>> codeBlock)
        {
            var client = _httpClientFactory.GetForHost(new Uri(_appSetting.GetValue("ReportAPIHostUrl")));
            client.DefaultRequestHeaders.Add(KEYNAME, _appSetting.GetValue("ReportAPITokenValue"));
            client.DefaultRequestHeaders.Add(LANGUAGEKEY, language);
            HttpResponseMessage response = null;
            if (mediaType == MediaType.MsgPack)
            {
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(MsgPackContentType));
                using (var content = new ByteArrayContent(MessagePackSerializer.Serialize(value,
                    ContractlessStandardResolver.Instance)))
                {
                    content.Headers.ContentType = new MediaTypeHeaderValue(MsgPackContentType);

                    response = await client.PostAsync(path, content).ConfigureAwait(false);
                }
            }

            if (mediaType == MediaType.Json)
            {
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(JsonContentType));
                var content = new StringContent(JsonConvert.SerializeObject(value), Encoding.UTF8, "application/json");

                response = await client.PostAsync(path, content).ConfigureAwait(false);
            }

            if (response is null || response.StatusCode != HttpStatusCode.OK)
            {
                var errorMessage = new StringBuilder($"Http Error ={await response?.Content.ReadAsStringAsync()}\n Error occur when query report data");
                errorMessage.AppendLine($"HTTP status code ={ response?.StatusCode }");
                throw new InvalidOperationException(errorMessage.ToString());
            }

            return await codeBlock(response).ConfigureAwait(false);
        }

        public async Task<string> PostAsyncString(string path, object value, string language)
        {
            return await HandleAsync(path, value, language, MediaType.Json, async (x) => { return await x.Content.ReadAsStringAsync(); });
        }

        public async Task<T> PostAsync<T>(string path, object value, string language, MediaType mediaType = MediaType.Json) => await HandleAsync<T>(
                path,
                value,
                language,
                mediaType,
                async (x) =>
                {
                    if (mediaType == MediaType.MsgPack)
                    {
                        var result = MessagePackSerializer.Deserialize<T>(await x.Content.ReadAsByteArrayAsync(), ContractlessStandardResolver.Instance);
                        return await Task.FromResult(result).ConfigureAwait(false);
                    }
                    else
                    {
                        return JsonConvert.DeserializeObject<T>(await x.Content.ReadAsStringAsync());
                    }
                }).ConfigureAwait(false);

        public async Task<byte[]> PostByteContentAsync(string path, object value, string language, MediaType mediaType = MediaType.Json)
        {
            return await HandleAsync(path, value, language, mediaType, async (x) =>
             {
                 return await x.Content.ReadAsByteArrayAsync();
             }).ConfigureAwait(false);
        }
    }
}