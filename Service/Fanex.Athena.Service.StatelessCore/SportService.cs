using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Fanex.Athena.DataAccess.Core.Common.Interfaces;
using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Core.DTO.Configuration;
using Fanex.Athena.Resources;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.VendorAdapter.Interfaces;

namespace Fanex.Athena.Service.StatelessCore
{
    public class SportService : ISportService
    {
        private readonly ISportTypeDataAccess _sportTypeDataAccess;
        private readonly ICacheRefAdapter _cacheRefAdapter;
        private readonly ICustomMemoryCacheService _cache;
        private readonly IProductService _productService;

        private static readonly IEnumerable<(int Id, int SportTypeId, IEnumerable<int> LeagueGroupIds)> SabaVirtualSports = new List<(int, int, IEnumerable<int>)>
        {
            ((int)SportType.SabaSoccer, (int)SportType.Soccer, new [] { 42, 74 }),
            ((int)SportType.SabaBasketball, (int)SportType.BasketBall, new [] { 42 }),
            ((int)SportType.SabaCricket, (int)SportType.Cricket, new [] { 42 }),
            ((int)SportType.SabaFutsal, (int)SportType.Soccer, new [] { 108 }),
            ((int)SportType.SabaTennis, (int)SportType.Tennis, new [] { 42 }),
            ((int)SportType.SabaIceHockey, (int)SportType.IceHockey, new [] { 42 }),
            ((int)SportType.SabaKabaddi, (int)SportType.Kabaddi, new [] { 42 }),
            ((int)SportType.SabaSoccerPingoal, (int)SportType.Soccer, new [] { 113 }),
            ((int)SportType.SabaSoccerMarble, (int)SportType.Soccer, new [] { 252 }),
            ((int)SportType.SabaBasketballPinGoal, (int)SportType.BasketBall, new [] { 122 }),
            ((int)SportType.SabaESportsPinGoal, (int)SportType.Esports, new [] { 151 })
        };

        public SportService(
            ISportTypeDataAccess sportTypeDataAccess,
            ICacheRefAdapter cacheRefAdapter,
            ICustomMemoryCacheService cache,
            IProductService productService)
        {
            _sportTypeDataAccess = sportTypeDataAccess;
            _cacheRefAdapter = cacheRefAdapter;
            _cache = cache;
            _productService = productService;
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

        public async Task<IEnumerable<SportProductItem>> GetSportsAndProducts(int licenseeId, string languageCode, string productCodes = "")
        {
            var result = await _sportTypeDataAccess.GetSportsAndProducts(licenseeId, languageCode, productCodes).ConfigureAwait(false);

            foreach (var item in result.Where(_ => _.IsParent))
            {
                item.Name = _productService.GetProductName(item.Name);
            }

            return result;
        }

        public async Task<IEnumerable<SportProductItem>> GetSportAndProductAndSabaSport(int licenseeId, string languageCode, bool isHideSaba, string productCodes = "")
        {
            var result = new List<SportProductItem>();
            result.AddRange(await GetSportsAndProducts(licenseeId, languageCode, productCodes));

            result.AddRange(GetSabaSports(isHideSaba).Select(t => new SportProductItem
            {
                Checked = true,
                ID = t.Id,
                Name = t.Name,
                ParentId = ProductTypes.Sportsbook
            }));

            return result;
        }

        public IEnumerable<SabaSport> GetSabaSports(bool isHideSaba = false)
            => SabaVirtualSports.Select(t => new SabaSport
            {
                Id = t.Id,
                LeagueGroupIds = t.LeagueGroupIds,
                Name = GetSabaName(t.Id, t.SportTypeId, isHideSaba),
                SportTypeId = t.SportTypeId
            });

        public SabaSport GetSabaSport(int id, bool isHideSaba = false)
            => GetSabaSports(isHideSaba).FirstOrDefault(t => t.Id == id);

        public async Task<IEnumerable<CheckedItem>> GetSportsForTreeView(int licenseeId, string languageCode, string productCodes = "", bool isHideSaba = false)
        {
            var cacheKey = CacheKey.MemorycacheSportListForTreeView + licenseeId + languageCode + productCodes;
            var sportList = _cache.Get<IEnumerable<CheckedItem>>(cacheKey);

            if (sportList != null)
            {
                return sportList;
            }

            var sportItems = await _sportTypeDataAccess.GetSportsForTreeView(licenseeId, productCodes);
            return BuildSportList(sportItems, isHideSaba);
        }

        private string GetSabaName(int id, int sportTypeId, bool isHideSaba = false)
        {
            string sportName;
            var prefixText = isHideSaba ? ViewResources.Virtual : ViewResources.Saba;
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

                case (int)SportType.SabaSoccerMarble:
                    sportName = ViewResources.SoccerMarble;
                    break;

                default:
                    sportName = _cacheRefAdapter.GetSportName(sportTypeId);
                    break;
            }
            return $"{prefixText}{sportName}";
        }

        private ICollection<CheckedItem> BuildSportList(IEnumerable<SportForTreeViewItem> sportItems, bool isHideSaba = false)
        {
            var sportList = sportItems.GroupBy(_ => (_.ProductId, _.ProductCode),
                _ => BuildSportCheckItem(_, isHideSaba),
                (key, elems) => new CheckedItem
                {
                    ID = key.ProductId,
                    Checked = true,
                    Children = elems,
                    Name = _productService.GetProductName(key.ProductCode),
                    Value = key.ProductCode
                }).ToList();

            return sportList;
        }

        private CheckedItem BuildSportCheckItem(SportForTreeViewItem sport, bool isHideSaba = false)
            => new CheckedItem
            {
                Checked = true,
                Children = null,
                ID = sport.SportType,
                Name = GetSportNameForTreeView(sport.SportType, isHideSaba),
                Value = sport.SportType.ToString()
            };

#pragma warning disable S1541 // Methods and properties should not be too complex

        private string GetSportNameForTreeView(int sportType, bool isHideSaba = false)
        {
            var prefixText = isHideSaba ? ViewResources.Virtual : ViewResources.Saba;

            if (sportType > 0)
            {
                return _cacheRefAdapter.GetSportName(sportType);
            }
            if (sportType == (int)SportType.ParlayTreeView)
            {
                return ViewResources.Parlay;
            }
            var sportName = string.Empty;
            switch (sportType)
            {
                case (int)SportType.SabaBasketball:
                    sportName = _cacheRefAdapter.GetSportName((int)SportType.BasketBall);
                    break;

                case (int)SportType.SabaSoccer:
                    sportName = _cacheRefAdapter.GetSportName((int)SportType.Soccer);
                    break;

                case (int)SportType.SabaCricket:
                    sportName = _cacheRefAdapter.GetSportName((int)SportType.Cricket);
                    break;

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

                case (int)SportType.SabaTennis:
                    sportName = _cacheRefAdapter.GetSportName((int)SportType.Tennis);
                    break;

                case (int)SportType.SabaIceHockey:
                    sportName = _cacheRefAdapter.GetSportName((int)SportType.IceHockey);
                    break;

                case (int)SportType.SabaKabaddi:
                    sportName = _cacheRefAdapter.GetSportName((int)SportType.Kabaddi);
                    break;

                case (int)SportType.SabaSoccerMarble:
                    sportName = ViewResources.SoccerMarble;
                    break;

                default:
                    _cacheRefAdapter.GetSportName(sportType);
                    break;
            }
            return $"{prefixText}{sportName}";
        }

#pragma warning restore S1541 // Methods and properties should not be too complex
    }
}