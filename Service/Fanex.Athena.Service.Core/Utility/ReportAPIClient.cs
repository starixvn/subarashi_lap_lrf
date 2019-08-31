using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Service.Core.Exception;
using Fanex.Athena.Service.StatelessCore.Interfaces;

using RestSharp;

namespace Fanex.Athena.Service.StatelessCore
{
    public class ReportAPIClient : IReportAPIClient
    {
        private const string KEYNAME = "AUTH_TOKEN";

        private const string LANGUAGEKEY = "Language";

        private readonly IAppSettings _appSetting;

        public ReportAPIClient(IAppSettings appSettings)
        {
            _appSetting = appSettings;
        }
        public async Task<HttpResponseMessage> PostAsync(string path, object value, string language)
        {
            var client = new RestClient
            {
                BaseUrl = new Uri(_appSetting.GetValue("ReportAPIHostUrl"))
            };

            var request = new RestRequest(path);
            request.AddHeader(KEYNAME, _appSetting.GetValue("ReportAPITokenValue"));
            request.AddHeader(LANGUAGEKEY, language);
            request.AddJsonBody(value);
            request.Method = Method.POST;

            var result = await client.ExecuteTaskAsync(request).ConfigureAwait(false);

            if (result.StatusCode >= HttpStatusCode.BadRequest)
            {
                var errorMessage = $"Http Error = {result.StatusDescription}\n Error occur when query Report API";

                throw new ServiceException(errorMessage, nameof(ReportAPIClient));
            }

            var respone = new HttpResponseMessage(result.StatusCode)
            {
                Content = new StreamContent(new MemoryStream(result.RawBytes)),

            };

            if (!string.IsNullOrEmpty(result.ContentType))
            {
                var contentType = result.ContentType.Split(';')[0];
                if (!string.IsNullOrEmpty(contentType))
                {
                    respone.Content.Headers.ContentType = new MediaTypeHeaderValue(contentType);
                }
            }

            return respone;
        }
    }
}
