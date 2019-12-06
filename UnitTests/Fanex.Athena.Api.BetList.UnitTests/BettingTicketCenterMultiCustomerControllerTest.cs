namespace Fanex.Athena.Api.BetList.UnitTests
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.Athena.Api.Base.UnitTests;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.BetList.MetaModel;
    using NSubstitute;
    using NUnit.Framework;
    using Resources;

    public class BettingTicketCenterMultiCustomerControllerTest : BaseApiControllerHelperTest
    {
        private const int ServerBusyErrorCode = 1002;
        private const string ApiPath = "/BettingTicketCenterMultiCustomer/GetData";

        private IBetListApiClient _betListApiClient;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            _betListApiClient = Substitute.For<IBetListApiClient>();

            MockSessionData();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _betListApiClient = null;
        }

        [TearDown]
        public void TearDown()
        {
            _betListApiClient.ClearReceivedCalls();
        }

        [Test]
        public async Task GetData_ExportIsNotAvailable_ReturnsObjectError()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var licenseesWithLargeData = new List<string> { SessionLicenseeName };
                var metaModel = new MultipleCustomersBetListMetaModel
                {
                    IsExport = true
                };

                AppSetting.IsDisableExportLargeBetList.Returns(true);
                AppSetting.LicenseesWithLargeData.Returns(licenseesWithLargeData);

                // Action
                var actual = await controller.GetData(metaModel);

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(actual.ErrorCode, Is.EqualTo(ServerBusyErrorCode));
                    Assert.That(actual.ErrorMsg, Is.EqualTo(ViewResources.ServerBusyMessage));
                });
            }
        }

        [Test]
        public async Task GetData_WhenNotExport_CallsApiWithCorrectParameters()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new MultipleCustomersBetListMetaModel
                {
                    IsExport = false,
                    CurrencyIdList = "1,2"
                };

                // Action
                await controller.GetData(metaModel);

                // Assert
                Assert.Multiple(() =>
                {
                    _betListApiClient.Received(1).PostAsync(ApiPath, metaModel, SessionLanguage, BetListTimeOut);
                });
            }
        }

        [Test]
        public async Task GetData_Export_EnableLargeBetList_CallsApiWithCorrectParameters()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new MultipleCustomersBetListMetaModel
                {
                    IsExport = true,
                    CurrencyIdList = "1,2"
                };
                AppSetting.IsDisableExportLargeBetList.Returns(false);

                // Action
                await controller.GetData(metaModel);

                // Assert
                Assert.Multiple(() =>
                {
                    _betListApiClient.Received(1).PostAsync(ApiPath, metaModel, SessionLanguage, BetListTimeOut);
                });
            }
        }

        [Test]
        public async Task GetData_Export_IsNotLargeBetList_CallsApiWithCorrectParameters()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new MultipleCustomersBetListMetaModel
                {
                    IsExport = true,
                    CurrencyIdList = "1,2"
                };
                AppSetting.IsDisableExportLargeBetList.Returns(true);
                AppSetting.LicenseesWithLargeData.Returns(Enumerable.Empty<string>());

                // Action
                await controller.GetData(metaModel);

                // Assert
                Assert.Multiple(() =>
                {
                    _betListApiClient.Received(1).PostAsync(ApiPath, metaModel, SessionLanguage, BetListTimeOut);
                });
            }
        }

        private BettingTicketCenterMultiCustomerController CreateController()
        {
            return new BettingTicketCenterMultiCustomerController(SessionService, ProductService, LangService, AppSetting, _betListApiClient);
        }
    }
}