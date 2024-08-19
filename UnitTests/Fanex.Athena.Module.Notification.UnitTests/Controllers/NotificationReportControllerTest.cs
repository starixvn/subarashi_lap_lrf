namespace Fanex.Athena.Module.Notification.Report.UnitTests
{
    using System;
    using System.Web.Mvc;
    using Fanex.Athena.Controllers.Base.UnitTests;
    using Fanex.Athena.Module.Notification.Controller;
    using Fanex.Athena.Module.Notification.Service.Interfaces;
    using Fanex.Athena.Module.Notification.ViewModel;
    using NSubstitute;
    using NUnit.Framework;

    public class NotificationReportControllerTest : CultureBaseControllerHelperTest
    {
        private INotificationManagerService _notificationManagerService;

        [SetUp]
        public void SetUp()
        {
            _notificationManagerService = Substitute.For<INotificationManagerService>();
        }

        [TearDown]
        public void TearDown()
        {
            _notificationManagerService = null;
        }

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
                Assert.That(viewResult.ViewName, Is.EqualTo("~/Views/Desktop/Module/Notification/Notification.cshtml"));
            }
        }

        [Test]
        public void Index_WhenGet_ReturnCorrectViewModel()
        {
            using (var controller = CreateController())
            {
                // Action
                var viewResult = controller.Index() as ViewResult;
                var model = (NotificationViewModel)viewResult.Model;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(model.FromDate.DayOfWeek, Is.EqualTo(DayOfWeek.Sunday));
                    Assert.That(model.ToDate.Subtract(model.FromDate).TotalDays, Is.LessThanOrEqualTo(7));
                });
            }
        }

        private NotificationReportController CreateController()
        {
            var controller = Substitute.ForPartsOf<NotificationReportController>(_notificationManagerService);
            controller.LangService = LangService;
            controller.SessionServiceInstance = SessionService;

            return controller;
        }
    }
}