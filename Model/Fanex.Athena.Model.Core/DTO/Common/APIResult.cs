using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Athena.Model.Core.DTO.Common
{
    [Serializable]
    public class APIResult<T>
    {
        public T Data { get; set; }
    }
}
