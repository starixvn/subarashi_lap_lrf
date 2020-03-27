namespace Fanex.Athena.Module.PlayerAdmin.Services
{
    using System.Threading.Tasks;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.ViewModels;

    public class PlayerDetailTransactionService : IPlayerDetailTransactionService
    {
        private readonly IPlayerDetailTransactionRepository repository;

        public PlayerDetailTransactionService(IPlayerDetailTransactionRepository repository)
        {
            this.repository = repository;
        }

        public async Task<PlayerDetailTransactionReportViewModel> GetDetailTransactionReport(PlayerDetailTransactionsMetaModel criteria)
        {
            return await repository.GetDetailTransactions(criteria);
        }
    }
}
