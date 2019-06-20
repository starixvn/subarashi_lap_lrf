// -----------------------------------------------------------------------
// <copyright file="WinLossByLeagueDataAccess.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.DataAccess.Report
{
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.Athena.DataAccess.Core;
    using Fanex.Athena.DataAccess.Core.Extensions;
    using Fanex.Athena.DataAccess.Report.Interfaces;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Report.DTO;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Common;
    using Fanex.Common.Extensions;
    using Fanex.Data;
    using Model.Core.ResultModel;
    using VendorAdapter.Interfaces;

    public class WinLossByLeagueDataAccess : BaseDataAccess, IWinLossByLeagueDataAccess
    {
        private readonly ICacheRefAdapter _cacheRefAdapter;

        public WinLossByLeagueDataAccess(
            ICacheRefAdapter cacheRefAdapter)
        {
            _cacheRefAdapter = cacheRefAdapter;
        }

        public async Task<IEnumerable<WinLossByLeague>> GetSummary(WinLossByLeagueMetaModel metaModel)
        {
            const string UspName = "Lrf_Rpt_WinlostByLeague";

            using (var db = this.GetObjectDb(UspName))
            {
                AddCommonParams(metaModel, db);
                db.SetParameterValue("balanceupday", metaModel.BalanceUpDay);

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    return GetMatches(reader);
                }
            }
        }

        public async Task<ReportResultModel<WinLossByLeague>> GetCustomers(WinLossByLeagueMetaModel metaModel)
        {
            const string UspName = "Lrf_Rpt_WinlossByLeagueDetail";

            using (var db = this.GetObjectDb(UspName))
            {
                AddCommonParams(metaModel, db);
                db.SetParameterValue("pageindex", metaModel.PageIndex);
                db.SetParameterValue("pagesize", metaModel.PageSize);

                db.SetParameterValue("totalrows", null);

                IEnumerable<WinLossByLeague> dataList = null;
                WinLossByLeague totalData;

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    dataList = GetCustomers(reader);
                    reader.NextResult();
                    totalData = GetTotalData(reader);
                }

                var totalRows = Converter.ToInt(db.GetParameterValue("totalrows"));
                return new ReportResultModel<WinLossByLeague>
                {
                    DataList = dataList,
                    TotalData = totalData,
                    TotalRows = totalRows
                };
            }
        }

        private static void AddCommonParams(WinLossByLeagueMetaModel metaModel, IObjectDb db)
        {
            var showSb = metaModel.ProductOptions.Any(i => i.Code == Product.SB && i.Status);
            var showBa = metaModel.ProductOptions.Any(i => i.Code == Product.BA && i.Status);

            db.SetParameterValue("fromdate", metaModel.FromDate);
            db.SetParameterValue("todate", metaModel.ToDate);
            db.SetParameterValue("odds", metaModel.Odds);
            db.SetParameterValue("leagueid", metaModel.League);
            db.SetParameterValue("matchid", metaModel.Match);
            db.SetParameterValue("movebetsday", metaModel.MoveBetsDay);
            db.SetParameterValue("showsb", showSb);
            db.SetParameterValue("showba", showBa);
            db.SetParameterValue("AgentList", metaModel.AgentListXml);
            db.SetParameterValue("showwin", metaModel.ShowWin);
            db.SetParameterValue("showloss", metaModel.ShowLoss);
            db.SetParameterValue("showdraw", metaModel.ShowDraw);
            db.SetParameterValue("BaseCurrency", metaModel.BaseCurrency);
        }

        private static IEnumerable<WinLossByLeague> GetCustomers(IDataReader reader)
        {
            var result = new List<WinLossByLeague>();
            var index = 1;
            while (reader.Read())
            {
                var hasSystemId = reader.HasColumn("username");
                var hasExternalId = reader.HasColumn("nickname");
                var hasCustomerId = reader.HasColumn("custid");

                var item = new WinLossByLeague
                {
                    Index = index++,
                    SystemId = hasSystemId ? reader.ToString("username") : string.Empty,
                    ExternalId = hasExternalId ? reader.ToString("nickname") : string.Empty,
                    CustomerId = hasCustomerId ? reader.ToInt("custid") : 0,
                    TurnOver = reader.ToDecimal("turnover"),
                    CustomerWinLoss = reader.ToDecimal("memberwinlost"),
                    LicenseeWL = reader.ToDecimal("licenseewl"),
                    BACommission = reader.ToDecimal("CommBA"),
                    BetCount = reader.ToInt("betcount")
                };
                result.Add(item);
            }

            return result;
        }

        private static WinLossByLeague GetTotalData(IDataReader reader)
        {
            var totalData = new WinLossByLeague();
            if (reader.Read())
            {
                totalData.TurnOver = reader.ToDecimal("turnover");
                totalData.CustomerWinLoss = reader.ToDecimal("memberwinlost");
                totalData.LicenseeWL = reader.ToDecimal("licenseewl");
                totalData.BACommission = reader.ToDecimal("CommBA");
                totalData.BetCount = reader.ToInt("betcount");
            }

            return totalData;
        }

        private IEnumerable<WinLossByLeague> GetMatches(IDataReader reader)
        {
            var result = new List<WinLossByLeague>();
            var index = 1;
            while (reader.Read())
            {
                var homeId = reader.ToInt("homeid");
                var awayId = reader.ToInt("awayid");
                var item = new WinLossByLeague
                {
                    Index = index++,
                    TurnOver = reader.ToDecimal("turnover"),
                    CustomerWinLoss = reader.ToDecimal("memberwinlost"),
                    LicenseeWL = reader.ToDecimal("licenseewl"),
                    BACommission = reader.ToDecimal("CommBA"),
                    BetCount = reader.ToInt("betcount"),
                    AmountDue = reader.ToDecimal("amtduetoBa"),
                    HomeId = homeId,
                    HomeName = _cacheRefAdapter.GetTeamName(homeId),
                    AwayId = awayId,
                    AwayName = _cacheRefAdapter.GetTeamName(awayId),
                };
                result.Add(item);
            }

            return result;
        }
    }
}