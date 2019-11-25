using System;
using System.IO;
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

        public async Task<Tuple<MemoryStream, string>> PostAsync(string path, object value, string language, MediaType mediaType = MediaType.Json)
        {
            return await HandleAsync(path, value, language, mediaType, async (x) =>
            {
                var stream = new MemoryStream();
                await x.Content.CopyToAsync(stream);
                var contentType = x.Content.Headers.ContentType?.MediaType ?? DefaultContentType;
                return Tuple.Create(stream, contentType);
            }
            ).ConfigureAwait(false);
        }
    }
}