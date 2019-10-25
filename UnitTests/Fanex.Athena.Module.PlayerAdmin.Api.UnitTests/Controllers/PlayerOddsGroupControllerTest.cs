using System;
using System.Net.Http;
using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Controllers;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Utilities;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.UnitTest.Common.Helpers;
using Fanex.Athena.UnitTest.Common.NUnitExtensions;
using Fanex.Logging;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.Api.UnitTests.Controllers
{
    [TestFixture]
    public class PlayerOddsGroupControllerTest
    {
        private IPlayerOddsGroupService _playerOddsGroupService;
        private ILicenseeSettingService _licenseeSettingService;
        private ILogger _logger;

        [SetUp]
        public void Setup()
        {
            _playerOddsGroupService = Substitute.For<IPlayerOddsGroupService>();
            _licenseeSettingService = Substitute.For<ILicenseeSettingService>();
            _logger = Substitute.For<ILogger>();
        }

        [TearDown]
        public void TearDown()
        {
            _playerOddsGroupService = null;
            _licenseeSettingService = null;
            _logger = null;
        }

        [Test]
        public void Update_FakeLicensee_ReturnCorrectErroResult()
        {
            // Arrange
            var expectedResult = new ResultViewModel
            {
                Success = false,
                ErrorMessage = ResourceKeyConstants.FunctionDenied
            };

            var metaModel = CreateMetaModel();

            using (var controller = CreateController())
            {
                _licenseeSettingService.IsFakeLicensee(controller.SiteName).Returns(true);

                // Action
                var result = controller.Update(metaModel);

                // Assert
                Assert.That(result, Tobe.SameProperties(expectedResult));
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
                _licenseeSettingService.IsFakeLicensee(controller.SiteName).Returns(false);

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

            return new PlayerOddsGroupController(
                _playerOddsGroupService,
                _licenseeSettingService,
                _logger)
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