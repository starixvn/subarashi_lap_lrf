using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Service.StatelessCore.Interfaces;

using MessagePack;

using Newtonsoft.Json;

namespace Fanex.Athena.Service.StatelessCore
{
    public class ReportAPIClient : IReportAPIClient
    {
        private const string LANGUAGEKEY = "Accept-Language";
        private const string MsgPackContentType = "application/x-msgpack";
        private const string JsonContentType = "application/json";
        private readonly HttpClient _client;

        private static readonly JsonSerializerSettings _jsonSerializerSettings = new JsonSerializerSettings
        {
            DateTimeZoneHandling = DateTimeZoneHandling.Unspecified,
            NullValueHandling = NullValueHandling.Ignore,
        };

        public ReportAPIClient(HttpClient client)
        {
            _client = client;
        }

        private async Task<T> HandleAsync<T>(string path, object value, string language, MediaType mediaType, Func<HttpResponseMessage, Task<T>> codeBlock)
        {
            using (var httpRequest = new HttpRequestMessage(HttpMethod.Post, new Uri(path, UriKind.Relative)))
            {
                httpRequest.Headers.Add(LANGUAGEKEY, language);
                HttpResponseMessage response = null;
                if (mediaType == MediaType.MsgPack)
                {
                    httpRequest.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue(MsgPackContentType));
                    using (var content = new ByteArrayContent(MessagePackSerializer.Serialize(value)))
                    {
                        content.Headers.ContentType = new MediaTypeHeaderValue(MsgPackContentType);
                        httpRequest.Content = content;
                        response = await _client.SendAsync(httpRequest).ConfigureAwait(false);
                    }
                }

                if (mediaType == MediaType.Json)
                {
                    httpRequest.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue(JsonContentType));
                    using (var content = new StringContent(JsonConvert.SerializeObject(value, _jsonSerializerSettings),
                        Encoding.UTF8, "application/json"))
                    {
                        httpRequest.Content = content;
                        response = await _client.SendAsync(httpRequest).ConfigureAwait(false);
                    }
                }

                if (response is null ||
                    (response.StatusCode != HttpStatusCode.OK && response.StatusCode != HttpStatusCode.NoContent))
                {
                    var errorMessage = new StringBuilder($"Http Error ={await response?.Content.ReadAsStringAsync()}\n Error occur when query report data");
                    errorMessage.AppendLine($"HTTP status code ={ response?.StatusCode }");
                    throw new InvalidOperationException(errorMessage.ToString());
                }

                return await codeBlock(response).ConfigureAwait(false);
            }
        }

        public async Task<string> PostAsyncString(string path, object value, string language)
        {
            return await HandleAsync(path, value, language, MediaType.Json, async (x) => { return await x.Content.ReadAsStringAsync(); });
        }

        public async Task<byte[]> PostByteContentAsync(string path, object value, string language, MediaType mediaType = MediaType.Json)
        {
            return await HandleAsync(path, value, language, mediaType, async (x) =>
             {
                 return await x.Content.ReadAsByteArrayAsync();
             }).ConfigureAwait(false);
        }

        public async Task<HttpResponseMessage> PostContentAsync(string path, object value, string language, MediaType mediaType = MediaType.Json)
        {
            return await HandleAsync(path, value, language, mediaType, async (x) =>
            {
                return x;
            }).ConfigureAwait(false);
        }
    }
}