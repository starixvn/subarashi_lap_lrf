using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Athena.Model.Core.MetaModel
{
    public interface IMetaModelFunctionContract
    {
        bool IsAllowBA { get; set; }

        bool IsAllowedCustomerComm { get; set; }

        bool SystemIdVisible { get; set; }
        string FunctionKey { get; }
    }
}
