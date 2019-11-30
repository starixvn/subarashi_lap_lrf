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
                 async (response) =>
                 {
                     var result = new HttpResponseMessage(response.StatusCode)
                     {
                         Content = new StreamContent(await response.Content.ReadAsStreamAsync()),
                     };
                     result.Content.Headers.ContentType = response.Content.Headers.ContentType;
                     return result;
                 }
                , false).ConfigureAwait(false);
        }

        public async Task<Stream> PostStreamAsync(string path, object value, string language)
        {
            return await HandleAsync(path, value, language, MediaType.Json, async (response) =>
            {
                return await response.Content.ReadAsStreamAsync();
            }
          , false).ConfigureAwait(false);
        }
    }
}