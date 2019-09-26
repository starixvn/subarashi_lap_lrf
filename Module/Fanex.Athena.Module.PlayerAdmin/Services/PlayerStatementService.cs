namespace Fanex.Athena.Module.PlayerAdmin.Services
{
    using System;
    using System.Net.Http;
    using System.Text;
    using System.Threading.Tasks;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
    using Fanex.Athena.Service.StatelessCore.CustomException;

    using Newtonsoft.Json;

    public class PlayerStatementService : IPlayerStatementService
    {
        private const string ApiHost = "ExtAPIHostUrl";

        private const string User = "ExtAPIUser";

        private const string Password = "ExtAPIPassword";

        private const string FormatDate = "MM-dd-yyyy";

        private const int MaximumPageSize = int.MaxValue - 1;

        private readonly IAppSettings _appSetting;

        private readonly HttpClient _client;

        public PlayerStatementService(IAppSettings appSettings, HttpClient client)
        {
            _appSetting = appSettings;
            _client = client;
        }

        public async Task<string> GetUrl(PlayerStatementMetaModel metaModel)
        {
            const string GetStatementPath = @"{0}Statement/Summary?cid={1}&fd={2}&td={3}&lang={4}&ps={5}&access_token={6}";

            var token = await GetToken(metaModel.SiteName).ConfigureAwait(false);

            return string.Format(
                GetStatementPath,
                _appSetting.GetValue(ApiHost),
                metaModel.CustId,
                metaModel.FromDate.ToString(FormatDate),
                metaModel.ToDate.ToString(FormatDate),
                metaModel.Language,
                MaximumPageSize,
                token);
        }

        private async Task<string> GetToken(string siteName)
        {
            const string GetTokenPath = "api/auth";

            var requestContent = new StringContent(GetAuthenticationObjectAsString(siteName), Encoding.UTF8, "application/json");

            using (var response = await _client.PostAsync(GetTokenPath, requestContent).ConfigureAwait(false))
            {
                try
                {
                    response.EnsureSuccessStatusCode();

                    var result = JsonConvert.DeserializeObject<ExternalServiceToken>(await response.Content.ReadAsStringAsync());

                    //response.Content.Dispose();

                    return result.AccessToken;
                }
                catch (Exception e)
                {
                    var errorMessage = new StringBuilder($"HTTP Error: {e.Message}");
                    errorMessage.AppendLine($"HTTP status code: {response.StatusCode}");
                    throw new ServiceException(await response.Content.ReadAsStringAsync(), "External Service");
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
