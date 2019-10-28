// -----------------------------------------------------------------------
// <copyright file="TurnoverDataAccess.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.DataAccess.Report
{
    using System.Collections.Generic;
    using System.Data;
    using System.Threading.Tasks;
    using Data;
    using Fanex.Athena.DataAccess.Core;
    using Fanex.Athena.DataAccess.Report.Interfaces;
    using Fanex.Athena.Model.Report.DTO;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Common.Extensions;

    public class TurnoverDataAccess : BaseDataAccess, ITurnoverDataAccess
    {
        public async Task<IList<TurnoverDTO>> GetDataList(TurnoverMetaModel metaModel)
        {
            var result = new List<TurnoverDTO>();

            using (var db = this.GetObjectDb("Lrf_Rpt_TurnOver"))
            {
                AddParams(db, metaModel);

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    var index = 1;
                    while (reader.Read())
                    {
                        var item = ReadDataItem(reader, index++);
                        result.Add(item);
                    }
                }
            }

            return result;
        }

        private static TurnoverDTO ReadDataItem(IDataReader reader, int index)
        {
            return new TurnoverDTO
            {
                Index = index,
                Date = reader.ToDateTime("winlostdate").ToString("MM/dd/yyyy"),
                OpeningBalance = reader.ToDecimal("OpeningBalance"),
                Deposit = reader.ToDecimal("Deposit"),
                Withdrawal = reader.ToDecimal("Withdrawal"),
                AffiliateTransfer = reader.ToDecimal("AffiliateTransfer"),
                Bonus = reader.ToDecimal("Bonus"),
                Adjustment = reader.ToDecimal("Adjustment"),
                Promotion = reader.ToDecimal("Promotion"),
                Turnover = reader.ToDecimal("Turnover"),
                PendingFunds = reader.ToDecimal("PendingFund"),
                WinLoss = reader.ToDecimal("WinLoss"),
                ClosingBalance = reader.ToDecimal("ClosingBalance"),
                Transfer3rd = reader.ToDecimal("Transfer3rd"),
                DrawGame = reader.ToDecimal("DrawGame"),
                TurnoverBA = reader.ToDecimal("TurnoverBA"),
                CommBA = reader.ToDecimal("CommBA"),
                AmountDueToBA = reader.ToDecimal("AmountDueToBA"),
                NetTurnover = reader.ToDecimal("Turnover") - reader.ToDecimal("DrawGame"),
                PlayerComm = reader.ToDecimal("PlayerComm"),
            };
        }

        private static void AddParams(IObjectDb db, TurnoverMetaModel metaModel)
        {
            foreach (var item in metaModel.ProductOptions)
            {
                db.SetParameterValue("show" + item.Code, item.Status);
            }

            db.SetParameterValue("fromdate", metaModel.FromDate);
            db.SetParameterValue("todate", metaModel.ToDate);
            db.SetParameterValue("username", metaModel.Username);
            db.SetParameterValue("AgentList", metaModel.AgentListXml);
            db.SetParameterValue("BaseCurrency", metaModel.BaseCurrency);
        }
    }
}