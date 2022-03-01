// -----------------------------------------------------------------------
// <copyright file="SportTypeDataAccess.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.DataAccess.Core.Common
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.Athena.DataAccess.Core.Common.Interfaces;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Resources;
    using Fanex.Common.Extensions;
    using VendorAdapter.Interfaces;

    public class SportTypeDataAccess : BaseDataAccess, ISportTypeDataAccess
    {
        private static readonly int[] HiddenSports = new[]
        {
            (int)SportType.UnknowThaiSport,
            (int)SportType.DuplicatedCricket // Duplicated with sport 50
        };

        private static readonly List<Tuple<int, int, string>> SabaVirtualSports = new List<Tuple<int, int, string>>
        {
            Tuple.Create( (int)SportType.SabaSoccer, (int)SportType.Soccer, "" ),
            Tuple.Create( (int)SportType.SabaSoccerPingoal, 0, ViewResources.SoccerPinGoal),
            Tuple.Create( (int)SportType.SabaBasketball, (int)SportType.BasketBall, "" ),
            Tuple.Create( (int)SportType.SabaBasketballPinGoal, 0, ViewResources.BasketballPinGoal),
            Tuple.Create( (int)SportType.SabaCricket, (int)SportType.Cricket, "" ),
            Tuple.Create( (int)SportType.SabaFutsal, (int)SportType.Futsal, "" )
        };

        private readonly ICacheRefAdapter _cacheRefAdapter;

        public SportTypeDataAccess(
            ICacheRefAdapter cacheRefAdapter)
        {
            _cacheRefAdapter = cacheRefAdapter;
        }

        public async Task<IEnumerable<SportProductItem>> GetSportsAndProducts(int licenseeId, string languageCode, string productCodes = "", bool includeSabaSport = false)
        {
            const string UspName = "Lrf_SelSportDetail";
            const int ProductType = -1;

            using (var db = this.GetObjectDb(UspName))
            {
                db.SetParameterValue("licenseeId", licenseeId);
                db.SetParameterValue("ProductCodes", productCodes);
                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    var result = new List<SportProductItem>();
                    while (reader.Read())
                    {
                        var id = reader.ToInt("ID");
                        var parentId = reader["ParentId"] != DBNull.Value ? reader.ToInt("ParentId") : ProductType;

                        if (!HiddenSports.Contains(id))
                        {
                            var name = parentId == ProductType ? DataHelper.GetProductName(reader.ToString("Name")) : _cacheRefAdapter.GetSportName(id, languageCode);

                            result.Add(new SportProductItem
                            {
                                Checked = true,
                                ID = id,
                                Name = name,
                                ParentId = parentId
                            });
                        }
                    }

                    if (includeSabaSport)
                    {
                        GetSabaVirtualSport(result);
                    }

                    return result;
                }
            }
        }

        private void GetSabaVirtualSport(List<SportProductItem> sports)
        {
            foreach (var sabaSport in SabaVirtualSports)
            {
                var sportName = sabaSport.Item2 == 0 ? sabaSport.Item3 : _cacheRefAdapter.GetSportName(sabaSport.Item2);

                sports.Add(new SportProductItem
                {
                    Checked = true,
                    ID = sabaSport.Item1,
                    Name = $"{ViewResources.Saba}{sportName}",
                    ParentId = ProductTypes.Sportsbook
                });
            }
        }

        public async Task<IDictionary<int, string>> GetAllSports()
        {
            const string UspName = "Lrf_SportsGetAll";
            var result = new SortedDictionary<int, string>();

            using (var db = this.GetObjectDb(UspName))
            {
                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    while (reader.Read())
                    {
                        var sportId = reader.ToInt("Sporttype");
                        if (!HiddenSports.Contains(sportId))
                        {
                            var sportName = _cacheRefAdapter.GetSportName(sportId);
                            result.Add(sportId, sportName);
                        }
                    }
                }
            }

            return result;
        }
    }
}