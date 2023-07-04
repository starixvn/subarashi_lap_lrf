using Fanex.Athena.DataAccess.Core.Common.Interfaces;
using Fanex.Athena.Extension.Helper;
using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Model.Core.Constants;
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
            ((int)SportType.SabaTennis, (int)SportType.Tennis, new [] { 42 }),
            ((int)SportType.SabaSoccerPingoal, (int)SportType.Soccer, new [] { 113 }),
            ((int)SportType.SabaBasketballPinGoal, (int)SportType.BasketBall, new [] { 122 }),
            ((int)SportType.SabaESportsPinGoal, (int)SportType.Esports, new [] { 151 })
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

        public async Task<IEnumerable<CheckedItem>> GetSportsForTreeView(int licenseeId, string languageCode, string productCodes = "")
        {
            var cacheKey = CacheKey.MemorycacheSportListForTreeView + licenseeId + languageCode + productCodes;
            var sportList = _cache.Get<IEnumerable<CheckedItem>>(cacheKey);

            if (sportList != null)
            {
                return sportList;
            }

            var sportItems = await _sportTypeDataAccess.GetSportsForTreeView(licenseeId, productCodes);
            return BuildSportList(sportItems);
        }

        private string GetSabaName(int id, int sportTypeId)
        {
            string sportName;
            switch (id)
            {
                case (int)SportType.SabaSoccerPingoal:
                    sportName = ViewResources.SoccerPinGoal;
                    break;

                case (int)SportType.SabaBasketballPinGoal:
                    sportName = ViewResources.BasketballPinGoal;
                    break;

                case (int)SportType.SabaESportsPinGoal:
                    sportName = ViewResources.ESportsPinGoal;
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

        private ICollection<CheckedItem> BuildSportList(IEnumerable<SportForTreeViewItem> sportItems)
        {
            var sportList = sportItems.GroupBy(_ => (_.ProductId, _.ProductCode),
                _ => BuildSportCheckItem(_),
                (key, elems) => new CheckedItem
                {
                    ID = key.ProductId,
                    Checked = true,
                    Children = elems,
                    Name = DataHelper.GetProductName(key.ProductCode),
                    Value = key.ProductCode
                }).ToList();

            return sportList;
        }

        private CheckedItem BuildSportCheckItem(SportForTreeViewItem sport)
            => new CheckedItem
            {
                Checked = true,
                Children = null,
                ID = sport.SportType,
                Name = GetSportNameForTreeView(sport.SportType),
                Value = sport.SportType.ToString()
            };

        private string GetSportNameForTreeView(int sportType)
        {
            if (sportType > 0)
            {
                return _cacheRefAdapter.GetSportName(sportType);
            }
            if (sportType == HardCodeSportType.Parlay)
            {
                return ViewResources.Parlay;
            }
            var sportName = string.Empty;
            switch (sportType)
            {
                case HardCodeSportType.SabaBasketball:
                    sportName = _cacheRefAdapter.GetSportName((int)SportType.BasketBall);
                    break;

                case HardCodeSportType.SabaSoccer:
                    sportName = _cacheRefAdapter.GetSportName((int)SportType.Soccer);
                    break;

                case HardCodeSportType.SabaCricket:
                    sportName = _cacheRefAdapter.GetSportName((int)SportType.Cricket);
                    break;

                case HardCodeSportType.SabaSoccerPinGoal:
                    sportName = ViewResources.SoccerPinGoal;
                    break;

                case HardCodeSportType.SabaBasketballPinGoal:
                    sportName = ViewResources.BasketballPinGoal;
                    break;

                case HardCodeSportType.SabaESportPinGoal:
                    sportName = ViewResources.ESportsPinGoal;
                    break;

                case HardCodeSportType.SabaFutsal:
                    sportName = _cacheRefAdapter.GetSportName((int)SportType.Futsal);
                    break;

                case HardCodeSportType.SabaTennis:
                    sportName = _cacheRefAdapter.GetSportName((int)SportType.Tennis);
                    break;

                default:
                    _cacheRefAdapter.GetSportName(sportType);
                    break;
            }
            return $"{ViewResources.Saba}{sportName}";
        }
    }
}