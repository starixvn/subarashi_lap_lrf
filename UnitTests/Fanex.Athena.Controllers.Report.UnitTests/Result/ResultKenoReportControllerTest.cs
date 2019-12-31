namespace Fanex.Athena.Controllers.Report.UnitTests.Result
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using System.Web.Script.Serialization;
    using Base.UnitTests;
    using Fanex.Athena.Model.Report.DTO.Result;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Logging;
    using NSubstitute;
    using NUnit.Framework;
    using Report.Result;

    [TestFixture]
    public class ResultKenoReportControllerTest : CultureBaseControllerHelperTest
    {
        private ILogger _logger;

        private IBetListApiClient _betListApiClient;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            _logger = Substitute.For<ILogger>();
            _betListApiClient = Substitute.For<IBetListApiClient>();
            base.FixtureSetUp();

            SetUpDefaultFakeData();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _logger = null;
            _betListApiClient = null;
        }

        [TearDown]
        public void TearDown()
        {
            _logger.ClearReceivedCalls();
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
                var result = controller.Index(VendorProductId).Result as JsonResult;

                // Assert
                Assert.That(new JavaScriptSerializer().Serialize(result.Data), Is.EqualTo(@"{""Url"":""test-kenourl"",""UserId"":1}"));
            }
        }

        [TestCase(null)]
        [TestCase("")]
        [TestCase("InvalidUser")]
        public async Task KeepSession_NullOrEmptyUserId_ReturnsAccessDeniedString(string userId)
        {
            using (var controller = CreateController())
            {
                // Arrange
                const int vendorProductId = 1;

                // Action
                var result = await controller.KeepSession(userId, vendorProductId);

                // Assert
                Assert.Multiple(() =>
                {
                    _logger.Received(1).Error("Keno Result page just submited invalid userId");
                    Assert.That(result, Is.EqualTo("Utility/AccessDenied"));
                });
            }
        }

        [Test]
        public async Task KeepSession_CallAPIFailed_ReturnsAccessDeniedString()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const int vendorProductId = 1;

                var tokenResult = new KenoExtendedToken { ErrorCode = 1, ErrorMsg = "Error" };
                _betListApiClient.PostAsync<KenoExtendedToken>(
                    "/ResultKenoReport/KeepSession",
                    Arg.Any<object>(),
                    DefaultUserSession.Language).Returns(Task.FromResult(tokenResult));

                // Action
                var result = await controller.KeepSession(DefaultUserSession.UserId.ToString(), vendorProductId);

                // Assert
                Assert.Multiple(() =>
                {
                    _logger.Received(1).Info($"Keno Session: {tokenResult.ErrorMsg}"
                        + $"\nError Code: {tokenResult.ErrorCode}"
                        + $"\nUser Name: {DefaultUserSession.UserName}"
                        + $"\nProduct Id: {vendorProductId}");
                    Assert.That(result, Is.EqualTo("Utility/AccessDenied"));
                });
            }
        }

        [Test]
        public async Task KeepSession_CallAPISuccessfully_ReturnsEmpty()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const int vendorProductId = 1;

                var tokenResult = new KenoExtendedToken
                {
                    ErrorCode = 0
                };

                _betListApiClient.PostAsync<KenoExtendedToken>(
                    "/ResultKenoReport/KeepSession",
                    Arg.Any<object>(),
                    DefaultUserSession.Language).Returns(Task.FromResult(tokenResult));

                // Action
                var result = await controller.KeepSession(DefaultUserSession.UserId.ToString(), vendorProductId);

                // Assert
                Assert.IsEmpty(result);
            }
        }

        private ResultKenoReportController CreateController()
        {
            var controller = new ResultKenoReportController(_logger, _betListApiClient)
            {
                ControllerContext = ControllerContext,
                Url = Substitute.ForPartsOf<UrlHelper>(ControllerContext.RequestContext),
                LangService = LangService,
                SessionServiceInstance = SessionService,
                ProductServiceInstance = Substitute.For<IProductService>()
            };

            controller.Url.Action(Arg.Any<string>(), Arg.Any<string>(), null, Arg.Any<string>())
                .Returns(x => x[1] + "/" + x[0]);

            return controller;
        }
    }
}