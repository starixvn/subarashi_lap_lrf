using System.Net.Http;
using System.Threading.Tasks;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Service.StatelessCore.Abstraction;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Service.StatelessCore
{
    public class CTSApiClient : BaseApiClient, ICTSApiClient
    {
        public CTSApiClient(HttpClient httpClient) : base(httpClient)
        {
        }

        protected override string ApiName => "CTS";

        public async Task<HttpResponseMessage> PostAsync(string path, object value, string language, int timeOut = 100)
        {
            return await HandleAsync(path, value, language, MediaType.Json,
                 (response) => Task.FromResult(response)
                , false, timeOut).ConfigureAwait(false);
        }

        protected override async Task HandleUnSucessReponseAsync(HttpResponseMessage response)
        {
            var content = await response.Content.ReadAsStringAsync();
            if (!string.IsNullOrWhiteSpace(content))
            {
                throw new HttpRequestException($"Status code: {response.StatusCode}\n" +
                    $"Message: {content}");
            }
            await base.HandleUnSucessReponseAsync(response);
        }
    }
}