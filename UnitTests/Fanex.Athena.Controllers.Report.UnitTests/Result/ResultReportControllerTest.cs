namespace Fanex.Athena.Controllers.Report.UnitTests.Result
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Base.UnitTests;
    using DataAccess.Core.Configuration.Interfaces;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Core.DTO.Common;
    using Model.Core.DTO.Configuration;
    using NSubstitute;
    using NUnit.Framework;
    using Report.Result;
    using UnitTest.Common.Extensions;

    [TestFixture]
    public partial class ResultReportControllerTest : CultureBaseControllerHelperTest
    {
        private static readonly DateTime BalanceUpDate = new DateTime(2017, 3, 4);

        private IBalanceUpDataAccess _balanceUpDataAccess;
        private IBetListApiClient _betListApiClient;
        private IPortalApiService _portalApiService;

        protected new IAppSettings AppSettings { get; set; }

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();
            _balanceUpDataAccess = Substitute.For<IBalanceUpDataAccess>();
            _portalApiService = Substitute.For<IPortalApiService>();
            AppSettings = Substitute.For<IAppSettings>();

            _balanceUpDataAccess.GetBalanceUp().Returns(new BalanceUp
            {
                BalanceUpDay = BalanceUpDate
            });
            _portalApiService.GetSpecialLeaguesAsync(DefaultLicenseeSession.LicenseeName)
                .Returns(Task.FromResult(Enumerable.Empty<int>()));

            SetUpDefaultFakeData();
        }

        [SetUp]
        public void SetUp()
        {
            _betListApiClient = Substitute.For<IBetListApiClient>();
        }

        [Test]
        public void ResultDetail_DataIsNull_ReturnCorrectResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const string Url = "/ResultReport/ResultDetail";
                _betListApiClient.PostStringAsync(Url, Arg.Any<object>(), SessionService.UserSession.Language).Returns(x => (string)null);

                // Action
                var result = controller.ResultDetail(0, 0).Result as RedirectResult;

                // Assert
                Assert.That(result.Url, Is.EqualTo("~/Utility/Error?err=400"));
            }
        }

        [Test]
        public void ResultDetail_WhenCall_ReturnCorrectResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const string ExpectedData = "Abc";
                const int MatchId = 1;
                const int SportId = 11111;
                const string Url = "/ResultReport/ResultDetail";
                _betListApiClient.PostStringAsync(Url, Arg.Any<object>(),
                    SessionService.UserSession.Language).Returns(ExpectedData);

                // Action
                var result = controller.ResultDetail(MatchId, SportId).Result as ViewResult;

                // Assert
                Assert.Multiple((TestDelegate)(() =>
                {
                    _betListApiClient.Received(1).PostStringAsync(
                        Url,
                        Arg.Is<object>(
                            (System.Linq.Expressions.Expression<Predicate<object>>)(x => (int)x.GetValue("matchId") == MatchId &&
                                (int)x.GetValue("sportType") == SportId &&
                                (string)x.GetValue("languageCode") == SessionService.UserSession.Language)), (string)SessionService.UserSession.Language);
                    Assert.That(result.ViewBag.Data, Is.EqualTo(ExpectedData));
                    Assert.That(result.ViewName, Is.EqualTo("~/Views/Desktop/Report/Result/Popup/Main.cshtml"));
                }));
            }
        }

        private ResultReportController CreateController(string productCodeList = null)
        {
            var productList = string.IsNullOrEmpty(productCodeList) ?
                new List<Product>() :
                productCodeList.Split(',').Select(x => new Product
                {
                    ProductCode = x
                });

            var productService = Substitute.For<IProductService>();
            productService.GetProductAccess(
                SessionService.LicenseeSession.LicenseeId,
                SessionService.UserSession.Language,
                Arg.Any<string>()).Returns(new ProductAccess(productList.ToList()));

            var controller = new ResultReportController(_balanceUpDataAccess, _betListApiClient, _portalApiService)
            {
                ControllerContext = ControllerContext,
                LangService = LangService,
                SessionServiceInstance = SessionService,
                ProductServiceInstance = productService,
                AppSettingInstance = AppSettings
            };

            return controller;
        }
    }
}