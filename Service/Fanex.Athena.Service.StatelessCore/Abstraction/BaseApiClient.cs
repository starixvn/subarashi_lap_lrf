using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

using Fanex.Athena.Model.Core.DataDomain;

using MessagePack;

using Newtonsoft.Json;

namespace Fanex.Athena.Service.StatelessCore.Abstraction
{
    public abstract class BaseApiClient
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

        protected virtual string ApiName => "Base API Client";

        protected BaseApiClient(HttpClient client)
        {
            _client = client;
        }

        protected async Task<T>
           HandleAsync<T>(string path, object value, string language, MediaType mediaType, Func<HttpResponseMessage, Task<T>> codeBlock)
        {
            if (codeBlock is null)
            {
                throw new NotImplementedException();
            }

            using (var httpRequest = new HttpRequestMessage(HttpMethod.Post, _client.BaseAddress + path))
            {
                httpRequest.Headers.Add(LANGUAGEKEY, language);
                HttpResponseMessage response = null;
                try
                {
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
                            Encoding.UTF8, JsonContentType))
                        {
                            httpRequest.Content = content;
                            response = await _client.SendAsync(httpRequest).ConfigureAwait(false);
                        }
                    }

                    if (response is null || (response.StatusCode != HttpStatusCode.OK && response.StatusCode != HttpStatusCode.NoContent))
                    {
                        var errorMessage = new StringBuilder($"Http Error ={await response?.Content.ReadAsStringAsync()}\n Error occur when query {ApiName} data");
                        errorMessage.AppendLine($"HTTP status code ={ response?.StatusCode }");
                        throw new InvalidOperationException(errorMessage.ToString());
                    }

                    return await codeBlock(response).ConfigureAwait(false);
                }
                catch (Exception ex)
                {
                    response?.Dispose();
                    throw new Exception("Exception on BaseApiClient.HandleAsync", ex);
                }
            }
        }

        public virtual async Task<T> PostAsync<T>(string path, object value, string language) where T : class
        {
            return await HandleAsync<T>(
                path,
                value,
                language,
                MediaType.Json,
                  async (x) =>
                  {
                      using (x)
                      {
                          var result = JsonConvert.DeserializeObject<T>(await x.Content.ReadAsStringAsync());
                          return result;
                      }
                  }
               ).ConfigureAwait(false);
        }
    }
}