using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    public interface ILGAPIClient
    {
        Task<T> PostAsync<T>(string path, object value, string language) where T : class;
    }
}
