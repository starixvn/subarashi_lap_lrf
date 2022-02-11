using Fanex.Athena.Model.Core.DTO.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    public interface ISportService
    {
        Task<IEnumerable<SportGame>> GetSportForProductAsync(string siteName, string productCode);
    }
}
