using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.Service.StatelessCore.RestSharpExtension;
using Newtonsoft.Json;

using RestSharp;

namespace Fanex.Athena.Service.StatelessCore
{
    public class ReportAPIClient : IReportAPIClient
    {
        private const string KEYNAME = "AUTH_TOKEN";

        private const string LANGUAGEKEY = "Accept-Language";

        private readonly IAppSettings _appSetting;

        public ReportAPIClient(IAppSettings appSettings)
        {
            _appSetting = appSettings;
        }

        private async Task<T> HandleAsync<T>(string path, object value, string language, Func<IRestResponse, Task<T>> codeBlock)
        {
            var client = new RestClient
            {
                BaseUrl = new Uri(_appSetting.GetValue("ReportAPIHostUrl"))
            };

            var request = new RestRequest(path)
            {
                JsonSerializer = NewtonsoftJsonSerializer.Default
            };
            request.AddHeader(KEYNAME, _appSetting.GetValue("ReportAPITokenValue"));
            request.AddHeader(LANGUAGEKEY, language);
            request.AddJsonBody(value);
            request.Method = Method.POST;

            var result = await client.ExecuteTaskAsync(request).ConfigureAwait(false);

            if (result.ResponseStatus != ResponseStatus.Completed || result.StatusCode != HttpStatusCode.OK)
            {
                var errorMessage = new StringBuilder($"Http Error ={result.ErrorMessage}\n Error occur when query report data");
                errorMessage.AppendLine($"HTTP status code ={ result.StatusCode }");
                throw new InvalidOperationException(errorMessage.ToString(), result.ErrorException);
            }

            return await codeBlock(result).ConfigureAwait(false);
        }

        public async Task<T> PostAsync<T>(string path, object value, string language)
        {
            return await HandleAsync<T>(
                path,
                value,
                language,
                async (x) =>
                {
                    return await Task.FromResult(JsonConvert.DeserializeObject<T>(x.Content)).ConfigureAwait(false);
                }).ConfigureAwait(false);
        }

        public async Task<HttpResponseMessage> PostFileAsync(string path, object value, string fileName, string language)
        {
            return await HandleAsync(path, value, language, async (x) =>
            {
                var result = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ByteArrayContent(x.RawBytes),
                };
                result.Headers.TransferEncodingChunked = true;
                result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
                {
                    FileName = fileName
                };

                return await Task.FromResult(result).ConfigureAwait(false);
            }).ConfigureAwait(false);
        }

        public async Task<Stream> PostAsyncStream(string path, object value, string language)
        {
            return await HandleAsync(path, value, language, async (x) =>
            {
                var stream = new MemoryStream(x.RawBytes);
                return await Task.FromResult(stream).ConfigureAwait(false);
            }).ConfigureAwait(false);
        }
    }
}