namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using Fanex.Athena.Controllers.Base.UnitTests;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;
    using Model.Core.DTO.Configuration;
    using Model.Report.ViewModel;
    using NSubstitute;
    using NUnit.Framework;

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

        [Test]
        public void Index_WhenCall_ReturnsCorrectResult()
        {
            var productList = new List<Product> { new Product { ProductCode = "Test", ProductName = "Test Name" } };
            using (var controller = CreateController(productList))
            {
                // Arrange
                var setting = new ReportSetting { MinDate = new DateTime(2019, 1, 1), MaxDate = new DateTime(2019, 1, 2) };
                _reportSettingService.GetSetting(PermissionKeys.ReportCasinoTurnover,
                DefaultLicenseeSession.LicenseeName).Returns(setting);

                // Action
                var result = (controller.Index() as ViewResult);
                var model = result.Model as CasinoTurnoverViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(model.FromDate, Is.EqualTo(DateTime.Today));
                    Assert.That(model.ToDate, Is.EqualTo(DateTime.Today));
                    Assert.That(model.CurrencyList, Is.EqualTo(DefaultUserSession.CurrencyList));
                    Assert.That(model.BaseCurrencies, Is.EqualTo(SystemConstants.BaseCurrencyList.Select(i => i.Value)));
                    Assert.That(model.ProductOptions.Count, Is.EqualTo(productList.Count));
                    Assert.That(model.ProductOptions.First().Code, Is.EqualTo(productList.First().ProductCode));
                    Assert.That(model.ProductOptions.First().Name, Is.EqualTo(productList.First().ProductName));
                    Assert.That(model.MinDate, Is.EqualTo(setting.MinDate));
                    Assert.That(model.MaxDate, Is.EqualTo(setting.MaxDate));

                    Assert.That(result.ViewName, Is.EqualTo("~/Views/Desktop/Report/CasinoTurnover/Main.cshtml"));
                    Assert.That(result.ViewBag.DefaultSelectedBaseCurrency, Is.EqualTo(DefaultUserSession.DefaultBaseCurrency));
                });
            }
        }

        private CasinoTurnoverController CreateController(IList<Product> productList)
        {
            var productService = Substitute.For<IProductService>();
            productService.GetSingleWalletProductAccess(
                DefaultLicenseeSession.LicenseeId,
                DefaultUserSession.Language,
                FunctionNames.CasinoTurnover).ReturnsForAnyArgs(new ProductAccess(productList));

            return new CasinoTurnoverController(_reportSettingService)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService,
                ProductServiceInstance = productService
            };
        }
    }
}