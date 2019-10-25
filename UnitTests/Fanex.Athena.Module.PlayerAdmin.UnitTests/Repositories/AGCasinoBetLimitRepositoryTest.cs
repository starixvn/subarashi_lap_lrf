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
    [TestFixture]
    public class AGCasinoBetLimitRepositoryTest
    {
        private const int CustId = 1;

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
        public async Task GetBetSettingAsync_WhenCall_AssignCorrectParamAndReturnCorrectData()
        {
            // Arrange
            const string UspName = "Lrf_AGC_SelCustSetting";
            var expectedResult = FakeHelper.Create<AgCasinoBetSetting>();
            FakeAgCasinoBetSetting(_objectDb, expectedResult);
            _db.GetObjectDb(UspName).Returns(_objectDb);

            var repository = new AGCasinoBetLimitRepository(_db);

            // Action
            var result = await repository.GetBetSettingAsync(CustId);

            // Assert
            Assert.Multiple(() =>
            {
                _objectDb.Received(1).SetParameterValue("CustID", CustId);
                _objectDb.Received(1).SetParameterValue("Currency", null);
                _objectDb.Received(1).SetParameterValue("AGGroup", null);
                _objectDb.Received(1).SetParameterValue("IsEnabled", null);
                _objectDb.Received(1).SetParameterValue("IsLineEnabled", null);
                _objectDb.Received(1).SetParameterValue("CheckedGroups", null);

                Assert.That(result.CurrencyId, Is.EqualTo(expectedResult.CurrencyId));
                Assert.That(result.AgGroup, Is.EqualTo(expectedResult.AgGroup));
                Assert.That(result.IsEnabled, Is.EqualTo(expectedResult.IsEnabled));
                Assert.That(result.IsLineEnabled, Is.EqualTo(expectedResult.IsLineEnabled));
                Assert.That(result.CheckedGroups, Is.EqualTo(expectedResult.CheckedGroups));
            });
        }

        [Test]
        public async Task UpdateSettingAsync_WhenCall_AssignCorrectParamAndReturnCorrectResult()
        {
            // Arrange
            const string UspName = "Lrf_AGC_UpdCustSetting";
            var expectedResult = FakeHelper.Create<ResultInfo>();
            TestUtility.FakeResultInfo(_objectDb, expectedResult);
            _db.GetObjectDb(UspName).Returns(_objectDb);

            var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<AgCasinoBetLimitMetaModel>>();
            var repository = new AGCasinoBetLimitRepository(_db);

            // Action
            var result = await repository.UpdateSettingAsync(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                _objectDb.Received(1).SetParameterValue("aggroup", metaModel.Setting.Group);
                _objectDb.Received(1).SetParameterValue("ip", metaModel.Ip);
                _objectDb.Received(1).SetParameterValue("language", metaModel.Language);
                _objectDb.Received(1).SetParameterValue("userid", metaModel.UserId);
                _objectDb.Received(1).SetParameterValue("custid", metaModel.CustId);
                _objectDb.Received(1).SetParameterValue("ErrCode", null);
                _objectDb.Received(1).SetParameterValue("ErrMsg", null);

                Assert.That(result.Code, Is.EqualTo(expectedResult.Code));
                Assert.That(result.Message, Is.EqualTo(expectedResult.Message));
            });
        }

        private static void FakeAgCasinoBetSetting(IObjectDb objectDb, AgCasinoBetSetting expectedBetSetting)
        {
            objectDb.GetParameterValue("Currency").Returns(expectedBetSetting.CurrencyId);
            objectDb.GetParameterValue("AGGroup").Returns(expectedBetSetting.AgGroup);
            objectDb.GetParameterValue("IsEnabled").Returns(expectedBetSetting.IsEnabled);
            objectDb.GetParameterValue("IsLineEnabled").Returns(expectedBetSetting.IsLineEnabled);
            objectDb.GetParameterValue("CheckedGroups").Returns(string.Join(",", expectedBetSetting.CheckedGroups));
        }
    }
}