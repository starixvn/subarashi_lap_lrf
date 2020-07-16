namespace Fanex.Athena.Service.Core.Users
{
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using System.Collections.Generic;

    public class ContextService : IContextService
    {
        private readonly ISessionStorage _sessionStorage;

        public ContextService(ISessionStorage sessionStorage)
        {
            _sessionStorage = sessionStorage;
        }

        public LicenseeAuthInfo Licensee => _sessionStorage.LicenseeAuthInfo;

        public UserAuthInfo User => _sessionStorage.UserAuthInfo;

        public string LicenseeName => Licensee.LicenseeName;

        public string UserName => User.UserName;

        public int UserId => User.UserId;

        public IDictionary<int, string> CurrencyList => User.CurrencyList;

        public IDictionary<int, int[]> CurrencyAgentList => User.CurrencyAgentList;

        public byte UserLevel => User.UserLevel;
        public byte SubsidiaryViewType => User.SubsidiaryViewType;
    }
}