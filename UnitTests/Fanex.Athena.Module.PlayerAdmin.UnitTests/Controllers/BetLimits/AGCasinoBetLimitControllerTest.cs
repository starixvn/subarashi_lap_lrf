using Fanex.Athena.Controllers.Base.UnitTests;
using Fanex.Athena.Module.PlayerAdmin.Controllers;
using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.VendorAdapter.Interfaces;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Controllers.BetLimits
{
    [TestFixture]
    public class AGCasinoBetLimitControllerTest : CultureBaseControllerHelperTest
    {
        private readonly IAGCasinoBetLimitService _service;

        private readonly IAuthorizationService _authService;

        private readonly ICacheRefAdapter _cacheRefAdapter;

        private AGCasinoBetLimitController CreateController()
        {
            return new AGCasinoBetLimitController(
                LangService,
                SessionService,
                _cacheRefAdapter,
                _authService,
                _service)
            {
                ControllerContext = ControllerContext
            };
        }
    }
}