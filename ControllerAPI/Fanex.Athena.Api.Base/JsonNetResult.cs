using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;
using System.Web.Mvc;

namespace Fanex.Athena.Api.Base
{
    public class JsonNetResult<T> : IHttpActionResult
    {
        private readonly T _content;

        private readonly JsonSerializerSettings _serializerSettings;

        private readonly Encoding _encoding;

        private readonly HttpRequestMessage _request;

        //
        // Summary:
        //     Gets the content value to serialize in the entity body.
        //
        // Returns:
        //     The content value to serialize in the entity body.
        public T Content => _content;

        //
        // Summary:
        //     Gets the serializer settings.
        //
        // Returns:
        //     The serializer settings.
        public JsonSerializerSettings SerializerSettings => _serializerSettings;

        //
        // Summary:
        //     Gets the content encoding.
        //
        // Returns:
        //     The content encoding.
        public Encoding Encoding => _encoding;

        //
        // Summary:
        //     Gets the request message which led to this result.
        //
        // Returns:
        //     The request message which led to this result.
        public HttpRequestMessage Request => _request;

        //
        // Summary:
        //     Initializes a new instance of the System.Web.Http.Results.JsonResult`1 class
        //     with the values provided.
        //
        // Parameters:
        //   content:
        //     The content value to serialize in the entity body.
        //
        //   serializerSettings:
        //     The serializer settings.
        //
        //   encoding:
        //     The content encoding.
        //
        //   request:
        //     The request message which led to this result.

        public static JsonSerializerSettings DefaultSetting { get; } = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            ContractResolver = new CamelCasePropertyNamesContractResolver()
        };


        public JsonNetResult(T content, JsonSerializerSettings serializerSettings, Encoding encoding, HttpRequestMessage request)
        {
            if (serializerSettings == null)
            {
                throw new ArgumentNullException("serializerSettings");
            }

            if (encoding == null)
            {
                throw new ArgumentNullException("encoding");
            }

            _content = content;
            _serializerSettings = serializerSettings;
            _encoding = encoding;
            _request = request;
        }

        //
        // Summary:
        //     Creates a response message asynchronously.
        //
        // Parameters:
        //   cancellationToken:
        //     The token to monitor for cancellation requests.
        //
        // Returns:
        //     A task that, when completed, contains the response message.
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