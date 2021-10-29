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
    using Fanex.Athena.DataAccess.Core;
    using Fanex.Athena.DataAccess.Core.Common.Interfaces;
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

        private static List<Tuple<int, int>> SabaVirtualSports = new List<Tuple<int, int>>
        {
            Tuple.Create( (int)SportType.SabaSoccer, (int)SportType.Soccer ),
            Tuple.Create( (int)SportType.SabaBasketball, (int)SportType.BasketBall ),
            Tuple.Create( (int)SportType.SabaCricket, (int)SportType.Cricket ),
            Tuple.Create( (int)SportType.SabaFutsal, (int)SportType.Futsal ),
            Tuple.Create( (int)SportType.SabaPingoal, 0)
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

            using (var db = this.GetObjectDb(UspName))
            {
                db.SetParameterValue("licenseeId", licenseeId);
                db.SetParameterValue("langkey", languageCode);
                db.SetParameterValue("ProductCodes", productCodes);
                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    var result = new List<SportProductItem>();
                    while (reader.Read())
                    {
                        var id = reader.ToInt("ID");
                        if (!HiddenSports.Contains(id))
                        {
                            result.Add(new SportProductItem
                            {
                                Checked = true,
                                ID = id,
                                Name = reader.ToString("Name"),
                                ParentId = reader["ParentId"] != DBNull.Value ? reader.ToInt("ParentId") : -1
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
                var sportName = sabaSport.Item1 == (int)SportType.SabaPingoal ? ViewResources.SoccerPinGoal : _cacheRefAdapter.GetSportName(sabaSport.Item2);

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