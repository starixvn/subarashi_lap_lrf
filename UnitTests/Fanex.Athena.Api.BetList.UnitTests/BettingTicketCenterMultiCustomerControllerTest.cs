namespace Fanex.Athena.Api.BetList.UnitTests
{
    using System.Collections.Generic;
    using System.Net.Http;
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
        public async Task GetData_AllExportConditionIsTrue_ReturnsObjectError()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var licenseeSession = SessionService.LicenseeSession;
                var licenseesWithLargeData = new List<string> { licenseeSession.LicenseeName };
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
        public async Task GetData_NotExportAndLargeDataContainLicenseeName_CallsApiWithCorrectParameters()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new MultipleCustomersBetListMetaModel
                {
                    IsExport = false,
                    CurrencyIdList = "1,2"
                };

                var expected = new HttpResponseMessage();
                var licenseesWithLargeData = new List<string> { SessionService.LicenseeSession.LicenseeName };
                AppSetting.LicenseesWithLargeData.Returns(licenseesWithLargeData);
                AppSetting.BetListApiClientTimeOutMinutes.Returns(120);
                _betListApiClient.PostAsync(ApiPath, metaModel, SessionLanguage, 120).Returns(Task.FromResult(expected));

                // Action
                var actual = await controller.GetData(metaModel);

                // Assert
                Assert.That(actual, Is.EqualTo(actual));
            }
        }

        [Test]
        public async Task GetData_NotExportAndLargeDataNotContainLicenseeName_CallsApiWithCorrectParameters()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new MultipleCustomersBetListMetaModel
                {
                    IsExport = false,
                    CurrencyIdList = "1,2"
                };

                var expected = new HttpResponseMessage();
                AppSetting.LicenseesWithLargeData.Returns(new List<string>());
                AppSetting.BetListApiClientTimeOutMinutes.Returns(120);
                _betListApiClient.PostAsync(ApiPath, metaModel, SessionLanguage, 0).Returns(Task.FromResult(expected));

                // Action
                var actual = await controller.GetData(metaModel);

                // Assert
                Assert.That(actual, Is.EqualTo(actual));
            }
        }

        private BettingTicketCenterMultiCustomerController CreateController()
        {
            return new BettingTicketCenterMultiCustomerController(SessionService, ProductService, LangService, AppSetting, _betListApiClient);
        }
    }
}