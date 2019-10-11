namespace Fanex.Athena.Service.Core.Users.Interfaces
{
    using System.Web;

    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Core.DTO.Common;
    using LAP.ONEBook.Security;

    public interface IOneAuthenticationService
    {
        IResultInfo SignIn(HttpContextBase currentContext, DefaultAuthInfo<OneAuthPermission, OneAuthCurrency> tokenInfo);

        DefaultAuthInfo<OneAuthPermission, OneAuthCurrency> GetTokenInfo(string token);
    }
}