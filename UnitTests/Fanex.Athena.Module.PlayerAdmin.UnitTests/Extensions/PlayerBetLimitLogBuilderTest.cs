namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Extensions
{
    using System.Linq;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Service.StatelessCore;
    using Newtonsoft.Json;
    using NSubstitute;
    using NUnit.Framework;
    using System.Collections.Generic;
    using Fanex.Athena.UnitTest.Common.Helpers;
    using Fanex.Athena.Module.PlayerAdmin.Extensions;

    public class PlayerBetLimitLogBuilderTest
    {
        private PlayerBetLimitLogBuilder _fakeObject;

        [OneTimeSetUp]
        public void OneTimeSetUp()
        {
            _fakeObject = new PlayerBetLimitLogBuilder();
        }

        [OneTimeTearDown]
        public void OneTimeTearDown()
        {
            _fakeObject = null;
        }

        [Test]
        public void Build_ValidItem_ReturnsCorrectItem()
        {
            // Arrange
            var detail = FakeHelper.Create<IEnumerable<PlayerBetLimitDetailedLogMetaModel>>();
            var item = FakeHelper.Create<PlayerBetLimitLogMetaModel>();
            item.Detail = detail;
            var expectedDoing = "LAP - " + item.SiteName + " - " + item.LicenseeCustId + " - " + JsonConvert.SerializeObject(item.Detail);

            // Action
            var result = _fakeObject.Build(item);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.AreEqual(item.CustId, result.CustID);
                Assert.AreEqual(item.UserId, result.UserId);
                Assert.AreEqual(LogActionId.PlayerAdminUpdateBetLimit, result.ActionID);
                Assert.AreEqual((byte)UserControlLogType.Function, result.TypeId);
                Assert.AreEqual(expectedDoing, result.Doing);
            });
        }

        [Test]
        public void Build_NullItem_ReturnsNull()
        {
            // Arrange
            PlayerBetLimitLogMetaModel item = null;

            // Action
            var result = _fakeObject.Build(item);

            // Assert
            Assert.IsNull(result);
        }

        [Test]
        public void Build_NullDetailItem_ReturnsNull()
        {
            // Arrange
            IEnumerable<PlayerBetLimitDetailedLogMetaModel> detail = null;
            var item = FakeHelper.Create<PlayerBetLimitLogMetaModel>();
            item.Detail = detail;

            // Action
            var result = _fakeObject.Build(item);

            // Assert
            Assert.IsNull(result);
        }

        [Test]
        public void Build_EmptyDetailItem_ReturnsNull()
        {
            // Arrange
            var detail = new List<PlayerBetLimitDetailedLogMetaModel>();
            var item = FakeHelper.Create<PlayerBetLimitLogMetaModel>();
            item.Detail = detail;

            // Action
            var result = _fakeObject.Build(item);

            // Assert
            Assert.IsNull(result);
        }
    }
}