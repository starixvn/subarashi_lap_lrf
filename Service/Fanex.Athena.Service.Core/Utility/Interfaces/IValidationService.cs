using Fanex.Athena.Model.Core.MetaModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Athena.Service.Core.Utility.Interfaces
{
    public interface IValidationService
    {
        bool IsValid(ValidationMetaModelOption option, object model);
        bool IsValidCurrency(int currencyId, bool isIncludeKeanOcean = false);
        bool IsValidBaseCurrency(string baseCurrency, bool isAllowEmpty = true);

    }
}
