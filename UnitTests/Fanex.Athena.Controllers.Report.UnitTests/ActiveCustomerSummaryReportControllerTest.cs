namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Base.UnitTests;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Core.DTO.Common;
    using Model.Report.ViewModel;
    using NSubstitute;
    using NUnit.Framework;
    using Report;

    [TestFixture]
    public class ActiveCustomerSummaryReportControllerTest : CultureBaseControllerHelperTest
    {
        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            SetUpDefaultFakeData();
        }

        [Test]
        public void Index_WhenGet_ReturnCorrectViewResult()
        {
            using (var controller = CreateController())
            {
                // Action
                var viewResult = controller.Index() as ViewResult;
                var viewModel = viewResult.Model as ActiveCustomerViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    StringAssert.Contains("Report/ActiveCustomerSummary/Main.cshtml", viewResult.ViewName);
                    Assert.That(viewModel.Param.LicenseeId, Is.EqualTo(SessionService.LicenseeSession.LicenseeId));
                });
            }
        }

        private ActiveCustomerSummaryReportController CreateController()
        {
            var productService = Substitute.For<IProductService>();
            productService.GetProductAccessForActiveCustomerSummary(
                SessionService.LicenseeSession.LicenseeId,
                SessionService.UserSession.Language)
                .Returns(new ProductAccess(new List<Product>()));
            return new ActiveCustomerSummaryReportController()
            {
                LangService = LangService,
                SessionServiceInstance = SessionService,
                ProductServiceInstance = productService
            };
        }
    }
}