namespace Fanex.Athena.DataAccess.Report.UnitTests
{
    using System;
    using System.Threading.Tasks;

    using Core.Configuration.Interfaces;
    using Core.UnitTests.TestHelpers;

    using Extension.Helper;

    using Model.Core.DataDomain;
    using Model.Core.DTO.Configuration;
    using Model.Report.DTO;
    using Model.Report.MetaModel;

    using NSubstitute;

    using NUnit.Framework;

    using UnitTest.Common.Helpers;

    [TestFixture]
    public class ColossusBetsWinLossDataAccessTest : BaseDataAccessHelperTest<ColossusBetsWinLossDataAccess>
    {
        private const string GetSummaryWinlossSp = "Lrf_Rpt_ColossusBetsWinloss";

        private const string GetWinlossDetailSp = "Lrf_Rpt_ColossusBetsWinloss_detail";

        private readonly DateTime _moveBetsDay = new DateTime(2010, 1, 1);

        protected override void SetUpDataAccess()
        {
            var balanceUpDataAccess = Substitute.For<IBalanceUpDataAccess>();
            var balanceUp = new BalanceUp
            {
                MoveBetsDay = _moveBetsDay
            };
            balanceUpDataAccess.GetBalanceUp().Returns(balanceUp);

            DataAccess = Substitute.ForPartsOf<ColossusBetsWinLossDataAccess>(
                balanceUpDataAccess);
        }

