using System.Threading.Tasks;
using System.Web;
using Fanex.Athena.Model.Auth.MetaModel;
using Fanex.Athena.Service.Core.OAuth;

namespace Fanex.Athena.Service.Core.Users.Interfaces
{
    public interface IInternalAuthService
    {
        void SignIn(IOAuthInfo oauthInfo);

        void ReSignIn(IOAuthInfo oauthInfo);

        Task SignOut(HttpResponseBase response, HttpRequestBase request);

        void CreateSession(IOAuthInfo oauthInfo);

        Task<IOAuthInfo> RequestOAuthInfoAsync(LoginMetalModel loginInfo);

        Task<IOAuthInfo> RenewOAuthInfoAsync(int licenseeId, string accessToken, string langCode = null);
    }
}