using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Fanex.Athena.Api.Base
{
    public class JsonNetResult<T> : IHttpActionResult
    {
        private readonly T _content;

        private readonly JsonSerializerSettings _serializerSettings;

        private readonly Encoding _encoding;

        private readonly HttpRequestMessage _request;

        public T Content => _content;

        public JsonSerializerSettings SerializerSettings => _serializerSettings;

        public Encoding Encoding => _encoding;

        public HttpRequestMessage Request => _request;

        public JsonSerializerSettings DefaultSetting { get; } = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            ContractResolver = new CamelCasePropertyNamesContractResolver()
        };

        public JsonNetResult(T content, JsonSerializerSettings serializerSettings, Encoding encoding, HttpRequestMessage request)
        {
            if (serializerSettings == null)
            {
                throw new ArgumentNullException(nameof(serializerSettings));
            }

            if (encoding == null)
            {
                throw new ArgumentNullException(nameof(encoding));
            }

            _content = content;
            _serializerSettings = serializerSettings;
            _encoding = encoding;
            _request = request;
        }

        public virtual Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            return Task.FromResult(Execute());
        }

        private HttpResponseMessage Execute()
        {
            HttpResponseMessage httpResponseMessage = new HttpResponseMessage(HttpStatusCode.OK);
            try
            {
                if (_content is string)
                {
                    httpResponseMessage.Content = new StringContent(_content as string, Encoding);
                }
                else
                {
                    var scriptSerializer = JsonSerializer.Create(_serializerSettings);
                    using (var sw = new StringWriter())
                    {
                        scriptSerializer.Serialize(sw, this._content);
                        httpResponseMessage.Content = new StringContent(sw.ToString(), Encoding);
                    }
                }
                MediaTypeHeaderValue mediaTypeHeaderValue = new MediaTypeHeaderValue("application/json");
                mediaTypeHeaderValue.CharSet = _encoding.WebName;
                httpResponseMessage.Content.Headers.ContentType = mediaTypeHeaderValue;
                httpResponseMessage.RequestMessage = _request;
                return httpResponseMessage;
            }
            catch
            {
                httpResponseMessage.Dispose();
                throw;
            }
        }
    }
}