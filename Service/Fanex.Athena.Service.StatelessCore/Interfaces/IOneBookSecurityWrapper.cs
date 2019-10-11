namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    using Fanex.Athena.Model.Auth;
    using LAP.ONEBook.Security;

    public interface IOneBookSecurityWrapper
    {
        DefaultAuthInfo<OneAuthPermission, OneAuthCurrency> Authenticate(string token);
    }
}