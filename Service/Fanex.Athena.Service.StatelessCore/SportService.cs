using Fanex.Athena.DataAccess.Core.Common.Interfaces;
using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Core.DTO.Configuration;
using Fanex.Athena.Resources;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.VendorAdapter.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fanex.Athena.Service.StatelessCore
{
    public class SportService : ISportService
    {
        private readonly ISportTypeDataAccess _sportTypeDataAccess;
        private readonly ICacheRefAdapter _cacheRefAdapter;
        private readonly ICustomMemoryCacheService _cache;

        private static readonly IEnumerable<(int Id, int SportTypeId, IEnumerable<int> LeagueGroupIds)> SabaVirtualSports = new List<(int, int, IEnumerable<int>)>
        {
            ((int)SportType.SabaSoccer, (int)SportType.Soccer, new [] { 42, 74 }),
            ((int)SportType.SabaBasketball, (int)SportType.BasketBall, new [] { 42 }),
            ((int)SportType.SabaCricket, (int)SportType.Cricket, new [] { 42 }),
            ((int)SportType.SabaFutsal, (int)SportType.Soccer, new [] { 108 }),
            ((int)SportType.SabaSoccerPingoal, (int)SportType.Soccer, new [] { 113 }),
            ((int)SportType.SabaBasketballPinGoal, (int)SportType.BasketBall, new [] { 122 })
        };

        public SportService(ISportTypeDataAccess sportTypeDataAccess, ICacheRefAdapter cacheRefAdapter, ICustomMemoryCacheService cache)
        {
            _sportTypeDataAccess = sportTypeDataAccess;
            _cacheRefAdapter = cacheRefAdapter;
            _cache = cache;
        }

        public async Task<IEnumerable<SportGame>> GetSportForProductAsync(string siteName, string productCode)
        {
            var cacheKey = CacheKey.MemorycacheSportListByLicensee + siteName + productCode;
            var sportList = _cache.Get<IList<SportGame>>(cacheKey);

            if (sportList != null)
            {
                return sportList;
            }

            return await _sportTypeDataAccess.GetSportForProductsAsync(siteName, productCode);
        }

        public Task<IDictionary<int, string>> GetAllSports()
            => _sportTypeDataAccess.GetAllSports();

        public Task<IEnumerable<SportProductItem>> GetSportsAndProducts(int licenseeId, string languageCode, string productCodes = "")
            => _sportTypeDataAccess.GetSportsAndProducts(licenseeId, languageCode, productCodes);

        public async Task<IEnumerable<SportProductItem>> GetSportAndProductAndSabaSport(int licenseeId, string languageCode, string productCodes = "")
        {
            var result = new List<SportProductItem>();
            result.AddRange(await GetSportsAndProducts(licenseeId, languageCode, productCodes));

            result.AddRange(GetSabaSports().Select(t => new SportProductItem
            {
                Checked = true,
                ID = t.Id,
                Name = t.Name,
                ParentId = ProductTypes.Sportsbook
            }));

            return result;
        }

        public IEnumerable<SabaSport> GetSabaSports()
            => SabaVirtualSports.Select(t => new SabaSport
            {
                Id = t.Id,
                LeagueGroupIds = t.LeagueGroupIds,
                Name = GetSabaName(t.Id, t.SportTypeId),
                SportTypeId = t.SportTypeId
            });

        public SabaSport GetSabaSport(int id)
            => GetSabaSports().FirstOrDefault(t => t.Id == id);


        private string GetSabaName(int id, int sportTypeId)
        {
            var sportName = "";
            switch (id)
            {
                case (int)SportType.SabaSoccerPingoal:
                    sportName = ViewResources.SoccerPinGoal;
                    break;
                case (int)SportType.SabaBasketballPinGoal:
                    sportName = ViewResources.BasketballPinGoal;
                    break;
                case (int)SportType.SabaFutsal:
                    sportName = _cacheRefAdapter.GetSportName((int)SportType.Futsal);
                    break;
                default:
                    sportName = _cacheRefAdapter.GetSportName(sportTypeId);
                    break;
            }
            return $"{ViewResources.Saba}{sportName}";
        }
    }
}
