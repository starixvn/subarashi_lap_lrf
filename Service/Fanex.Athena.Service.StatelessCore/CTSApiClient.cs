using System;
using System.Net.Http;
using System.Threading.Tasks;
using Fanex.Athena.Extension.Helpers;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Service.StatelessCore.Abstraction;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Logging;

namespace Fanex.Athena.Service.StatelessCore
{
    public class CTSApiClient : BaseApiClient, ICTSApiClient
    {
        public CTSApiClient(HttpClient httpClient) : base(httpClient)
        {
        }

        protected override string ApiName => "CTS";

        public async Task<bool> HealthCheck(string path, int timeOut = 100)
        {
            try
            {
                await HealthCheckAsync(path, (response) => Task.FromResult(response), false, timeOut).ConfigureAwait(false);
                return true;
            }
            catch (Exception baseException)
            {
                // write log
                var message = string.Format("Calling CTS API health check failed!\nURL: {0}", BaseAddress + path);
                var exception = new Exception(message, baseException);
                Logger.Log.Error(LogMessageHelper.GenerateMessage(exception));

                return false;
            }
        }

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