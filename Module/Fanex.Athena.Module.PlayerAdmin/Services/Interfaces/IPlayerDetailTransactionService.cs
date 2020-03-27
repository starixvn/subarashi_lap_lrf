namespace Fanex.Athena.Module.PlayerAdmin.Services.Interfaces
{
    using System.Threading.Tasks;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.ViewModels;

    public interface IPlayerDetailTransactionService
    {
        Task<PlayerDetailTransactionReportViewModel> GetDetailTransactionReport(PlayerDetailTransactionsMetaModel criteria);
    }
}
