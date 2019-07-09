using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Athena.Model.Core.MetaModel
{
    public class CurrencyValidationOption
    {
        /// <summary>
        /// Option: IsIncludeKeanOcean
        /// </summary>
        public bool IsValidCurrency { get; set; }

        public bool IsIncludeKeanOcean { get; set; }
        public bool IsValidCurrencyList { get; set; }
    }
}
