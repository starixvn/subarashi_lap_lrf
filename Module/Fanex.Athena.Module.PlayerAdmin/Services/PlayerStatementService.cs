namespace Fanex.Athena.Module.PlayerAdmin.Services
{
    using System;
    using System.Net;
    using System.Net.Http;
    using System.Text;
    using System.Threading.Tasks;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Newtonsoft.Json;
    using RestSharp;

    public class PlayerStatementService : IPlayerStatementService
    {
        private const string ApiHost = "ExternalAPIHostUrl";

        private const string User = "ExternalAPIUser";

        private const string Password = "ExternalAPIPassword";

        private const string GetTokenPath = "api/auth";

        private const string GetStatementPath = @"{0}Statement/Summary?cid={1}&fd={2}&td={3}&lang={4}&ps={5}&access_token={6}";

        private const string FormatDate = "MM-dd-yyyy";

        private const int MaximumPageSize = int.MaxValue - 1;

        private readonly IAppSettings _appSetting;

        private readonly IHttpClientFactory _httpClientFactory;

        public PlayerStatementService(IAppSettings appSettings, IHttpClientFactory httpClientFactory)
        {
            _appSetting = appSettings;
            _httpClientFactory = httpClientFactory;
        }

        public async Task<string> GetUrl(PlayerStatementMetaModel metaModel)
        {
            var baseUrl = _appSetting.GetValue(ApiHost);
            var token = await GetToken(metaModel.SiteName, baseUrl).ConfigureAwait(false);

            return string.Format(
                GetStatementPath,
                baseUrl,
                metaModel.CustId,
                metaModel.FromDate.ToString(FormatDate),
                metaModel.ToDate.ToString(FormatDate),
                metaModel.Language,
                MaximumPageSize,
                token);
        }

        private async Task<string> GetToken(string siteName, string baseUrl)
        {
            var client = _httpClientFactory.GetForHost(new Uri(baseUrl));

            var content = new StringContent(GetAuthenticationObjectAsString(siteName), Encoding.UTF8, "application/json");

            var response = await client.PostAsync(GetTokenPath, content).ConfigureAwait(false);

            if (response.StatusCode != HttpStatusCode.OK)
            {
                var errorMessage = new StringBuilder("External Service error");
                errorMessage.AppendLine($"HTTP Error: {response.Content.ReadAsStringAsync()}");
                errorMessage.AppendLine($"HTTP status code: {response.StatusCode}");
                throw new InvalidOperationException(errorMessage.ToString());
            }

            var result = JsonConvert.DeserializeObject<ExternalServiceToken>(await response.Content.ReadAsStringAsync());

            return result.AccessToken;
        }

        private string GetAuthenticationObjectAsString(string siteName)
        {
            return JsonConvert.SerializeObject(new
            {
                UserName = $"{siteName}@{_appSetting.GetValue(User)}",
                Password = _appSetting.GetValue(Password)
            });
        }
    }
}
