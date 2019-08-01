namespace Fanex.Athena.Service.BetSettings.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Fanex.Athena.Model.Core.DTO.Common;

    public interface IExchangeCommApiService
    {
        IResultInfo<double> GetCommission(IDictionary<int, int[]> currencyAgents, int custId);

        Task<IResultInfo<double>> UpdateCommissionAsync(IDictionary<int, int[]> currencyAgents, int userId, int custId, double oldCommission, double newCommission);
    }
}