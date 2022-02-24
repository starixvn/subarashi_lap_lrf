using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Fanex.Athena.DataAccess.BetSettings.Interfaces;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.BetSettings.DTO;
using Fanex.Athena.Service.BetSettings.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Service.BetSettings
{
    public class CoreBetSettingService : ICoreBetSettingService
    {
        private readonly IAuthorizationService _authorizationService;
        private readonly ICoreBetSettingDataAccess _coreBetSettingDataAccess;

        public CoreBetSettingService(
            IAuthorizationService authorizationService,
            ICoreBetSettingDataAccess coreBetSettingDataAccess)
        {
            _authorizationService = authorizationService;
            _coreBetSettingDataAccess = coreBetSettingDataAccess;
        }

        public bool IsBetSettingEditable(UserAuthInfo userSession)
        {
            return _authorizationService.HasPermissions(userSession, PermissionKeys.CustomerInfoEditBetSetting);
        }

        public async Task<IEnumerable<BetSettingProduct>> GetBetSettingProductsAsync(int custId, int licenseeId)
        {
            var betSettingProducts = await _coreBetSettingDataAccess.GetBetSettingProductsAsync(licenseeId).ConfigureAwait(false);
            return betSettingProducts.Where(x => x.IsEnable).ToList();
        }
    }
}