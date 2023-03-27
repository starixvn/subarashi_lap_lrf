namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using Base.UnitTests;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Configuration;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.VendorAdapter.Interfaces;
    using Model.Core.DTO.Common;
    using Model.Report.ViewModel;
    using NSubstitute;
    using NUnit.Framework;

    [TestFixture]
    public class ExtraPayoutReportControllerTest : CultureBaseControllerHelperTest
    {
        private IReportSettingService _reportSettingService;
        private ICacheRefAdapter _cacheRefAdapter;
        private ISubsidiaryService _subsidiaryService;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();
            _reportSettingService = Substitute.For<IReportSettingService>();
            _cacheRefAdapter = Substitute.For<ICacheRefAdapter>();
            _subsidiaryService = Substitute.For<ISubsidiaryService>();
            SetUpDefaultFakeData();
            StubUserSessionData(new UserAuthInfo { CurrencyAgentList = new Dictionary<int, int[]>(), CurrencyList = new Dictionary<int, string>() });
        }

        [Test]
        public void Index_WhenGet_ReturnCorrectViewResult()
        {
            // Arrange
            var product = new Product
            {
                ProductCode = Product.PP,
                ProductID = 1,
                ProductName = "PP"
            };

            using (var controller = CreateController(product))
            {
                // Action
                var viewResult = controller.Index() as ViewResult;
                var viewModel = viewResult.Model as ExtraPayoutViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(viewResult.ViewName, Is.EqualTo("~/Views/Desktop/Report/ExtraPayout/Main.cshtml"));
                    Assert.That(viewModel.CurrencyList, Is.EqualTo(SessionService.UserSession.CurrencyList));
                });
            }
        }

        [Test]
        public void GetPromotionTypes_WhenGet_ReturnCorrectPromotion()
        {
            // Arrange
            var product = new Product[]
            {
                new Product {ProductCode = Product.SAG},
                new Product {ProductCode = Product.AB},
                new Product {ProductCode = Product.SG},
                new Product {ProductCode = Product.VGA},
                new Product {ProductCode = Product.CC},
                new Product {ProductCode = Product.SXG},
                new Product {ProductCode = Product.SBC},
                new Product {ProductCode = Product.SPR},
                new Product {ProductCode = Product.PP}
            };

            var productCode = "SAG,AB,SG,VGA,CC,SXG,SBC,SPR,PP";

            using (var controller = CreateController(product))
            {
                // Action
                var result = controller.GetPromotionTypes(productCode);

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result, Is.InstanceOf<ActionResult>());
                });
            }
        }

        private ExtraPayoutReportController CreateController(params Product[] products)
        {
            var productList = products == null ? new List<Product>() : products.ToList();
            var productService = Substitute.For<IProductService>();
            productService.GetSingleWalletProductAccess(
                SessionService.LicenseeSession.LicenseeId,
                SessionService.UserSession.Language,
                PermissionKeys.ReportExtraPayout).Returns(new ProductAccess(productList));

            var reportSetting = new ReportSetting
            {
                MinDate = new DateTime(2021, 2, 15),
                MaxDate = new DateTime(2021, 3, 30),
            };

            _reportSettingService.GetSetting(PermissionKeys.ReportExtraPayout, SessionService.LicenseeSession.LicenseeName).
                Returns(reportSetting);

            _cacheRefAdapter.GetBettype(Arg.Any<string>()).Returns("");

            return new ExtraPayoutReportController(_reportSettingService, _cacheRefAdapter, _subsidiaryService)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService,
                ProductServiceInstance = productService
            };
        }
    }
}