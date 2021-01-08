namespace Fanex.Athena.Service.Core.Users.Interfaces
{
    using System;
    using System.Web;

    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Core.DTO.Common;
    using LAP.ONEBook.Security;

    [CLSCompliant(false)]
    public interface IOneAuthenticationService
    {
        IResultInfo SignIn(HttpContextBase currentContext, DefaultAuthInfo<OneAuthPermission, OneAuthCurrency> tokenInfo);
        void SignOut(HttpResponseBase response, HttpRequestBase request);
        DefaultAuthInfo<OneAuthPermission, OneAuthCurrency> GetTokenInfo(string token);
    }
}