using Fanex.Athena.DataAccess.Core;
using Fanex.Athena.DataAccess.Customer.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Fanex.Athena.DataAccess.Customer
{
    public class PlayerSegmentationDataAccess : BaseDataAccess, IPlayerSegmentationDataAccess
    {
        public async Task<IEnumerable<object>> GetProblemPlayerListAsync()
        {
            throw new System.NotImplementedException();
        }

        public async Task<IEnumerable<object>> GetVipPlayerListAsync()
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<object>> UpdateVipStatusAsync()
        {
            throw new System.NotImplementedException();
        }
    }
}