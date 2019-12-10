namespace Fanex.Athena.Service.BetSettings.Interfaces
{
    using System.Threading.Tasks;

    using Fanex.Athena.Model.Core.DTO.Common;

    public interface IExchangeCommApiService
    {
        Task<IResultInfo<double>> GetCommission(int custId, string language);

        Task<IResultInfo<double>> UpdateCommissionAsync(int userId, int custId, double oldCommission, double newCommission, string language);
    }
}