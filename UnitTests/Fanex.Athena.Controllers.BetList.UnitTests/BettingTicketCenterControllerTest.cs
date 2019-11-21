namespace Fanex.Athena.Controllers.BetList.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;

    using Base.UnitTests;

    using DataAccess.Core.Configuration.Interfaces;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Model.BetList.ViewModel;
    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;
    using Model.Core.DTO.Configuration;

    using NSubstitute;

    using NUnit.Framework;

    using UnitTest.Common.Helpers;

    public class BettingTicketCenterControllerTest : CultureBaseControllerHelperTest
    {
        private static readonly DateTime BalanceUpDate = new DateTime(2018, 11, 2);

        private IProductService _productService;

        private IBalanceUpDataAccess _balanceUpDataAccess;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            _productService = Substitute.For<IProductService>();
            _balanceUpDataAccess = Substitute.For<IBalanceUpDataAccess>();
            _balanceUpDataAccess.GetBalanceUp().Returns(new BalanceUp
            {
                BalanceUpDay = BalanceUpDate
            });

            SetUpDefaultFakeData();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _productService = null;
        }

        [Test]
        public void RefNo_WhenCall_ReturnCorrectViewResult()
        {
            var productCodes = FakeHelper.CreateMany<Product>(3).ToList();
            _productService.GetSingleWalletProductAccess(
                SessionService.LicenseeSession.LicenseeId,
                SessionService.UserSession.Language).Returns(new ProductAccess(productCodes));

            using (var controller = CreateController())
            {
                // Arrange
                _productService.GetSingleWalletProductAccess(
                    DefaultLicenseeSession.LicenseeId,
                    DefaultUserSession.Language).Returns(new ProductAccess(new List<Product>()));

                // Action
                var result = controller.RefNo() as ViewResult;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.ViewName, Is.EqualTo("~/Views/Desktop/BetList/BettingTicketCenter/RefNo.cshtml"));
                    Assert.That(result.Model, Is.EqualTo(DefaultLicenseeSession.IsAllowedCustomerComm));
                });
            }
        }

        [Test]
        public void RefNo_WhenCall_ReturnCorrectViewBag()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var productKN = new Product { ProductCode = Product.KN, ProductName = FakeHelper.Create<string>() };
                var productLT = new Product { ProductCode = Product.LT, ProductName = FakeHelper.Create<string>() };
                var productSB = new Product { ProductCode = Product.SB, ProductName = FakeHelper.Create<string>() };
                var offerProducts = new ProductAccess(new List<Product> { productKN, productLT, productSB });

                _productService.GetSingleWalletProductAccess(
                    DefaultLicenseeSession.LicenseeId,
                    DefaultUserSession.Language).Returns(offerProducts);

                var expectedProductsNote = string.Format(
                    ViewResources.BettingTicketCenter_RefnoTabNote2,
                    productKN.ProductName + ", " + productLT.ProductName,
                    BalanceUpDate.ToString(FormatKey.DateFormat));

                // Action
                var result = controller.RefNo() as ViewResult;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.ViewBag.SelectedBaseCurrency, Is.EqualTo(DefaultUserSession.DefaultBaseCurrency));
                    Assert.That(result.ViewBag.ProductsRequireUseNameNote, Is.EqualTo(expectedProductsNote));
                });
            }
        }

        [Test]
        public void Running_WhenCall_ReturnCorrectView()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var historyDate = FakeHelper.Create<DateTime>();
                AppSettings.HistoryDate.Returns(historyDate);

                var productCodes = FakeHelper.CreateMany<Product>(3).ToList();
                _productService.GetSingleWalletProductAccess(
                    DefaultLicenseeSession.LicenseeId,
                    DefaultUserSession.Language,
                    FunctionNames.BettingTicketCenterRunning).Returns(new ProductAccess(productCodes));

                // Action
                var result = controller.Running() as ViewResult;

                // Assert
                Assert.That(result.ViewName, Is.EqualTo("~/Views/Desktop/BetList/BettingTicketCenter/Running.cshtml"));
            }
        }

        [Test]
        public void Running_WhenCall_ReturnCorrectViewModel()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var productCodes = FakeHelper.CreateMany<Product>(3).ToList();
                _productService.GetSingleWalletProductAccess(
                    DefaultLicenseeSession.LicenseeId,
                    DefaultUserSession.Language,
                    FunctionNames.BettingTicketCenterRunning).Returns(new ProductAccess(productCodes));

                // Action
                var result = controller.Running() as ViewResult;
                var viewModel = result.Model as BettingTicketCenterViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(viewModel.CurrencyList, Is.EqualTo(DefaultUserSession.CurrencyList));
                    Assert.That(viewModel.ProductOptionList.Count(), Is.EqualTo(productCodes.Count));
                    Assert.That(viewModel.IsAllowedCustomerComm, Is.EqualTo(DefaultLicenseeSession.IsAllowedCustomerComm));
                });
            }
        }

        [Test]
        public void SingleCustomer_WhenCall_ReturnCorrectView()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var historyDate = FakeHelper.Create<DateTime>();
                AppSettings.HistoryDate.Returns(historyDate);

                var productCodes = FakeHelper.CreateMany<Product>(3).ToList();
                _productService.GetSingleWalletProductAccess(
                    DefaultLicenseeSession.LicenseeId,
                    DefaultUserSession.Language,
                    FunctionNames.BettingTicketCenter).Returns(new ProductAccess(productCodes));

                // Action
                var result = controller.SingleCustomer() as ViewResult;

                // Assert
                Assert.That(result.ViewName, Is.EqualTo("~/Views/Desktop/BetList/BettingTicketCenter/SingleCustomer.cshtml"));
            }
        }

        [Test]
        public void SingleCustomer_WhenCall_ReturnCorrectViewModel()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var productCodes = FakeHelper.CreateMany<Product>(3).ToList();
                _productService.GetSingleWalletProductAccess(
                    DefaultLicenseeSession.LicenseeId,
                    DefaultUserSession.Language,
                    FunctionNames.BettingTicketCenter).Returns(new ProductAccess(productCodes));

                // Action
                var result = controller.SingleCustomer() as ViewResult;
                var viewModel = result.Model as BettingTicketCenterViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(viewModel.LiveStatusList, Is.Not.Empty);
                    Assert.That(viewModel.StatusList, Is.Not.Empty);
                    Assert.That(viewModel.PlatformList, Is.Not.Empty);
                    Assert.That(viewModel.ProductOptionList.Count(), Is.EqualTo(productCodes.Count));
                    Assert.That(viewModel.IsAllowedCustomerComm, Is.EqualTo(DefaultLicenseeSession.IsAllowedCustomerComm));
                });
            }
        }

        [Test]
        public void MultipleCustomers_WhenCall_ReturnCorrectView()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var historyDate = FakeHelper.Create<DateTime>();
                AppSettings.HistoryDate.Returns(historyDate);

                var productCodes = FakeHelper.CreateMany<Product>(3).ToList();
                _productService.GetSingleWalletProductAccess(
                    DefaultLicenseeSession.LicenseeId,
                    DefaultUserSession.Language,
                    FunctionNames.BettingTicketCenterMultiCustomers).Returns(new ProductAccess(productCodes));

                // Action
                var result = controller.MultipleCustomers() as ViewResult;

                // Assert
                Assert.That(result.ViewName, Is.EqualTo("~/Views/Desktop/BetList/BettingTicketCenter/MultiCustomer.cshtml"));
            }
        }

        [Test]
        public void MultipleCustomers_WhenCall_ReturnCorrectViewModel()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var productCodes = FakeHelper.CreateMany<Product>(3).ToList();
                _productService.GetSingleWalletProductAccess(
                    DefaultLicenseeSession.LicenseeId,
                    DefaultUserSession.Language,
                    FunctionNames.BettingTicketCenterMultiCustomers).Returns(new ProductAccess(productCodes));

                // Action
                var result = controller.MultipleCustomers() as ViewResult;
                var viewModel = result.Model as BettingTicketCenterViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(viewModel.CurrencyList, Is.EqualTo(DefaultUserSession.CurrencyList));
                    Assert.That(viewModel.LiveStatusList, Is.Not.Empty);
                    Assert.That(viewModel.StatusList, Is.Not.Empty);
                    Assert.That(viewModel.ProductOptionList.Count(), Is.EqualTo(productCodes.Count));
                    Assert.That(viewModel.MinDate, Is.EqualTo(BalanceUpDate));
                    Assert.That(viewModel.IsAllowedCustomerComm, Is.EqualTo(DefaultLicenseeSession.IsAllowedCustomerComm));
                });
            }
        }

        private BettingTicketCenterController CreateController()
        {
            return new BettingTicketCenterController(_productService, _balanceUpDataAccess)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService
            };
        }
    }
}