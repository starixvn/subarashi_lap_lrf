using System.Collections.Generic;

namespace Fanex.Athena.Service.Core.Common.Interfaces
{
    public interface ICurrencyService
    {
        IDictionary<int, string> GetBaseCurrencyList(bool supportOnceCurrencyToBase = false);
    }
}