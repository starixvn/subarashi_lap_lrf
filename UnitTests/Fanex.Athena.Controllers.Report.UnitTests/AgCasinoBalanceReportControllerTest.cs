namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using System.Web.Mvc;
    using Base.UnitTests;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Report.ViewModel;
    using NSubstitute;
    using NUnit.Framework;
    using Report;

    [TestFixture]
    public class AgCasinoBalanceReportControllerTest : CultureBaseControllerHelperTest
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
                var viewModel = viewResult.Model as AgCasinoBalanceViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    StringAssert.Contains("Report/AgCasinoBalance/Main.cshtml", viewResult.ViewName);
                    Assert.That(viewModel.Param.LicenseeId, Is.EqualTo(SessionService.LicenseeSession.LicenseeId));
                });
            }
        }

        private AgCasinoBalanceReportController CreateController()
        {
            return new AgCasinoBalanceReportController()
            {
                LangService = LangService,
                SessionServiceInstance = SessionService,
                ProductServiceInstance = Substitute.For<IProductService>()
            };
        }
    }
}