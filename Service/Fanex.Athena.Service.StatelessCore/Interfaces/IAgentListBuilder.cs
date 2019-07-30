using Fanex.Athena.Model.Auth;
using System.Collections.Generic;

namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    public interface IAgentListBuilder
    {
        string ToXml(IEnumerable<OneAuthCurrency> authCurrencyList, string selectedCurrency);
    }
}