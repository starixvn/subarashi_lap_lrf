using System.Collections.Generic;

namespace Fanex.Athena.Service.Core.Common.Interfaces
{
    public interface ICurrencyService
    {
        IReadOnlyDictionary<int, string> GetBaseCurrencyList();
    }
}