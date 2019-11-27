using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Athena.Model.Core.MetaModel
{
    public interface IMetaModelFunctionContract
    {
        bool IsAllowedBA { get; set; }

        bool HasComm { get; set; }

        bool SystemIdVisible { get; set; }
        string FunctionKey { get; }
    }
}
