using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Service.StatelessCore.Abstraction;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Service.StatelessCore
{
    public class ReportAPIClient : BaseApiClient, IReportAPIClient
    {
        private const string DefaultContentType = "application/octet-stream";

        public ReportAPIClient(HttpClient client) : base(client)
        {
        }

        protected override string ApiName => "Report";

        public async Task<Tuple<Stream, string>> PostAsync(string path, object value, string language, MediaType mediaType = MediaType.Json, int timeOut = 100)
        {
            return await HandleAsync(path, value, language, mediaType, async (response) =>
             {
                 var contentType = response.Content.Headers.ContentType?.MediaType ?? DefaultContentType;
                 if (response.StatusCode == HttpStatusCode.NoContent)
                 {
                     Stream emptyStream = new MemoryStream();
                     return Tuple.Create(emptyStream, contentType);
                 }
                 return Tuple.Create(await response.Content.ReadAsStreamAsync(), contentType);
             },
            false, timeOut).ConfigureAwait(false);
        }
    }
}