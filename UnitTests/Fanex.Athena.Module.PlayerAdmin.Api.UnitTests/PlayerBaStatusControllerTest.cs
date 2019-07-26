using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.UnitTest.Common.Helpers;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.Api.UnitTests
{
    public class PlayerBaStatusControllerTest
    {
        private IPlayerBaStatusService _baStatusService;

        [OneTimeSetUp]
        public void Setup()
        {
            _baStatusService = Substitute.For<IPlayerBaStatusService>();
        }

        [OneTimeTearDown]
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

            var expectedReturnedData = new ResultInfo();
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

        [TestCase(false, 999, "Update Failed", null)]
        [TestCase(true, 0, "", "A")]
        public void Update_Failed_ReturnCorrectResult(bool isSuccess, int errCode, string errMsg, string oddsGroup)
        {
            // Arrange
            var metaModel = new BaStatusUpdatingMetaModel
            {
                CustId = 1,
                IsBa = true
            };

            var expectedReturnedData = new ResultInfo
            {
                Code = errCode,
                Message = errMsg,
                ExtendedData = oddsGroup
            };
            _baStatusService.Update(metaModel).Returns(expectedReturnedData);

            using (var controller = CreateController())
            {
                // Action
                var result = controller.Update(metaModel);

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.Success, Is.EqualTo(isSuccess));
                    Assert.That(result.Message, Is.EqualTo(errMsg));
                    Assert.That(result.ExtendedData, Is.EqualTo(oddsGroup));
                });
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