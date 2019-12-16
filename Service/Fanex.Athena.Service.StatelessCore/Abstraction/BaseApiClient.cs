using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Service.StatelessCore.CustomException;
using MessagePack;
using Newtonsoft.Json;

namespace Fanex.Athena.Service.StatelessCore.Abstraction
{
    public class BaseApiClient
    {
        private const string LANGUAGEKEY = "Language";
        private const string MsgPackContentType = "application/x-msgpack";
        private const string JsonContentType = "application/json";
        private readonly HttpClient _client;

        private static readonly JsonSerializerSettings _jsonSerializerSettings = new JsonSerializerSettings
        {
            DateTimeZoneHandling = DateTimeZoneHandling.Unspecified,
            NullValueHandling = NullValueHandling.Ignore,
        };

        private static readonly JsonSerializer _serializer = new JsonSerializer();

        protected virtual string ApiName => "Base API Client";

        protected BaseApiClient(HttpClient client)
        {
            _client = client;
        }

        public virtual async Task<string> PostStringAsync(string path, object value, string language, int timeOut = 100)
        {
            return await HandleAsync(path, value, language, MediaType.Json,
                async (response) =>
                {
                    using (response)
                    {
                        using (var stream = await response.Content.ReadAsStreamAsync().ConfigureAwait(false))
                        {
                            using (var streamReader = new StreamReader(stream))
                            {
                                using (var textWriter = new StringWriter())
                                {
                                    const int chunkLength = 4096;
                                    var buffer = new char[chunkLength];
                                    int readChunkLength;
                                    do
                                    {
                                        readChunkLength = streamReader.ReadBlock(buffer, 0, chunkLength);
                                        textWriter.Write(buffer, 0, readChunkLength);
                                    } while (readChunkLength > 0);

                                    return textWriter.ToString();
                                }
                            }
                        }
                    }
                },
                timeOut: timeOut
            ).ConfigureAwait(false);
        }

        protected virtual async Task<T>
           HandleAsync<T>(string path, object value, string language, MediaType mediaType, Func<HttpResponseMessage, Task<T>> codeBlock,
            bool disposeHttpResponse = true, int timeOut = 100)
        {
            if (codeBlock == null)
            {
                return await Task.FromResult(default(T));
            }
            using (var cancelToken = new CancellationTokenSource(new TimeSpan(0, 0, timeOut)))
            {
                using (var httpRequest = new HttpRequestMessage(HttpMethod.Post, new Uri(_client.BaseAddress + path)))
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
                                response = await _client.SendAsync(httpRequest, HttpCompletionOption.ResponseHeadersRead, cancelToken.Token).ConfigureAwait(false);
                            }
                        }

                        if (mediaType == MediaType.Json)
                        {
                            httpRequest.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue(JsonContentType));
                            using (var content = new StringContent(JsonConvert.SerializeObject(value, _jsonSerializerSettings),
                                Encoding.UTF8, JsonContentType))
                            {
                                httpRequest.Content = content;
                                response = await _client.SendAsync(httpRequest, HttpCompletionOption.ResponseHeadersRead, cancelToken.Token).ConfigureAwait(false);
                            }
                        }
                        response?.EnsureSuccessStatusCode();
                        return await codeBlock(response).ConfigureAwait(false);
                    }
                    catch (Exception ex)
                    {
                        if (!disposeHttpResponse)
                        {
                            response?.Dispose();
                        }

                        throw new ServiceException(ex.Message, ApiName, ex);
                    }
                    finally
                    {
                        if (disposeHttpResponse && response != null)
                        {
                            response.Dispose();
                        }
                    }
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
                 async (response) =>
                  {
                      using (response)
                      {
                          using (var stream = await response.Content.ReadAsStreamAsync().ConfigureAwait(false))
                          {
                              using (var reader = new StreamReader(stream))
                              {
                                  using (var jsonReader = new JsonTextReader(reader))
                                  {
                                      return _serializer.Deserialize<T>(jsonReader);
                                  }
                              }
                          }
                      }
                  }
               ).ConfigureAwait(false);
        }
    }
}