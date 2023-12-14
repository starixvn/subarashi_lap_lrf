namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Base.UnitTests;
    using Fanex.Athena.DataAccess.Core.Configuration.Interfaces;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;
    using Model.Core.DTO.Configuration;
    using Model.Report.ViewModel;

    using NSubstitute;

    using NUnit.Framework;

    using Report;

    [TestFixture]
    public class LicenseeWinLossReportControllerTest : CultureBaseControllerHelperTest
    {
        private ILicenseeSettingService _licenseeSettingService;
        private IBalanceUpDataAccess _balanceUpDataAccess;

        private static readonly DateTime MoveBetDay = new DateTime(2022, 1, 1);
        private static readonly DateTime HistoryDate = new DateTime(2012, 1, 1);

        [SetUp]
        public void SetUp()
        {
            _licenseeSettingService = Substitute.For<ILicenseeSettingService>();
            AppSettings.HistoryDate.Returns(HistoryDate);
            SetUpDefaultFakeData();
        }

        [TearDown]
        public void TearDown()
        {
            _licenseeSettingService = null;
            _balanceUpDataAccess = null;
        }

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();
        }

        [Test]
        public void Index_WhenGetRealLicensee_NotHistory_NotUseSiteDB_ReturnCorrectViewResult()
        {
            // Arrange
            var reportSettingService = Substitute.For<IReportSettingService>();
            var authService = Substitute.For<IAuthorizationService>();
            reportSettingService.GetSetting(PermissionKeys.ReportLicenseeWinLoss, Arg.Any<string>()).Returns(new ReportSetting());

            _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(false);

            using (var controller = CreateController(reportSettingService, authService))
            {
                // Action
                var viewResult = controller.Index(isHistory: false) as ViewResult;
                var viewModel = viewResult.Model as LicenseeWinLossViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    StringAssert.Contains("Report/LicenseeWinLoss/Main.cshtml", viewResult.ViewName);
                    Assert.That(viewModel.Param.LicenseeId, Is.EqualTo((object)SessionService.LicenseeSession.LicenseeId));
                    Assert.That(viewModel.Param.DrawFilter, Is.EqualTo(DrawFilterType.Normal));
                    Assert.That(viewModel.Param.ReportBy, Is.EqualTo(ReportByType.Daily));

                    Assert.That(viewModel.IsHistory, Is.True);
                    Assert.That(viewModel.IgnoreSharding, Is.True);
                    Assert.That(viewModel.ReportSetting.MinDate, Is.EqualTo(HistoryDate));
                });
            }
        }

        [Test]
        public void Index_WhenGetRealLicensee_NotHistory_UseSiteDB_ReturnCorrectViewResult()
        {
            // Arrange
            var reportSettingService = Substitute.For<IReportSettingService>();
            var authService = Substitute.For<IAuthorizationService>();
            reportSettingService.GetSetting(PermissionKeys.ReportLicenseeWinLoss, Arg.Any<string>()).Returns(new ReportSetting());

            _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(false);

            //Arrange
            StubLicenseeSessionData(new Model.Auth.LicenseeAuthInfo
            {
                LicenseeId = DefaultLicenseeSession.LicenseeId,
                LicenseeName = DefaultLicenseeSession.LicenseeName,
                SiteDBServer = "11.11.11.11"
            });

            using (var controller = CreateController(reportSettingService, authService))
            {
                // Action
                var viewResult = controller.Index(isHistory: false) as ViewResult;
                var viewModel = viewResult.Model as LicenseeWinLossViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    StringAssert.Contains("Report/LicenseeWinLoss/Main.cshtml", viewResult.ViewName);
                    Assert.That(viewModel.Param.LicenseeId, Is.EqualTo((object)SessionService.LicenseeSession.LicenseeId));
                    Assert.That(viewModel.Param.DrawFilter, Is.EqualTo(DrawFilterType.Normal));
                    Assert.That(viewModel.Param.ReportBy, Is.EqualTo(ReportByType.Daily));

                    Assert.That(viewModel.IsHistory, Is.False);
                    Assert.That(viewModel.IgnoreSharding, Is.False);
                    Assert.That(viewModel.ReportSetting.MinDate, Is.EqualTo(MoveBetDay.AddDays(1)));
                });
            }
        }

        [Test]
        public void Index_WhenGetRealLicensee_History_UseSiteDB_ReturnCorrectViewResult()
        {
            // Arrange
            var reportSettingService = Substitute.For<IReportSettingService>();
            var authService = Substitute.For<IAuthorizationService>();
            reportSettingService.GetSetting(PermissionKeys.ReportLicenseeWinLoss, Arg.Any<string>()).Returns(new ReportSetting());

            _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(false);

            //Arrange
            StubLicenseeSessionData(new Model.Auth.LicenseeAuthInfo
            {
                LicenseeId = DefaultLicenseeSession.LicenseeId,
                LicenseeName = DefaultLicenseeSession.LicenseeName,
                SiteDBServer = "11.11.11.11"
            });

            using (var controller = CreateController(reportSettingService, authService))
            {
                // Action
                var viewResult = controller.Index(isHistory: true) as ViewResult;
                var viewModel = viewResult.Model as LicenseeWinLossViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    StringAssert.Contains("Report/LicenseeWinLoss/Main.cshtml", viewResult.ViewName);
                    Assert.That(viewModel.Param.LicenseeId, Is.EqualTo((object)SessionService.LicenseeSession.LicenseeId));
                    Assert.That(viewModel.Param.DrawFilter, Is.EqualTo(DrawFilterType.Normal));
                    Assert.That(viewModel.Param.ReportBy, Is.EqualTo(ReportByType.Daily));

                    Assert.That(viewModel.IsHistory, Is.True);
                    Assert.That(viewModel.IgnoreSharding, Is.False);
                    Assert.That(viewModel.ReportSetting.MinDate, Is.EqualTo(HistoryDate));
                });
            }
        }

        [Test]
        public void Index_WhenGetFakeLicensee_ReturnCorrectViewResult()
        {
            // Arrange
            var reportSettingService = Substitute.For<IReportSettingService>();
            var authService = Substitute.For<IAuthorizationService>();
            reportSettingService.GetSetting(PermissionKeys.ReportLicenseeWinLoss, Arg.Any<string>())
                .Returns(new ReportSetting { BaseCurrencies = "USD,KKK", TimeZone = 8 });

            _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(true);

            using (var controller = CreateController(reportSettingService, authService))
            {
                // Action
                var viewResult = controller.Index() as ViewResult;
                var viewModel = viewResult.Model as SpecialLicenseeWinLossViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    StringAssert.Contains("Report/SpecialLicenseeWinLoss/Main.cshtml", viewResult.ViewName);
                    Assert.That(viewModel.Param.ReportBy, Is.EqualTo(ReportByType.Daily));
                    Assert.That(string.Join(",", viewModel.BaseCurrencyList.Values), Is.EqualTo("USD,EUR"));
                });
            }
        }

        private LicenseeWinLossReportController CreateController(IReportSettingService reportSettingService, IAuthorizationService authService)
        {
            ProductService.GetSingleWalletProductAccess(
                SessionService.LicenseeSession.LicenseeId,
                SessionService.UserSession.Language,
                Arg.Is<string>(x => x == FunctionNames.LicenseeWinLoss || x == FunctionNames.SpecialLicenseeWinLoss))
                .Returns(new ProductAccess(new List<Product>()));

            authService.HasPermissions(SessionService.UserSession, PermissionKeys.ReportExtraPayout).Returns(true);

            _balanceUpDataAccess = Substitute.For<IBalanceUpDataAccess>();
            _balanceUpDataAccess.GetBalanceUp().Returns(new BalanceUp { MoveBetsDay = MoveBetDay });

            return new LicenseeWinLossReportController(reportSettingService, authService, _balanceUpDataAccess)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService,
                ProductServiceInstance = ProductService,
                AppSettingInstance = AppSettings,
                LicenseeSettingServiceInstance = _licenseeSettingService
            };
        }
    }
}