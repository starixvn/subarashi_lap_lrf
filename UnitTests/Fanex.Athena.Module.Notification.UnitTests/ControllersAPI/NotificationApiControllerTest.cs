namespace Fanex.Athena.Module.Notification.Api.UnitTests
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Http.Controllers;
    using System.Web.Script.Serialization;
    using Athena.Service.StatelessCore.Interfaces;
    using ControllersAPI;
    using DTO;
    using MetaModel;
    using Model.Auth;
    using Model.Core.DTO.Common;
    using Model.Core.ResultModel;
    using NSubstitute;
    using NUnit.Framework;
    using Service.Interfaces;
    using UnitTest.Common.Helpers;

    public class NotificationApiControllerTest
    {
        private const string UserName = "admin";

        private const string SiteName = "12bet";

        private const string Language = "Cs";

        private readonly JavaScriptSerializer _serializer = new JavaScriptSerializer();

        private NotificationApiController _apiController;

        private ILicenseeSettingService _licenseeSettingService;

        private INotificationManagerService _notificationManagerService;

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
                LicenseeName = SiteName,
                Source = "Test"
            };

            var resultModel = new ResultInfo
            {
                Code = 0,
                Message = "Success"
            };
            _notificationManagerService.MarkNotificationAsRead(metaModel).Returns(resultModel);

            var expectedResultModel = new
            {
                resultModel.Code,
                resultModel.Message,
                resultModel.IsSuccessful,
                resultModel.ExtendedData
            };

            // Action
            var markNotificationAsReadResult = _apiController.MarkNotificationAsRead(metaModel);
            var result = markNotificationAsReadResult.Content;

            // Assert
            // Asset
            Assert.Multiple(() =>
            {
                Assert.That(result.Code, Is.EqualTo(expectedResultModel.Code));
                Assert.That(result.Message, Is.EqualTo(expectedResultModel.Message));
                Assert.That(result.IsSuccessful, Is.EqualTo(expectedResultModel.IsSuccessful));
                Assert.That(result.ExtendedData, Is.EqualTo(expectedResultModel.ExtendedData));
            });
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
                    {
                        "permissions", new List<PortalFunction>
                        {
                            new PortalFunction { FunctionKey = "ResultAmendment_Recalculation75" },
                            new PortalFunction { FunctionKey = "AbnormalBet" }
                        }
                    }
                }
            };

            return new NotificationApiController(_notificationManagerService)
            {
                ActionContext = mockActionContext
            };
        }
    }
}