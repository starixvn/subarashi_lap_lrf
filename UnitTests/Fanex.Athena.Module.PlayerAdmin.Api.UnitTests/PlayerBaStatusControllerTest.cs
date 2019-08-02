using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Utilities;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.UnitTest.Common.Helpers;
using Fanex.Athena.UnitTest.Common.NUnitExtensions;
using NSubstitute;
using NUnit.Framework;
using System.Net.Http;

namespace Fanex.Athena.Module.PlayerAdmin.Api.UnitTests
{
    [TestFixture]
    public class PlayerBaStatusControllerTest
    {
        private IPlayerBaStatusService _baStatusService;

        private IAuthorizationService _authorizationService;

        [SetUp]
        public void Setup()
        {
            _baStatusService = Substitute.For<IPlayerBaStatusService>();
            _authorizationService = Substitute.For<IAuthorizationService>();
        }

        [TearDown]
        public void TearDown()
        {
            _baStatusService = null;
            _authorizationService = null;
        }

        [Test]
        public void Update_HasNoPermission_ReturnCorrectErroResult()
        {
            // Arrange
            var expectedResult = new ResultViewModel
            {
                Success = false,
                ErrorMessage = ResourceKeyConstants.InvalidData
            };

            var metaModel = new BaStatusUpdatingMetaModel
            {
                CustId = 1
            };
            _authorizationService.HasPermissionOnData(Arg.Any<OneAuthCurrency[]>(), metaModel.CustId, 0).Returns(false);

            using (var controller = CreateController())
            {
                // Action
                var result = controller.Update(metaModel);

                // Assert
                Assert.That(result, Tobe.SameProperties(expectedResult));
            }
        }

        [Test]
        public void Update_WhenCall_AssignParamValueCorrectly()
        {
            // Arrange
            var metaModel = new BaStatusUpdatingMetaModel
            {
                CustId = 1,
                IsBa = true
            };

            var expectedReturnedData = new ResultViewModel();
            _baStatusService.Update(metaModel).Returns(expectedReturnedData);
            _authorizationService.HasPermissionOnData(Arg.Any<OneAuthCurrency[]>(), metaModel.CustId, 0).Returns(true);

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
            var metaModel = new BaStatusUpdatingMetaModel
            {
                CustId = 1,
                IsBa = true
            };

            var expectedReturnedData = new ResultViewModel
            {
                Success = true,
                ExtendedData = "A"
            };
            _baStatusService.Update(metaModel).Returns(expectedReturnedData);
            _authorizationService.HasPermissionOnData(Arg.Any<OneAuthCurrency[]>(), metaModel.CustId, 0).Returns(true);

            using (var controller = CreateController())
            {
                // Action
                var result = controller.Update(metaModel);

                // Assert
                Assert.That(result, Is.EqualTo(expectedReturnedData));
            }
        }

        private PlayerBaStatusController CreateController()
        {
            var actionContext = ExternalApiHelper.CreateMockActionContext();
            var httpContext = ExternalApiHelper.CreateHttpContext();

            var request = new HttpRequestMessage();
            request.Properties["MS_HttpContext"] = httpContext;

            return new PlayerBaStatusController(_baStatusService, _authorizationService)
            {
                ActionContext = actionContext,
                Request = request
            };
        }
    }
}