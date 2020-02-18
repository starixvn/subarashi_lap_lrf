namespace Fanex.Athena.Module.PlayerAdmin.Services
{
    using System;
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Text;
    using System.Threading.Tasks;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;

    using Newtonsoft.Json;

    public class PlayerStatementService : IPlayerStatementService
    {
        private const string ApiHost = "ExtAPIHostUrl";

        private const string User = "ExtAPIUser";

        private const string Password = "ExtAPIPassword";

        private const string FormatDate = "MM-dd-yyyy";

        private const int PageSize = 1000;

        private readonly IAppSettings _appSetting;

        private readonly HttpClient _client;

        public PlayerStatementService(IAppSettings appSettings, HttpClient client)
        {
            _appSetting = appSettings;
            _client = client;
        }

        public async Task<string> GetUrl(PlayerStatementMetaModel metaModel)
        {
            const string GetStatementPath = @"{0}Statement/Summary?cid={1}&fd={2}&td={3}&ps={4}&sb={5}&lang={6}&access_token={7}";

            var token = await GetToken(metaModel.SiteName).ConfigureAwait(false);

            return string.Format(
                GetStatementPath,
                _appSetting.GetValue(ApiHost),
                metaModel.CustId,
                metaModel.FromDate.ToString(FormatDate),
                metaModel.ToDate.ToString(FormatDate),
                PageSize,
                true,
                metaModel.Language,
                token);
        }

        private async Task<string> GetToken(string siteName)
        {
            const string GetTokenPath = "api/auth";
            using (var request = new HttpRequestMessage(HttpMethod.Post, new Uri(GetTokenPath, UriKind.Relative)))
            {
                request.Content = new StringContent(GetAuthenticationObjectAsString(siteName), Encoding.UTF8, "application/json");
                request.Headers.CacheControl = new CacheControlHeaderValue { NoCache = true, NoStore = true, MaxAge = new TimeSpan(0) };
                using (var response = await _client.SendAsync(request))
                {
                    response.EnsureSuccessStatusCode();
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var result = response.StatusCode == HttpStatusCode.OK ? JsonConvert.DeserializeObject<ExternalServiceToken>(content) : default;
                    response.Content = null;
                    return result?.AccessToken;
                }
            }
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
