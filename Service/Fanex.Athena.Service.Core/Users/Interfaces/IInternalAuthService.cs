using Fanex.Athena.Model.Auth.MetaModel;
using Fanex.Athena.Service.Core.OAuth;
using System;
using System.Threading.Tasks;
using System.Web;

namespace Fanex.Athena.Service.Core.Users.Interfaces
{
    public interface IInternalAuthService
    {
        void SignIn(IOAuthInfo oauthInfo);

        void ReSignIn(IOAuthInfo oauthInfo);

        Task SignOut(HttpResponseBase response, HttpRequestBase request);

        void CreateSession(IOAuthInfo oauthInfo);

        Task<IOAuthInfo> RequestOAuthInfoAsync(LoginMetalModel loginInfo, string clientIP, string sessionId);

        Task<IOAuthInfo> RenewOAuthInfoAsync(int licenseeId, string accessToken, string refreshToken, string langCode = null);

        Task<(string accessToken, DateTime? lifeTime)> RequestAccessTokenAsync(string refreshToken);
    }
}