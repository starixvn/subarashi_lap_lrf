namespace Fanex.Athena.Controllers.Report.UnitTests.Result
{
    using Base.UnitTests;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using NSubstitute;
    using NUnit.Framework;
    using Report.Result;
    using System.Web.Mvc;

    [TestFixture]
    public class ResultKenoReportControllerTest : CultureBaseControllerHelperTest
    {
        private IBetListApiClient _betListApiClient;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            _betListApiClient = Substitute.For<IBetListApiClient>();
            base.FixtureSetUp();

            SetUpDefaultFakeData();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _betListApiClient = null;
        }

        [Test]
        public void Index_WhenCall_ReturnCorrectResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const int VendorProductId = 334;
                const string ApiUrl = "/ResultKenoReport/GetKenoResultUrl";
                const string ExpectedResult = "test-kenourl";
                _betListApiClient.PostStringAsync(ApiUrl, Arg.Any<object>(),
                    SessionService.UserSession.Language).ReturnsForAnyArgs(ExpectedResult);

                // Action
                var result = controller.Index(VendorProductId).Result as ContentResult;

                // Assert
                Assert.NotNull(result);
                Assert.AreEqual(ExpectedResult, result.Content);
            }
        }

        private ResultKenoReportController CreateController()
        {
            return new ResultKenoReportController(_betListApiClient)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService
            };
        }
    }
}