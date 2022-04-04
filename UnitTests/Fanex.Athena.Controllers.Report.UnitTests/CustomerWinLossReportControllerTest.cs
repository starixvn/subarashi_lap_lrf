namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Base.UnitTests;
    using Fanex.Athena.Controllers.Base;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Report.MetaModel;
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

        private IPlayerSegmentationService _playerService;

        private const int TimeOutInSecond = 180;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();
            _playerService = Substitute.For<IPlayerSegmentationService>();

            SetUpDefaultFakeData();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();
            _playerService = null;
        }

        [Test]
        public async Task Index_WhenGet_ReturnCorrectViewResult()
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
                    Assert.That(viewModel.IsHistory, Is.False);
                });
            }
        }

        [Test]
        public async Task History_WhenGet_ReturnCorrectViewResult()
        {
            using (var controller = CreateController())
            {
                // Action
                var viewResult = await controller.History() as ViewResult;
                var viewModel = viewResult.Model as CustomerWinLossViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(viewResult.ViewName, Is.EqualTo("~/Views/Desktop/Report/CustomerWinLoss/Main.cshtml"));
                    Assert.That(viewModel.IsHistory, Is.True);
                });
            }
        }



        private CustomerWinLossReportController CreateController(ProductAccess expectedProductAccess = null,
            ILicenseeSettingService stubLicenseeSettingService = null)
        {
            var reportSettingService = Substitute.For<IReportSettingService>();
            reportSettingService.GetSetting(PermissionKeys.ReportCustomerWinLoss, Arg.Any<string>()).Returns(new ReportSetting());

            var productService = Substitute.For<IProductService>();
            productService.GetSingleWalletProductAccess(
                SessionService.LicenseeSession.LicenseeId,
                SessionService.UserSession.Language,
                FunctionNames.CustomerWinLoss).Returns(expectedProductAccess ?? new ProductAccess(new List<Product>()));

            _authService = Substitute.For<IAuthorizationService>();
            _authService.HasPermissions(SessionService.UserSession, PermissionKeys.ReportExtraPayout).Returns(true);

            var licenseeSettingService = stubLicenseeSettingService ?? Substitute.For<ILicenseeSettingService>();

            return new CustomerWinLossReportController(reportSettingService, _authService, _playerService)            {
                LangService = LangService,
                SessionServiceInstance = SessionService,
                ProductServiceInstance = productService,
                LicenseeSettingServiceInstance = licenseeSettingService
            };
        }
    }
}