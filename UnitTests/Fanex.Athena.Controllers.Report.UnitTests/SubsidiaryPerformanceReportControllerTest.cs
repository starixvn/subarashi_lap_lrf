namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using Fanex.Athena.Controllers.Base.UnitTests;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.Report.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Core.DataDomain;
    using NSubstitute;
    using NUnit.Framework;

    [TestFixture]
    public class SubsidiaryPerformanceReportControllerTest : CultureBaseControllerHelperTest
    {
        private ISubsidiaryService _subsidiaryService;
        private IProductService _productService;
        private ISubsidiaryPerformanceService _service;

        [SetUp]
        public void SetUp()
        {
            SetUpDefaultFakeData();

            _subsidiaryService = Substitute.For<ISubsidiaryService>();
            _service = Substitute.For<ISubsidiaryPerformanceService>();
            _productService = Substitute.For<IProductService>();
        }

        [Test]
        public void Index_WhenCall_ReturnCorrectResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var product = new Product { ProductCode = "Test", ProductName = "Test Name" };
                _productService.GetSingleWalletProductAccess(DefaultLicenseeSession.LicenseeId, DefaultUserSession.Language, FunctionNames.SubsidiaryPerformance)
                    .Returns(new ProductAccess(new List<Product> { product }));

                var subsidiaryTree = new List<CheckedItem>();
                _subsidiaryService.GetSubsidiaryTree(DefaultUserSession, DefaultLicenseeSession.LicenseeName).Returns(subsidiaryTree);

                var expectedViewName = "~/Views/Desktop/Report/SubsidiaryPerformance/Main.cshtml";

                // Action
                var viewResult = controller.Index() as ViewResult;
                var viewModel = viewResult.Model as SubsidiaryPerformanceViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(viewResult.ViewName, Is.EqualTo(expectedViewName));
                    Assert.That(viewModel.GroupSubsidiaryList, Is.EqualTo(subsidiaryTree));
                    Assert.That(viewModel.ProductOptionList.First().Code, Is.EqualTo(product.ProductCode));
                    Assert.That(viewModel.ProductOptionList.First().Name, Is.EqualTo(product.ProductName));
                    Assert.That(viewModel.ProductOptionList.First().Status, Is.True);
                });
            }
        }

        private SubsidiaryPerformanceReportController CreateController()
        {
            return new SubsidiaryPerformanceReportController(_subsidiaryService)
            {
                ProductServiceInstance = _productService,
                LangService = LangService,
                SessionServiceInstance = SessionService,
            };
        }
    }
}