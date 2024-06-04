// -----------------------------------------------------------------------
// <copyright file="BetTypeDataAccess.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.DataAccess.Core.Common
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.Athena.DataAccess.Core.Common.Interfaces;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.Helper;
    using Fanex.Common.Extensions;
    using VendorAdapter.Interfaces;

    public class BetTypeDataAccess : BaseDataAccess, IBetTypeDataAccess
    {
        private readonly ICacheRefAdapter _cacheRefAdapter;

        public BetTypeDataAccess(ICacheRefAdapter cacheRefAdapter)
        {
            _cacheRefAdapter = cacheRefAdapter;
        }

        public async Task<IList<(string ProductPrefix, int BetTypeId)>> GetBettypes(string xmlSportList)
        {
            const string UspName = "Lrf_SelBetTypeBySport";
            IList<(string ProductPrefix, int BetType)> results = new List<(string ProductPrefix, int BetType)>();

            using (var db = this.GetObjectDb(UspName))
            {
                db.SetParameterValue("sportlist", xmlSportList);
                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    while (reader.Read())
                    {
                        var productPrefix = reader.ToString("ProductPrefix");
                        var betTypeId = reader.ToInt("BetType");
                        results.Add((productPrefix, betTypeId));
                    }
                }
            }

            return results;
        }

        public async Task<IList<CheckedItem>> GetBettypesByProduct(int licenseeId, string productCode, string languageCode, bool isHideSaba)
        {
            const string UspName = "Lrf_SelBetTypesByProduct";

            IList<CheckedItem> results = new List<CheckedItem>();
            var products = productCode?.ToUpperInvariant().Split(',');

            if (products != null && products.IsPresent(_ => _ == Product.CO))
            {
                results = GetNewCOBettypes();
                productCode = string.Join(",", products.Where(_ => _ != Product.CO));
            }

            if (string.IsNullOrEmpty(productCode))
            {
                return results;
            }

            using (var db = this.GetObjectDb(UspName))
            {
                db.SetParameterValue("licenseeid", licenseeId);
                db.SetParameterValue("productcode", productCode);
                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    while (reader.Read())
                    {
                        var id = int.Parse(reader["Bettype"].ToString());
                        var name = _cacheRefAdapter.GetBetTypeName(id, languageCode, isHideSaba);
                        if (MappingHelper.MapBettypeSportByProduct.ContainsKey(id))
                        {
                            var suffix = _cacheRefAdapter.GetSportName(MappingHelper.MapBettypeSportByProduct[id], languageCode);
                            name += " (" + suffix + ")";
                        }

                        results.Add(new CheckedItem
                        {
                            Checked = true,
                            ID = id,
                            Name = name
                        });
                    }
                }
            }

            return results;
        }

        public async Task<IEnumerable<(string ProductCode, int BetType)>> GetBetTypeForProducts(int licenseeId, string productCodes)
        {
            const string UspName = "LAP_Rpt_WinlossAnalysis_BettypeSel";

            IList<(string ProductCode, int BetType)> results = new List<(string ProductCode, int BetType)>();

            if (string.IsNullOrEmpty(productCodes))
            {
                return results;
            }

            using (var db = this.GetObjectDb(UspName))
            {
                db.SetParameterValue("licenseeid", licenseeId);
                db.SetParameterValue("productCodes", productCodes);
                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    while (reader.Read())
                    {
                        var productCode = reader["ProductCode"].ToString();
                        var betType = int.Parse(reader["Bettype"].ToString());

                        results.Add((productCode, betType));
                    }
                }
            }

            return results;
        }

        public List<CheckedItem> GetNewCOBettypes()
        {
            var bettypeList = new List<CheckedItem>();

            bettypeList.AddRange(new List<CheckedItem>
            {
                new CheckedItem { ID = (int)BetType.Handicap, Name = _cacheRefAdapter.GetBettype((int)BetType.Handicap) },
                new CheckedItem { ID = (int)BetType.OverUnder, Name = _cacheRefAdapter.GetBettype((int)BetType.OverUnder) },
                new CheckedItem { ID = (int)BetType.Ft1X2, Name = _cacheRefAdapter.GetBettype((int)BetType.Ft1X2) },
                new CheckedItem { ID = (int)BetType.FirstHalfHandicap, Name = _cacheRefAdapter.GetBettype((int)BetType.FirstHalfHandicap) },
                new CheckedItem { ID = (int)BetType.FirstHalfOverUnder, Name = _cacheRefAdapter.GetBettype((int)BetType.FirstHalfOverUnder) },
                new CheckedItem { ID = (int)BetType.FirstHalf1X2, Name = _cacheRefAdapter.GetBettype((int)BetType.FirstHalf1X2) }
            });

            return bettypeList;
        }
    }
}