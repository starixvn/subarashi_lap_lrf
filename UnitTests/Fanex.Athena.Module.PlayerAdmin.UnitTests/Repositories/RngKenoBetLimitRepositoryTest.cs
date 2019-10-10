using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.DTO;
using Fanex.Athena.Module.PlayerAdmin.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Repositories;
using Fanex.Athena.UnitTest.Common.Helpers;
using Fanex.Data;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Repositories
{
    public class RngKenoBetLimitRepositoryTest
    {
        private IDbFactory _db;
        private IObjectDb _objectDb;

        [SetUp]
        public void SetUp()
        {
            _db = Substitute.For<IDbFactory>();
            _objectDb = Substitute.For<IObjectDb>();
        }

        [TearDown]
        public void TearDown()
        {
            _db = null;
            _objectDb = null;
        }

        [Test]
        public async Task GetSettingAsync_WhenCall_AssignCorrectParamAndReturnCorrectData()
        {
            // Arrange
            const string UspName = "Lrf_CustomerSelEditKN";
            var reader = Substitute.For<IDataReader>();
            reader.Read().Returns(true, false);
            var betLimitItem = FakeHelper.Create<PlayerBetLimit>();
            FakeSportData(reader, betLimitItem);

            _objectDb.ExecuteReaderAsync().Returns(reader);
            _db.GetObjectDb(UspName).Returns(_objectDb);

            const int CustId = 1;
            var repository = new RngKenoBetLimitRepository(_db);

            // Action
            var result = await repository.GetSettingAsync(CustId);

            // Assert
            Assert.Multiple(() =>
            {
                _objectDb.Received(1).SetParameterValue("CustID", CustId);
                Assert.That(result.Count(), Is.EqualTo(1));
            });
        }

        [Test]
        public async Task UpdateSettingAsync_WhenCall_AssignCorrectParamAndReturnCorrectResult()
        {
            // Arrange
            const string UspName = "Lrf_CustomerUpdMember_MinMaxBetKN";
            var resultInfo = FakeHelper.Create<ResultInfo>();
            TestUtility.FakeResultInfo(_objectDb, resultInfo);
            _db.GetObjectDb(UspName).Returns(_objectDb);

            var settingList = new List<PlayerBetLimitMetaModel>
            {
                FakeHelper.Create<PlayerBetLimitMetaModel>()
            };
            var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>>>();
            metaModel.Setting = settingList;

            var repository = new RngKenoBetLimitRepository(_db);

            // Action
            var result = await repository.UpdateSettingAsync(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Code, Is.EqualTo(resultInfo.Code));
                Assert.That(result.Message, Is.EqualTo(resultInfo.Message));

                _objectDb.Received(1).SetParameterValue("custid", metaModel.CustId);
                _objectDb.Received(1).SetParameterValue("userid", metaModel.UserId);
                _objectDb.Received(1).SetParameterValue("ip", metaModel.Ip);
                _objectDb.Received(1).SetParameterValue("language", metaModel.Language);
                _objectDb.Received(1).SetParameterValue("dataxml", Arg.Is<string>(x => !string.IsNullOrEmpty(x)));

                _objectDb.Received(1).SetParameterValue("ErrCode", null);
                _objectDb.Received(1).SetParameterValue("ErrMsg", null);
            });
        }

        private static void FakeSportData(IDataReader reader, PlayerBetLimit expectedBetLimit)
        {
            var expectedData = new Dictionary<string, object>
            {
                { "MinBet", expectedBetLimit.MinBet},
                { "MinBet_Max", expectedBetLimit.BetValueMin},
                { "MaxBet", expectedBetLimit.MaxBet},
                { "MaxBet_Min", expectedBetLimit.BetValueMax},
                { "MaxPerMatch", expectedBetLimit.MaxPerMatch},
                { "MaxPerMatch_Max", expectedBetLimit.MaxPerMatchMax},
                { "GameTypeID", expectedBetLimit.Id},
                { "IBCBetTypeID", expectedBetLimit.BetSettingType}
            };
            DataAccessTestHelper.MapReaderData(reader, expectedData);
        }
    }
}