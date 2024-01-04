namespace Fanex.Athena.Service.Core.Users.Interfaces
{
    using System.Threading.Tasks;
    using System.Web;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Service.Core.OAuth;

    public interface IPortalAuthService
    {
        IResultInfo SignIn(HttpContextBase currentContext, IOAuthInfo oauthInfo);

        Task SignOut(HttpResponseBase response, HttpRequestBase request);

        Task<IOAuthInfo> RequestOAuthInfoAsync(string token);
    }
}