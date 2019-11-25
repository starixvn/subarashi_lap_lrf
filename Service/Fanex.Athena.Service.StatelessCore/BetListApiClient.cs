namespace Fanex.Athena.Service.StatelessCore
{
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Abstraction;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using System.IO;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Threading.Tasks;


    public class BetListApiClient : BaseApiClient, IBetListApiClient
    {
        public BetListApiClient(HttpClient httpClient) : base(httpClient)
        {

        }
        protected override string ApiName => "BETLIST";

        public async Task<HttpResponseMessage> PostAsync(string path, object value, string language)
        {
            return await HandleAsync(path, value, language, MediaType.Json,
                 async (x) =>
                 {
                     var stream = new MemoryStream();
                     await x.Content.CopyToAsync(stream);
                     var result = new HttpResponseMessage(x.StatusCode)
                     {
                         Content = new StreamContent(stream),

                     };
                     result.Content.Headers.ContentType = x.Content.Headers.ContentType;
                     return result;
                 }
                ).ConfigureAwait(false);
        }
        public async Task<MemoryStream> PostAsyncBytes(string path, object value, string language)
        {
            return await HandleAsync(path, value, language, MediaType.Json, async (x) =>
            {
                var stream = new MemoryStream();
                await x.Content.CopyToAsync(stream);
                return stream;
            }
          ).ConfigureAwait(false);
        }

    }
}