using System.Collections.Generic;
using Fanex.Athena.Model.Auth;
using LAP.ONEBook.Security;

namespace Fanex.Athena.Module.PlayerAdmin.Api.MetaModel
{
    public interface ILRFFiltersMetaModel
    {
        int LicenseeId { get; set; }

        bool HasCommPermissionRead { get; set; }

        IEnumerable<OneAuthCurrency> CurrencyAgentList { get; set; }

        DefaultAuthInfo<OneAuthPermission, OneAuthCurrency> Token { get; set; }
    }
}
