using Fanex.IdentityModel.Client;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace Fanex.Athena.Service.Core.OAuth
{
    public class OAuthService : IOAuthService, IDisposable
    {
        private const int AccessTokenExpireTimeGapInSeconds = 60;

        private readonly OAuthOptions _options;
        private readonly HttpClient _httpClient;

        [CLSCompliant(false)]
        public OAuthService(OAuthOptions options)
        {
            _options = options ?? throw new ArgumentNullException(nameof(options));
            _httpClient = new HttpClient(_options.MessageHandler ?? new HttpClientHandler { AllowAutoRedirect = false, UseCookies = false });
        }

        public async Task<IOAuthInfo> RequestOAuthInfoAsync(string grantType, IDictionary<string, string> parameters)
        {
            var tokenResponse = await RequestToken(grantType, parameters).ConfigureAwait(false);
            if (tokenResponse.IsError)
            {
                return HandleError(tokenResponse.Exception, !string.IsNullOrEmpty(tokenResponse.ErrorDescription) ? tokenResponse.ErrorDescription : tokenResponse.Error);
            }

            var userInfoResponse = await RequestUserInfo(tokenResponse.AccessToken).ConfigureAwait(false);
            if (userInfoResponse.IsError)
            {
                return HandleError(userInfoResponse.Exception, userInfoResponse.Error);
            }

            return OAuthInfo.CreateSuccess(userInfoResponse.Claims, tokenResponse.AccessToken,
                DateTime.Now.AddSeconds(tokenResponse.ExpiresIn - AccessTokenExpireTimeGapInSeconds), tokenResponse.RefreshToken);
        }

        public async Task<(string accessToken, DateTime? lifeTime)> RequestAccessTokenAsync(string refreshToken)
        {
            var tokenResponse = await _httpClient.RequestRefreshTokenAsync(new RefreshTokenRequest 
            {
                Address = $"{_options.Host}/{_options.TokenPath}",
                ClientId = _options.ClientId,
                ClientSecret = _options.ClientSecret,
                RefreshToken = refreshToken
            });

            if (tokenResponse.IsError)
            {
                return (null, null);
            }

            return (tokenResponse.AccessToken, DateTime.Now.AddSeconds(tokenResponse.ExpiresIn - AccessTokenExpireTimeGapInSeconds));
        }

        public async Task RevokeAccessTokenAsync(string accessToken)
        {
            if (string.IsNullOrEmpty(accessToken))
            {
                return;
            }
            var tokenRevocationResponse = await _httpClient.RevokeTokenAsync(new TokenRevocationRequest
            {
                Address = $"{_options.Host}/{_options.RevocationPath}",
                ClientId = _options.ClientId,
                ClientSecret = _options.ClientSecret,
                Token = accessToken,
                TokenTypeHint = "access_token"
            }).ConfigureAwait(false);

            if (tokenRevocationResponse.IsError)
            {
                HandleError(tokenRevocationResponse.Exception, tokenRevocationResponse.Error);
            }
        }

        public async Task RevokeRefreshTokenAsync(string refreshToken)
        {
            if (string.IsNullOrEmpty(refreshToken))
            {
                return;
            }

            var tokenRevocationResponse = await _httpClient.RevokeTokenAsync(new TokenRevocationRequest
            {
                Address = $"{_options.Host}/{_options.RevocationPath}",
                ClientId = _options.ClientId,
                ClientSecret = _options.ClientSecret,
                Token = refreshToken,
                TokenTypeHint = "refresh_token"
            }).ConfigureAwait(false);

            if (tokenRevocationResponse.IsError)
            {
                HandleError(tokenRevocationResponse.Exception, tokenRevocationResponse.Error);
            }
        }

        public Task RevokeTokensAsync(string accessToken, string refreshToken)
         => Task.WhenAll(RevokeAccessTokenAsync(accessToken), RevokeRefreshTokenAsync(refreshToken));

        private Task<UserInfoResponse> RequestUserInfo(string accessToken)
            => _httpClient.GetUserInfoAsync(new UserInfoRequest
            {
                Address = $"{_options.Host}/{_options.UserInfoPath}",
                Token = accessToken
            });

        private Task<TokenResponse> RequestToken(string grantType, IDictionary<string, string> parameters)
        {
            parameters.Add(nameof(_options.Scope), _options.Scope);
            return _httpClient.RequestTokenAsync(new TokenRequest
            {
                Address = $"{_options.Host}/{_options.TokenPath}",
                ClientId = _options.ClientId,
                ClientSecret = _options.ClientSecret,
                GrantType = grantType,
                Parameters = parameters
            });
        }

        private static IOAuthInfo HandleError(Exception ex, string errorDesc)
        {
            if (ex != null)
            {
                throw ex;
            }
            return OAuthInfo.CreateError(errorDesc);
        }

        ~OAuthService()
        {
            Dispose(false);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            _httpClient.Dispose();
        }
    }
}