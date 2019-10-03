using System.Data;
using System.Linq;
using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services;
using Fanex.Athena.UnitTest.Common.Helpers;
using Fanex.Data;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.Api.UnitTests.Services
{
    [TestFixture]
    public class PlayerListServiceTest
    {
        private IDbFactory _dbFactory;

        [SetUp]
        public void SetUp()
        {
            _dbFactory = Substitute.For<IDbFactory>();
        }

        [TearDown]
        public void TearDown()
        {
            _dbFactory = null;
        }

        [Test]
        public void Search_WhenCall_AssignCorrectParam()
        {
            // Arrange
            var objectDb = Substitute.For<IObjectDb>();
            _dbFactory.GetObjectDb(Arg.Is("Lrf_CustomerSelByUsername")).Returns(objectDb);

            var metaModel = new PlayerSearchingMetaModel
            {
                SiteName = "sitename",
                AgentListXml = "",
                UserName = "test",
                SearchOption = 1,
                BaFilter = 0,
                SpecialLevel = "1,2",
                OddsGroup = "A",
                PageSize = 50,
                PageIndex = 1
            };
            var reader = Substitute.For<IDataReader>();
            objectDb.ExecuteReader().Returns(reader);
            reader.Read().Returns(false);

            var service = new PlayerListService(_dbFactory);

            // Action
            service.Search(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                objectDb.Received(1).SetParameterValue("LicenseeName", metaModel.SiteName);
                objectDb.Received(1).SetParameterValue("AgentList", metaModel.AgentListXml);
                objectDb.Received(1).SetParameterValue("UserName", metaModel.UserName);
                objectDb.Received(1).SetParameterValue("SearchOption", metaModel.SearchOption);
                objectDb.Received(1).SetParameterValue("BaFilter", metaModel.BaFilter);
                objectDb.Received(1).SetParameterValue("SpecialLevel", metaModel.SpecialLevel);
                objectDb.Received(1).SetParameterValue("OddsGroups", metaModel.OddsGroup);
                objectDb.Received(1).SetParameterValue("PageSize", metaModel.PageSize);
                objectDb.Received(1).SetParameterValue("PageIndex", metaModel.PageIndex);
                objectDb.Received(1).SetParameterValue("TotalRows", 0);
            });
        }

        [Test]
        public void Search_WhenCall_ReturnCorrectData()
        {
            // Arrange
            var objectDb = Substitute.For<IObjectDb>();
            _dbFactory.GetObjectDb(Arg.Is("Lrf_CustomerSelByUsername")).Returns(objectDb);

            var metaModel = new PlayerSearchingMetaModel();
            var reader = Substitute.For<IDataReader>();
            objectDb.ExecuteReader().Returns(reader);
            reader.Read().Returns(true, false);

            var expectedData = new
            {
                CustId = 1,
                Currency = "ABC",
                UserName = "Sys123",
                NickName = "Test",
                BaStatus = false,
                SpecialLevel = 1,
                OddsGroup = "A",
                TotalBalance = 1000m,
                Outstanding = 2000m,
                ExchangeId = 2
            };
            DataAccessTestHelper.MapReaderData(reader, expectedData);
            objectDb.GetParameterValue("TotalRows").Returns(1);

            var service = new PlayerListService(_dbFactory);

            // Action
            var result = service.Search(metaModel);
            var player = result.DataList.First();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(player.IbcCustId, Is.EqualTo(expectedData.CustId));
                Assert.That(player.Currency, Is.EqualTo(expectedData.Currency));
                Assert.That(player.SystemId, Is.EqualTo(expectedData.UserName));
                Assert.That(player.UserName, Is.EqualTo(expectedData.NickName));
                Assert.That(player.BaStatus, Is.EqualTo(expectedData.BaStatus));
                Assert.That(player.SpecialLevel, Is.EqualTo(expectedData.SpecialLevel));
                Assert.That(player.OddsGroup, Is.EqualTo(expectedData.OddsGroup));
                Assert.That(player.CurrentBalance, Is.EqualTo(expectedData.TotalBalance));
                Assert.That(player.OutstandingBalance, Is.EqualTo(expectedData.Outstanding));
                Assert.That(player.CurrencyId, Is.EqualTo(expectedData.ExchangeId));

                Assert.That(result.TotalItem, Is.EqualTo(1));
            });
        }

        [Test]
        public void GetPlayerListById_WhenCall_AssignCorrectParam()
        {
            // Arrange
            var objectDb = Substitute.For<IObjectDb>();
            _dbFactory.GetObjectDb(Arg.Is("Lrf_CustomerSelByCustid")).Returns(objectDb);

            var metaModel = new PlayerListByIdMetaModel
            {
                SiteName = "sitename",
                AgentListXml = "",
                IdList = "1,2,3",
                SpecialLevel = "1,2,3,4,5",
                PageSize = 50,
                PageIndex = 1
            };
            var reader = Substitute.For<IDataReader>();
            objectDb.ExecuteReader().Returns(reader);
            reader.Read().Returns(false);

            var service = new PlayerListService(_dbFactory);

            // Action
            service.GetPlayerListById(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                objectDb.Received(1).SetParameterValue("LicenseeName", metaModel.SiteName);
                objectDb.Received(1).SetParameterValue("AgentList", metaModel.AgentListXml);
                objectDb.Received(1).SetParameterValue("CustIds", metaModel.IdList);
                objectDb.Received(1).SetParameterValue("SpecialLevel", metaModel.SpecialLevel);
                objectDb.Received(1).SetParameterValue("PageSize", metaModel.PageSize);
                objectDb.Received(1).SetParameterValue("PageIndex", metaModel.PageIndex);
                objectDb.Received(1).SetParameterValue("TotalRows", 0);
            });
        }
    }
}