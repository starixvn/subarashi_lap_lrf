namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using System.Web.Mvc;
    using Base.UnitTests;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Model.Report.ViewModel;
    using NSubstitute;
    using NUnit.Framework;
    using Report;

    [TestFixture]
    public class CashOutWinLossReportControllerTest : CultureBaseControllerHelperTest
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
                var viewModel = viewResult.Model as CashOutWinLossViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    StringAssert.Contains("Report/CashOutWinLoss/Main.cshtml", viewResult.ViewName);
                    Assert.That(viewModel.Param.LicenseeId, Is.EqualTo(SessionService.LicenseeSession.LicenseeId));
                });
            }
        }

        private CashOutWinLossReportController CreateController()
        {
            return new CashOutWinLossReportController(Substitute.For<ISubsidiaryService>())
            {
                LangService = LangService,
                SessionServiceInstance = SessionService
            };
        }
    }
}