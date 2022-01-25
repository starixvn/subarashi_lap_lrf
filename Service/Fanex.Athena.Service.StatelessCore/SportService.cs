using Fanex.Athena.DataAccess.Core.Common.Interfaces;
using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Core.DTO.Configuration;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Athena.Service.StatelessCore
{
    public class SportService : ISportService
    {
        private readonly ISportTypeDataAccess _sportDataAccess;

        private readonly ICustomMemoryCacheService _cache;

        public SportService(ISportTypeDataAccess dataAccess, ICustomMemoryCacheService cache)
        {
            _sportDataAccess = dataAccess;
            _cache = cache;
        }

        public async Task<IEnumerable<SportGame>> GetSportBySiteNameAsync(string siteName)
        {
            var cacheKey = CacheKey.MemorycacheSportListByLicensee + siteName;
            var sportList = _cache.Get<IList<SportGame>>(cacheKey);

            if (sportList != null)
            {
                return sportList;
            }

            return await _sportDataAccess.GetSportBySiteNameAsync(siteName);
        }
    }
}
