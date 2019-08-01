using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.UnitTest.Common.Helpers;
using Fanex.Logging;
using NSubstitute;
using NUnit.Framework;
using System;
using System.Net.Http;

namespace Fanex.Athena.Module.PlayerAdmin.Api.UnitTests
{
    [TestFixture]
    public class PlayerOddsGroupControllerTest
    {
        private IPlayerOddsGroupService _playerOddsGroupService;
        private ILogger _logger;

        [SetUp]
        public void Setup()
        {
            _playerOddsGroupService = Substitute.For<IPlayerOddsGroupService>();
            _logger = Substitute.For<ILogger>();
        }

        [TearDown]
        public void TearDown()
        {
            _playerOddsGroupService = null;
            _logger = null;
        }

        [Test]
        public void Update_WhenCall_AssignParamValueCorrectly()
        {
            // Arrange
            var metaModel = CreateMetaModel();

            var expectedReturnedData = new ResultViewModel();
            _playerOddsGroupService.Update(metaModel).Returns(expectedReturnedData);

            using (var controller = CreateController())
            {
                // Action
                controller.Update(metaModel);

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(metaModel.SiteName, Is.EqualTo(ExternalApiHelper.DefaultSiteName));
                    Assert.That(metaModel.UserId, Is.EqualTo(ExternalApiHelper.DefaultUserId));
                    Assert.That(metaModel.Language, Is.EqualTo("en-US"));
                    Assert.That(metaModel.Ip, Is.EqualTo(ExternalApiHelper.DefaultClientIp));
                });
            }
        }

        [Test]
        public void Update_WhenCall_ReturnCorrectResult()
        {
            // Arrange
            var metaModel = CreateMetaModel();

            var expectedReturnedData = new ResultViewModel
            {
                Success = true
            };
            _playerOddsGroupService.Update(metaModel).Returns(expectedReturnedData);

            using (var controller = CreateController())
            {
                // Action
                var result = controller.Update(metaModel);

                // Assert
                Assert.That(result, Is.EqualTo(expectedReturnedData));
            }
        }

        [Test]
        public void Update_ThrowException_LogErrorIsCalled()
        {
            // Arrange
            var metaModel = CreateMetaModel();

            var expectedReturnedData = new ResultViewModel
            {
                Success = true
            };
            _playerOddsGroupService.Update(metaModel).Returns(x => { throw new Exception(); });

            using (var controller = CreateController())
            {
                // Action
                controller.Update(metaModel);

                // Assert
                _logger.Received().Error(Arg.Any<string>());
            }
        }

        private PlayerOddsGroupController CreateController()
        {
            var actionContext = ExternalApiHelper.CreateMockActionContext();
            var httpContext = ExternalApiHelper.CreateHttpContext();

            var request = new HttpRequestMessage();
            request.Properties["MS_HttpContext"] = httpContext;

            return new PlayerOddsGroupController(_playerOddsGroupService, _logger)
            {
                ActionContext = actionContext,
                Request = request
            };
        }

        private static OddsGroupUpdatingMetaModel CreateMetaModel()
        {
            return new OddsGroupUpdatingMetaModel
            {
                CustId = 1,
                OddsGroup = "A"
            };
        }
    }
}