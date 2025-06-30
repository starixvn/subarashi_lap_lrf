// -----------------------------------------------------------------------
// <copyright file="WinLossByBetTypeDataAccess.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.DataAccess.Report
{
    using System.Data;
    using System.Threading.Tasks;
    using Core.Configuration.Interfaces;
    using Fanex.Athena.DataAccess.Core;
    using Fanex.Athena.DataAccess.Report.Interfaces;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Core;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Report.DTO;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Common.Extensions;
    using Model.Core.DataDomain;
    using Resources;
    using VendorAdapter.Interfaces;

    public class WinLossByBetTypeDataAccess : BaseDataAccess, IWinLossByBetTypeDataAccess
    {
        private readonly ICacheRefAdapter _cacheRefAdapter;
        private readonly IBalanceUpDataAccess _balanceUpDataAccess;

        public WinLossByBetTypeDataAccess(
            ICacheRefAdapter cacheRefAdapter,
            IBalanceUpDataAccess balanceUpDataAccess)
        {
            _cacheRefAdapter = cacheRefAdapter;
            _balanceUpDataAccess = balanceUpDataAccess;
        }

        public async Task<SortableList<WinLossByBetType>> GetDataList(WinLossByBetTypeMetaModel metaModel, ProductAccess productAccess)
        {
            const string UspName = "Lrf_Rpt_WinLossByBettype";
            var balanceUp = _balanceUpDataAccess.GetBalanceUp();
            var uspParams = new
            {
                AgentList = metaModel.AgentListXml,
                metaModel.FromDate,
                metaModel.ToDate,
                balanceUp.MoveBetsDay,
                balanceUp.BalanceUpDay,
                metaModel.BaseCurrency
            };

            using (var db = this.GetObjectDb(UspName))
            {
                using (var reader = await db.ExecuteReaderAsync(uspParams).ConfigureAwait(false))
                {
                    return ReadData(reader, productAccess);
                }
            }
        }

        private static string GetSportName(int bettype, ProductAccess productAccess)
        {
            if (BetTypeHelper.IsVirtualSports(bettype))
            {
                return " (" + productAccess.GetProductName(Product.VS) + ")";
            }

            if (bettype == (int)BetType.NumberGameHappy5OddEven)
            {
                return " (" + ViewResources.Happy5 + ")";
            }

            if (bettype == (int)BetType.LotteryPenaltyShootOut || bettype == (int)BetType.LotteryPenaltyShootOut2)
            {
                return " (" + productAccess.GetProductName(Product.LT) + ")";
            }

            return string.Empty;
        }

        private SortableList<WinLossByBetType> ReadData(IDataReader reader, ProductAccess productAccess)
        {
            var dataList = new SortableList<WinLossByBetType>();

            while (reader.Read())
            {
                var bettype = reader.ToInt("bettype");
                var liveIndicator = reader.ToBool("liveindicator");
                var item = new WinLossByBetType
                {
                    LiveIndicator = liveIndicator,
                    BetType = bettype,
                    BetTypeName = _cacheRefAdapter.GetBettype(bettype, liveIndicator) + GetSportName(bettype, productAccess),
                    Turnover = reader.ToDecimal("Turnover"),
                    CustomerWinLoss = reader.ToDecimal("MemberWinLost"),
                    CustomerComm = reader.ToDecimal("PlayerComm"),
                    LicenseeWL = reader.ToDecimal("LicenseeWL"),
                    BACommission = reader.ToDecimal("CommBA"),
                    AmtDueToBA = reader.ToDecimal("AmtDueToBA")
                };

                dataList.Add(item);
            }

            return dataList;
        }
    }
}