        [Test]
        public async Task GetSummaryWinloss_WhenCall_ParametersPassedCorrectly()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetSummaryWinlossSp)).Returns(ObjectDb);
            var metaModel = FakeHelper.Create<ColossusBetsWinLossMetaModel>();

            // Action
            await DataAccess.GetSummaryWinloss(metaModel, UserCurrencyList);

            // Assert
            AssertUspParameters(metaModel);
        }

        [Test]
        public async Task GetSummaryWinloss_WhenCall_DataReturnedCorrectly()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetSummaryWinlossSp)).Returns(ObjectDb);
            var metaModel = FakeHelper.Create<ColossusBetsWinLossMetaModel>(x => x.DrillDownLevel, ReportLevel.Main);
            var expected = new ColossusBetWinLoss
            {
                SystemId = string.Empty,
                ExternalId = string.Empty,
                CurrencyId = CurrencyId,
                Date = new DateTime(2016, 8, 29)
            };
            ConfigureReader(expected);

            // Action
            var result = (await DataAccess.GetSummaryWinloss(metaModel, UserCurrencyList).ConfigureAwait(false)).DataList[0];

            // Assert
            AssertDataReturned(result, expected);
        }

        [Test]
        public async Task GetWinlossDetail_WhenCall_ParameterPassedCorrectly()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetWinlossDetailSp)).Returns(ObjectDb);
            var metaModel = FakeHelper.Create<ColossusBetsWinLossMetaModel>(x => x.DrillDownLevel, ReportLevel.Customer);

            // Action
            await DataAccess.GetWinlossDetail(metaModel, UserCurrencyList);

            // Assert
            AssertUspParameters(metaModel);
        }

        [Test]
        public async Task GetWinlossDetail_WhenCall_DataReturnedCorrectly()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetWinlossDetailSp)).Returns(ObjectDb);
            var metaModel = FakeHelper.Create<ColossusBetsWinLossMetaModel>(x => x.DrillDownLevel, ReportLevel.Customer);

            var expected = new ColossusBetWinLoss
            {
                SystemId = string.Empty,
                ExternalId = string.Empty,
                CurrencyId = CurrencyId,
                Date = metaModel.DrillDownFromDate
            };
            ConfigureReader(expected);

            // Action
            var result = (await DataAccess.GetWinlossDetail(metaModel, UserCurrencyList).ConfigureAwait(false)).DataList[0];

            // Assert
            AssertDataReturned(result, expected);
        }

        [Test]
        public async Task ReadData_HasSystemIdColumn_ReturnCorrectDataForSystemId()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetWinlossDetailSp)).Returns(ObjectDb);
            var metaModel = FakeHelper.Create<ColossusBetsWinLossMetaModel>();

            var expected = new ColossusBetWinLoss
            {
                SystemId = "SystemId Test",
                ExternalId = string.Empty,
                CurrencyId = CurrencyId,
                Date = new DateTime(2016, 8, 29)
            };
            ConfigureReader(expected);

            Reader.FieldCount.Returns(1);
            Reader.GetName(Arg.Any<int>()).Returns("systemid");
            Reader["systemid"].Returns(expected.SystemId);

            // Action
            var result = (await DataAccess.GetWinlossDetail(metaModel, UserCurrencyList).ConfigureAwait(false)).DataList[0];

            // Assert
            Assert.That(result.SystemId, Is.EqualTo(expected.SystemId));
        }

        [Test]
        public async Task ReadData_HasExternalIdColumn_ReturnCorrectDataForExternalId()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetWinlossDetailSp)).Returns(ObjectDb);
            var metaModel = FakeHelper.Create<ColossusBetsWinLossMetaModel>();

            var expected = new ColossusBetWinLoss
            {
                SystemId = string.Empty,
                ExternalId = "ExternalId Test",
                CurrencyId = CurrencyId,
                Date = new DateTime(2016, 8, 29)
            };
            ConfigureReader(expected);

            Reader.FieldCount.Returns(1);
            Reader.GetName(Arg.Any<int>()).Returns("externalid");
            Reader["externalid"].Returns(expected.ExternalId);

            // Action
            var result = (await DataAccess.GetWinlossDetail(metaModel, UserCurrencyList).ConfigureAwait(false)).DataList[0];

            // Assert
            Assert.That(result.ExternalId, Is.EqualTo(expected.ExternalId));
        }

        [Test]
        public async Task ReadData_HasCustIdColumn_ReturnCorrectDataForCustomerId()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetWinlossDetailSp)).Returns(ObjectDb);
            var metaModel = FakeHelper.Create<ColossusBetsWinLossMetaModel>();

            var expected = new ColossusBetWinLoss
            {
                SystemId = string.Empty,
                ExternalId = string.Empty,
                CurrencyId = CurrencyId,
                Date = new DateTime(2016, 8, 29),
                CustomerId = 5
            };
            ConfigureReader(expected);

            Reader.FieldCount.Returns(1);
            Reader.GetName(Arg.Any<int>()).Returns("custid");
            Reader["custid"].Returns(expected.CustomerId);

            // Action
            var result = (await DataAccess.GetWinlossDetail(metaModel, UserCurrencyList).ConfigureAwait(false)).DataList[0];

            // Assert
            Assert.That(result.CustomerId, Is.EqualTo(expected.CustomerId));
        }

        [Test]
        public async Task ReadData_Level0_ReportByMonthly_ResultDateIsFirstDayOfMonth()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetWinlossDetailSp)).Returns(ObjectDb);
            var metaModel = FakeHelper.Create<ColossusBetsWinLossMetaModel>(x => x.DrillDownLevel, ReportLevel.Main);
            metaModel.ReportBy = ReportByType.Monthly;

            var data = new ColossusBetWinLoss
            {
                SystemId = string.Empty,
                ExternalId = string.Empty,
                CurrencyId = CurrencyId,
                Date = new DateTime(2016, 8, 29)
            };
            ConfigureReader(data);

            // Action
            var result = (await DataAccess.GetWinlossDetail(metaModel, UserCurrencyList).ConfigureAwait(false)).DataList[0];

            // Assert
            Assert.That(
                result.Date,
                Is.EqualTo(ConvertHelper.ToDateTime(data.Date.ToString("yyyyMMdd"), true)));
        }

        [Test]
        public async Task ReadData_Level0_ReportByMonthly_ReturnCorrectDateFromDB()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetWinlossDetailSp)).Returns(ObjectDb);
            var metaModel = FakeHelper.Create<ColossusBetsWinLossMetaModel>(x => x.DrillDownLevel, ReportLevel.Main);
            metaModel.ReportBy = ReportByType.Daily;

            var data = new ColossusBetWinLoss
            {
                SystemId = string.Empty,
                ExternalId = string.Empty,
                CurrencyId = CurrencyId,
                Date = new DateTime(2016, 8, 29)
            };
            ConfigureReader(data);

            // Action
            var result = (await DataAccess.GetWinlossDetail(metaModel, UserCurrencyList).ConfigureAwait(false)).DataList[0];

            // Assert
            Assert.That(
                result.Date,
                Is.EqualTo(data.Date));
        }

        [Test]
        public async Task ReadData_LevelIsNotZero_ReturnCorrectDateFromMetaModel()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetWinlossDetailSp)).Returns(ObjectDb);
            var metaModel = FakeHelper.Create<ColossusBetsWinLossMetaModel>();
            metaModel.DrillDownLevel = 1;
            metaModel.ReportBy = ReportByType.Monthly;

            var expected = new ColossusBetWinLoss
            {
                SystemId = string.Empty,
                ExternalId = string.Empty,
                CurrencyId = CurrencyId,
                Date = new DateTime(2016, 8, 25)
            };
            ConfigureReader(expected);

            // Action
            var result = (await DataAccess.GetWinlossDetail(metaModel, UserCurrencyList).ConfigureAwait(false)).DataList[0];

            // Assert
            Assert.That(
                result.Date,
                Is.EqualTo(metaModel.DrillDownFromDate));
        }

        private static void AssertDataReturned(ColossusBetWinLoss actual, ColossusBetWinLoss expected)
        {
            Assert.That(actual.SystemId, Is.EqualTo(expected.SystemId));
            Assert.That(actual.ExternalId, Is.EqualTo(expected.ExternalId));
            Assert.That(actual.CustomerId, Is.EqualTo(expected.CustomerId));
            Assert.That(actual.CurrencyId, Is.EqualTo(expected.CurrencyId));
            Assert.That(actual.CurrencyName, Is.EqualTo(CurrencyName));
            Assert.That(actual.TurnOver, Is.EqualTo(expected.TurnOver));
            Assert.That(actual.TotalTransaction, Is.EqualTo(expected.TotalTransaction));
            Assert.That(actual.Date, Is.EqualTo(expected.Date));
        }

        private void ConfigureReader(ColossusBetWinLoss expected)
        {
            Reader.Read().Returns(true, false);

            Reader["currencyid"].Returns(expected.CurrencyId);
            Reader["totaltrans"].Returns(expected.TotalTransaction);
            Reader["reporttype"].Returns(expected.Date.ToString("yyyyMMdd"));
            Reader["turnover"].Returns(0);
            Reader["winningprize"].Returns(1);
            Reader["cashoutamt"].Returns(2);
            Reader["cashinamt"].Returns(3);
            Reader["grandamt"].Returns(4);
            Reader["commamt"].Returns(5);
            Reader["turnoverBase"].Returns(6);
            Reader["winningprizeBase"].Returns(7);
            Reader["cashoutamtBase"].Returns(8);
            Reader["cashinamtBase"].Returns(9);
            Reader["grandamtBase"].Returns(10);
            Reader["commamtBase"].Returns(11);

            foreach (var suffix in SystemConstants.BaseCurrencyListOfSummaryTotalRow)
            {
                Reader["turnover" + suffix].Returns(12);
                Reader["winningprize" + suffix].Returns(13);
                Reader["cashoutamt" + suffix].Returns(14);
                Reader["cashinamt" + suffix].Returns(15);
                Reader["grandamt" + suffix].Returns(16);
                Reader["commamt" + suffix].Returns(17);
            }
        }

        private void AssertUspParameters(ColossusBetsWinLossMetaModel metaModel)
        {
            ObjectDb.Received(1).SetParameterValue("fromdate", metaModel.DrillDownFromDate);
            ObjectDb.Received(1).SetParameterValue("todate", metaModel.DrillDownToDate);
            ObjectDb.Received(1).SetParameterValue("movebetsday", _moveBetsDay);
            ObjectDb.Received(1).SetParameterValue("ReportType", metaModel.ReportBy);
            ObjectDb.Received(1).SetParameterValue("AgentList", metaModel.AgentListXml);
            ObjectDb.Received(1).SetParameterValue("TicketType", metaModel.TicketType);
            ObjectDb.Received(1).SetParameterValue("BaseCurrency", metaModel.BaseCurrency);
            ObjectDb.Received(1).SetParameterValue("DefaultBaseCurrency", metaModel.DefaultBaseCurrency);
        }
    }
}