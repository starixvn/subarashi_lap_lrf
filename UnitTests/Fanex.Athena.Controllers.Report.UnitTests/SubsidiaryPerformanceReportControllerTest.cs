namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using Fanex.Athena.Controllers.Base.UnitTests;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.DTO.Users;
    using Fanex.Athena.Model.Core.MetaModel.Product;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.Report.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Model.Core.DataDomain;

    using NSubstitute;

    using NUnit.Framework;

    using System.Collections.Generic;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.Script.Serialization;

    [TestFixture]
    public class SubsidiaryPerformanceReportControllerTest : CultureBaseControllerHelperTest
    {
        private const string FakeProductCode = "TestingCode";
        private const string FakeProductName = "Testing Product Name";

        private ISubsidiaryService _subsidiaryService;
        private JavaScriptSerializer _serializer;

        public ISubsidiaryPerformanceService Service { get; set; }

        [SetUp]
        public void SetUp()
        {
            SetUpDefaultFakeData();

            _subsidiaryService = Substitute.For<ISubsidiaryService>();
            Service = Substitute.For<ISubsidiaryPerformanceService>();
            _serializer = new JavaScriptSerializer();
        }

        [Test]
        public void Index_IsManageableSubsidiaryIsFalse_SubsidiaryListIsNull()
        {
            using (var controller = CreateController())
            {
                // Arrange
                SessionService.UserSession.Returns(new UserAuthInfo
                {
                    Language = DefaultUserSession.Language
                });

                var expectedViewModelData = new SubsidiaryPerformanceViewModel
                {
                    GroupSubsidiaryList = new List<GroupSubsidiary>(),
                    ProductOptionList = new List<ProductOption>
                    {
                        new ProductOption { Code = FakeProductCode, Name = FakeProductName, Status = true }
                    }
                };

                var expectedModel = _serializer.Serialize(expectedViewModelData);
                var expectedViewName = "~/Views/Desktop/Report/SubsidiaryPerformance/Main.cshtml";
                HttpContext.Current = GetHttpContext();

                // Action
                var viewResult = controller.Index() as ViewResult;
                var modelResult = _serializer.Serialize(viewResult.Model);

                // Assert
                Assert.That(viewResult.ViewName, Is.EqualTo(expectedViewName));
                Assert.That(modelResult, Is.EqualTo(expectedModel));
            }
        }

        private static HttpContext GetHttpContext()
        {
            return new HttpContext(
                new HttpRequest(null, "http://tempuri.org", null),
                new HttpResponse(null));
        }

        private SubsidiaryPerformanceReportController CreateController()
        {
            var productService = Substitute.For<IProductService>();
            productService.GetSingleWalletProductAccess(
                SessionService.LicenseeSession.LicenseeId,
                SessionService.UserSession.Language,
                FunctionNames.SubsidiaryPerformance)
                .Returns(new ProductAccess(new List<Product> { new Product { ProductCode = FakeProductCode, ProductName = FakeProductName } }));

            return new SubsidiaryPerformanceReportController(_subsidiaryService)
            {
                ProductServiceInstance = productService,
                LangService = LangService,
                SessionServiceInstance = SessionService,
            };
        }
    }
}