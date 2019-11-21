using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

using System;
using System.IO;
using System.Web.Mvc;

namespace Fanex.Athena.Controllers.Base
{
    public class JsonNetResult : JsonResult
    {
        private readonly string _jsonString;

        public JsonNetResult(string jsonString)
        {
            _jsonString = jsonString;
        }

        public JsonNetResult()
        {
        }

        public static JsonSerializerSettings Settings { get; } = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            ContractResolver = new CamelCasePropertyNamesContractResolver()
        };

        public override void ExecuteResult(ControllerContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            if (this.JsonRequestBehavior == JsonRequestBehavior.DenyGet
                && "GET".Equals(
                        context.HttpContext.Request.HttpMethod,
                        StringComparison.OrdinalIgnoreCase))
            {
                throw new InvalidOperationException("JSON GET is not allowed");
            }

            var response = context.HttpContext.Response;
            response.ContentType =
                string.IsNullOrEmpty(this.ContentType) ? "application/json" : this.ContentType;

            if (this.ContentEncoding != null)
            {
                response.ContentEncoding = this.ContentEncoding;
            }
            if (this.Data == null && string.IsNullOrEmpty(_jsonString))
            {
                return;
            }

            if (!string.IsNullOrEmpty(_jsonString))
            {
                response.Write(_jsonString);
            }
            else
            {
                var scriptSerializer = JsonSerializer.Create(Settings);

                using (var sw = new StringWriter())
                {
                    scriptSerializer.Serialize(sw, this.Data);
                    response.Write(sw.ToString());
                }
            }
        }
    }
}