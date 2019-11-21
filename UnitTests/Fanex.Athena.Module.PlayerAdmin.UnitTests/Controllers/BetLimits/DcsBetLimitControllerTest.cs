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

    public class DcsBetLimitControllerTest : CultureBaseControllerHelperTest
    {
        private const string MixedSportId = "99MP";

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

        [TearDown]
        public void TearDown()
        {
            _cacheRefAdapter.ClearReceivedCalls();
            _authorizationService.ClearReceivedCalls();
            _dcsBetLimitService.ClearReceivedCalls();
        }

        [Test]
        public async Task GetSetting_WhenCall_ReturnsCorrectResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var isEditable = FakeHelper.Create<bool>();
                _authorizationService.HasPermissions(SessionService.UserSession, PermissionKeys.PlayerAdminBetLimit_Write).Returns(isEditable);
                var metaModel = new PlayerBetLimitSelectMetaModel
                {
                    CustId = 1,
                    ProductId = 1
                };

                var expectedData = new List<PlayerBetLimit> { new PlayerBetLimit() };
                foreach (var item in expectedData)
                {
                    item.BetSettingType = GetSportName(item.Id);
                }

                _dcsBetLimitService.GetSettingAsync(metaModel.CustId, metaModel.ProductId).Returns(expectedData);
                var expectedStatus = FakeHelper.Create<bool>();
                _dcsBetLimitService.GetStatusAsync(metaModel.CustId, metaModel.ProductId).Returns(expectedStatus);

                // Action
                var result = (await controller.GetSetting(metaModel)).Data as PlayerBetLimitViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.Data, Is.EqualTo(expectedData));
                    Assert.AreEqual(isEditable && expectedStatus, result.Editable);
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

                _dcsBetLimitService.UpdateSettingAsync(metaModel).Returns(expectedResult);

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

                _dcsBetLimitService.UpdateSettingAsync(metaModel).Returns(expectedResult);

                // Action
                var result = (await controller.UpdateSetting(metaModel)).Data as ResultInfo;

                // Assert
                Assert.That(result, Is.EqualTo(expectedResult));
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

        private string GetSportName(string sportId) => sportId == MixedSportId ? ViewResources.MixSportsParlay : _cacheRefAdapter.GetSportName(sportId);
    }
}