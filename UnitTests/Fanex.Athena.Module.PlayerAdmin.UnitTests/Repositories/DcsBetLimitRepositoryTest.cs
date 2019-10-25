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
using Fanex.Logging;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Repositories
{
    public class DcsBetLimitRepositoryTest
    {
        private IDbFactory _db;
        private IObjectDb _objectDb;
        private ILogger _logger;

        private const int MemberRoleId = 1;

        private const int ProductStatusSettingType = 4;

        private readonly IDictionary<int, string[]> ProductSportList = new Dictionary<int, string[]>
        {
            [ProductTypes.VirtualSports] = new[] { "180", "181", "182", "183", "184", "185", "186" },
            [ProductTypes.VirtualSports2] = new[] { "190", "191", "192", "193", "199" },
            [ProductTypes.Lottery] = new[] { "220" },
            [ProductTypes.Sportsbooks2] = new[] { "43" }
        };

        [SetUp]
        public void SetUp()
        {
            _db = Substitute.For<IDbFactory>();
            _objectDb = Substitute.For<IObjectDb>();
            _logger = Substitute.For<ILogger>();
        }

        [TearDown]
        public void TearDown()
        {
            _db = null;
            _objectDb = null;
            _logger = null;
        }

        [Test]
        public async Task GetSettingAsync_WhenCall_AssignCorrectParamAndReturnCorrectData()
        {
            // Arrange
            const string UspName = "Acc_Dep_CustSetting_BetLimitSettingSelect";
            var reader = Substitute.For<IDataReader>();
            reader.Read().Returns(true, false);
            _objectDb.ExecuteReaderAsync().Returns(reader);

            var expectedResult = FakeHelper.Create<PlayerBetLimit>();
            FakeSettingData(reader, expectedResult);
            _db.GetObjectDb(UspName).Returns(_objectDb);

            const int CustId = 1;
            const int ProductId = 10;
            var repository = new DcsBetLimitRepository(_db, _logger);

            // Action
            var result = await repository.GetSettingAsync(CustId, ProductId);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Count(), Is.EqualTo(1));

                _objectDb.Received(1).SetParameterValue("custid", CustId);
                _objectDb.Received(1).SetParameterValue("productid", ProductId);
            });
        }

        [Test]
        public async Task UpdateSettingAsync_WhenCall_AssignCorrectParamAndReturnCorrectData()
        {
            // Arrange
            const string UspName = "Acc_Dep_CustSetting_BetLimitUpd";
            var resultInfo = FakeHelper.Create<ResultInfo>();
            TestUtility.FakeResultInfo(_objectDb, resultInfo);
            _db.GetObjectDb(UspName).Returns(_objectDb);

            var settingList = new List<PlayerBetLimitMetaModel>();
            var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>>>();
            metaModel.ProductId = ProductTypes.VirtualSports;
            metaModel.Setting = settingList;

            var repository = new DcsBetLimitRepository(_db, _logger);

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
                _objectDb.Received(1).SetParameterValue("errcode", null);
                _objectDb.Received(1).SetParameterValue("errmsg", null);
            });
        }

        [Test]
        public async Task GetStatusAsync_WhenCall_AssignCorrectParamAndReturnCorrectData()
        {
            // Arrange
            const string UspName = "Acc_Dep_CustSetting_StatusSettingSelect";
            var reader = Substitute.For<IDataReader>();
            reader.Read().Returns(true, false);
            _objectDb.ExecuteReaderAsync().Returns(reader);

            var expectedResult = new { IsDisabled = 0 };
            DataAccessTestHelper.MapReaderData(reader, expectedResult);
            _db.GetObjectDb(UspName).Returns(_objectDb);

            const int CustId = 1;
            const int ProductId = 10;
            var repository = new DcsBetLimitRepository(_db, _logger);

            // Action
            var result = await repository.GetStatusAsync(CustId, ProductId);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result, Is.True);

                _objectDb.Received(1).SetParameterValue("CustID", CustId);
                _objectDb.Received(1).SetParameterValue("ProductId", ProductId);
                _objectDb.Received(1).SetParameterValue("SettingType", ProductStatusSettingType);
                _objectDb.Received(1).SetParameterValue("RoleID", MemberRoleId);
            });
        }

        private static void FakeSettingData(IDataReader reader, PlayerBetLimit expectedBetLimit)
        {
            var expectedData = new Dictionary<string, object>
            {
                { "minbet", expectedBetLimit.MinBet},
                { "minbetmin", expectedBetLimit.BetValueMin},
                { "maxbet", expectedBetLimit.MaxBet},
                { "maxbetmax", expectedBetLimit.BetValueMax},
                { "maxpermatch", expectedBetLimit.MaxPerMatch},
                { "maxpermatchmax", expectedBetLimit.MaxPerMatchMax},
                { "sporttype", expectedBetLimit.Id},
                { "bettype", expectedBetLimit.BetType}
            };
            DataAccessTestHelper.MapReaderData(reader, expectedData);
        }
    }
}