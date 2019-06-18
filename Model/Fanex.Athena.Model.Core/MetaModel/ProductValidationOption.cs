using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Athena.Model.Core.MetaModel
{
    public class ProductValidationOption
    {
        public bool IsValidProductCodeList { get; set; }
        /// <summary>
        /// Required by IsValidProductCodeList
        /// </summary>
        public string FunctionKey { get; set; }
    }
}
