using Fanex.Athena.Module.PlayerAdmin.Api.Controllers;
using Fanex.Athena.Module.PlayerAdmin.Api.DTO;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.UnitTest.Common.Helpers;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.Api.UnitTests.Controllers
{
    [TestFixture]
    public class PlayerActivityRecordControllerTest
    {
        private IPlayerActivityRecordService _playerActivityRecordService;

        [SetUp]
        public void Setup()
        {
            _playerActivityRecordService = Substitute.For<IPlayerActivityRecordService>();
        }

        [TearDown]
        public void TearDown()
        {
            _playerActivityRecordService = null;
        }

        [Test]
        public void Index_InvalidIbcCustId_ReturnNull()
        {
            // Arrange
            var metaModel = new PlayerActivityRecordMetaModel
            {
                IbcCustId = -1,
                SiteName = ExternalApiHelper.DefaultSiteName
            };
            PlayerActivityRecord expectedResult = null;
            _playerActivityRecordService.GetActivityRecord(metaModel).Returns(expectedResult);

            // Action
            using (var controller = new PlayerActivityRecordController(_playerActivityRecordService))
            {
                var result = controller.Index(metaModel);

                // Assert
                Assert.That(result, Is.Null);
            }
        }

        [Test]
        public void Index_ValidIbcCustId_ReturnCorrectResult()
        {
            // Arrange
            var metaModel = new PlayerActivityRecordMetaModel
            {
                IbcCustId = 1,
                SiteName = ExternalApiHelper.DefaultSiteName
            };
            PlayerActivityRecord expectedResult = FakeHelper.Create<PlayerActivityRecord>();
            _playerActivityRecordService.GetActivityRecord(metaModel).Returns(expectedResult);

            // Action
            using (var controller = new PlayerActivityRecordController(_playerActivityRecordService))
            {
                var result = controller.Index(metaModel);

                // Assert
                Assert.That(result, Is.EqualTo(expectedResult));
                Assert.That(string.IsNullOrEmpty(result.CreatedDateString), Is.EqualTo(!expectedResult.CreateDate.HasValue));
                Assert.That(string.IsNullOrEmpty(result.LastLoginString), Is.EqualTo(!expectedResult.LastLogged.HasValue));
                Assert.That(string.IsNullOrEmpty(result.LastTxn), Is.EqualTo(!expectedResult.LastTransferDate.HasValue));
                Assert.That(string.IsNullOrEmpty(result.LastUpdateBAString), Is.EqualTo(!expectedResult.LastUpdateBA.HasValue));
                Assert.That(string.IsNullOrEmpty(result.LastUpdateSpecialLevelString), Is.EqualTo(!expectedResult.SpecialLevelUpdateDate.HasValue));
            }
        }
    }
}