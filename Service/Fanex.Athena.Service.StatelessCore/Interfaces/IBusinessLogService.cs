using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Fanex.Athena.Model.Core.DataDomain;

namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    public interface IBusinessLogService
    {
        void Write<T>(BusinessLogType bussinessLogType, T item) where T : class;
    }
}
