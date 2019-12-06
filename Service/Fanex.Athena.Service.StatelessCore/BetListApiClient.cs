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

        public async Task<HttpResponseMessage> PostAsync(string path, object value, string language, int timeOut = 100)
        {
            return await HandleAsync(path, value, language, MediaType.Json,
                 (response) => Task.FromResult(response)
                , false, timeOut).ConfigureAwait(false);
        }

        public async Task<Stream> PostStreamAsync(string path, object value, string language, int timeOut = 100)
        {
            return await HandleAsync(path, value, language, MediaType.Json, async (response) =>
            {
                if (response.StatusCode == System.Net.HttpStatusCode.NoContent)
                {
                    Stream emptyStream = new MemoryStream();
                    return emptyStream;
                }
                return await response.Content.ReadAsStreamAsync();
            }
          , false, timeOut).ConfigureAwait(false);
        }
    }
}