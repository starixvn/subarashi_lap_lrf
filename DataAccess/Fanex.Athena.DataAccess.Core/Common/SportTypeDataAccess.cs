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
    using Fanex.Common.Extensions;
    using VendorAdapter.Interfaces;

    public class SportTypeDataAccess : BaseDataAccess, ISportTypeDataAccess
    {
        private static readonly int[] HiddenSports = new[]
        {
            (int)SportType.UnknowThaiSport,
            (int)SportType.DuplicatedCricket // Duplicated with sport 50
        };

        private readonly ICacheRefAdapter _cacheRefAdapter;

        public SportTypeDataAccess(
            ICacheRefAdapter cacheRefAdapter)
        {
            _cacheRefAdapter = cacheRefAdapter;
        }

        public async Task<IEnumerable<SportProductItem>> GetSportsAndProducts(int licenseeId, string languageCode, string productCodes = "")
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
                            var name = parentId == ProductType ? reader.ToString("Name") : _cacheRefAdapter.GetSportName(id, languageCode);

                            result.Add(new SportProductItem
                            {
                                Checked = true,
                                ID = id,
                                Name = name,
                                ParentId = parentId,
                                IsParent = parentId == ProductType
                            });
                        }
                    }

                    return result;
                }
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

        public async Task<IEnumerable<SportGame>> GetSportForProductsAsync(string siteName, string productCode)
        {
            const string UspName = "Lrf_SelSportBySiteName";

            using (var db = this.GetObjectDb(UspName))
            {
                return await db.QueryAsync<SportGame>(new { SiteName = siteName, productCodes = productCode });
            }
        }

        public async Task<IEnumerable<SportForTreeViewItem>> GetSportsForTreeView(int licenseeId, string productCodes)
        {
            const string UspName = "LAP_Rpt_WinlossAnalysis_SportSel";

            using (var db = this.GetObjectDb(UspName))
            {
                return await db.QueryAsync<SportForTreeViewItem>(new { licenseeId, productCodes });
            }
        }
    }
}