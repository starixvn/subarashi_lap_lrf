namespace Fanex.Athena.Controllers.TotalBets.UnitTests
{
    using System.Web.Mvc;
    using System.Web.Script.Serialization;

    using Base.UnitTests;

    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Logging;

    using NSubstitute;

    using NUnit.Framework;

    using Report.Result;

    using Service.Core.Common.Interfaces;

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
        }

        [Test]
        public void Index_WhenCall_ReturnCorrectResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const int VendorProductId = 334;
                const string Url = "/ResultKenoReport/GetKenoResultUrl";
                const string ExpectedResult = "test-kenourl";
                _betListApiClient.PostAsyncString(Url, Arg.Any<object>(),
                    SessionService.UserSession.Language).ReturnsForAnyArgs(ExpectedResult);

                // Action
                var result = controller.Index(VendorProductId).Result as JsonResult;

                // Assert
                Assert.That(new JavaScriptSerializer().Serialize(result.Data), Is.EqualTo(@"{""Url"":""test-kenourl"",""UserId"":1}"));
            }
        }

        private ResultKenoReportController CreateController()
        {
            var controller = new ResultKenoReportController(
                LangService,
                SessionService,
                AppSettings,
                Substitute.For<IProductService>(),
                _logger,
                _betListApiClient)
            {
                ControllerContext = ControllerContext,
                Url = Substitute.ForPartsOf<UrlHelper>(ControllerContext.RequestContext)
            };
            return controller;
        }
    }
}