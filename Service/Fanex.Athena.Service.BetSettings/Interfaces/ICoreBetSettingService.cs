namespace Fanex.Athena.Service.BetSettings.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.BetSettings.DTO;

    using Model.Customer.DTO;

    public interface ICoreBetSettingService
    {
        bool IsBetSettingEditable(UserAuthInfo userSession);

        Task<IEnumerable<BetSettingProduct>> GetBetSettingProductsAsync(int custId, int licenseeId);
    }
}