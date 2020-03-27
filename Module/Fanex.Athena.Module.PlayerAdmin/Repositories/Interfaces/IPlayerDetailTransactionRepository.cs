namespace Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces
{
    using System.Threading.Tasks;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.ViewModels;

    public interface IPlayerDetailTransactionRepository
    {
        Task<PlayerDetailTransactionReportViewModel> GetDetailTransactions(PlayerDetailTransactionsMetaModel criteria);
    }
}
