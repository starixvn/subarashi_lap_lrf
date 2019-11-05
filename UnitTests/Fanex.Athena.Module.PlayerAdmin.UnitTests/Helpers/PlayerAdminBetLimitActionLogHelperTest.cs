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
            var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<AgCasinoBetLimitMetaModel>>();
            var detail = Substitute.For<IEnumerable<PlayerBetLimitDetailedLogMetaModel>>();

            var logInfo = PlayerAdminBetLimitActionLogHelper.CreateLogInfo(metaModel, detail);

            Assert.IsNull(logInfo);
        }

        [Test]
        public void CreateLogInfo_WhenCallWithAnyDetail_ReturnsCorrectPlayerBetLimitLogMetaModel()
        {
            var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<AgCasinoBetLimitMetaModel>>();
            var expectedetail = FakeHelper.Create<IEnumerable<PlayerBetLimitDetailedLogMetaModel>>();

            var logInfo = PlayerAdminBetLimitActionLogHelper.CreateLogInfo(metaModel, expectedetail);

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
        public void CreateLogInfo_WhenCallWithIsSuccessful_ReturnsCorrectPlayerBetLimitLogMetaModel()
        {
            //Arrange
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
        public void CreateLogInfo_WhenCallWithFourParamsAndLogDetailIdIsNotUpdating_ReturnsNull()
        {
            //Arrange
            var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>>>();
            var getSportTypeFunc = FakeHelper.Create<Func<PlayerBetLimitMetaModel, string>>();
            var isSuccessful = FakeHelper.Create<bool>();
            var logDetailIds = new[] { 1 };

            // Action
            var logInfo = PlayerAdminBetLimitActionLogHelper.CreateLogInfo(metaModel, getSportTypeFunc, isSuccessful, logDetailIds);

            // Assert
            Assert.IsNull(logInfo);
        }

        [Test]
        [TestCase(LogActionDetailId.UpdatingMaxBet)]
        [TestCase(LogActionDetailId.UpdatingMinBet)]
        [TestCase(LogActionDetailId.UpdatingMaxBetPerDraw)]
        [TestCase(LogActionDetailId.UpdatingMaxPerBall)]
        [TestCase(LogActionDetailId.UpdatingMaxPerMatch)]
        public void CreateLogInfo_WhenCallWithFourParamsLogDetailIdIsUpdating_ReturnsCorrectPlayerBetLimitLogMetaModel(int logDetailId)
        {
            //Arrange
            var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>>>();
            var getSportTypeFunc = FakeHelper.Create<Func<PlayerBetLimitMetaModel, string>>();
            var isSuccessful = FakeHelper.Create<bool>();
            var logDetailIds = new[] { logDetailId };
            var expectedDetail = PlayerAdminBetLimitActionLogHelper.BuildBetLimitLogDetail(metaModel.Setting, getSportTypeFunc, isSuccessful, logDetailIds);

            // Action
            var logInfo = PlayerAdminBetLimitActionLogHelper.CreateLogInfo(metaModel, getSportTypeFunc, isSuccessful, logDetailIds);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(logInfo.CustId, Is.EqualTo(metaModel.CustId));
                Assert.That(logInfo.UserId, Is.EqualTo(metaModel.UserId));
                Assert.That(logInfo.SiteName, Is.EqualTo(metaModel.SiteName));
                Assert.That(logInfo.LicenseeCustId, Is.EqualTo(metaModel.LicenseeCustId));
                Assert.That(logInfo.Detail.Count(), Is.EqualTo(expectedDetail.Count()));
            });
        }

        [Test]
        public void BuildBetLimitLogDetail_AllItemInSettingHavingIsUpdatedFalse_ReturnsEmptyListPlayerBetLimitDetailedLogMetaModel()
        {
            // Arrange
            var setting = FakeHelper.Create<IEnumerable<PlayerBetLimitMetaModel>>();
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
        public void BuildBetLimitLogDetail_LogDetailIdIsUpdatingMinBetAndMinBetChange_ReturnsListPlayerBetLimitDetailedLogMetaModel()
        {
            // Arrange
            var metaModel = FakeHelper.Create<IEnumerable<PlayerBetLimitMetaModel>>();
            var changeMinBetAmount = FakeHelper.Create<int>();
            foreach (var item in metaModel)
            {
                item.IsUpdated = true;
                item.OldMinBet = item.MinBet + changeMinBetAmount;
            }

            var isSuccessful = FakeHelper.Create<bool>();
            var getSportTypeFunc = FakeHelper.Create<Func<PlayerBetLimitMetaModel, string>>();
            var logDetailIds = new[] { LogActionDetailId.UpdatingMinBet };
            var expectedFirstElement = metaModel.FirstOrDefault();
            var expectedId = getSportTypeFunc(expectedFirstElement);
            var expectedStatus = isSuccessful ? Success : False;

            // Action
            var actual = PlayerAdminBetLimitActionLogHelper.BuildBetLimitLogDetail(metaModel, getSportTypeFunc, isSuccessful, logDetailIds).First();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(actual.DetailedId, Is.EqualTo(logDetailIds[0]));
                Assert.That(actual.SportType, Is.EqualTo(expectedId));
                Assert.That(actual.Status, Is.EqualTo(expectedStatus));
                Assert.That(actual.Old, Is.EqualTo(expectedFirstElement.OldMinBet.ToString(CultureInfo.InvariantCulture)));
                Assert.That(actual.New, Is.EqualTo(expectedFirstElement.MinBet.ToString(CultureInfo.InvariantCulture)));
            });
        }

        [Test]
        public void BuildBetLimitLogDetail_LogDetailIdIsUpdatingMaxBetAndMaxBetChange_ReturnsListPlayerBetLimitDetailedLogMetaModel()
        {
            // Arrange
            var metaModel = FakeHelper.Create<IEnumerable<PlayerBetLimitMetaModel>>();
            var changeMaxBetAmount = FakeHelper.Create<int>();
            foreach (var item in metaModel)
            {
                item.IsUpdated = true;
                item.OldMaxBet = item.MaxBet + changeMaxBetAmount;
            }

            var isSuccessful = FakeHelper.Create<bool>();
            var getSportTypeFunc = FakeHelper.Create<Func<PlayerBetLimitMetaModel, string>>();
            var logDetailIds = new[] { LogActionDetailId.UpdatingMaxBet };
            var expectedFirstElement = metaModel.First();
            var expectedId = getSportTypeFunc(expectedFirstElement);
            var expectedStatus = isSuccessful ? Success : False;

            // Action
            var actual = PlayerAdminBetLimitActionLogHelper.BuildBetLimitLogDetail(metaModel, getSportTypeFunc, isSuccessful, logDetailIds).First();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(actual.DetailedId, Is.EqualTo(logDetailIds[0]));
                Assert.That(actual.SportType, Is.EqualTo(expectedId));
                Assert.That(actual.Status, Is.EqualTo(expectedStatus));
                Assert.That(actual.Old, Is.EqualTo(expectedFirstElement.OldMaxBet.ToString(CultureInfo.InvariantCulture)));
                Assert.That(actual.New, Is.EqualTo(expectedFirstElement.MaxBet.ToString(CultureInfo.InvariantCulture)));
            });
        }

        [Test]
        [TestCase(LogActionDetailId.UpdatingMaxPerMatch)]
        [TestCase(LogActionDetailId.UpdatingMaxBetPerDraw)]
        public void BuildBetLimitLogDetail_LogDetailIdIsUpdatingMaxPerMatchOrUpdatingMaxBetPerDrawAndMaxPerMatchChange_ReturnsEnumerable(int logDetailId)
        {
            // Arrange
            var metaModel = FakeHelper.Create<IEnumerable<PlayerBetLimitMetaModel>>();
            var changeMaxPerMatchAmount = FakeHelper.Create<int>();
            foreach (var item in metaModel)
            {
                item.IsUpdated = true;
                item.OldMaxPerMatch = item.MaxPerMatch + changeMaxPerMatchAmount;
            }

            var isSuccessful = FakeHelper.Create<bool>();
            var getSportTypeFunc = FakeHelper.Create<Func<PlayerBetLimitMetaModel, string>>();
            var logDetailIds = new[] { logDetailId };
            var expectedFirstElement = metaModel.First();
            var expectedId = getSportTypeFunc(expectedFirstElement);
            var expectedStatus = isSuccessful ? Success : False;

            // Action
            var actual = PlayerAdminBetLimitActionLogHelper.BuildBetLimitLogDetail(metaModel, getSportTypeFunc, isSuccessful, logDetailIds).First();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(actual.DetailedId, Is.EqualTo(logDetailIds[0]));
                Assert.That(actual.SportType, Is.EqualTo(expectedId));
                Assert.That(actual.Status, Is.EqualTo(expectedStatus));
                Assert.That(actual.Old, Is.EqualTo(expectedFirstElement.OldMaxPerMatch.ToString(CultureInfo.InvariantCulture)));
                Assert.That(actual.New, Is.EqualTo(expectedFirstElement.MaxPerMatch.ToString(CultureInfo.InvariantCulture)));
            });
        }

        [Test]
        public void BuildBetLimitLogDetail_LogDetailIdIsUpdatingMaxPerBallAndMaxPerBallChange_ReturnsEnumerable()
        {
            // Arrange
            var metaModel = FakeHelper.Create<IEnumerable<PlayerBetLimitMetaModel>>();
            var changeMaxPerBallAmount = FakeHelper.Create<int>();
            foreach (var item in metaModel)
            {
                item.IsUpdated = true;
                item.OldMaxPerBall = item.MaxPerBall + changeMaxPerBallAmount;
            }

            var isSuccessful = FakeHelper.Create<bool>();
            var getSportTypeFunc = FakeHelper.Create<Func<PlayerBetLimitMetaModel, string>>();
            var logDetailIds = new[] { LogActionDetailId.UpdatingMaxPerBall };
            var expectedFirstElement = metaModel.First();
            var expectedId = getSportTypeFunc(expectedFirstElement);
            var expectedStatus = isSuccessful ? Success : False;

            // Action
            var actual = PlayerAdminBetLimitActionLogHelper.BuildBetLimitLogDetail(metaModel, getSportTypeFunc, isSuccessful, logDetailIds).First();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(actual.DetailedId, Is.EqualTo(logDetailIds[0]));
                Assert.That(actual.SportType, Is.EqualTo(expectedId));
                Assert.That(actual.Status, Is.EqualTo(expectedStatus));
                Assert.That(actual.Old, Is.EqualTo(expectedFirstElement.OldMaxPerBall.ToString(CultureInfo.InvariantCulture)));
                Assert.That(actual.New, Is.EqualTo(expectedFirstElement.MaxPerBall.ToString(CultureInfo.InvariantCulture)));
            });
        }

        [Test]
        public void BuildBetLimitLogDetail_LogDetailIdIsNotUpdating_ReturnsNull()
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