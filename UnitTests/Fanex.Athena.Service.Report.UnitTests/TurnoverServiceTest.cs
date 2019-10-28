namespace Fanex.Athena.Service.Report.UnitTests
{
    using System.Collections.Generic;
    using System.Linq;

    using DataAccess.Report.Interfaces;
    using Fanex.Athena.UnitTest.Common.Helpers;
    using Model.Report.DTO;

    using NSubstitute;

    using NUnit.Framework;

    public class TurnoverServiceTest
    {
        private ITurnoverDataAccess _dataAccess;
        private TurnoverService _service;

        [SetUp]
        public void SetUp()
        {
            _dataAccess = Substitute.For<ITurnoverDataAccess>();
            _service = new TurnoverService(_dataAccess);
        }

        [TearDown]
        public void TearDown()
        {
            _dataAccess = null;
            _service = null;
        }

        [Test]
        public void SumTotalData_WhenCall_ReturnCorrectData()
        {
            // Arrange
            var dataList = FakeHelper.CreateMany<TurnoverDTO>(3).ToList();

            // Action
            var result = _service.SumTotalData(dataList);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Deposit, Is.EqualTo(dataList.Sum(p => p.Deposit)));
                Assert.That(result.Withdrawal, Is.EqualTo(dataList.Sum(p => p.Withdrawal)));
                Assert.That(result.Bonus, Is.EqualTo(dataList.Sum(p => p.Bonus)));
                Assert.That(result.Adjustment, Is.EqualTo(dataList.Sum(p => p.Adjustment)));
                Assert.That(result.Promotion, Is.EqualTo(dataList.Sum(p => p.Promotion)));
                Assert.That(result.Turnover, Is.EqualTo(dataList.Sum(p => p.Turnover)));
                Assert.That(result.DrawGame, Is.EqualTo(dataList.Sum(p => p.DrawGame)));
                Assert.That(result.NetTurnover, Is.EqualTo(dataList.Sum(p => p.NetTurnover)));
                Assert.That(result.PendingFunds, Is.EqualTo(dataList.Sum(p => p.PendingFunds)));
                Assert.That(result.WinLoss, Is.EqualTo(dataList.Sum(p => p.WinLoss)));
                Assert.That(result.PlayerComm, Is.EqualTo(dataList.Sum(p => p.PlayerComm)));
                Assert.That(result.ClosingBalance, Is.EqualTo(dataList.Sum(p => p.ClosingBalance)));
                Assert.That(result.AffiliateTransfer, Is.EqualTo(dataList.Sum(p => p.AffiliateTransfer)));
                Assert.That(result.Transfer3rd, Is.EqualTo(dataList.Sum(p => p.Transfer3rd)));
                Assert.That(result.TurnoverBA, Is.EqualTo(dataList.Sum(p => p.TurnoverBA)));
                Assert.That(result.CommBA, Is.EqualTo(dataList.Sum(p => p.CommBA)));
                Assert.That(result.AmountDueToBA, Is.EqualTo(dataList.Sum(p => p.AmountDueToBA)));
            });
        }
    }
}