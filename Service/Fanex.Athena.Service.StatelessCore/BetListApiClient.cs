namespace Fanex.Athena.Service.StatelessCore
{
    using System.IO;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Threading.Tasks;

    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Abstraction;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Newtonsoft.Json;


    public class BetListApiClient : BaseApiClient, IBetListApiClient
    {
        public BetListApiClient(HttpClient httpClient) : base(httpClient)
        {

        }
        protected override string ApiName => "BETLIST";

        public async Task<HttpResponseMessage> PostAsync(string path, object value, string language)
        {
            return await HandleAsync(path, value, language, MediaType.Json,
                 async (x) => await Task.FromResult(x)
                ).ConfigureAwait(false);
        }
        public async Task<byte[]> PostAsyncBytes(string path, object value, string language)
        {
            return await HandleAsync(path, value, language, MediaType.Json, async (x) =>
            {
                using (x)
                {
                    return await x.Content.ReadAsByteArrayAsync();
                }
            }

          ).ConfigureAwait(false);
        }

        public async Task<string> PostAsyncString(string path, object value, string language)
        {
            return await HandleAsync<string>(path, value, language, MediaType.Json,
                async (x) =>
                {
                    using (x)
                    {
                        return await x.Content.ReadAsStringAsync();
                    }
                }

            ).ConfigureAwait(false);
        }
    }
}