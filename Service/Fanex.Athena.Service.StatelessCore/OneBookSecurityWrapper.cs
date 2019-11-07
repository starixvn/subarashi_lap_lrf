namespace Fanex.Athena.Service.StatelessCore
{
    using System;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using LAP.ONEBook.Security;

    public class OneBookSecurityWrapper : IOneBookSecurityWrapper
    {
        private readonly IStorageProvider _storageProvider;

        public OneBookSecurityWrapper(IStorageProvider storageProvider)
        {
            _storageProvider = storageProvider;
        }

        public DefaultAuthInfo<OneAuthPermission, OneAuthCurrency> Authenticate(string token)
        {
            try
            {
                var oneBookSecurity = new Auth<DefaultAuthInfo<OneAuthPermission, OneAuthCurrency>>(_storageProvider);
                return oneBookSecurity.Authenticate(token);
            }
            catch (Exception exception)
            {
                throw new InvalidOperationException("An error occurred when processing LAP.Token", exception);
            }
        }
    }
}