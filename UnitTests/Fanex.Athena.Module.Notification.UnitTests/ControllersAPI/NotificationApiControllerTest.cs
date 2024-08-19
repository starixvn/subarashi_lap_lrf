namespace Fanex.Athena.Module.Notification.Api.UnitTests
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Http.Controllers;
    using System.Web.Script.Serialization;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Module.Notification.ControllersAPI;
    using Fanex.Athena.Module.Notification.DTO;
    using Fanex.Athena.Module.Notification.MetaModel;
    using Fanex.Athena.Module.Notification.Service.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.UnitTest.Common.Helpers;
    using Model.Core.DTO.Common;
    using Model.Core.ResultModel;
    using NSubstitute;
    using NUnit.Framework;

    public class NotificationApiControllerTest
    {
        private const string UserName = "admin";

        private const string SiteName = "12bet";

        private const string Language = "Cs";

        private INotificationManagerService _notificationManagerService;

        private ILicenseeSettingService _licenseeSettingService;

        private NotificationApiController _apiController;

        private readonly JavaScriptSerializer _serializer = new JavaScriptSerializer();

        [SetUp]
        public void SetUp()
        {
            _notificationManagerService = Substitute.For<INotificationManagerService>();
            _licenseeSettingService = Substitute.For<ILicenseeSettingService>();
            _apiController = GetControllerWithActionArguments();

            _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(false);
        }

        [TearDown]
        public void TearDown()
        {
            _notificationManagerService = null;
        }

        [Test]
        public async Task GetNotificationMessages_WhenCall_ReturnExpectedResult()
        {
            // Arrange
            var metaModel = new NotificationMetaModel
            {
                Language = "en",
                IsOnlyUnread = true,
                PageSize = 10,
                PageIndex = 1,
                UserName = UserName,
                LicenseeName = SiteName
            };

            var expectedResultModel = new ReportResultModel<NotificationMessage>
            {
                DataList = new List<NotificationMessage>
                {
                    FakeHelper.Create<NotificationMessage>()
                },
                TotalRows = 1
            };
            _notificationManagerService.GetNotificationMessages(metaModel).Returns(expectedResultModel);

            var expectedResult = _serializer.Serialize(expectedResultModel);

            // Action
            var notificationMessages = _apiController.GetNotificationMessages(metaModel);
            var result = _serializer.Serialize(notificationMessages);

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }

        [Test]
        public async Task GetNotificationMessages_WhenCall_ParameterPassedCorrectly()
        {
            // Arrange
            var metaModel = new NotificationMetaModel
            {
                Language = "en",
                MessageTypes = "1,2"
            };
            var expectedMetaModel = new NotificationMetaModel
            {
                Language = "en",
                IsOnlyUnread = true,
                PageSize = 10,
                PageIndex = 1,
                UserName = UserName,
                LicenseeName = SiteName,
                MessageTypes = "1,2"
            };

            NotificationMetaModel passedParam = null;

            _notificationManagerService.GetNotificationMessages(Arg.Do<NotificationMetaModel>(x => passedParam = x))
                                .Returns(new ReportResultModel<NotificationMessage>());

            var expectedResult = _serializer.Serialize(expectedMetaModel);

            // Action
            _apiController.GetNotificationMessages(metaModel);
            var result = _serializer.Serialize(passedParam);

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }

        [Test]
        public async Task MarkNotificationAsRead_WhenCall_ReturnExpectedResult()
        {
            // Arrange
            var metaModel = new NotificationMarkAsReadMetaModel
            {
                MessageId = 1,
                MessageType = "Amendment",
                UserName = UserName,
                LicenseeName = SiteName
            };

            var resultModel = new ResultInfo
            {
                Code = 0,
                Message = "Success"
            };
            _notificationManagerService.MarkNotificationAsRead(metaModel).Returns(resultModel);

            var expectedResultModel = new
            {
                Code = resultModel.Code,
                Message = resultModel.Message,
                IsSuccessful = resultModel.IsSuccessful
            };
            var expectedResult = _serializer.Serialize(expectedResultModel);

            // Action
            var markNotificationAsReadResult = _apiController.MarkNotificationAsRead(metaModel);
            var result = _serializer.Serialize(markNotificationAsReadResult);

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }

        [Test]
        public async Task MarkNotificationAsRead_WhenCall_ParameterPassedCorrectly()
        {
            // Arrange
            var metaModel = new NotificationMarkAsReadMetaModel
            {
                MessageId = 1,
                MessageType = "Amendment"
            };

            var expectedMetaModel = new NotificationMarkAsReadMetaModel
            {
                MessageId = 1,
                MessageType = "Amendment",
                UserName = UserName,
                LicenseeName = SiteName
            };

            NotificationMarkAsReadMetaModel passedParam = null;
            _notificationManagerService.MarkNotificationAsRead(Arg.Do<NotificationMarkAsReadMetaModel>(x => passedParam = x))
                                .Returns(new ResultInfo());

            var expectedResult = _serializer.Serialize(expectedMetaModel);

            // Action
            _apiController.MarkNotificationAsRead(metaModel);
            var result = _serializer.Serialize(passedParam);

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }

        private NotificationApiController GetControllerWithActionArguments()
        {
            var mockActionContext = new HttpActionContext
            {
                ControllerContext = new HttpControllerContext(),
                ActionArguments =
                {
                    { "username", UserName },
                    { "sitename", SiteName },
                    { "language", Language },
                    { "permissions", new List<PortalFunction>
                    {
                        new PortalFunction { FunctionKey = "ResultAmendment_Recalculation75" },
                        new PortalFunction{ FunctionKey = "AbnormalBet"}
                    }}
                }
            };

            return new NotificationApiController(_notificationManagerService)
            {
                ActionContext = mockActionContext
            };
        }
    }
}