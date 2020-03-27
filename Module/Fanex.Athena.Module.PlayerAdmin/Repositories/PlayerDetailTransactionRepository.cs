namespace Fanex.Athena.Module.PlayerAdmin.Repositories
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.Extension.Utility.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.ViewModels;
    using Fanex.Common;

    public class PlayerDetailTransactionRepository : IPlayerDetailTransactionRepository
    {
        private readonly IDbFactory dbFactory;

        public PlayerDetailTransactionRepository(IDbFactory dbFactory)
        {
            this.dbFactory = dbFactory;
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
                        transactions.Add(new PlayerDetailTransactionViewModel
                        {
                            TransactionId = Converter.ToString2(reader["transid"]),
                            TransactionType = Converter.ToString2(reader["transtype"]),
                            TransactionTime = Converter.ToDateTime(reader["transtime"]),
                            Remark = Converter.ToString2(reader["transremark"]),
                            BalanceChange = Converter.ToDecimal(reader["changedAmt"]),
                            AfterBalance = Converter.ToDecimal(reader["totalAmt"])
                        });
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
