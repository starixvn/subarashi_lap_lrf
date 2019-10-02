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
    using Fanex.Athena.Service.StatelessCore.CustomException;

    using Newtonsoft.Json;

    public class PlayerStatementService : IPlayerStatementService
    {
        private const string ApiHost = "ExtAPIHostUrl";

        private const string User = "ExtAPIUser";

        private const string Password = "ExtAPIPassword";

        private const string FormatDate = "MM-dd-yyyy";

        private readonly IAppSettings _appSetting;

        private readonly HttpClient _client;

        public PlayerStatementService(IAppSettings appSettings, HttpClient client)
        {
            _appSetting = appSettings;
            _client = client;
        }

        public async Task<string> GetUrl(PlayerStatementMetaModel metaModel)
        {
            const string GetStatementPath = @"{0}Statement/Summary?cid={1}&fd={2}&td={3}&lang={4}&access_token={5}";

            var token = await GetToken(metaModel.SiteName).ConfigureAwait(false);

            return string.Format(
                GetStatementPath,
                _appSetting.GetValue(ApiHost),
                metaModel.CustId,
                metaModel.FromDate.ToString(FormatDate),
                metaModel.ToDate.ToString(FormatDate),
                metaModel.Language,
                token);
        }

        private async Task<string> GetToken(string siteName)
        {
            const string GetTokenPath = "api/auth";

            var requestContent = new StringContent(GetAuthenticationObjectAsString(siteName), Encoding.UTF8, "application/json");

            using (var response = await _client.PostAsync(new Uri(GetTokenPath, UriKind.Relative), requestContent).ConfigureAwait(false))
            {
                if (response.Content is null)
                {
                    throw CreateErrorException(response.StatusCode, "Content is null", "null");
                }

                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);

                if (!response.IsSuccessStatusCode)
                {
                    response.Content.Dispose();
                    throw CreateErrorException(response.StatusCode, "Request unsuccessfully", content);
                }

                try
                {
                    var result = JsonConvert.DeserializeObject<ExternalServiceToken>(content);

                    return result.AccessToken;
                }
                catch (Exception ex)
                {
                    throw CreateErrorException(response.StatusCode, ex.Message, content);
                }
                finally
                {
                    response.Content.Dispose();
                }
            }
        }

        private static ServiceException CreateErrorException(HttpStatusCode statusCode, string error, string content)
        {
            var errorMessage = new StringBuilder($"HTTP Error: {error}");
            errorMessage.AppendLine($"HTTP status code: {statusCode}");
            errorMessage.AppendLine($"Response Content: {content}");

            return new ServiceException(errorMessage.ToString(), "External Service");
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
