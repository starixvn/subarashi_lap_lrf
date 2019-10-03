namespace Fanex.Athena.Module.Notification.Report.UnitTests
{
    using Fanex.Athena.Controllers.Base.UnitTests;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.ResultModel;
    using Fanex.Athena.Module.Notification.DTO;
    using Fanex.Athena.Module.Notification.MetaModel;
    using Fanex.Athena.Module.Notification.Report;
    using Fanex.Athena.Module.Notification.Service.Interfaces;

    using NSubstitute;

    using NUnit.Framework;

    using System;
    using System.Collections.Generic;
    using System.Net;
    using System.Web.Mvc;

    public class NotificationReportController_ApiDataTest : CultureBaseControllerHelperTest
    {
        private const int MaximumMonthDistance = 5;

        private INotificationService _service;

        private NotificationReportController _controller;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            SetUpDefaultFakeData();

            _service = Substitute.For<INotificationService>();
            _controller = Substitute.ForPartsOf<NotificationReportController>(
                LangService,
                SessionService,
                _service);
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _service = null;
            _controller = null;
        }

        [Test]
        public void GetNotificationMessages_WhenCall_CallServiceWithCorrectParameter()
        {
            // Arrange
            var metaModel = new NotificationMetaModel();
            _service.GetNotificationMessages(Arg.Do<NotificationMetaModel>(x => metaModel = x));

            // Action
            _controller.GetNotificationMessages();

            // Asset
            Assert.Multiple(() =>
            {
                _service.Received().GetNotificationMessages(Arg.Any<NotificationMetaModel>());
                Assert.That(new DateTime(metaModel.ToDate.Year, metaModel.ToDate.Month, 1).AddMonths(-MaximumMonthDistance), Is.EqualTo(metaModel.FromDate));
                Assert.That(metaModel.IsOnlyUnread, Is.True);
                Assert.That(metaModel.PageIndex, Is.EqualTo(1));
                Assert.That(metaModel.PageSize, Is.EqualTo(10));
            });
        }

        [Test]
        public void ResultAmendment_InValidMetaModel_ReturnEmptyResult()
        {
            // Arrange
            var metaModel = new NotificationMetaModel
            {
                FromDate = DateTime.Today,
                ToDate = DateTime.Today.AddDays(-1)
            };

            // Action
            var result = _controller.ResultAmendment(metaModel) as JsonResult;

            // Asset
            Assert.Multiple(() =>
            {
                _service.DidNotReceive().GetResultAmendment(Arg.Any<NotificationMetaModel>());
                Assert.That(result.Data.GetType().GetProperty("TotalRows").GetValue(result.Data), Is.Zero);
                Assert.That(result.Data.GetType().GetProperty("DataList").GetValue(result.Data), Is.Empty);
            });
        }

        [Test]
        public void ResultAmendment_WhenCall_CallServiceWithCorrectParameter()
        {
            // Arrange
            const string expectedLanguage = "en";
            var metaModel = new NotificationMetaModel();

            _service.GetResultAmendment(Arg.Any<NotificationMetaModel>()).Returns(new ReportResultModel<ResultAmendment>
            {
                DataList = new List<ResultAmendment>(),
                TotalRows = 0
            });

            // Action
            _controller.ResultAmendment(metaModel);

            // Asset
            Assert.Multiple(() =>
            {
                _service.Received().GetResultAmendment(Arg.Any<NotificationMetaModel>());
                Assert.That(metaModel.UserName, Is.EqualTo(DefaultUserSession.UserName));
                Assert.That(metaModel.Language, Is.EqualTo(expectedLanguage));
                Assert.That(metaModel.LicenseeName, Is.EqualTo(DefaultLicenseeSession.LicenseeName));
            });
        }

        [Test]
        public void MarkNotificationAsRead_WhenCallSuccessfully_ReturnTrue()
        {
            // Arrange
            var metaModel = new NotificationMarkAsReadMetaModel();
            _service.MarkNotificationAsRead(metaModel).Returns(new ResultInfo
            {
                Code = 0
            });

            // Action
            var result = _controller.MarkNotificationAsRead(metaModel) as JsonResult;

            // Asset
            Assert.Multiple(() =>
            {
                _service.Received().MarkNotificationAsRead(Arg.Any<NotificationMarkAsReadMetaModel>());
                Assert.That(result.Data.GetType().GetProperty("IsSuccessful").GetValue(result.Data), Is.True);
            });
        }

        [Test]
        public void MarkNotificationAsRead_WhenCallFailed_ReturnFalse()
        {
            // Arrange
            var metaModel = new NotificationMarkAsReadMetaModel();
            _service.MarkNotificationAsRead(metaModel).Returns(new ResultInfo
            {
                Code = 1,
                Message = "Failure"
            });

            // Action
            var result = _controller.MarkNotificationAsRead(metaModel) as JsonResult;

            // Asset
            Assert.Multiple(() =>
            {
                _service.Received().MarkNotificationAsRead(Arg.Any<NotificationMarkAsReadMetaModel>());
                Assert.That(result.Data.GetType().GetProperty("IsSuccessful").GetValue(result.Data), Is.False);
            });
        }

        [Test]
        public void DownLoadFileAttachment_ServiceReturnsError_ReturnStatusNoContent()
        {
            // Arrange
            var metaModel = new NotificationAttachmentMetaModel();
            _service.GetFileAttachmentData(metaModel).Returns(new ResultInfo { Code = 1 });

            // Action
            var result = _controller.DownLoadFileAttachment(metaModel);

            // Asset
            Assert.That(result.StatusCode, Is.EqualTo(HttpStatusCode.NoContent));
        }

        [Test]
        public void DownLoadFileAttachment_ServiceReturnsData_ReturnCorrectResult()
        {
            // Arrange
            var metaModel = new NotificationAttachmentMetaModel();
            var data = "test";
            _service.GetFileAttachmentData(metaModel).Returns(new ResultInfo { Code = 0, ExtendedData = data });

            // Action
            var result = _controller.DownLoadFileAttachment(metaModel);

            // Asset
            Assert.Multiple(() =>
            {
                Assert.That(result.StatusCode, Is.EqualTo(HttpStatusCode.OK));
                Assert.That(result.Content, Is.Not.Null);
            });
        }
    }
}