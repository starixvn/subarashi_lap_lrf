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
        bool IsValidMetalModel(IMetaModelValidation item);
        bool IsValidProductCode(string productCodeList);
        bool IsValidCurrency(int currencyId, bool isIncludeKeanOcean = false);
        bool IsValidCurrency(int[] currencies);
    }
}
