namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Controllers.BetLimits
{
    using System.Collections.Generic;
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

        [TearDown]
        public void TearDown()
        {
            _authorizationService.ClearReceivedCalls();
            _cacheRefAdapter.ClearReceivedCalls();
            _rngKenoBetLimitService.ClearReceivedCalls();
        }

        [Test]
        public async Task GetSetting_WhenCall_ReturnsCorrectResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var expectedEditable = FakeHelper.Create<bool>();
                var metaModel = new PlayerBetLimitSelectMetaModel
                {
                    CustId = 1
                };

                _authorizationService.HasPermissions(SessionService.UserSession, PermissionKeys.PlayerAdminBetLimit_Write).Returns(expectedEditable);
                var expectedData = FakeHelper.Create<IEnumerable<PlayerBetLimit>>();
                foreach (var item in expectedData)
                {
                    item.BetSettingType = ViewResources.ProductKN;
                }

                _rngKenoBetLimitService.GetSettingAsync(metaModel.CustId).Returns(expectedData);

                // Action
                var result = (await controller.GetSetting(metaModel)).Data as PlayerBetLimitViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.Data, Is.EqualTo(expectedData));
                    Assert.AreEqual(expectedEditable, result.Editable);
                });
            }
        }

        [Test]
        public async Task UpdateSetting_ResultCodeRetrieveZero_ReturnsCorrectJsonResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>>>();
                var expectedResult = new ResultInfo
                {
                    Code = 0,
                    Message = string.Format(ViewResources.UpdateSuccess)
                };

                _rngKenoBetLimitService.UpdateSettingAsync(metaModel).Returns(expectedResult);

                // Action
                var result = (await controller.UpdateSetting(metaModel)).Data as ResultInfo;

                // Assert
                Assert.That(result, Is.EqualTo(expectedResult));
            }
        }

        [Test]
        public async Task UpdateSetting_ResultCodeRetrieveNoneZero_ReturnsCorrectJsonResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>>>();
                var expectedResult = new ResultInfo
                {
                    Code = 1
                };

                _rngKenoBetLimitService.UpdateSettingAsync(metaModel).Returns(expectedResult);

                // Action
                var result = (await controller.UpdateSetting(metaModel)).Data as ResultInfo;

                // Assert
                Assert.That(result, Is.EqualTo(expectedResult));
            }
        }

        private RngKenoBetLimitController CreateController()
        {
            var result = new RngKenoBetLimitController(_rngKenoBetLimitService);
            result.LangService = LangService;
            result.SessionServiceInstance = SessionService;

            return result;
        }
    }
}