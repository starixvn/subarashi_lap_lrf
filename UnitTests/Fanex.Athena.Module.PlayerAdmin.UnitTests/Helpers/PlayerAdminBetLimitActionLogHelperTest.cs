namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Helpers
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Module.PlayerAdmin.DataDomains;
    using Fanex.Athena.Module.PlayerAdmin.Helpers;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.UnitTest.Common.Helpers;
    using NSubstitute;
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
            var detail = Substitute.For<IEnumerable<PlayerBetLimitDetailedLogMetaModel>>();

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
            var expectedetail = FakeHelper.Create<IEnumerable<PlayerBetLimitDetailedLogMetaModel>>();

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

        [Test]
        public void CreateLogInfo_AgCasinoBetLimitMetaModel_ReturnsCorrectMetaModel()
        {
            // Arrange
            var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<AgCasinoBetLimitMetaModel>>();
            var isSuccessful = FakeHelper.Create<bool>();
            var expectedStatus = isSuccessful ? Success : False;

            // Action
            var logInfo = PlayerAdminBetLimitActionLogHelper.CreateLogInfo(metaModel, isSuccessful);
            var actualFirstElement = logInfo.Detail.FirstOrDefault();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(logInfo.CustId, Is.EqualTo(metaModel.CustId));
                Assert.That(logInfo.UserId, Is.EqualTo(metaModel.UserId));
                Assert.That(logInfo.SiteName, Is.EqualTo(metaModel.SiteName));
                Assert.That(logInfo.LicenseeCustId, Is.EqualTo(metaModel.LicenseeCustId));
                Assert.That(actualFirstElement.DetailedId, Is.EqualTo(LogActionDetailId.UpdatingAGGroup));
                Assert.That(actualFirstElement.SportType, Is.EqualTo(((int)SportType.AgCasino).ToString()));
                Assert.That(actualFirstElement.Status, Is.EqualTo(expectedStatus));
                Assert.That(actualFirstElement.Old, Is.EqualTo(metaModel.Setting.OldGroup));
                Assert.That(actualFirstElement.New, Is.EqualTo(metaModel.Setting.Group));
            });
        }

        [Test]
        public void BuildBetLimitLogDetail_AllItemInSettingHavingIsUpdatedFalse_ReturnsEmptyList()
        {
            // Arrange
            var setting = FakeHelper.CreateMany<PlayerBetLimitMetaModel>(5);
            foreach (var item in setting)
            {
                item.IsUpdated = false;
            }

            var isSuccessful = FakeHelper.Create<bool>();
            var getSportTypeFunc = FakeHelper.Create<Func<PlayerBetLimitMetaModel, string>>();
            var logDetailIds = FakeHelper.Create<int[]>();

            // Action
            var logInfo = PlayerAdminBetLimitActionLogHelper.BuildBetLimitLogDetail(setting, getSportTypeFunc, isSuccessful, logDetailIds);

            // Assert
            Assert.IsEmpty(logInfo);
        }

        [Test]
        public void BuildBetLimitLogDetail_UpdatingMinBet_ReturnsListMetaModel()
        {
            // Arrange
            var item = FakeHelper.Create<PlayerBetLimitMetaModel>();
            item.IsUpdated = true;
            item.OldMinBet = item.MinBet + FakeHelper.Create<int>();
            var setting = new List<PlayerBetLimitMetaModel> { item };
            var isSuccessful = FakeHelper.Create<bool>();
            Func<PlayerBetLimitMetaModel, string> getSportTypeFunc = x => x.Id;
            var logDetailIds = new[] { LogActionDetailId.UpdatingMinBet };
            var expectedStatus = isSuccessful ? Success : False;

            // Action
            var actual = PlayerAdminBetLimitActionLogHelper.BuildBetLimitLogDetail(setting, getSportTypeFunc, isSuccessful, logDetailIds).First();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(actual.DetailedId, Is.EqualTo(logDetailIds[0]));
                Assert.That(actual.SportType, Is.EqualTo(item.Id));
                Assert.That(actual.Status, Is.EqualTo(expectedStatus));
                Assert.That(actual.Old, Is.EqualTo(item.OldMinBet.ToString(CultureInfo.InvariantCulture)));
                Assert.That(actual.New, Is.EqualTo(item.MinBet.ToString(CultureInfo.InvariantCulture)));
            });
        }

        [Test]
        public void BuildBetLimitLogDetail_UpdatingMaxBet_ReturnsListMetaModel()
        {
            // Arrange
            var item = FakeHelper.Create<PlayerBetLimitMetaModel>();
            item.IsUpdated = true;
            item.OldMaxBet = item.MaxBet + FakeHelper.Create<int>();
            var setting = new List<PlayerBetLimitMetaModel> { item };
            var isSuccessful = FakeHelper.Create<bool>();
            Func<PlayerBetLimitMetaModel, string> getSportTypeFunc = x => x.Id;
            var logDetailIds = new[] { LogActionDetailId.UpdatingMaxBet };
            var expectedStatus = isSuccessful ? Success : False;

            // Action
            var actual = PlayerAdminBetLimitActionLogHelper.BuildBetLimitLogDetail(setting, getSportTypeFunc, isSuccessful, logDetailIds).First();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(actual.DetailedId, Is.EqualTo(logDetailIds[0]));
                Assert.That(actual.SportType, Is.EqualTo(item.Id));
                Assert.That(actual.Status, Is.EqualTo(expectedStatus));
                Assert.That(actual.Old, Is.EqualTo(item.OldMaxBet.ToString(CultureInfo.InvariantCulture)));
                Assert.That(actual.New, Is.EqualTo(item.MaxBet.ToString(CultureInfo.InvariantCulture)));
            });
        }

        [Test]
        [TestCase(LogActionDetailId.UpdatingMaxPerMatch)]
        [TestCase(LogActionDetailId.UpdatingMaxBetPerDraw)]
        public void BuildBetLimitLogDetail_UpdatingMaxPerMatchOrUpdatingMaxBetPerDraw_ReturnsListMetaModel(int logDetailId)
        {
            // Arrange
            var item = FakeHelper.Create<PlayerBetLimitMetaModel>();
            item.IsUpdated = true;
            item.OldMaxPerMatch = item.MaxPerMatch + FakeHelper.Create<int>();
            var setting = new List<PlayerBetLimitMetaModel> { item };
            var isSuccessful = FakeHelper.Create<bool>();
            Func<PlayerBetLimitMetaModel, string> getSportTypeFunc = x => x.Id;
            var logDetailIds = new[] { logDetailId };
            var expectedStatus = isSuccessful ? Success : False;

            // Action
            var actual = PlayerAdminBetLimitActionLogHelper.BuildBetLimitLogDetail(setting, getSportTypeFunc, isSuccessful, logDetailIds).First();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(actual.DetailedId, Is.EqualTo(logDetailIds[0]));
                Assert.That(actual.SportType, Is.EqualTo(item.Id));
                Assert.That(actual.Status, Is.EqualTo(expectedStatus));
                Assert.That(actual.Old, Is.EqualTo(item.OldMaxPerMatch.ToString(CultureInfo.InvariantCulture)));
                Assert.That(actual.New, Is.EqualTo(item.MaxPerMatch.ToString(CultureInfo.InvariantCulture)));
            });
        }

        [Test]
        public void BuildBetLimitLogDetail_UpdatingMaxPerBall_ReturnsListMetaModel()
        {
            // Arrange
            var item = FakeHelper.Create<PlayerBetLimitMetaModel>();
            item.IsUpdated = true;
            item.OldMaxPerBall = item.MaxPerBall + FakeHelper.Create<int>();
            var setting = new List<PlayerBetLimitMetaModel> { item };
            var isSuccessful = FakeHelper.Create<bool>();
            Func<PlayerBetLimitMetaModel, string> getSportTypeFunc = x => x.Id;
            var logDetailIds = new[] { LogActionDetailId.UpdatingMaxPerBall };
            var expectedStatus = isSuccessful ? Success : False;

            // Action
            var actual = PlayerAdminBetLimitActionLogHelper.BuildBetLimitLogDetail(setting, getSportTypeFunc, isSuccessful, logDetailIds).First();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(actual.DetailedId, Is.EqualTo(logDetailIds[0]));
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
            var getSportTypeFunc = FakeHelper.Create<Func<PlayerBetLimitMetaModel, string>>();
            var logDetailIds = new[] { 1 };

            // Action
            var actual = PlayerAdminBetLimitActionLogHelper.BuildBetLimitLogDetail(metaModel, getSportTypeFunc, isSuccessful, logDetailIds).FirstOrDefault();

            // Assert
            Assert.IsNull(actual);
        }
    }
}