namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    using Fanex.Athena.Model.Auth;
    using LAP.ONEBook.Security;
    using System;

    [CLSCompliant(false)]
    public interface IOneBookSecurityWrapper
    {
        DefaultAuthInfo<PortalFunction, AuthCurrency> Authenticate(string token);
    }
}