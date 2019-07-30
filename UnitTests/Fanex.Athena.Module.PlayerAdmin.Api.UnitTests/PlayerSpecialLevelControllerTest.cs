using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.UnitTest.Common.Helpers;
using Fanex.Logging;
using NSubstitute;
using NUnit.Framework;
using System;

namespace Fanex.Athena.Module.PlayerAdmin.Api.UnitTests
{
    [TestFixture]
    public class PlayerSpecialLevelControllerTest
    {
        private IPlayerSpecialLevelService _playerSpecialLevelService;
        private ILogger _logger;

        [SetUp]
        public void Setup()
        {
            _playerSpecialLevelService = Substitute.For<IPlayerSpecialLevelService>();
            _logger = Substitute.For<ILogger>();
        }

        [TearDown]
        public void TearDown()
        {
            _playerSpecialLevelService = null;
            _logger = null;
        }

        [Test]
        public void Update_WhenCall_AssignParamValueCorrectly()
        {
            // Arrange
            var metaModel = CreateMetaModel();

            var expectedReturnedData = new ResultViewModel();
            _playerSpecialLevelService.Update(metaModel).Returns(expectedReturnedData);

            using (var controller = CreateController())
            {
                // Action
                controller.Update(metaModel);

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(metaModel.SiteName, Is.EqualTo(ExternalApiHelper.DefaultSiteName));
                    Assert.That(metaModel.LicenseeId, Is.EqualTo(ExternalApiHelper.DefaultLicenseeId));
                    Assert.That(metaModel.UserId, Is.EqualTo(ExternalApiHelper.DefaultUserId));
                    Assert.That(metaModel.Language, Is.EqualTo("en-US"));
                    Assert.That(metaModel.Ip, Is.EqualTo(string.Empty));
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
            _playerSpecialLevelService.Update(metaModel).Returns(expectedReturnedData);

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
            _playerSpecialLevelService.Update(metaModel).Returns(x => { throw new Exception(); });

            using (var controller = CreateController())
            {
                // Action
                controller.Update(metaModel);

                // Assert
                _logger.Received().Error(Arg.Any<string>());
            }
        }

        private PlayerSpecialLevelController CreateController()
        {
            var actionContext = ExternalApiHelper.CreateMockActionContext();

            return new PlayerSpecialLevelController(_playerSpecialLevelService, _logger)
            {
                ActionContext = actionContext
            };
        }

        private static SpecialLevelUpdatingMetaModel CreateMetaModel()
        {
            return new SpecialLevelUpdatingMetaModel
            {
                CustId = 1,
                SpecialLevel = 2
            };
        }
    }
}