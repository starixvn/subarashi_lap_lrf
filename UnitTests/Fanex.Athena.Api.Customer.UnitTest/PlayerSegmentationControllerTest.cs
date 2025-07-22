using System.Linq;
using System.Threading.Tasks;
using Fanex.Athena.Api.Base.UnitTests;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
using Fanex.Athena.Model.Customer.MetaModel;
using Fanex.Athena.Service.Core.Common.Interfaces;
using Fanex.Athena.Service.Customer.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.UnitTest.Common.Helpers;
using Newtonsoft.Json;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Api.Customer.UnitTest
{
    public partial class PlayerSegmentationControllerTest : BaseApiControllerHelperTest
    {
        private IAuthorizationService _authService = Substitute.For<IAuthorizationService>();

        private IPlayerSegmentationService _playerService = Substitute.For<IPlayerSegmentationService>();

        private IProductDataAccess _productDataAccess = Substitute.For<IProductDataAccess>();

        private IBetListApiClient _betListApiClient = Substitute.For<IBetListApiClient>();

        private IAppSettings _appSettings = Substitute.For<IAppSettings>();

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();
            MockSessionData();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();
        }

        private PlayerSegmentationController CreateController()
        {
            return new PlayerSegmentationController(
                Substitute.For<ILanguageService>(),
                _authService,
                _playerService,
                _productDataAccess,
                _betListApiClient,
                _appSettings)
            {
                SessionService = SessionService
            };
        }

        [Test]
        public async Task UpdateVipStatus_WhenCall_ReturnCorrectResult()
        {
            using (var controller = CreateController())
            {
                // arrange
                var metaModel = new UpdateStatusPlayerMetaModel();
                var expectedResult = FakeHelper.CreateMany<UpdateStatusPlayerResult>();

                _appSettings.IsUseCtsApi.Returns(true);
                _playerService.UpdateVipStatusAsync(Arg.Any<UpdateStatusPlayerMetaModel>()).Returns(expectedResult);

                // action
                var result = await controller.UpdateVipStatus(metaModel);

                // assert
                Assert.That(JsonConvert.SerializeObject(result.Content.ToList()[0]),
                    Is.EqualTo(JsonConvert.SerializeObject(expectedResult.ToList()[0])));
            }
        }

        [Test]
        public async Task UpdateVipStatus_WhenCall_CallServiceWithCorrectParam()
        {
            using (var controller = CreateController())
            {
                // arrange
                var metaModel = new UpdateStatusPlayerMetaModel();
                var expectedResult = FakeHelper.CreateMany<UpdateStatusPlayerResult>();

                _appSettings.IsUseCtsApi.Returns(true);
                _playerService.UpdateVipStatusAsync(Arg.Any<UpdateStatusPlayerMetaModel>()).Returns(expectedResult);

                // action
                _ = await controller.UpdateVipStatus(metaModel);

                // assert
                Assert.Multiple(() =>
                {
                    _playerService.Received(1).UpdateVipStatusAsync(Arg.Is<UpdateStatusPlayerMetaModel>(_ => _.IsUseCtsApi));
                    _playerService.Received(1).UpdateVipStatusAsync(Arg.Is<UpdateStatusPlayerMetaModel>(_ => _.SiteName == SessionLicenseeName));
                    _playerService.Received(1).UpdateVipStatusAsync(Arg.Is<UpdateStatusPlayerMetaModel>(_ => _.LicenseeCustId == SessionLicenseeId));
                    _playerService.Received(1).UpdateVipStatusAsync(Arg.Is<UpdateStatusPlayerMetaModel>(_ => _.ExternalIds == metaModel.ExternalIds));
                    _playerService.Received(1).UpdateVipStatusAsync(Arg.Is<UpdateStatusPlayerMetaModel>(_ => _.SystemIds == metaModel.SystemIds));
                    _playerService.Received(1).UpdateVipStatusAsync(Arg.Is<UpdateStatusPlayerMetaModel>(_ => _.AgentListXml == metaModel.AgentListXml));
                });
            }
        }
    }
}