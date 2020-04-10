namespace Fanex.Athena.Module.PlayerAdmin.Repositories
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.Extension.Utility.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.ViewModels;
    using Fanex.Athena.VendorAdapter.Interfaces;
    using Fanex.Common;

    public class PlayerDetailTransactionRepository : IPlayerDetailTransactionRepository
    {
        private readonly IDbFactory dbFactory;
        private readonly ICacheRefAdapter cacheRefAdapter;

        public PlayerDetailTransactionRepository(IDbFactory dbFactory, ICacheRefAdapter cacheRefAdapter)
        {
            this.dbFactory = dbFactory;
            this.cacheRefAdapter = cacheRefAdapter;
        }

        public async Task<PlayerDetailTransactionReportViewModel> GetDetailTransactions(PlayerDetailTransactionsMetaModel criteria)
        {
            var transactions = new List<PlayerDetailTransactionViewModel>();
            var result = new PlayerDetailTransactionReportViewModel(criteria, null);

            using (var db = dbFactory.GetObjectDb(criteria.GetSPName()))
            {
                criteria.SetParameterValues(db);

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    while (reader.Read())
                    {
                        var trans = new PlayerDetailTransactionViewModel
                        {
                            TransactionId = Converter.ToString2(reader["transid"]),
                            BetType = Converter.ToInt(reader["bettype"]),
                            TransactionTime = Converter.ToDateTime(reader["transtime"]),
                            Remark = Converter.ToString2(reader["transremark"]),
                            BalanceChange = Converter.ToDecimal(reader["changedAmt"]),
                            AfterBalance = Converter.ToDecimal(reader["totalAmt"])
                        };

                        trans.TransactionType = cacheRefAdapter.GetBettype(trans.BetType);
                        transactions.Add(trans);
                    }
                }

                var output = db.GetOutputParams();
                result.DetailTransactions = transactions;
                result.TotalRow = Converter.ToInt(output["TotalRow"]);
            }

            return result;
        }
    }
}
