namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Base.UnitTests;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;
    using Model.Report.ViewModel;
    using NSubstitute;
    using NUnit.Framework;
    using Report;

    [TestFixture]
    public class CustomerBalanceReportControllerTest : CultureBaseControllerHelperTest
    {
        private IProductService _productService;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            _productService = Substitute.For<IProductService>();

            SetUpDefaultFakeData();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            _productService = null;
        }

        [Test]
        public void Index_WhenGet_ReturnCorrectViewResult()
        {
            // Arrange
            var userSession = SessionService.UserSession;

            using (var controller = CreateController())
            {
                // Action
                var viewResult = controller.Index() as ViewResult;
                var viewModel = viewResult.Model as CustomerBalanceViewModel;

                // Assert
                Assert.Multiple((TestDelegate)(() =>
                {
                    StringAssert.Contains("Report/CustomerBalance/Main.cshtml", viewResult.ViewName);
                    Assert.That(viewModel.Param.LicenseeId, Is.EqualTo((object)SessionService.LicenseeSession.LicenseeId));
                    Assert.That(viewModel.Param.CurrencyId, Is.Zero);
                    Assert.That(viewModel.Param.ProductOptions, Is.Empty);
                    Assert.That(viewModel.CurrencyList, Is.EqualTo(userSession.CurrencyList));
                    Assert.That(viewModel.ProductAccess.ProductList, Is.Empty);
                }));
            }
        }

        private CustomerBalanceReportController CreateController(ProductAccess productAccess = null)
        {
            _productService.GetSingleWalletProductAccess(
                SessionService.LicenseeSession.LicenseeId,
                SessionService.UserSession.Language,
                FunctionNames.CustomerBalance).Returns(productAccess ?? new ProductAccess(new List<Product>()));

            return new CustomerBalanceReportController()
            {
                ProductServiceInstance = _productService,
                LangService = LangService,
                SessionServiceInstance = SessionService
            };
        }
    }
}