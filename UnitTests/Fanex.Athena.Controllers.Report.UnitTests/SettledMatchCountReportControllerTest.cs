namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Mvc;

    using Base.UnitTests;

    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Model.Core.DTO.Common;
    using Model.Report.ViewModel;

    using NSubstitute;

    using NUnit.Framework;

    using Report;

    using Service.Report.Interfaces;

    [TestFixture]
    public class SettledMatchCountReportControllerTest : CultureBaseControllerHelperTest
    {
        private ISettledMatchCountService _settledMatchCountService;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();
            _settledMatchCountService = Substitute.For<ISettledMatchCountService>();
            SetUpDefaultFakeData();
        }

        [Test]
        public async Task Index_WhenCall_ReturnCorrectViewResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var expectedData = new List<SettledMatchCountViewModel>
                {
                    new SettledMatchCountViewModel()
                };

                _settledMatchCountService.GetDataList(
                    Arg.Any<bool>(),
                    SessionService.LicenseeSession.LicenseeId,
                    Arg.Any<ProductAccess>()).Returns(expectedData);

                // Action
                var viewResult = await controller.Index() as ViewResult;
                var viewModel = viewResult.Model as IList<SettledMatchCountViewModel>;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(viewResult.ViewName, Is.EqualTo("~/Views/Desktop/Report/SettledMatchCount/Main.cshtml"));
                    Assert.That(viewModel, Is.EqualTo(expectedData));
                });
            }
        }

        private SettledMatchCountReportController CreateController()
        {
            var productService = Substitute.For<IProductService>();
            productService.GetProductAccess(
                SessionService.LicenseeSession.LicenseeId,
                SessionService.UserSession.Language).Returns(new ProductAccess(new List<Product>()));

            return new SettledMatchCountReportController(_settledMatchCountService)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService,
                AppSettingInstance = AppSettings,
                ProductServiceInstance = productService
            };
        }
    }
}