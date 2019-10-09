using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Model.Core.DataDomain;
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
    public class NumberGameBetLimitRepositoryTest
    {
        private readonly string[] SportTypes =
        {
            ((int)SportType.NumberGame).ToString()
        };

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
            const string UspName = "Lrf_CustomerSelEditNG";
            var reader = Substitute.For<IDataReader>();
            reader.Read().Returns(true, false);
            _objectDb.ExecuteReaderAsync().Returns(reader);

            var expectedResult = FakeHelper.Create<PlayerBetLimit>();
            FakeSettingData(reader, expectedResult);
            _db.GetObjectDb(UspName).Returns(_objectDb);

            const int CustId = 1;
            var repository = new NumberGameBetLimitRepository(_db);

            // Action
            var result = await repository.GetSettingAsync(CustId);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Count(), Is.EqualTo(1));

                _objectDb.Received(1).SetParameterValue("CustID", CustId);
            });
        }

        [Test]
        public async Task UpdateSettingAsync_WhenCall_AssignCorrectParamAndReturnCorrectData()
        {
            // Arrange
            const string UspName = "Lrf_CustomerUpdMember_MinMaxBet161";
            var numberGameSportType = ((int)SportType.NumberGame).ToString();
            var resultInfo = FakeHelper.Create<ResultInfo>();
            TestUtility.FakeResultInfo(_objectDb, resultInfo);
            _db.GetObjectDb(UspName).Returns(_objectDb);

            var settingItem1 = FakeHelper.Create<PlayerBetLimitMetaModel>(x => x.Id, numberGameSportType);
            var settingList = new List<PlayerBetLimitMetaModel> { settingItem1 };
            var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>>>();
            metaModel.ProductId = ProductTypes.VirtualSports;
            metaModel.Setting = settingList;

            var repository = new NumberGameBetLimitRepository(_db);

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

                _objectDb.Received(1).SetParameterValue($"minbetv{numberGameSportType}", settingItem1.MinBet);
                _objectDb.Received(1).SetParameterValue($"maxbetv{numberGameSportType}", settingItem1.MaxBet);
                _objectDb.Received(1).SetParameterValue($"maxpermatchv{numberGameSportType}", settingItem1.MaxPerMatch);
                _objectDb.Received(1).SetParameterValue($"maxperballv{numberGameSportType}", settingItem1.MaxPerBall);

                _objectDb.Received(1).SetParameterValue("ErrCode", null);
                _objectDb.Received(1).SetParameterValue("ErrMsg", null);
            });
        }

        private void FakeSettingData(IDataReader reader, PlayerBetLimit expectedBetLimit)
        {
            var sportSuffix = "v" + SportTypes[0];

            var expectedData = new Dictionary<string, object>
            {
                { $"maxbet{sportSuffix}", expectedBetLimit.MaxBet},
                { $"minbet{sportSuffix}", expectedBetLimit.MinBet},
                { $"MaxPerMatch{sportSuffix}", expectedBetLimit.MaxPerMatch},
                { $"MaxPerMatch{sportSuffix}_Max", expectedBetLimit.MaxPerMatchMax},
                { $"MaxPerMatch{sportSuffix}_Min", expectedBetLimit.MaxPerMatchMin},
                { $"MaxBet{sportSuffix}_Min", expectedBetLimit.BetValueMax},
                { $"MaxBet{sportSuffix}_Max", expectedBetLimit.BetValueMin},
                { $"maxperball{sportSuffix}", expectedBetLimit.MaxPerBall},
                { $"maxperball{sportSuffix}_Max", expectedBetLimit.MaxPerBallMax}
            };
            DataAccessTestHelper.MapReaderData(reader, expectedData);
        }
    }
}