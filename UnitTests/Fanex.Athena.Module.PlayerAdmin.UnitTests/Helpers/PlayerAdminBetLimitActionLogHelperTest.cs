namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Helpers
{
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Module.PlayerAdmin.DataDomains;
    using Fanex.Athena.Module.PlayerAdmin.Helpers;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.UnitTest.Common.Helpers;
    using NUnit.Framework;

    public class PlayerAdminBetLimitActionLogHelperTest
    {
        public const string Success = "Success";

        public const string False = "False";

        [Test]
        public void CreateLogInfo_WhenCallWithEmptyDetail_ReturnsNull()
        {
            // Arrange
            var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<AgCasinoBetLimitMetaModel>>();
            var detail = Enumerable.Empty<PlayerBetLimitDetailedLogMetaModel>();

            // Action
            var logInfo = PlayerAdminBetLimitActionLogHelper.CreateLogInfo(metaModel, detail);

            // Assert
            Assert.IsNull(logInfo);
        }

        [Test]
        public void CreateLogInfo_WhenCallWithAnyDetail_ReturnsCorrectMetaModel()
        {
            // Arrange
            var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<AgCasinoBetLimitMetaModel>>();
            var expectedetail = FakeHelper.CreateMany<PlayerBetLimitDetailedLogMetaModel>();

            // Action
            var logInfo = PlayerAdminBetLimitActionLogHelper.CreateLogInfo(metaModel, expectedetail);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(logInfo.CustId, Is.EqualTo(metaModel.CustId));
                Assert.That(logInfo.UserId, Is.EqualTo(metaModel.UserId));
                Assert.That(logInfo.SiteName, Is.EqualTo(metaModel.SiteName));
                Assert.That(logInfo.LicenseeCustId, Is.EqualTo(metaModel.LicenseeCustId));
                Assert.That(logInfo.Detail, Is.EqualTo(expectedetail));
            });
        }

        [TestCase(true, Success)]
        [TestCase(false, False)]
        public void CreateLogInfo_AgCasinoBetLimit_ReturnsCorrectLogDetail(bool isSuccessful, string expectedStatus)
        {
            // Arrange
            var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<AgCasinoBetLimitMetaModel>>();

            // Action
            var logInfo = PlayerAdminBetLimitActionLogHelper.CreateLogInfo(metaModel, isSuccessful);
            var actualFirstElement = logInfo.Detail.FirstOrDefault();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(logInfo.Detail.Count(), Is.EqualTo(1));
                Assert.That(actualFirstElement.DetailedId, Is.EqualTo(LogActionDetailId.UpdatingAGGroup));
                Assert.That(actualFirstElement.SportType, Is.EqualTo(((int)SportType.AgCasino).ToString()));
                Assert.That(actualFirstElement.Status, Is.EqualTo(expectedStatus));
                Assert.That(actualFirstElement.Old, Is.EqualTo(metaModel.Setting.OldGroup));
                Assert.That(actualFirstElement.New, Is.EqualTo(metaModel.Setting.Group));
            });
        }

        [Test]
        public void BuildBetLimitLogDetail_ItemSettingsAreNotUpdated_ReturnsEmptyList()
        {
            // Arrange
            var item1 = FakeHelper.Create<PlayerBetLimitMetaModel>(x => x.IsUpdated, false);
            var item2 = FakeHelper.Create<PlayerBetLimitMetaModel>(x => x.IsUpdated, true);
            item2.MinBet = item2.OldMinBet;

            var setting = new List<PlayerBetLimitMetaModel> { item1, item2 };

            var isSuccessful = FakeHelper.Create<bool>();
            string getSportTypeFunc(PlayerBetLimitMetaModel x) { return string.Empty; }
            var logDetailIds = new[] { LogActionDetailId.UpdatingMinBet };

            // Action
            var logInfo = PlayerAdminBetLimitActionLogHelper.BuildBetLimitLogDetail(setting, getSportTypeFunc, isSuccessful, logDetailIds);

            // Assert
            Assert.IsEmpty(logInfo);
        }

        [TestCase(true, Success)]
        [TestCase(false, False)]
        public void BuildBetLimitLogDetail_UpdatingMinBet_ReturnsLogDetailItem(bool isSuccessful, string expectedStatus)
        {
            // Arrange
            var item = FakeHelper.Create<PlayerBetLimitMetaModel>(x => x.IsUpdated, true);
            item.MinBet = item.OldMinBet + 1;
            var unUpdateItem = FakeHelper.Create<PlayerBetLimitMetaModel>(x => x.IsUpdated, false);
            var setting = new List<PlayerBetLimitMetaModel> { item, unUpdateItem };
            string getSportTypeFunc(PlayerBetLimitMetaModel x) => x.Id;
            var logDetailIds = new[] { LogActionDetailId.UpdatingMinBet };

            // Action
            var result = PlayerAdminBetLimitActionLogHelper.BuildBetLimitLogDetail(setting, getSportTypeFunc, isSuccessful, logDetailIds);
            var actual = result.First();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Count(), Is.EqualTo(setting.Count(x => x.IsUpdated)));
                Assert.That(actual.DetailedId, Is.EqualTo(LogActionDetailId.UpdatingMinBet));
                Assert.That(actual.SportType, Is.EqualTo(item.Id));
                Assert.That(actual.Status, Is.EqualTo(expectedStatus));
                Assert.That(actual.Old, Is.EqualTo(item.OldMinBet.ToString(CultureInfo.InvariantCulture)));
                Assert.That(actual.New, Is.EqualTo(item.MinBet.ToString(CultureInfo.InvariantCulture)));
            });
        }

        [TestCase(true, Success)]
        [TestCase(false, False)]
        public void BuildBetLimitLogDetail_UpdatingMaxBet_ReturnsLogDetailItem(bool isSuccessful, string expectedStatus)
        {
            // Arrange
            var item = FakeHelper.Create<PlayerBetLimitMetaModel>(x => x.IsUpdated, true);
            item.MaxBet = item.OldMaxBet + 1;
            var setting = new List<PlayerBetLimitMetaModel> { item };
            string getSportTypeFunc(PlayerBetLimitMetaModel x) => x.Id;
            var logDetailIds = new[] { LogActionDetailId.UpdatingMaxBet };

            // Action
            var actual = PlayerAdminBetLimitActionLogHelper.BuildBetLimitLogDetail(setting, getSportTypeFunc, isSuccessful, logDetailIds).First();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(actual.DetailedId, Is.EqualTo(LogActionDetailId.UpdatingMaxBet));
                Assert.That(actual.SportType, Is.EqualTo(item.Id));
                Assert.That(actual.Status, Is.EqualTo(expectedStatus));
                Assert.That(actual.Old, Is.EqualTo(item.OldMaxBet.ToString(CultureInfo.InvariantCulture)));
                Assert.That(actual.New, Is.EqualTo(item.MaxBet.ToString(CultureInfo.InvariantCulture)));
            });
        }

        [TestCase(LogActionDetailId.UpdatingMaxPerMatch, true, Success)]
        [TestCase(LogActionDetailId.UpdatingMaxBetPerDraw, true, Success)]
        public void BuildBetLimitLogDetail_UpdatingMaxPerMatch_ReturnsLogDetailItem(int logDetailId, bool isSuccessful, string expectedStatus)
        {
            // Arrange
            var item = FakeHelper.Create<PlayerBetLimitMetaModel>(x => x.IsUpdated, true);
            item.MaxPerMatch = item.OldMaxPerMatch + 1;
            var setting = new List<PlayerBetLimitMetaModel> { item };
            string getSportTypeFunc(PlayerBetLimitMetaModel x) => x.Id;
            var logDetailIds = new[] { logDetailId };

            // Action
            var actual = PlayerAdminBetLimitActionLogHelper.BuildBetLimitLogDetail(setting, getSportTypeFunc, isSuccessful, logDetailIds).First();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(actual.DetailedId, Is.EqualTo(logDetailId));
                Assert.That(actual.SportType, Is.EqualTo(item.Id));
                Assert.That(actual.Status, Is.EqualTo(expectedStatus));
                Assert.That(actual.Old, Is.EqualTo(item.OldMaxPerMatch.ToString(CultureInfo.InvariantCulture)));
                Assert.That(actual.New, Is.EqualTo(item.MaxPerMatch.ToString(CultureInfo.InvariantCulture)));
            });
        }

        [TestCase(true, Success)]
        [TestCase(false, False)]
        public void BuildBetLimitLogDetail_UpdatingMaxPerBall_ReturnsLogDetailItem(bool isSuccessful, string expectedStatus)
        {
            // Arrange
            var item = FakeHelper.Create<PlayerBetLimitMetaModel>(x => x.IsUpdated, true);
            item.MaxPerBall = item.OldMaxPerBall + 1;
            var setting = new List<PlayerBetLimitMetaModel> { item };
            string getSportTypeFunc(PlayerBetLimitMetaModel x) => x.Id;
            var logDetailIds = new[] { LogActionDetailId.UpdatingMaxPerBall };

            // Action
            var actual = PlayerAdminBetLimitActionLogHelper.BuildBetLimitLogDetail(setting, getSportTypeFunc, isSuccessful, logDetailIds).First();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(actual.DetailedId, Is.EqualTo(LogActionDetailId.UpdatingMaxPerBall));
                Assert.That(actual.SportType, Is.EqualTo(item.Id));
                Assert.That(actual.Status, Is.EqualTo(expectedStatus));
                Assert.That(actual.Old, Is.EqualTo(item.OldMaxPerBall.ToString(CultureInfo.InvariantCulture)));
                Assert.That(actual.New, Is.EqualTo(item.MaxPerBall.ToString(CultureInfo.InvariantCulture)));
            });
        }

        [Test]
        public void BuildBetLimitLogDetail_InvalidLogDetailId_ReturnsNull()
        {
            // Arrange
            var metaModel = FakeHelper.Create<IEnumerable<PlayerBetLimitMetaModel>>();
            var isSuccessful = FakeHelper.Create<bool>();
            string getSportTypeFunc(PlayerBetLimitMetaModel x) => string.Empty;
            var logDetailIds = new[] { 1 };

            // Action
            var actual = PlayerAdminBetLimitActionLogHelper.BuildBetLimitLogDetail(metaModel, getSportTypeFunc, isSuccessful, logDetailIds).FirstOrDefault();

            // Assert
            Assert.IsNull(actual);
        }
    }
}