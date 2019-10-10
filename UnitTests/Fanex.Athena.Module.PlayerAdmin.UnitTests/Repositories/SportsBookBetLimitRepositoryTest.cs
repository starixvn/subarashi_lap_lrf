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
    public class SportsBookBetLimitRepositoryTest
    {
        private const string MixedSportId = "99MP";

        private readonly string[] SportTypes =
        {
            ((int)SportType.Soccer).ToString(),
            ((int)SportType.BasketBall).ToString(),
            ((int)SportType.FootBall).ToString(),
            ((int)SportType.Tennis).ToString(),
            ((int)SportType.BaseBall).ToString(),
            ((int)SportType.Golf).ToString(),
            ((int)SportType.Motorsports).ToString(),
            ((int)SportType.OtherSports).ToString()
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

        [TestCase(true)]
        [TestCase(false)]
        public async Task GetSettingAsync_WhenCall_AssignCorrectParamAndReturnCorrectData(bool isShowMixedSport)
        {
            // Arrange
            const string UspName = "Lrf_CustomerSelEditCustomer";
            var reader = Substitute.For<IDataReader>();
            reader.Read().Returns(true, false);
            FakeSettingData(reader);

            _objectDb.ExecuteReaderAsync().Returns(reader);
            _db.GetObjectDb(UspName).Returns(_objectDb);

            const int CustId = 1;
            var repository = new SportsBookBetLimitRepository(_db);
            var expectedResultLength = isShowMixedSport ? SportTypes.Length + 1 : SportTypes.Length;

            // Action
            var result = await repository.GetSettingAsync(CustId, isShowMixedSport);

            // Assert
            Assert.Multiple(() =>
            {
                _objectDb.Received(1).SetParameterValue("CustID", CustId);
                Assert.That(result.Count(), Is.EqualTo(expectedResultLength));
            });
        }

        [TestCase(true)]
        [TestCase(false)]
        public async Task UpdateSettingAsync_WhenCall_AssignCorrectParamAndReturnCorrectData(bool isShowMixedSport)
        {
            // Arrange
            const string UspName = "Lrf_CustomerUpdMember_All";
            var resultInfo = FakeHelper.Create<ResultInfo>();
            TestUtility.FakeResultInfo(_objectDb, resultInfo);
            _db.GetObjectDb(UspName).Returns(_objectDb);

            var settingList = CreateSettingList(isShowMixedSport);
            var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>>>();
            metaModel.Setting = settingList;

            var repository = new SportsBookBetLimitRepository(_db);

            // Action
            var result = await repository.UpdateSettingAsync(metaModel, isShowMixedSport);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Code, Is.EqualTo(resultInfo.Code));
                Assert.That(result.Message, Is.EqualTo(resultInfo.Message));

                _objectDb.Received(1).SetParameterValue("licenseeName", metaModel.SiteName);
                _objectDb.Received(1).SetParameterValue("custid", metaModel.CustId);
                _objectDb.Received(1).SetParameterValue("userid", metaModel.UserId);
                _objectDb.Received(1).SetParameterValue("ip", metaModel.Ip);
                _objectDb.Received(1).SetParameterValue("language", metaModel.Language);

                _objectDb.Received(1).SetParameterValue("ErrCode", null);
                _objectDb.Received(1).SetParameterValue("ErrMsg", null);

                foreach (var setting in settingList)
                {
                    var sportSuffix = GetSportSuffix(setting.Id);

                    _objectDb.Received(1).SetParameterValue($"minbet{sportSuffix}", setting?.MinBet);
                    _objectDb.Received(1).SetParameterValue($"maxbet{sportSuffix}", setting?.MaxBet);
                    _objectDb.Received(1).SetParameterValue($"maxpermatch{sportSuffix}", setting?.MaxPerMatch);
                    _objectDb.Received(1).SetParameterValue($"updateminmaxbet{sportSuffix}", setting?.IsUpdated);
                }
            });
        }

        private void FakeSettingData(IDataReader reader)
        {
            var expectedData = new Dictionary<string, object>();

            foreach (var type in SportTypes)
            {
                var expectedBetLimit = FakeHelper.Create<PlayerBetLimit>();
                var sportSuffix = GetSportSuffix(type);

                expectedData.Add($"minbet{sportSuffix}", expectedBetLimit.MinBet);
                expectedData.Add($"MinBet{sportSuffix}_Max", expectedBetLimit.BetValueMin);
                expectedData.Add($"maxbet{sportSuffix}", expectedBetLimit.MaxBet);
                expectedData.Add($"MaxBet{sportSuffix}_Min", expectedBetLimit.BetValueMax);
                expectedData.Add($"MaxPerMatch{sportSuffix}", expectedBetLimit.MaxPerMatch);
                expectedData.Add($"MaxPerMatch{sportSuffix}_Max", expectedBetLimit.MaxPerMatchMax);
                expectedData.Add($"MaxPerMatch{sportSuffix}_Min", expectedBetLimit.MaxPerMatchMin);
            }
            DataAccessTestHelper.MapReaderData(reader, expectedData);
        }

        private IEnumerable<PlayerBetLimitMetaModel> CreateSettingList(bool isShowMixedSport)
        {
            var capacity = isShowMixedSport ? SportTypes.Length + 1 : SportTypes.Length;
            var settingList = new List<PlayerBetLimitMetaModel>(capacity);

            foreach (var type in SportTypes)
            {
                var setting = FakeHelper.Create<PlayerBetLimitMetaModel>();
                setting.Id = type;

                settingList.Add(setting);
            }
            if (isShowMixedSport)
            {
                var mixedSportSetting = FakeHelper.Create<PlayerBetLimitMetaModel>();
                mixedSportSetting.Id = MixedSportId;
                settingList.Add(mixedSportSetting);
            }

            return settingList;
        }

        private static string GetSportSuffix(string sportId) => sportId != ((int)SportType.Soccer).ToString() ? "v" + sportId : string.Empty;
    }
}