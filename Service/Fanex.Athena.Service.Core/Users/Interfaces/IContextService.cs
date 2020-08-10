namespace Fanex.Athena.Service.Core.Users.Interfaces
{
    using Fanex.Athena.Model.Auth;
    using System.Collections.Generic;

    public interface IContextService
    {
        LicenseeAuthInfo Licensee { get; }

        UserAuthInfo User { get; }

        string LicenseeName { get; }

        string UserName { get; }

        int UserId { get; }

        IDictionary<int, string> CurrencyList { get; }

        IDictionary<int, int[]> CurrencyAgentList { get; }

        byte UserLevel { get; }

        byte SubsidiaryViewType { get; }
    }
}