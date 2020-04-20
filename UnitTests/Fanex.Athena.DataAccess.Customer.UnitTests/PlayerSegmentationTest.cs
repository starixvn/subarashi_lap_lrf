using Fanex.Athena.DataAccess.Core.UnitTests.TestHelpers;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
using Fanex.Athena.Model.Customer.MetaModel;
using Fanex.Athena.UnitTest.Common.Helpers;
using Fanex.Data;
using NSubstitute;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fanex.Athena.DataAccess.Customer.UnitTests
{
    [TestFixture]
    public class PlayerSegmentationTest : BaseDataAccessHelperTest<PlayerSegmentationDataAccess>
    {
        [Test]
        public async Task GetProblemPlayerListAsync_WhenCall_ParametersPassedCorrectly()
        {
            // Arrange
            var metaModel = FakeHelper.Create<ProblemPlayerListMetaModel>();
            DataAccess.GetObjectDb(Arg.Is("Lrf_ProblemAccount_LicenseeProblemPlayerSel")).Returns(ObjectDb);

            // Action
            await DataAccess.GetProblemPlayerListAsync(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                AssertCommonParams(ObjectDb, metaModel);
                AssertPlayerListParams(ObjectDb, metaModel);

                ObjectDb.Received().SetParameterValue("FromDate", metaModel.FromDate);
                ObjectDb.Received().SetParameterValue("ToDate", metaModel.ToDate);
                ObjectDb.Received().SetParameterValue("IsCheckAll", metaModel.IsGetAll);
                ObjectDb.Received().SetParameterValue("BaseCurrency", metaModel.BaseCurrency);
                ObjectDb.Received().SetParameterValue("ReasonGroupID", metaModel.ReasonGroupIdList);
                ObjectDb.Received().SetParameterValue("Langkey", metaModel.Language);
            });
        }

        [Test]
        public async Task GetProblemAsync_WhenCall_ReturnResultCorrectly()
        {
            //Arrange
            DataAccess.GetObjectDb(Arg.Is("Lrf_ProblemAccount_LicenseeProblemPlayerSel")).Returns(ObjectDb);
            Reader.Read().Returns(true, false);

            var expectedData = new Dictionary<string, object>
            {
                { "CustId", FakeHelper.Create<int>() },
                { "username2", FakeHelper.Create<string>() },
                { "username", FakeHelper.Create<string>() },
                { "isVIP", FakeHelper.Create<bool>() },
                { "CreatedDate", FakeHelper.Create<DateTime>() },
                { "MaxPerEvent", FakeHelper.Create<decimal?>() },
                { "MaxBet", FakeHelper.Create<decimal?>() },
                { "Reason", FakeHelper.Create<string>() },
            };

            MapReaderData(expectedData);

            var metaModel = FakeHelper.Create<ProblemPlayerListMetaModel>();

            //Action
            var result = await DataAccess.GetProblemPlayerListAsync(metaModel);
            var firstData = result.Data.First();

            //Assert
            Assert.Multiple(() =>
            {
                AssertCommonPlayerListResult(expectedData, firstData);
                Assert.AreEqual((expectedData["CreatedDate"] as DateTime?).Value.ToString(FormatKey.DateTimeFormatIn24H), firstData.MarkDate);
                Assert.AreEqual(expectedData["MaxPerEvent"], firstData.ReducedMaxPerEvent);
                Assert.AreEqual(expectedData["MaxBet"], firstData.ReducedMaxPerBet);
                Assert.AreEqual(expectedData["Reason"], firstData.Reason);
            });
        }

        [Test]
        public async Task GetVipPlayerListAsync_WhenCall_ParametersPassedCorrectly()
        {
            // Arrange
            var metaModel = FakeHelper.Create<VipPlayerListMetaModel>();
            DataAccess.GetObjectDb(Arg.Is("Lrf_ProblemAccount_LicenseeVIPPlayerSel")).Returns(ObjectDb);

            // Action
            await DataAccess.GetVipPlayerListAsync(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                AssertCommonParams(ObjectDb, metaModel);
                AssertPlayerListParams(ObjectDb, metaModel);
                ObjectDb.Received().SetParameterValue("VipOption", metaModel.VipOption);
            });
        }

        [Test]
        public async Task GetVipPlayerListAsync_WhenCall_ReturnResultCorrectly()
        {
            //Arrange
            DataAccess.GetObjectDb(Arg.Is("Lrf_ProblemAccount_LicenseeVIPPlayerSel")).Returns(ObjectDb);
            Reader.Read().Returns(true, false);

            var expectedData = new Dictionary<string, object>
            {
                { "CustId", FakeHelper.Create<int>() },
                { "username2", FakeHelper.Create<string>() },
                { "username", FakeHelper.Create<string>() },
                { "isVIP", FakeHelper.Create<bool>() },
            };

            MapReaderData(expectedData);

            var metaModel = FakeHelper.Create<VipPlayerListMetaModel>();

            //Action
            var result = await DataAccess.GetVipPlayerListAsync(metaModel);
            var firstData = result.Data.First();

            //Assert
            Assert.Multiple(() =>
            {
                AssertCommonPlayerListResult(expectedData, firstData);
            });
        }

        [Test]
        public async Task UpdateVipStatusAsync_WhenCall_ParametersPassedCorrectly()
        {
            // Arrange
            var metaModel = FakeHelper.Create<UpdateStatusPlayerMetaModel>();
            DataAccess.GetObjectDb(Arg.Is("Lrf_ProblemAccount_LicenseeVipPlayerUpd")).Returns(ObjectDb);

            // Action
            await DataAccess.UpdateVipStatusAsync(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                AssertCommonParams(ObjectDb, metaModel);
                ObjectDb.Received().SetParameterValue("Username", metaModel.SystemIds);
                ObjectDb.Received().SetParameterValue("IsVip", metaModel.IsVip);
                ObjectDb.Received().SetParameterValue("UserID", metaModel.UserId);
                ObjectDb.Received().SetParameterValue("Ip", metaModel.Ip);
            });
        }

        [Test]
        public async Task UpdateVipStatusAsync_WhenCall_ReturnResultCorrectly()
        {
            //Arrange
            DataAccess.GetObjectDb(Arg.Is("Lrf_ProblemAccount_LicenseeVipPlayerUpd")).Returns(ObjectDb);
            Reader.Read().Returns(true, false);

            var expectedData = new Dictionary<string, object>
            {
                { "ErrCode", FakeHelper.Create<int>() },
                { "cnt", FakeHelper.Create<int>() },
                { "ErrMsg", FakeHelper.Create<string>() },
            };
            MapReaderData(expectedData);
            var metaModel = FakeHelper.Create<UpdateStatusPlayerMetaModel>();

            //Action
            var result = await DataAccess.UpdateVipStatusAsync(metaModel);
            var firstData = result.First();

            //Assert
            Assert.Multiple(() =>
            {
                Assert.AreEqual(expectedData["cnt"], firstData.NumberOfPlayer);
                Assert.AreEqual(expectedData["ErrCode"], firstData.Code);
                Assert.AreEqual(expectedData["ErrMsg"], firstData.SystemIds);
            });
        }

        [Test]
        public async Task GetReasonGroupListAsync_WhenCall_ParametersPassedCorrectly()
        {
            // Arrange
            var langKey = FakeHelper.Create<string>();
            DataAccess.GetObjectDb(Arg.Is("Lrf_ProblemAccount_ReasonGroupSel")).Returns(ObjectDb);

            // Action
            await DataAccess.GetReasonGroupListAsync(langKey);

            // Assert
            Assert.Multiple(() =>
            {
                ObjectDb.Received().SetParameterValue("Langkey", langKey);
            });
        }

        [Test]
        public async Task GetReasonGroupListAsync_WhenCall_ReturnResultCorrectly()
        {
            //Arrange
            DataAccess.GetObjectDb(Arg.Is("Lrf_ProblemAccount_ReasonGroupSel")).Returns(ObjectDb);
            Reader.Read().Returns(true, false);

            var expectedData = new Dictionary<string, object>
            {
                { "ReasonGroupID", FakeHelper.Create<int>() },
                { "ReasonGroup", FakeHelper.Create<string>() },
            };

            MapReaderData(expectedData);
            var langKey = FakeHelper.Create<string>();

            //Action
            var result = await DataAccess.GetReasonGroupListAsync(langKey);
            var firstData = result.First();

            //Assert
            Assert.Multiple(() =>
            {
                Assert.AreEqual(expectedData["ReasonGroupID"], firstData.Key);
                Assert.AreEqual(expectedData["ReasonGroup"], firstData.Value);
            });
        }

        private static readonly Action<IObjectDb, BasePlayerListMetaModel> AssertPlayerListParams = (objectDB, metaModel) =>
        {
            objectDB.Received().SetParameterValue("UserName", metaModel.UserName);
            objectDB.Received().SetParameterValue("PageIndex", metaModel.PageIndex);
            objectDB.Received().SetParameterValue("PageSize", metaModel.PageSize);
            objectDB.Received().SetParameterValue("OrderCol", metaModel.OrderCol);
            objectDB.Received().SetParameterValue("SortType", metaModel.SortType);
            objectDB.Received().SetParameterValue("TotalItems", 0);
        };

        private static readonly Action<IObjectDb, IMetaModelAgent> AssertCommonParams = (objectDB, metaModel) =>
        {
            objectDB.Received().SetParameterValue("AgentList", metaModel.AgentListXml);
        };

        private static readonly Action<IDictionary<string, Object>, PlayerInfo> AssertCommonPlayerListResult = (expectedData, acutalData) =>
        {
            Assert.AreEqual(expectedData["CustId"], acutalData.CustId);
            Assert.AreEqual(expectedData["username2"], acutalData.ExternalId);
            Assert.AreEqual(expectedData["username"], acutalData.SystemId);
            Assert.AreEqual(expectedData["isVIP"], acutalData.IsVip);
        };
    }
}