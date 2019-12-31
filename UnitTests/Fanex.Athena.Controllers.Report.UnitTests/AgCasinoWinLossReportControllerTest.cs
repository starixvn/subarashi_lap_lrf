namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using System.Web.Mvc;
    using Base.UnitTests;
    using Model.Report.ViewModel;
    using NUnit.Framework;
    using Report;

    [TestFixture]
    public class AgCasinoWinLossReportControllerTest : CultureBaseControllerHelperTest
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
                var viewModel = viewResult.Model as ThirdPartyWinLossViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    StringAssert.Contains("Report/AgCasinoWinLoss/Main.cshtml", viewResult.ViewName);
                    Assert.That(viewModel.Param.LicenseeId, Is.EqualTo(SessionService.LicenseeSession.LicenseeId));
                });
            }
        }

        private AgCasinoWinLossReportController CreateController()
        {
            return new AgCasinoWinLossReportController()
            {
                LangService = LangService,
                SessionServiceInstance = SessionService
            };
        }
    }
}