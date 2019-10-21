using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Service.StatelessCore.Abstraction;
using Fanex.Athena.Service.StatelessCore.Interfaces;

using MessagePack;

using Newtonsoft.Json;

namespace Fanex.Athena.Service.StatelessCore
{
    public class ReportAPIClient : BaseApiClient, IReportAPIClient
    {

        public ReportAPIClient(HttpClient client) : base(client)
        {
        }
        protected override string ApiName => "Report";

        public async Task<string> PostAsyncString(string path, object value, string language)
        {
            return await HandleAsync(path, value, language, MediaType.Json, async (x) => await x.Content.ReadAsStringAsync());
        }

        public async Task<Tuple<byte[], string>> PostAsync(string path, object value, string language, MediaType mediaType = MediaType.Json)
        {
            return await HandleAsync(path, value, language, mediaType, async (x) =>
            {
                using (x)
                {
                    var data = await x.Content.ReadAsByteArrayAsync();
                    var contentType = x.Content.Headers.ContentType.MediaType;
                    return Tuple.Create(data, contentType);
                }
            }
            ).ConfigureAwait(false);
        }


    }
}