namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using System.Web.Mvc;
    using Base.UnitTests;
    using NSubstitute;
    using NUnit.Framework;

    public class WeeklyLiveMatchReportControllerTest : CultureBaseControllerHelperTest
    {
        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            StubUserSessionData(DefaultUserSession);
            StubLicenseeSessionData(DefaultLicenseeSession);
        }

        [Test]
        public void Index_WhenGet_ReturnCorrectViewName()
        {
            using (var controller = CreateController())
            {
                // Action
                var viewResult = controller.Index() as ViewResult;

                // Assert
                Assert.That(viewResult.ViewName, Is.EqualTo("~/Views/Desktop/Report/WeeklyLiveMatch/Main.cshtml"));
            }
        }

        private WeeklyLiveMatchReportController CreateController()
        {
            return Substitute.ForPartsOf<WeeklyLiveMatchReportController>();
        }
    }
}