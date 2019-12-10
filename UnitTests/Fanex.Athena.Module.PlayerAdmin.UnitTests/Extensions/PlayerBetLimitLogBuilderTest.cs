namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Extensions
{
    using System.Linq;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Module.PlayerAdmin.Extensions;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.UnitTest.Common.Helpers;
    using Newtonsoft.Json;
    using NUnit.Framework;

    public class PlayerBetLimitLogBuilderTest
    {
        private PlayerBetLimitLogBuilder _builder;

        [OneTimeSetUp]
        public void FixtureSetUp()
        {
            _builder = new PlayerBetLimitLogBuilder();
        }

        [OneTimeTearDown]
        public void FixtureTearDown()
        {
            _builder = null;
        }

        [Test]
        public void Build_ValidItem_ReturnsCorrectItem()
        {
            // Arrange
            var logDetail = FakeHelper.CreateMany<PlayerBetLimitDetailedLogMetaModel>(1);
            var logItem = FakeHelper.Create<PlayerBetLimitLogMetaModel>(x => x.Detail, logDetail);

            var expectedDoing = "LAP - " + logItem.SiteName 
                + " - " + logItem.LicenseeCustId
                + " - " + JsonConvert.SerializeObject(logItem.Detail);

            // Action
            var result = _builder.Build(logItem);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.AreEqual(logItem.CustId, result.CustID);
                Assert.AreEqual(logItem.UserId, result.UserId);
                Assert.AreEqual(LogActionId.PlayerAdminUpdateBetLimit, result.ActionID);
                Assert.AreEqual((byte)UserControlLogType.Function, result.TypeId);
                Assert.AreEqual(expectedDoing, result.Doing);
            });
        }

        [Test]
        public void Build_NullItem_ReturnsNull()
        {
            // Arrange
            PlayerBetLimitLogMetaModel logItem = null;
            
            // Action
            var result = _builder.Build(logItem);

            // Assert
            Assert.IsNull(result);
        }

        [Test]
        public void Build_NullDetailItem_ReturnsNull()
        {
            // Arrange
            var logItem = FakeHelper.Create<PlayerBetLimitLogMetaModel>(x => x.Detail, null);

            // Action
            var result = _builder.Build(logItem);

            // Assert
            Assert.IsNull(result);
        }

        [Test]
        public void Build_EmptyDetailItem_ReturnsNull()
        {
            // Arrange
            var logItem = FakeHelper.Create<PlayerBetLimitLogMetaModel>(x => x.Detail, Enumerable.Empty<PlayerBetLimitDetailedLogMetaModel>());

            // Action
            var result = _builder.Build(logItem);

            // Assert
            Assert.IsNull(result);
        }

        [Test]
        public void Build_InvalidLogType_ReturnsNull()
        {
            // Arrange
            var wrongTypeLogItem = FakeHelper.Create<string>();

            // Action
            var result = _builder.Build(wrongTypeLogItem);

            // Assert
            Assert.IsNull(result);
        }
    }
}