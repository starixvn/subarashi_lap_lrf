namespace Fanex.Athena.Controllers.BetList.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;

    using Base.UnitTests;

    using DataAccess.Core.Configuration.Interfaces;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Auth.Enum;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Model.BetList.ViewModel;
    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;
    using Model.Core.DTO.Configuration;
    using Newtonsoft.Json;
    using NSubstitute;

    using NUnit.Framework;

    using UnitTest.Common.Helpers;

    public class BettingTicketCenterControllerTest : CultureBaseControllerHelperTest
    {
        private static readonly DateTime BalanceUpDate = new DateTime(2018, 11, 2);

        private IProductService _productService;

        private IBalanceUpDataAccess _balanceUpDataAccess;

        private IAuthorizationService _authService;

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
            _authService = Substitute.For<IAuthorizationService>();

            SetUpDefaultFakeData();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _productService = null;
            _authService = null;
        }

        [TestCase(PermissionKeys.BtcAdvancedSearch, AppMode.Self, "~/Views/Desktop/BetList/BettingTicketCenter/AdvancedSearch.cshtml")]
        [TestCase(PermissionKeys.BtcSingleCustomer, AppMode.Self, "~/Views/Desktop/BetList/BettingTicketCenter/SingleCustomer.cshtml")]
        [TestCase(PermissionKeys.BtcRefNo, AppMode.Self, "~/Views/Desktop/BetList/BettingTicketCenter/RefNo.cshtml")]
        [TestCase(PermissionKeys.BtcRunning, AppMode.Self, "~/Views/Desktop/BetList/BettingTicketCenter/Running.cshtml")]
        [TestCase(PermissionKeys.BtcAdvancedSearch, AppMode.Parasitic, "~/Views/Desktop/BetList/BettingTicketCenter/AdvancedSearch.cshtml")]
        public void Index_CheckByPermission_ReturnCorrectView(string permissionKey, AppMode appMode, string expectedView)
        {
            // Arrange
            CreateAndStubUserSession(permissionKey, appMode);
            MockProductService();

            using (var controller = CreateController())
            {
                // Action
                var result = controller.Index() as ViewResult;

                // Assert
                Assert.That(expectedView, Is.EqualTo(result.ViewName));
            }
        }

        [Test]
        public void Index_IsSuperAdmin_HaveAllPermissionsOfTab()
        {
            // Arrange
            var userSession = JsonConvert.DeserializeObject<UserAuthInfo>(JsonConvert.SerializeObject(DefaultUserSession));
            userSession.ApplicationMode = AppMode.Parasitic;
            userSession.IsSuperAdmin = true;
            StubUserSessionData(userSession);
            MockProductService();

            const int TotalTabCount = 4;

            using (var controller = CreateController())
            {
                // Action
                var result = controller.Index() as ViewResult;
                var tabList = (result.Model as BettingTicketCenterViewModel).TabList;
                var hasAllPermissionsOfTab = BtcViewInfo.TabList.Intersect(tabList).Count() == TotalTabCount;

                // Assert
                Assert.That("~/Views/Desktop/BetList/BettingTicketCenter/SingleCustomer.cshtml", Is.EqualTo(result.ViewName));
                Assert.That(hasAllPermissionsOfTab, Is.True);
            }
        }

        [Test]
        public void Index_NotHaveAnyPermissionTab_ReturnDefaultView()
        {
            // Arrange
            CreateAndStubUserSession("AnotherPermissionKey");
            MockProductService();

            using (var controller = CreateController())
            {
                // Action
                var result = controller.Index() as RedirectToRouteResult;

                // Assert
                Assert.That("Utility", Is.EqualTo(result.RouteValues["controller"].ToString()));
                Assert.That("AccessDenied", Is.EqualTo(result.RouteValues["action"].ToString()));
            }
        }

        [Test]
        public void RefNo_WhenCall_ReturnCorrectViewResult()
        {
            MockProductService();

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

        [TestCase(true)]
        [TestCase(false)]
        public void RefNo_WhenCall_ReturnCorrectViewBag(bool hasExchangePermission)
        {
            using (var controller = CreateController(hasExchangePermission))
            {
                // Arrange
                CreateAndStubUserSession(PermissionKeys.BtcRefNo);
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
                    Assert.That((bool)result.ViewBag.HasExchange, Is.EqualTo(hasExchangePermission));
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

                MockProductService();

                // Action
                var result = controller.Running() as ViewResult;

                // Assert
                Assert.That(result.ViewName, Is.EqualTo("~/Views/Desktop/BetList/BettingTicketCenter/Running.cshtml"));
            }
        }

        [TestCase(true)]
        [TestCase(false)]
        public void Running_WhenCall_ReturnCorrectViewModel(bool hasExchangePermission)
        {
            using (var controller = CreateController(hasExchangePermission))
            {
                // Arrange
                CreateAndStubUserSession(PermissionKeys.BtcRunning);
                var productCodes = MockProductService();

                // Action
                var result = controller.Running() as ViewResult;
                var viewModel = result.Model as BettingTicketCenterViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(viewModel.CurrencyList, Is.EqualTo(DefaultUserSession.CurrencyList));
                    Assert.That(viewModel.ProductOptionList.Count(), Is.EqualTo(productCodes.Count()));
                    Assert.That(viewModel.IsAllowedCustomerComm, Is.EqualTo(DefaultLicenseeSession.IsAllowedCustomerComm));
                    Assert.That(viewModel.HasExchange, Is.EqualTo(hasExchangePermission));
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

                MockProductService();

                // Action
                var result = controller.SingleCustomer() as ViewResult;

                // Assert
                Assert.That(result.ViewName, Is.EqualTo("~/Views/Desktop/BetList/BettingTicketCenter/SingleCustomer.cshtml"));
            }
        }

        [TestCase(true)]
        [TestCase(false)]
        public void SingleCustomer_WhenCall_ReturnCorrectViewModel(bool hasExchangePermission)
        {
            using (var controller = CreateController(hasExchangePermission))
            {
                // Arrange
                CreateAndStubUserSession(PermissionKeys.BtcSingleCustomer);
                var productCodes = MockProductService();

                // Action
                var result = controller.SingleCustomer() as ViewResult;
                var viewModel = result.Model as BettingTicketCenterViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(viewModel.LiveStatusList, Is.Not.Empty);
                    Assert.That(viewModel.StatusList, Is.Not.Empty);
                    Assert.That(viewModel.PlatformList, Is.Not.Empty);
                    Assert.That(viewModel.ProductOptionList.Count(), Is.EqualTo(productCodes.Count()));
                    Assert.That(viewModel.IsAllowedCustomerComm, Is.EqualTo(DefaultLicenseeSession.IsAllowedCustomerComm));
                    Assert.That(viewModel.HasExchange, Is.EqualTo(hasExchangePermission));
                });
            }
        }

        [Test]
        public void AdvancedSearch_WhenCall_ReturnCorrectView()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var historyDate = FakeHelper.Create<DateTime>();
                AppSettings.HistoryDate.Returns(historyDate);

                MockProductService();

                // Action
                var result = controller.AdvancedSearch() as ViewResult;

                // Assert
                Assert.That(result.ViewName, Is.EqualTo("~/Views/Desktop/BetList/BettingTicketCenter/AdvancedSearch.cshtml"));
            }
        }

        [TestCase(true)]
        [TestCase(false)]
        public void AdvancedSearch_WhenCall_ReturnCorrectViewModel(bool hasExchangePermission)
        {
            using (var controller = CreateController(hasExchangePermission))
            {
                // Arrange
                CreateAndStubUserSession(PermissionKeys.BtcAdvancedSearch);
                var productCodes = MockProductService();

                // Action
                var result = controller.AdvancedSearch() as ViewResult;
                var viewModel = result.Model as BettingTicketCenterViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(viewModel.CurrencyList, Is.EqualTo(DefaultUserSession.CurrencyList));
                    Assert.That(viewModel.LiveStatusList, Is.Not.Empty);
                    Assert.That(viewModel.StatusList, Is.Not.Empty);
                    Assert.That(viewModel.ProductOptionList.Count(), Is.EqualTo(productCodes.Count()));
                    Assert.That(viewModel.MinDate, Is.EqualTo(BalanceUpDate));
                    Assert.That(viewModel.IsAllowedCustomerComm, Is.EqualTo(DefaultLicenseeSession.IsAllowedCustomerComm));
                    Assert.That(viewModel.HasExchange, Is.EqualTo(hasExchangePermission));
                });
            }
        }

        private BettingTicketCenterController CreateController(bool hasExchangePermission = true)
        {
            _authService.CheckProductBelongsTo(SessionService.LicenseeSession.LicenseeName, ProductTypes.Exchange).Returns(hasExchangePermission);

            return new BettingTicketCenterController(_productService, _balanceUpDataAccess, _authService)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService
            };
        }

        private IEnumerable<Product> MockProductService()
        {
            var productCodes = FakeHelper.CreateMany<Product>(3).ToList();
            _productService.GetSingleWalletProductAccess(
                DefaultLicenseeSession.LicenseeId,
                DefaultUserSession.Language,
                Arg.Is<string>(x =>
                string.IsNullOrEmpty(x) ||
                x == FunctionNames.BettingTicketCenterAdvancedSearch ||
                x == FunctionNames.BettingTicketCenterRunning ||
                x == FunctionNames.BettingTicketCenter)).Returns(new ProductAccess(productCodes));

            return productCodes;
        }

        private void CreateAndStubUserSession(string permissionKey, AppMode appMode = AppMode.Parasitic)
        {
            var userSession = JsonConvert.DeserializeObject<UserAuthInfo>(JsonConvert.SerializeObject(DefaultUserSession));
            userSession.ApplicationMode = appMode;
            userSession.PortalFunctionList = new OneAuthPermission[]
            {
                    new OneAuthPermission { FunctionKey =  permissionKey }
            };
            userSession.FunctionList = new List<Function>
            {
                new Function { FunctionKey =  permissionKey }
            };
            StubUserSessionData(userSession);
        }
    }
}