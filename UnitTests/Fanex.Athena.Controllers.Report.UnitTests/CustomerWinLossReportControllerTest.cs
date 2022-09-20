namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Base.UnitTests;
    using Fanex.Athena.DataAccess.Core.Configuration.Interfaces;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.Customer.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;
    using Model.Core.DTO.Configuration;
    using Model.Report.ViewModel;
    using NSubstitute;
    using NUnit.Framework;
    using Report;

    [TestFixture]
    public class CustomerWinLossReportControllerTest : CultureBaseControllerHelperTest
    {
        private IAuthorizationService _authService;
        private ICustomerClassService _customerClassService;
        private IBalanceUpDataAccess _balanceUpDataAccess;

        private static readonly DateTime MoveBetDay = new DateTime(2022, 1, 1);
        private static readonly DateTime HistoryDate = new DateTime(2012, 1, 1);

        [SetUp]
        public void Setup()
        {
            SetUpDefaultFakeData();
        }

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();
            _customerClassService = Substitute.For<ICustomerClassService>();
            AppSettings.HistoryDate.Returns(HistoryDate);
        }


        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();
            _customerClassService = null;
        }

        [Test]
        public async Task Index_NotHistory_NotUseSiteDB_ReturnCorrectViewResult()
        {
            using (var controller = CreateController())
            {
                // Action
                var viewResult = await controller.Index() as ViewResult;
                var viewModel = viewResult.Model as CustomerWinLossViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(viewResult.ViewName, Is.EqualTo("~/Views/Desktop/Report/CustomerWinLoss/Main.cshtml"));
                    Assert.That(viewModel.IsHistory, Is.True);
                    Assert.That(viewModel.IgnoreSharding, Is.True);
                    Assert.That(viewModel.MinDate, Is.EqualTo(HistoryDate));
                });
            }
        }

        [Test]
        public async Task Index_NotHistory_UseSiteDB_ReturnCorrectViewResult1()
        {
            using (var controller = CreateController())
            {
                //Arrange
                StubLicenseeSessionData(new Model.Auth.LicenseeAuthInfo
                {
                    LicenseeId = DefaultLicenseeSession.LicenseeId,
                    LicenseeName = DefaultLicenseeSession.LicenseeName,
                    SiteDBServer = "11.11.11.11"
                });

                // Action
                var viewResult = await controller.Index(false) as ViewResult;
                var viewModel = viewResult.Model as CustomerWinLossViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(viewResult.ViewName, Is.EqualTo("~/Views/Desktop/Report/CustomerWinLoss/Main.cshtml"));
                    Assert.That(viewModel.IsHistory, Is.False);
                    Assert.That(viewModel.IgnoreSharding, Is.False);
                    Assert.That(viewModel.MinDate, Is.EqualTo(MoveBetDay.AddDays(1)));
                });
            }
        }

        [Test]
        public async Task Index_History_UseSiteDB_ReturnCorrectViewResult1()
        {
            using (var controller = CreateController())
            {
                //Arrange
                StubLicenseeSessionData(new Model.Auth.LicenseeAuthInfo
                {
                    LicenseeId = DefaultLicenseeSession.LicenseeId,
                    LicenseeName = DefaultLicenseeSession.LicenseeName,
                    SiteDBServer = "11.11.11.11"
                });

                // Action
                var viewResult = await controller.Index(true) as ViewResult;
                var viewModel = viewResult.Model as CustomerWinLossViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(viewResult.ViewName, Is.EqualTo("~/Views/Desktop/Report/CustomerWinLoss/Main.cshtml"));
                    Assert.That(viewModel.IsHistory, Is.True);
                    Assert.That(viewModel.IgnoreSharding, Is.False);
                    Assert.That(viewModel.MinDate, Is.EqualTo(HistoryDate));
                });
            }
        }

        private CustomerWinLossReportController CreateController(ProductAccess expectedProductAccess = null,
            ILicenseeSettingService stubLicenseeSettingService = null)
        {
            var reportSettingService = Substitute.For<IReportSettingService>();
            reportSettingService.GetSetting(PermissionKeys.ReportCustomerWinLoss, Arg.Any<string>()).Returns(new ReportSetting());

            ProductService.GetSingleWalletProductAccess(
                SessionService.LicenseeSession.LicenseeId,
                SessionService.UserSession.Language,
                FunctionNames.CustomerWinLoss).Returns(expectedProductAccess ?? new ProductAccess(new List<Product>()));

            _authService = Substitute.For<IAuthorizationService>();
            _authService.HasPermissions(SessionService.UserSession, PermissionKeys.ReportExtraPayout).Returns(true);

            _balanceUpDataAccess = Substitute.For<IBalanceUpDataAccess>();
            _balanceUpDataAccess.GetBalanceUp().Returns(new BalanceUp { MoveBetsDay = MoveBetDay });


            var licenseeSettingService = stubLicenseeSettingService ?? Substitute.For<ILicenseeSettingService>();

            return new CustomerWinLossReportController(
                reportSettingService,
                _authService,
                _customerClassService,
                _balanceUpDataAccess) 
            {
                LangService = LangService,
                SessionServiceInstance = SessionService,
                ProductServiceInstance = ProductService,
                LicenseeSettingServiceInstance = licenseeSettingService,
                AppSettingInstance = AppSettings
            };
        }
    }
}