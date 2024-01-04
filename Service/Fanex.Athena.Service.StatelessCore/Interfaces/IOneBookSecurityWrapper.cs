namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    using System;
    using Fanex.Athena.Model.Auth;
    using LAP.ONEBook.Security;

    [CLSCompliant(false)]
    public interface IOneBookSecurityWrapper
    {
        DefaultAuthInfo<PortalFunction, AuthCurrency> Authenticate(string token);
    }
}