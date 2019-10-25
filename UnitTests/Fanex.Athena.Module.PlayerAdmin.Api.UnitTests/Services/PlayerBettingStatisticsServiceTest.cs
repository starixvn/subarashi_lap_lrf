using System;
using System.Data;
using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services;
using Fanex.Athena.UnitTest.Common.Helpers;
using Fanex.Data;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.Api.UnitTests.Services
{
    public class PlayerBettingStatisticsServiceTest
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
        public void GetPlayerBettingStatistics_WhenCall_AssignCorrectparam()
        {
            // Arrange
            var objectDb = Substitute.For<IObjectDb>();
            _dbFactory.GetObjectDb("Lrf_PlayerBettingStatistics").Returns(objectDb);
            var metaModel = new PlayerBettingStatisticsMetaModel
            {
                CustId = 1,
                BalanceUpDay = new DateTime(2019, 9, 1),
                MoveBetsDay = new DateTime(2019, 9, 2),
                FromDate = new DateTime(2019, 9, 1),
                ToDate = new DateTime(2019, 9, 5),
            };

            var reader = Substitute.For<IDataReader>();
            objectDb.ExecuteReader().Returns(reader);
            reader.Read().Returns(false);

            var service = new PlayerBettingStatisticsService(_dbFactory);

            // Action
            var result = service.GetPlayerBettingStatistics(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                objectDb.Received(1).SetParameterValue("CustID", metaModel.CustId);
                objectDb.Received(1).SetParameterValue("FromDate", metaModel.FromDate);
                objectDb.Received(1).SetParameterValue("ToDate", metaModel.ToDate);
                objectDb.Received(1).SetParameterValue("MoveBetsDay", metaModel.MoveBetsDay);
                objectDb.Received(1).SetParameterValue("BalanceUpDay", metaModel.BalanceUpDay);
            });
        }

        [Test]
        public void GetPlayerBettingStatistics_WhenCall_ReturnCorrectData()
        {
            // Arrange
            var objectDb = Substitute.For<IObjectDb>();
            _dbFactory.GetObjectDb("Lrf_PlayerBettingStatistics").Returns(objectDb);
            var metaModel = new PlayerBettingStatisticsMetaModel();

            var reader = Substitute.For<IDataReader>();
            objectDb.ExecuteReader().Returns(reader);
            reader.Read().Returns(true, true, false);
            reader.NextResult().Returns(true);

            var expectedData = new
            {
                Won = 10,
                Lose = 1,
                Draw = 5,
                Cancelled = 1,
                Margin = 10.06m,
                AverageBetSize = 120.4m,
                Winnings = 400m,
                Loss = 100m
            };
            DataAccessTestHelper.MapReaderData(reader, expectedData);

            var service = new PlayerBettingStatisticsService(_dbFactory);

            // Action
            var result = service.GetPlayerBettingStatistics(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.WonTicketCount, Is.EqualTo(expectedData.Won));
                Assert.That(result.LoseTicketCount, Is.EqualTo(expectedData.Lose));
                Assert.That(result.DrawTicketCount, Is.EqualTo(expectedData.Draw));
                Assert.That(result.CancelledTicketCount, Is.EqualTo(expectedData.Cancelled));
                Assert.That(result.Margin, Is.EqualTo(expectedData.Margin));
                Assert.That(result.AverageBetSize, Is.EqualTo(expectedData.AverageBetSize));
                Assert.That(result.Winnings, Is.EqualTo(expectedData.Winnings));
                Assert.That(result.Loss, Is.EqualTo(expectedData.Loss));
            });
        }
    }
}