namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Base.UnitTests;
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

        [SetUp]
        public void SetUp()
        {
            _licenseeSettingService = Substitute.For<ILicenseeSettingService>();
        }

        [TearDown]
        public void TearDown()
        {
            _licenseeSettingService = null;
        }

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            SetUpDefaultFakeData();
        }

        [Test]
        public void Index_WhenGetRealLicensee_ReturnCorrectViewResult()
        {
            // Arrange
            var reportSettingService = Substitute.For<IReportSettingService>();
            reportSettingService.GetSetting(PermissionKeys.ReportLicenseeWinLoss, Arg.Any<string>()).Returns(new ReportSetting());

            _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(false);

            using (var controller = CreateController(reportSettingService))
            {
                // Action
                var viewResult = controller.Index() as ViewResult;
                var viewModel = viewResult.Model as LicenseeWinLossViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    StringAssert.Contains("Report/LicenseeWinLoss/Main.cshtml", viewResult.ViewName);
                    Assert.That(viewModel.Param.LicenseeId, Is.EqualTo(SessionService.LicenseeSession.LicenseeId));
                    Assert.That(viewModel.Param.DrawFilter, Is.EqualTo(DrawFilterType.Normal));
                    Assert.That(viewModel.Param.ReportBy, Is.EqualTo(ReportByType.Daily));
                });
            }
        }

        [Test]
        public void Index_WhenGetFakeLicensee_ReturnCorrectViewResult()
        {
            // Arrange
            var reportSettingService = Substitute.For<IReportSettingService>();
            reportSettingService.GetSetting(PermissionKeys.ReportLicenseeWinLoss, Arg.Any<string>())
                .Returns(new ReportSetting { BaseCurrencies = "USD,KKK", TimeZone = 8 });

            _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(true);

            using (var controller = CreateController(reportSettingService))
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

        private LicenseeWinLossReportController CreateController(IReportSettingService reportSettingService)
        {
            var productService = Substitute.For<IProductService>();
            productService.GetSingleWalletProductAccess(
                SessionService.LicenseeSession.LicenseeId,
                SessionService.UserSession.Language,
                Arg.Is<string>(x => x == FunctionNames.LicenseeWinLoss || x == FunctionNames.SpecialLicenseeWinLoss))
                .Returns(new ProductAccess(new List<Product>()));
            return new LicenseeWinLossReportController(reportSettingService)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService,
                ProductServiceInstance = productService,
                LicenseeSettingServiceInstance = _licenseeSettingService
            };
        }
    }
}