namespace Fanex.Athena.DataAccess.Report
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Core.UnitTests.TestHelpers;

    using Model.Core.DataDomain;
    using Model.Report.DTO;
    using Model.Report.MetaModel;

    using NSubstitute;

    using NUnit.Framework;

    using UnitTest.Common.Helpers;

    public class ExchangeWinLossDataAccessTest : BaseDataAccessHelperTest<ExchangeWinLossDataAccess>
    {
        private const string GetMainWinlossSp = "Lrf_Rpt_ExchangeWinloss";

        private const string GetCustomerWinlossSp = "Lrf_Rpt_ExchangeWinloss_Mem";

        private const string GetLicenseeWinlossSp = "Lrf_Rpt_ExchangeWinloss_Ag";

        private ExchangeWinLossMetaModel _metaModel2;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            _metaModel2 = new ExchangeWinLossMetaModel
            {
                FromDate = DateTime.Today,
                ToDate = DateTime.Today.AddDays(1),
                AgentListXml = string.Empty,
                ReportBy = 1,
                CustId = 2,
                LicenseeId = 3
            };

            DataAccess.GetObjectDb(Arg.Is<string>(x => x.Contains(GetMainWinlossSp))).Returns(ObjectDb);
        }

        [Test]
        public async Task GetMainWinloss_WhenCall_ParametersPassedCorrectlyAsync()
        {
            // Arrange
            var metaModel = FakeHelper.Create<ExchangeWinLossMetaModel>();

            // Action
            await DataAccess.GetMainWinloss(metaModel, UserCurrencyList);

            // Assert
            Assert.Multiple(() =>
            {
                DataAccess.Received(1).GetObjectDb(GetMainWinlossSp);
                ObjectDb.Received(1).SetParameterValue("ReportType", metaModel.ReportBy);
                AssertCommonSpParameters(metaModel);
            });
        }

        [Test]
        public async Task GetMainWinloss_WhenCall_DataReturnedCorrectly()
        {
            // Arrange
            var metaModel = FakeHelper.Create<ExchangeWinLossMetaModel>(x => x.DefaultBaseCurrency, string.Empty);

            var expectedData = FakeHelper.Create<ExchangeWinLoss>();
            MapCommonReaderData(expectedData);
            Reader.Read().Returns(true, false);
            Reader.FieldCount.Returns(1);
            Reader.GetName(Arg.Any<int>()).Returns("Winlostdate");
            Reader["Winlostdate"].Returns(expectedData.Date);

            var userCurrencyList = new Dictionary<int, string>
            {
                { expectedData.CurrencyId, expectedData.CurrencyName }
            };

            // Action
            var result = await DataAccess.GetMainWinloss(metaModel, userCurrencyList);
            var firstItem = result.DataList.First();

            // Assert
            Assert.Multiple(() =>
            {
                AssertResultData(firstItem, expectedData);
                Assert.That(firstItem.Date.Date, Is.EqualTo(expectedData.Date.Date));
                Assert.That(firstItem.ExternalId, Is.Empty);
                Assert.That(firstItem.SystemId, Is.Empty);
                Assert.That(firstItem.CustId, Is.Zero);
            });
        }

        [Test]
        public async Task GetLicenseeWinloss_WhenCall_ParametersPassedCorrectly()
        {
            // Arrange
            var metaModel = FakeHelper.Create<ExchangeWinLossMetaModel>();

            // Action
            await DataAccess.GetLicenseeWinloss(metaModel, UserCurrencyList);

            // Assert
            Assert.Multiple(() =>
            {
                DataAccess.Received(1).GetObjectDb(GetLicenseeWinlossSp);
                AssertCommonSpParameters(metaModel);
            });
        }

        [Test]
        public async Task GetLicenseeWinloss_WhenCall_DataReturnedCorrectly()
        {
            // Arrange
            var metaModel = FakeHelper.Create<ExchangeWinLossMetaModel>(x => x.DefaultBaseCurrency, string.Empty);

            var expectedData = FakeHelper.Create<ExchangeWinLoss>();
            MapCommonReaderData(expectedData);
            Reader.Read().Returns(true, false);
            Reader.FieldCount.Returns(2);
            Reader.GetName(Arg.Any<int>()).Returns("username", "CustID");
            Reader["username"].Returns(expectedData.SystemId);
            Reader["CustID"].Returns(expectedData.CustId);

            var userCurrencyList = new Dictionary<int, string>
            {
                { expectedData.CurrencyId, expectedData.CurrencyName }
            };

            // Action
            var result = await DataAccess.GetLicenseeWinloss(metaModel, userCurrencyList);
            var firstItem = result.DataList.First();

            expectedData.Date = metaModel.ToDate;

            // Assert
            Assert.Multiple(() =>
            {
                AssertResultData(firstItem, expectedData);
                Assert.That(firstItem.ExternalId, Is.Empty);
                Assert.That(firstItem.SystemId, Is.EqualTo(expectedData.SystemId));
                Assert.That(firstItem.CustId, Is.EqualTo(expectedData.CustId));
            });
        }

        [Test]
        public async Task GetCustomerWinloss_WhenCall_ParametersPassedCorrectlyAsync()
        {
            // Arrange
            var metaModel = FakeHelper.Create<ExchangeWinLossMetaModel>();

            // Action
            await DataAccess.GetCustomerWinloss(metaModel, UserCurrencyList);

            // Assert
            Assert.Multiple(() =>
            {
                DataAccess.Received(1).GetObjectDb(GetCustomerWinlossSp);
                ObjectDb.Received(1).SetParameterValue("CustID", metaModel.CustId);
                AssertCommonSpParameters(metaModel);
            });
        }

        [Test]
        public async Task GetCustomerWinloss_WhenCall_DataReturnedCorrectly()
        {
            // Arrange
            var metaModel = FakeHelper.Create<ExchangeWinLossMetaModel>(x => x.DefaultBaseCurrency, string.Empty);

            var expectedData = FakeHelper.Create<ExchangeWinLoss>();
            MapCommonReaderData(expectedData);
            Reader.Read().Returns(true, false);
            Reader.FieldCount.Returns(2);
            Reader.GetName(Arg.Any<int>()).Returns("username", "nickname");
            Reader["username"].Returns(expectedData.SystemId);
            Reader["nickname"].Returns(expectedData.ExternalId);

            var userCurrencyList = new Dictionary<int, string>
            {
                { expectedData.CurrencyId, expectedData.CurrencyName }
            };

            // Action
            var result = await DataAccess.GetCustomerWinloss(metaModel, userCurrencyList);
            var firstItem = result.DataList.First();

            expectedData.Date = metaModel.ToDate;

            // Assert
            Assert.Multiple(() =>
            {
                AssertResultData(firstItem, expectedData);
                Assert.That(firstItem.ExternalId, Is.EqualTo(expectedData.ExternalId));
                Assert.That(firstItem.SystemId, Is.EqualTo(expectedData.SystemId));
                Assert.That(firstItem.CustId, Is.Zero);
            });
        }

        [Test]
        public async Task CalculateTotal_WhenCall_ReturnDataCorrectly()
        {
            // Arrange
            var metaModel = FakeHelper.Create<ExchangeWinLossMetaModel>();
            var currencyGroupId1 = FakeHelper.Create<int>();
            var currencyGroupId2 = FakeHelper.Create<int>();
            var currency1 = FakeHelper.Create<string>();
            var currency2 = FakeHelper.Create<string>();

            var expectedData = FakeHelper.Create<ExchangeWinLoss>();
            MapCommonReaderData(expectedData);
            Reader.Read().Returns(true, true, false);
            Reader["CurrencyID"].Returns(currencyGroupId1, currencyGroupId1, currencyGroupId2);

            var userCurrencyList = new Dictionary<int, string>
            {
                { currencyGroupId1, currency1 },
                { currencyGroupId2, currency2 }
            };

            // Action
            var result = (await DataAccess.GetCustomerWinloss(metaModel, userCurrencyList)).TotalDataList;

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Count(), Is.EqualTo(userCurrencyList.Count));
            });
        }

        [TestCase("AAA")]
        [TestCase("BbB")]
        [TestCase("ccc")]
        public async Task ReadSummaryTotal_ValidDefaultBaseCurrency_IncludeDefaultBaseCurrencyIntoSummary(string defaultBaseCurrency)
        {
            // Arrange
            var metaModel = FakeHelper.Create<ExchangeWinLossMetaModel>(x => x.DefaultBaseCurrency, defaultBaseCurrency);

            var expectedData = FakeHelper.Create<ExchangeWinLoss>();
            MapCommonReaderData(expectedData, "Base");
            Reader.Read().Returns(true, false);

            // Action
            var result = await DataAccess.GetCustomerWinloss(metaModel, UserCurrencyList);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.SummaryTotal.Count, Is.EqualTo(SystemConstants.BaseCurrencyListOfSummaryTotalRow.Count + 1));
                AssertCommonResultData(result.SummaryTotal[defaultBaseCurrency.ToUpperInvariant()], expectedData);
            });
        }

        [TestCase("")]
        [TestCase(null)]
        public async Task ReadSummaryTotal_InvalidDefaultBaseCurrency_ReturnFixedBaseCurrencySummary(string defaultBaseCurrency)
        {
            // Arrange
            var metaModel = FakeHelper.Create<ExchangeWinLossMetaModel>(x => x.DefaultBaseCurrency, defaultBaseCurrency);

            // Action
            var result = (await DataAccess.GetCustomerWinloss(metaModel, UserCurrencyList)).SummaryTotal;

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Count, Is.EqualTo(SystemConstants.BaseCurrencyListOfSummaryTotalRow.Count));
            });
        }

        [TestCase("EuR")]
        [TestCase("usd")]
        [TestCase("GBP")]
        public async Task ReadSummaryTotal_DefaultBaseCurrencyIsFixedBaseCurrency_ReturnFixedBaseCurrencySummary(string defaultBaseCurrency)
        {
            // Arrange
            var metaModel = FakeHelper.Create<ExchangeWinLossMetaModel>(x => x.DefaultBaseCurrency, defaultBaseCurrency);

            var expectedData = FakeHelper.Create<ExchangeWinLoss>();
            MapCommonReaderData(expectedData, "Base");
            Reader.Read().Returns(true, false);

            // Action
            var result = await DataAccess.GetCustomerWinloss(metaModel, UserCurrencyList);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.SummaryTotal.Count, Is.EqualTo(SystemConstants.BaseCurrencyListOfSummaryTotalRow.Count));
                AssertCommonResultData(result.SummaryTotal[defaultBaseCurrency.ToUpperInvariant()], expectedData);
            });
        }

        private static void AssertCommonResultData(ExchangeWinLoss actual, ExchangeWinLoss expected)
        {
            Assert.That(actual.Turnover, Is.EqualTo(expected.Turnover));
            Assert.That(actual.NetTurnover, Is.EqualTo(expected.NetTurnover));
            Assert.That(actual.CustomerWL, Is.EqualTo(expected.CustomerWL));
            Assert.That(actual.CustomerComm, Is.EqualTo(expected.CustomerComm));
            Assert.That(actual.LicenseeWL, Is.EqualTo(expected.LicenseeWL));
            Assert.That(actual.LicenseeNetWL, Is.EqualTo(expected.LicenseeNetWL));
            Assert.That(actual.LicenseeComm, Is.EqualTo(expected.LicenseeComm));
            Assert.That(actual.AmountDueTo, Is.EqualTo(expected.AmountDueTo));
        }

        private static void AssertResultData(
            ExchangeWinLoss actual,
            ExchangeWinLoss expect)
        {
            Assert.That(actual.CurrencyName, Is.EqualTo(expect.CurrencyName));
            Assert.That(actual.CurrencyId, Is.EqualTo(expect.CurrencyId));

            AssertCommonResultData(actual, expect);
        }

        private void AssertCommonSpParameters(ExchangeWinLossMetaModel metaModel)
        {
            ObjectDb.Received(1).SetParameterValue("AgentList", metaModel.AgentListXml);
            ObjectDb.Received(1).SetParameterValue("Fromdate", metaModel.FromDate.Date);
            ObjectDb.Received(1).SetParameterValue("Todate", metaModel.ToDate.Date);
            ObjectDb.Received(1).SetParameterValue("LicenseeId", metaModel.LicenseeId);
            ObjectDb.Received(1).SetParameterValue("BaseCurrency", metaModel.BaseCurrency);
            ObjectDb.Received(1).SetParameterValue("DefaultBaseCurrency", metaModel.DefaultBaseCurrency);
        }

        private void MapCommonReaderData(ExchangeWinLoss data, string suffix = "")
        {
            var returnedData = new Dictionary<string, object>
            {
                { "CurrencyID", data.CurrencyId },
                { "TotalTrans", data.TotalTransaction },
                { "TurnOver" + suffix, data.Turnover },
                { "NetTurnOver" + suffix, data.NetTurnover },
                { "Winlost" + suffix, data.CustomerWL },
                { "CustComm" + suffix, data.CustomerComm },
                { "LicenseeWinlost" + suffix, data.LicenseeWL },
                { "LicNetWL" + suffix, data.LicenseeNetWL },
                { "AgentComm" + suffix, data.LicenseeComm },
                { "AmountDueTo" + suffix, data.AmountDueTo }
            };

            MapReaderData(returnedData);
        }
    }
}