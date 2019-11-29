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

    public class DcsBetLimitControllerTest : CultureBaseControllerHelperTest
    {
        private ICacheRefAdapter _cacheRefAdapter;

        private IAuthorizationService _authorizationService;

        private IDcsBetLimitService _dcsBetLimitService;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            _cacheRefAdapter = Substitute.For<ICacheRefAdapter>();
            _authorizationService = Substitute.For<IAuthorizationService>();
            _dcsBetLimitService = Substitute.For<IDcsBetLimitService>();

            SetUpDefaultFakeData();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _cacheRefAdapter = null;
            _authorizationService = null;
            _dcsBetLimitService = null;
        }

        [TestCase(false, false, false)]
        [TestCase(false, true, false)]
        [TestCase(true, false, false)]
        [TestCase(true, true, true)]
        public async Task GetSetting_WhenCall_ReturnsCorrectResult(bool hasEditPermission, bool status, bool expectedEditable)
        {
            using (var controller = CreateController())
            {
                // Arrange
                _authorizationService.HasPermissions(SessionService.UserSession, PermissionKeys.PlayerAdminBetLimit_Write).Returns(hasEditPermission);
                var metaModel = FakeHelper.Create<PlayerBetLimitSelectMetaModel>();

                var expectedData = Enumerable.Empty<PlayerBetLimit>();
                _dcsBetLimitService.GetSettingAsync(metaModel.CustId, metaModel.ProductId).Returns(Task.FromResult(expectedData));
                _dcsBetLimitService.GetStatusAsync(metaModel.CustId, metaModel.ProductId).Returns(Task.FromResult(status));

                // Action
                var result = (await controller.GetSetting(metaModel)).Data as PlayerBetLimitViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.Data, Is.EqualTo(expectedData));
                    Assert.That(result.Editable, Is.EqualTo(expectedEditable));
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

                _dcsBetLimitService.UpdateSettingAsync(metaModel).Returns(expectedResult);

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

                _dcsBetLimitService.UpdateSettingAsync(metaModel).Returns(expectedResult);

                // Action
                var result = (await controller.UpdateSetting(metaModel)).Data as ResultInfo;

                // Assert
                Assert.That(result.Message, Is.EqualTo(expectedResult.Message));
            }
        }

        private DcsBetLimitController CreateController()
        {
            return new DcsBetLimitController(_dcsBetLimitService)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService,
                AuthServiceInstance = _authorizationService,
                CacheRefAdapterInstance = _cacheRefAdapter
            };
        }
    }
}