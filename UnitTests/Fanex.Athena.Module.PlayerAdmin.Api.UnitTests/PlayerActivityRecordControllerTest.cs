using Fanex.Athena.Module.PlayerAdmin.Api.DTO;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.Api.UnitTests
{
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

        [TestCase(-1, true)]
        [TestCase(1, false)]
        public void Index_WhenCall_ReturnCorrectResult(int ibcCustId, bool resultNull)
        {
            // Arrange
            var metaModel = new PlayerActivityRecordMetaModel { IbcCustId = ibcCustId };
            PlayerActivityRecord expectedResult = resultNull ? null : new PlayerActivityRecord();
            _playerActivityRecordService.GetActivityRecord(metaModel).Returns(expectedResult);

            // Action
            using (var controller = new PlayerActivityRecordController(_playerActivityRecordService))
            {
                var result = controller.Index(metaModel);

                // Assert
                Assert.That(result == null, Is.EqualTo(resultNull));
            }
        }
    }
}