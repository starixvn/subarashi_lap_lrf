using System.Net.Http;
using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Controllers;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.UnitTest.Common.Helpers;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.Api.UnitTests.Controllers
{
    [TestFixture]
    public class PlayerBaStatusControllerTest
    {
        private IPlayerBaStatusService _baStatusService;

        [SetUp]
        public void Setup()
        {
            _baStatusService = Substitute.For<IPlayerBaStatusService>();
        }

        [TearDown]
        public void TearDown()
        {
            _baStatusService = null;
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

            return new PlayerBaStatusController(_baStatusService)
            {
                ActionContext = actionContext,
                Request = request
            };
        }
    }
}