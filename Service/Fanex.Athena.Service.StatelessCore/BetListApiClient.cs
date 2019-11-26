namespace Fanex.Athena.Service.StatelessCore
{
    using System.IO;
    using System.Net.Http;
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Abstraction;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

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
                     stream.Seek(0, SeekOrigin.Begin);
                     var result = new HttpResponseMessage(x.StatusCode)
                     {
                         Content = new StreamContent(stream),
                     };
                     result.Content.Headers.ContentType = x.Content.Headers.ContentType;
                     return result;
                 }
                ).ConfigureAwait(false);
        }

        public async Task<MemoryStream> PostAsyncStream(string path, object value, string language)
        {
            return await HandleAsync(path, value, language, MediaType.Json, async (x) =>
            {
                var stream = new MemoryStream();
                await x.Content.CopyToAsync(stream);
                stream.Seek(0, SeekOrigin.Begin);
                return stream;
            }
          ).ConfigureAwait(false);
        }
    }
}