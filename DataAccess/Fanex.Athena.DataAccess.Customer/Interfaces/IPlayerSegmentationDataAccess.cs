using System.Collections.Generic;
using System.Threading.Tasks;

namespace Fanex.Athena.DataAccess.Customer.Interfaces
{
    public interface IPlayerSegmentationDataAccess
    {
        Task<IEnumerable<object>> GetProblemPlayerListAsync();

        Task<IEnumerable<object>> GetVipPlayerListAsync();

        Task<IEnumerable<object>> UpdateVipStatusAsync();
    }
}