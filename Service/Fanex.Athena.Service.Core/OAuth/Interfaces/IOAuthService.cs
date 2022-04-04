using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Fanex.Athena.Service.Core.OAuth
{
    public interface IOAuthService
    {
        Task<IOAuthInfo> RequestOAuthInfoAsync(string grantType, IDictionary<string, string> parameters);

        Task<(string accessToken, DateTime? lifeTime)> RequestAccessTokenAsync(string refreshToken);

        Task RevokeAccessTokenAsync(string accessToken);

        Task RevokeRefreshTokenAsync(string refreshToken);

        Task RevokeTokensAsync(string accessToken, string refreshToken);
    }
}