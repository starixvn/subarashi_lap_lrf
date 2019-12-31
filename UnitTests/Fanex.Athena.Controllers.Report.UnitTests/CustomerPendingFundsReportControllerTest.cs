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
    public class CustomerPendingFundsReportControllerTest : CultureBaseControllerHelperTest
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
                var viewModel = viewResult.Model as CustomerPendingFundsViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    StringAssert.Contains("Report/CustomerPendingFunds/Main.cshtml", viewResult.ViewName);
                    Assert.That(viewModel.Param.LicenseeId, Is.EqualTo(SessionService.LicenseeSession.LicenseeId));
                });
            }
        }

        private CustomerPendingFundsReportController CreateController()
        {
            var productService = Substitute.For<IProductService>();
            productService.GetSingleWalletProductAccess(
                SessionService.LicenseeSession.LicenseeId,
                SessionService.UserSession.Language,
                FunctionNames.CustomerPendingFunds).Returns(new ProductAccess(new List<Product>()));

            return new CustomerPendingFundsReportController()
            {
                LangService = LangService,
                SessionServiceInstance = SessionService,
                ProductServiceInstance = productService,
                LicenseeSettingServiceInstance = Substitute.For<ILicenseeSettingService>()
            };
        }
    }
}