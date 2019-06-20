using Fanex.Athena.Api.Base.Attributes;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Service.Core.Utility;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace Fanex.Athena.Api.Common
{
    [CustomApiAuthorize]
    public class DataStreamApiController : ApiController
    {
        private readonly IAppSettings _appSettings;
        public DataStreamApiController(IAppSettings appSettings)
        {
            _appSettings = appSettings;
        }
        [HttpGet, HttpPost]
        [Route("api/datastream/zip/{id}/")]
        public HttpResponseMessage Zip(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return null;
            }
            var data = new DataStreamService(Path.Combine(_appSettings.TempFilePath, id));

            var response = Request.CreateResponse();
            response.Content = new PushStreamContent(data.WriteToStream, new MediaTypeHeaderValue("application/zip"));
            return response;
        }
    }
}
