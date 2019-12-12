namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Base.UnitTests;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.UnitTest.Common.Helpers;
    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;
    using Model.Report.ViewModel;
    using NSubstitute;
    using NUnit.Framework;
    using Report;

    [TestFixture]
    public class CustomerBalanceReportControllerTest : CultureBaseControllerHelperTest
    {
        private IReportAPIClient _reportAPIClient;

        private IProductService _productService;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            _productService = Substitute.For<IProductService>();
            _reportAPIClient = Substitute.For<IReportAPIClient>();

            SetUpDefaultFakeData();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            _productService = null;
            _reportAPIClient = null;
        }

        [TearDown]
        public void TearDown()
        {
            _reportAPIClient.ClearReceivedCalls();
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
                Assert.Multiple(() =>
                {
                    StringAssert.Contains("Report/CustomerBalance/Main.cshtml", viewResult.ViewName);
                    Assert.That(viewModel.Param.LicenseeId, Is.EqualTo(SessionService.LicenseeSession.LicenseeId));
                    Assert.That(viewModel.Param.CurrencyId, Is.Zero);
                    Assert.That(viewModel.Param.ProductOptions, Is.Empty);
                    Assert.That(viewModel.CurrencyList, Is.EqualTo(userSession.CurrencyList));
                    Assert.That(viewModel.ProductAccess.ProductList, Is.Empty);
                });
            }
        }

        [Test]
        public async Task IndexPost_WhenCall_CallsCorrectlyAPI()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new CustomerBalanceMetaModel();

                // Action
                await controller.Index(metaModel);

                // Assert
                Assert.Multiple(() =>
                {
                    _reportAPIClient.Received(1).PostStringAsync("api/CustomerBalance/Index", metaModel, SessionService.UserSession.Language);
                });
            }
        }

        [Test]
        public async Task ExportExcel_WhenCall_ReturnsCorrectlyResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const string fileName = "CustomerBalance.csv";
                var metaModel = new CustomerBalanceMetaModel();
                Stream content = new MemoryStream();
                var contentType = FakeHelper.Create<string>();
                var expectedResult = Tuple.Create(content, contentType);
                _reportAPIClient.PostAsync("api/CustomerBalance/ExportExcel", metaModel, SessionService.UserSession.Language).Returns(Task.FromResult(expectedResult));

                // Action
                var result = await controller.ExportExcel(metaModel);

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.ContentType, Is.EqualTo(contentType));
                    Assert.That(result.FileDownloadName, Is.EqualTo(fileName));
                    _reportAPIClient.Received(1).PostAsync("api/CustomerBalance/ExportExcel", metaModel, SessionService.UserSession.Language);
                });
            }
        }

        [Test]
        public async Task ExportExcel_WhenCall_ChangesCorrectlyMetaModel()
        {
            // Arrange
            var licenseeSession = SessionService.LicenseeSession;
            var productAccess = new ProductAccess(new List<Product> { new Product { ProductCode = Product.BA } });
            var metaModel = new CustomerBalanceMetaModel();
            Stream content = new MemoryStream();
            var contentType = FakeHelper.Create<string>();
            var expectedResult = Tuple.Create(content, contentType);

            using (var controller = CreateController(productAccess))
            {
                _reportAPIClient.PostAsync("api/CustomerBalance/ExportExcel", metaModel, SessionService.UserSession.Language)
                    .Returns(Task.FromResult(expectedResult));

                // Action
                await controller.ExportExcel(metaModel);

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(metaModel.IsAllowedBA, Is.True);
                    Assert.That(metaModel.HasComm, Is.EqualTo(licenseeSession.IsAllowedCustomerComm));
                    Assert.That(metaModel.PageIndex, Is.EqualTo(1));
                    Assert.That(metaModel.PageSize, Is.EqualTo(int.MaxValue - 1000));
                });
            }
        }

        private CustomerBalanceReportController CreateController(ProductAccess productAccess = null)
        {
            _productService.GetSingleWalletProductAccess(
                SessionService.LicenseeSession.LicenseeId,
                SessionService.UserSession.Language,
                FunctionNames.CustomerBalance).Returns(productAccess ?? new ProductAccess(new List<Product>()));

            return new CustomerBalanceReportController(_reportAPIClient)
            {
                ProductServiceInstance = _productService,
                LangService = LangService,
                SessionServiceInstance = SessionService
            };
        }
    }
}