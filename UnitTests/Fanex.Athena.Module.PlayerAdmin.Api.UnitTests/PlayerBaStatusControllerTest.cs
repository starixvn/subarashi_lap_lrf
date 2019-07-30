using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.UnitTest.Common.Helpers;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.Api.UnitTests
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

            using (var controller = CreateController())
            {
                // Action
                controller.Update(metaModel);

                // Assert
                Assert.Multiple(() =>
                {
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

            return new PlayerBaStatusController(_baStatusService)
            {
                ActionContext = actionContext
            };
        }
    }
}