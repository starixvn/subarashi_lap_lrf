namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using Fanex.Athena.Controllers.Base.UnitTests;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;
    using Model.Core.DTO.Configuration;
    using Model.Report.ViewModel;
    using NSubstitute;
    using NUnit.Framework;
    using Fanex.Athena.Model.Core.MetaModel.Product;

    public class CasinoTurnoverControllerTest : CultureBaseControllerHelperTest
    {
        private IReportSettingService _reportSettingService;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            _reportSettingService = Substitute.For<IReportSettingService>();

            SetUpDefaultFakeData();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();
            _reportSettingService = null;
        }

        [TearDown]
        public void TearDown()
        {
            _reportSettingService.ClearReceivedCalls();
        }

        [Test]
        public void Index_AssignViewBagData_AssignsCorrectDefaultSelectedBaseCurrency()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var userSession = new UserAuthInfo();
                SessionService.UserSession.Returns(userSession);
                var setting = new ReportSetting();
                _reportSettingService.GetSetting(PermissionKeys.ReportCasinoTurnover,
                SessionService.LicenseeSession.LicenseeName).Returns(setting);

                // Action
                var result = controller.Index() as ViewResult;

                // Assert
                Assert.That(result.ViewBag.DefaultSelectedBaseCurrency, Is.EqualTo(userSession.DefaultBaseCurrency));
            }
        }

        [Test]
        public void Index_WhenCall_ReturnsCasinoTurnoverReportView()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var userSession = new UserAuthInfo();
                SessionService.UserSession.Returns(userSession);
                var setting = new ReportSetting();
                _reportSettingService.GetSetting(PermissionKeys.ReportCasinoTurnover,
                SessionService.LicenseeSession.LicenseeName).Returns(setting);

                // Action
                var result = controller.Index() as ViewResult;

                // Assert
                StringAssert.Contains("Views/Desktop/Report/CasinoTurnover/Main.cshtml", result.ViewName);
            }
        }

        [Test]
        public void Index_WhenCall_ReturnsCorrectViewModel()
        {
            var productIdList = new List<int> { ProductTypes.AgCasino };
            using (var controller = CreateController(productIdList))
            {
                // Arrange
                var userSession = new UserAuthInfo();
                SessionService.UserSession.Returns(userSession);
                var setting = new ReportSetting();
                _reportSettingService.GetSetting(PermissionKeys.ReportCasinoTurnover,
                SessionService.LicenseeSession.LicenseeName).Returns(setting);
                var productList = productIdList.Select(x => new Product { ProductID = x });
                var expectedProductOptions = productList.Select(i => new ProductOption
                {
                    Code = i.ProductCode,
                    Name = i.ProductName,
                    Status = true
                }).ToList();

                // Action
                var result = (controller.Index() as ViewResult).Model as CasinoTurnoverViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.FromDate, Is.EqualTo(DateTime.Today));
                    Assert.That(result.ToDate, Is.EqualTo(DateTime.Today));
                    Assert.That(result.CurrencyList, Is.EqualTo(SessionService.UserSession.CurrencyList));
                    Assert.That(result.BaseCurrencies, Is.EqualTo(SystemConstants.BaseCurrencyList.Select(i => i.Value)));
                    Assert.That(result.ProductOptions, Is.EqualTo(expectedProductOptions));
                    Assert.That(result.MinDate, Is.EqualTo(setting.MinDate));
                    Assert.That(result.MaxDate, Is.EqualTo(setting.MaxDate));
                });
            }
        }

        private CasinoTurnoverController CreateController(IEnumerable<int> productIdList = null)
        {
            var productList = productIdList == null ?
                new List<Product>() :
                productIdList.Select(x => new Product { ProductID = x });
            var productService = Substitute.For<IProductService>();
            productService.GetSingleWalletProductAccess(
                SessionService.LicenseeSession.LicenseeId,
                SessionService.UserSession.Language,
                FunctionNames.CasinoTurnover).ReturnsForAnyArgs(new ProductAccess(productList.ToList()));
            return new CasinoTurnoverController(LangService, SessionService, productService, _reportSettingService);
        }
    }
}