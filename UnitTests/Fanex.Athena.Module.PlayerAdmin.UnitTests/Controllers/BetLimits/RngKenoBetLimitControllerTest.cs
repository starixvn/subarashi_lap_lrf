namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Controllers.BetLimits
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.Athena.Controllers.Base.UnitTests;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.PlayerAdmin.Controllers;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.ViewModels;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.UnitTest.Common.Helpers;
    using Fanex.Athena.VendorAdapter.Interfaces;
    using NSubstitute;
    using NUnit.Framework;

    public class RngKenoBetLimitControllerTest : CultureBaseControllerHelperTest
    {
        private IAuthorizationService _authorizationService;

        private ICacheRefAdapter _cacheRefAdapter;

        private IRngKenoBetLimitService _rngKenoBetLimitService;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            _authorizationService = Substitute.For<IAuthorizationService>();
            _cacheRefAdapter = Substitute.For<ICacheRefAdapter>();
            _rngKenoBetLimitService = Substitute.For<IRngKenoBetLimitService>();

            SetUpDefaultFakeData();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _authorizationService = null;
            _cacheRefAdapter = null;
            _rngKenoBetLimitService = null;
        }

        [TestCase(false)]
        [TestCase(true)]
        public async Task GetSetting_WhenCall_ReturnsCorrectResult(bool hasEditPermission)
        {
            using (var controller = CreateController())
            {
                // Arrange
                _authorizationService.HasPermissions(SessionService.UserSession, PermissionKeys.PlayerAdminBetLimit_Write).Returns(hasEditPermission);
                var metaModel = FakeHelper.Create<PlayerBetLimitSelectMetaModel>();

                var expectedData = FakeHelper.CreateMany<PlayerBetLimit>();
                _rngKenoBetLimitService.GetSettingAsync(metaModel.CustId).Returns(Task.FromResult(expectedData));

                // Action
                var result = (await controller.GetSetting(metaModel)).Data as PlayerBetLimitViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.Data, Is.EqualTo(expectedData));
                    Assert.That(result.Data.Any(x => x.BetSettingType != ViewResources.ProductKN), Is.False);
                    Assert.That(result.Editable, Is.EqualTo(hasEditPermission));
                });
            }
        }

        [Test]
        public async Task UpdateSetting_UpdateSuccessfully_ReturnSuccessJsonResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>>>();
                var expectedResult = new ResultInfo { Code = 0 };

                _rngKenoBetLimitService.UpdateSettingAsync(metaModel).Returns(expectedResult);

                // Action
                var result = (await controller.UpdateSetting(metaModel)).Data as ResultInfo;

                // Assert
                Assert.That(result.Message, Is.EqualTo(ViewResources.UpdateSuccess));
            }
        }

        [Test]
        public async Task UpdateSetting_UpdateFailed_ReturnsErrorJsonResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>>>();
                var expectedResult = new ResultInfo
                {
                    Code = 1,
                    Message = FakeHelper.Create<string>()
                };

                _rngKenoBetLimitService.UpdateSettingAsync(metaModel).Returns(expectedResult);

                // Action
                var result = (await controller.UpdateSetting(metaModel)).Data as ResultInfo;

                // Assert
                Assert.That(result.Message, Is.EqualTo(expectedResult.Message));
            }
        }

        private RngKenoBetLimitController CreateController()
        {
            return new RngKenoBetLimitController(_rngKenoBetLimitService)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService,
                AuthServiceInstance = _authorizationService,
                CacheRefAdapterInstance = _cacheRefAdapter
            };
        }
    }
}