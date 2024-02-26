// -----------------------------------------------------------------------
// <copyright file="MatchWinLossDataAccess.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.DataAccess.Report
{
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Threading.Tasks;
    using Core.Configuration.Interfaces;
    using Data;
    using Fanex.Athena.DataAccess.Core;
    using Fanex.Athena.DataAccess.Core.Extensions;
    using Fanex.Athena.DataAccess.Report.Interfaces;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Report.DTO;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Common;
    using Fanex.Common.Extensions;
    using VendorAdapter.Interfaces;

    public class MatchWinLossDataAccess : BaseDataAccess, IMatchWinLossDataAccess
    {
        private readonly IBalanceUpDataAccess _balanceUpDataAccess;

        private readonly ICacheRefAdapter _cacheRefAdapter;

        private const string STR_SHOWBA = "ShowBA";

        private const string STR_PRODUCTLIST = "ProductList";

        public MatchWinLossDataAccess(
            IBalanceUpDataAccess balanceUpDataAccess,
            ICacheRefAdapter cacheRefAdapter)
        {
            _balanceUpDataAccess = balanceUpDataAccess;
            _cacheRefAdapter = cacheRefAdapter;
        }

        public async Task<IList<MatchWinLoss>> GetDataList(MatchWinLossMetaModel metaModel)
        {
            const string UspName = "Lrf_Rpt_MatchWinLoss";

            using (var db = this.GetObjectDb(UspName))
            {
                SetCommonParam(db, metaModel);
                db.SetParameterValue("BalanceUpDay", _balanceUpDataAccess.GetBalanceUp().BalanceUpDay);
                db.SetParameterValue("Date", metaModel.Date);
                var productBA = metaModel.ProductOptions.FirstOrDefault(_ => _.Code == "BA");
                if (productBA != null)
                {
                    db.SetParameterValue(STR_SHOWBA, productBA.Status);
                }
                db.SetParameterValue(STR_PRODUCTLIST, string.Join(",", metaModel.ProductOptions.Where(_ => _.Status && _.Code != "BA").Select(_ => _.Code)));

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    return SetToList(reader);
                }
            }
        }

        public async Task<DataSet> GetDetailDataSet(MatchWinLossMetaModel metaModel)
        {
            const string UspName = "Lrf_Rpt_MatchWinLossDetail";

            using (var db = this.GetObjectDb(UspName))
            {
                SetCommonParam(db, metaModel);
                db.SetParameterValue("BalanceUpDay", _balanceUpDataAccess.GetBalanceUp().BalanceUpDay);
                db.SetParameterValue("Date", metaModel.Date);
                db.SetParameterValue("PageSize", metaModel.PageSize);
                var productBA = metaModel.ProductOptions.FirstOrDefault(_ => _.Code == "BA");
                if (productBA != null)
                {
                    db.SetParameterValue(STR_SHOWBA, productBA.Status);
                }
                db.SetParameterValue(STR_PRODUCTLIST, string.Join(",", metaModel.ProductOptions.Where(_ => _.Status && _.Code != "BA").Select(_ => _.Code)));

                return await db.ExecuteDataSetAsync().ConfigureAwait(false);
            }
        }

        public async Task<IList<MatchWinLoss>> GetDetailDataList(MatchWinLossMetaModel metaModel)
        {
            const string UspName = "Lrf_Rpt_MatchWinLossByBettype";

            using (var db = this.GetObjectDb(UspName))
            {
                SetCommonParam(db, metaModel);
                db.SetParameterValue("BalanceUpDay", _balanceUpDataAccess.GetBalanceUp().BalanceUpDay);
                db.SetParameterValue("MatchId", metaModel.MatchId);
                db.SetParameterValue("Date", metaModel.Date);

                var productList = metaModel.ProductCodeList.Split(',').ToList();
                int indexBA = productList.IndexOf("BA");
                if (indexBA > -1)
                {
                    db.SetParameterValue("ShowBA", true);
                    productList.RemoveAt(indexBA);
                }
                db.SetParameterValue(STR_PRODUCTLIST, string.Join(",", productList));

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    return SetToList(reader);
                }
            }
        }

        public async Task<IList<MatchWinLoss>> GetOutrightParlayList(MatchWinLossMetaModel metaModel)
        {
            const string UspName = "Lrf_Rpt_MatchWinLossByOutrightParlay";

            using (var db = this.GetObjectDb(UspName))
            {
                SetCommonParam(db, metaModel);
                db.SetParameterValue("Date", metaModel.Date);
                var productBA = metaModel.ProductOptions.FirstOrDefault(_ => _.Code == "BA");
                if (productBA != null)
                {
                    db.SetParameterValue(STR_SHOWBA, productBA.Status);
                }
                db.SetParameterValue(STR_PRODUCTLIST, string.Join(",", metaModel.ProductOptions.Where(_ => _.Status && _.Code != "BA").Select(_ => _.Code)));

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    return SetToListOutrightParlay(reader);
                }
            }
        }

        private IList<MatchWinLoss> SetToListOutrightParlay(IDataReader reader)
        {
            var dataList = new List<MatchWinLoss>();
            while (reader.Read())
            {
                dataList.Add(new MatchWinLoss
                {
                    BetType = reader.ToInt("bettype"),
                    ProductCode = reader.ToString("ProductCode"),
                    Turnover = reader.ToDecimal("Turnover"),
                    TotalTransaction = reader.ToInt("betcount"),
                    CustomerWL = reader.ToDecimal("WinLost"),
                    CustomerComm = reader.ToDecimal("PlayerComm"),
                    LicenseeWL = reader.ToDecimal("LicenseeWL"),
                    BACommission = reader.ToDecimal("CommBA"),
                    AmtDueToBA = reader.ToDecimal("AmtDueToBA")
                });
            }

            return dataList;
        }

        private IList<MatchWinLoss> SetToList(IDataReader reader)
        {
            var hasBetType = reader.HasColumn("bettype");
            var hasProductName = reader.HasColumn("productname");
            var hasLiveIndicator = reader.HasColumn("liveindicator");
            var hasIsNeutral = reader.HasColumn("isneutral");
            var hasKickOffTime = reader.HasColumn("KickoffTime");
            var dataList = new List<MatchWinLoss>();
            while (reader.Read())
            {
                var betType = hasBetType ? reader.ToInt("bettype") : 0;
                var isLive = hasLiveIndicator && Converter.ToBool(reader["liveindicator"]);
                dataList.Add(new MatchWinLoss
                {
                    LeagueId = reader.ToInt("leagueid"),
                    MatchId = reader.ToInt("matchid"),
                    MatchCode = reader.ToString("matchcode"),
                    HomeId = reader.ToInt("homeid"),
                    AwayId = reader.ToInt("awayid"),
                    Turnover = reader.ToDecimal("Turnover"),
                    TotalTransaction = reader.ToInt("betcount"),
                    CustomerWL = reader.ToDecimal("WinLost"),
                    CustomerComm = reader.ToDecimal("PlayerComm"),
                    LicenseeWL = reader.ToDecimal("LicenseeWL"),
                    BACommission = reader.ToDecimal("CommBA"),
                    AmtDueToBA = reader.ToDecimal("AmtDueToBA"),
                    BetType = betType,
                    BettypeName = _cacheRefAdapter.GetBettype(betType, isLive),
                    ProductName = hasProductName ? reader.ToString("productname") : string.Empty,
                    IsLive = isLive,
                    IsNeutral = hasIsNeutral && Converter.ToBool(reader["isNeutral"]),
                    SportType = reader.ToShort("sporttype"),
                    KickOffTime = hasKickOffTime ? reader.ToDateTime("KickoffTime") : DateTimeHelper.MinValue
                });
            }

            return dataList;
        }

        private void SetCommonParam(IObjectDb db, MatchWinLossMetaModel metaModel)
        {
            db.SetParameterValue("AgentList", metaModel.AgentListXml);
            db.SetParameterValue("MoveBetsDay", _balanceUpDataAccess.GetBalanceUp().MoveBetsDay);
            db.SetParameterValue("BaseCurrency", metaModel.BaseCurrency);
        }
    }
}