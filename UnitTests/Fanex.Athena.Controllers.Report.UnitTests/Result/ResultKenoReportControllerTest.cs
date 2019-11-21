namespace Fanex.Athena.Controllers.TotalBets.UnitTests
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

        [TearDown]
        public void TearDown()
        {
            _betListApiClient.ClearReceivedCalls();
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
                _betListApiClient.PostAsyncString(ApiUrl, Arg.Any<object>(),
                    SessionService.UserSession.Language).ReturnsForAnyArgs(ExpectedResult);

                // Action
                var result = controller.Index(VendorProductId).Result as JsonResult;

                // Assert
                Assert.That(new JavaScriptSerializer().Serialize(result.Data), Is.EqualTo(@"{""Url"":""test-kenourl"",""UserId"":1}"));
            }
        }

        [TestCase(null)]
        [TestCase("")]
        public async Task KeepSession_NullOrEmptyUserId_ReturnsAccessDeniedString(string userId)
        {
            using (var controller = CreateController())
            {
                // Arrange
                const int vendorProductId = 1;
                var expectedResult = Url.Action("AccessDenied", "Utility", null, controller.Request.Url.Scheme);

                // Action
                var result = await controller.KeepSession(userId, vendorProductId);

                // Assert
                Assert.Multiple(() =>
                {
                    _logger.Received(1).Error("Keno Result page just submited invalid userId");
                    Assert.That(result, Is.EqualTo(expectedResult));
                });
            }
        }

        [Test]
        public async Task KeepSession_InvalidUserId_ReturnsAccessDeniedString()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const int vendorProductId = 1;
                const string userId = "abc";
                var expectedResult = Url.Action("AccessDenied", "Utility", null, controller.Request.Url.Scheme);

                // Action
                var result = await controller.KeepSession(userId, vendorProductId);

                // Assert
                Assert.Multiple(() =>
                {
                    _logger.Received(1).Error("Keno Result page just submited invalid userId");
                    Assert.That(result, Is.EqualTo(expectedResult));
                });
            }
        }

        [Test]
        public async Task KeepSession_ValidUserIdAndResultErrorCodeGreaterThanZero_ReturnsAccessDeniedString()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const int vendorProductId = 1;
                const string userId = "1";
                SessionService.UserSession.UserId = 1;

                var model = new
                {
                    VendorProductId = vendorProductId,
                    UserId = userId
                };

                var kenoExtendedToken = new KenoExtendedToken
                {
                    ErrorCode = 1,
                    ErrorMsg = "Error message"
                };

                _betListApiClient.PostAsync<KenoExtendedToken>("/ResultKenoReport/KeepSession", model, SessionService.UserSession.Language).ReturnsForAnyArgs(kenoExtendedToken);
                var expectedResult = Url.Action("AccessDenied", "Utility", null, controller.Request.Url.Scheme);

                // Action
                var result = await controller.KeepSession(userId, vendorProductId);

                // Assert
                Assert.Multiple(() =>
                {
                    _logger.Received(1).Info($"Keno Session: Error message"
                    + $"\nError Code: 1"
                    + $"\nUser Name: {SessionService.UserSession.UserName}"
                    + $"\nProduct Id: {vendorProductId}");

                    Assert.That(result, Is.EqualTo(expectedResult));
                });
            }
        }

        [Test]
        public async Task KeepSession_ValidUserIdAndResultErrorCodeLessOrEqualZero_ReturnsEmpty()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const int vendorProductId = 1;
                const string userId = "1";
                SessionService.UserSession.UserId = 1;

                var model = new
                {
                    VendorProductId = vendorProductId,
                    UserId = userId
                };

                var kenoExtendedToken = new KenoExtendedToken
                {
                    ErrorCode = 0,
                    ErrorMsg = "Error message"
                };

                _betListApiClient.PostAsync<KenoExtendedToken>("/ResultKenoReport/KeepSession", model, SessionService.UserSession.Language).ReturnsForAnyArgs(kenoExtendedToken);

                // Action
                var result = await controller.KeepSession(userId, vendorProductId);

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
            return controller;
        }
    }
}