namespace Fanex.Athena.DataAccess.Report.UnitTests
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;

    using Core.UnitTests.TestHelpers;

    using Model.Core.DataDomain;
    using Model.Report.DTO;
    using Model.Report.MetaModel;

    using NSubstitute;

    using NUnit.Framework;

    using UnitTest.Common.Helpers;

    [TestFixture]
    public class AgCasinoBalanceDataAccessTest : BaseDataAccessHelperTest<AgCasinoBalanceDataAccess>
    {
        private const string GetSummaryBalanceSp = "Lrf_Rpt_AGCasinoBalance";

        private const string GetCustomerBalanceDetailSp = "LRF_Rpt_AGCasinoBalance_Mem";

        private const string GetAgentBalanceDetailSp = "LRF_Rpt_AGCasinoBalance_Ag";

        [Test]
        public async Task GetSummaryBalance_WhenCall_ParametersPassedCorrectly()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetSummaryBalanceSp)).Returns(ObjectDb);
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>();

            // Action
            await DataAccess.GetSummaryBalance(metaModel, UserCurrencyList);

            // Assert
            Assert.Multiple(() =>
            {
                ObjectDb.Received(1).SetParameterValue("AgentList", metaModel.AgentListXml);
                ObjectDb.Received(1).SetParameterValue("fromdate", metaModel.FromDate.Date);
                ObjectDb.Received(1).SetParameterValue("todate", metaModel.ToDate.Date);
                ObjectDb.Received(1).SetParameterValue("BaseCurrency", metaModel.BaseCurrency);
                ObjectDb.Received(1).SetParameterValue("DefaultBaseCurrency", metaModel.DefaultBaseCurrency);
            });
        }

        [Test]
        public async Task GetSummaryBalance_WhenCall_DataReturnedCorrectly()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetSummaryBalanceSp)).Returns(ObjectDb);
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>(x => x.DrillDownLevel, ReportLevel.Main);
            var expected = SetUpReturnedData();

            // Action
            var result = (await DataAccess.GetSummaryBalance(metaModel, UserCurrencyList)).DataList.First();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.CurrencyId, Is.EqualTo(expected.CurrencyId));
                Assert.That(result.CurrencyName, Is.EqualTo(CurrencyName));
                AssertCommonData(result, expected);
            });
        }

        [Test]
        public async Task GetCustomerBalanceDetail_WhenCall_ParametersReturnedCorrectly()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetCustomerBalanceDetailSp)).Returns(ObjectDb);
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>();

            const int TotalRows = 10;
            ObjectDb.GetParameterValue("TotalRows").Returns(TotalRows);

            // Action
            var result = await DataAccess.GetCustomerBalanceDetail(metaModel, UserCurrencyList);

            // Assert
            Assert.That(result.TotalRows, Is.EqualTo(TotalRows));
        }

        [Test]
        public async Task GetCustomerBalanceDetail_ExportExcel_RemovePagingFromParameters()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetCustomerBalanceDetailSp)).Returns(ObjectDb);

            const int PageIndex = 1;
            const int PageSize = SystemConstants.MaxDataTotalRow;
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>(x => x.IsExportExcel, true);

            // Action
            await DataAccess.GetCustomerBalanceDetail(metaModel, UserCurrencyList);

            // Assert
            Assert.Multiple(() =>
            {
                ObjectDb.Received(1).SetParameterValue("pagesize", PageSize);
                ObjectDb.Received(1).SetParameterValue("pageindex", PageIndex);
            });
        }

        [Test]
        public async Task GetCustomerBalanceDetail_WhenCall_DataReturnedCorrectly()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetCustomerBalanceDetailSp)).Returns(ObjectDb);
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>();

            const int TotalRows = 10;
            ObjectDb.GetParameterValue("TotalRows").Returns(TotalRows);

            var expected = SetUpReturnedData();

            // Action
            var result = await DataAccess.GetCustomerBalanceDetail(metaModel, UserCurrencyList);
            var firstData = result.DataList[0];

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(firstData.CurrencyId, Is.EqualTo(expected.CurrencyId));
                Assert.That(firstData.CurrencyName, Is.EqualTo(CurrencyName));
                Assert.That(result.TotalRows, Is.EqualTo(TotalRows));
            });
        }

        [Test]
        public async Task GetAgentBalanceDetail_WhenCall_DataReturnedCorrectly()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetAgentBalanceDetailSp)).Returns(ObjectDb);
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>();

            var expected = SetUpReturnedData();

            // Action
            var result = (await DataAccess.GetAgentBalanceDetail(metaModel, UserCurrencyList)).DataList[0];

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.CurrencyId, Is.EqualTo(expected.CurrencyId));
                Assert.That(result.CurrencyName, Is.EqualTo(CurrencyName));
            });
        }

        [Test]
        public async Task GetData_DrillDownLevel2_CalculateIndexByPaging()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetAgentBalanceDetailSp)).Returns(ObjectDb);
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>();
            metaModel.PageIndex = 2;
            metaModel.PageSize = 100;
            metaModel.DrillDownLevel = 2;

            const int ExpectedIndex = 101;

            SetUpReturnedData();

            // Action
            var result = (await DataAccess.GetAgentBalanceDetail(metaModel, UserCurrencyList)).DataList[0];

            // Assert
            Assert.That(result.Index, Is.EqualTo(ExpectedIndex));
        }

        [Test]
        public async Task GetData_HasUserNameColumn_ReturnCorrectDataForSystemId()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetAgentBalanceDetailSp)).Returns(ObjectDb);
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>();

            var expected = SetUpReturnedData();

            Reader.FieldCount.Returns(1);
            Reader.GetName(Arg.Any<int>()).Returns("UserName");

            // Action
            var result = (await DataAccess.GetAgentBalanceDetail(metaModel, UserCurrencyList)).DataList[0];

            // Assert
            Assert.That(result.SystemId, Is.EqualTo(expected.SystemId));
        }

        [Test]
        public async Task GetData_HasNickNameColumn_ReturnCorrectDataForExternalId()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetAgentBalanceDetailSp)).Returns(ObjectDb);
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>();

            var expected = SetUpReturnedData();

            Reader.FieldCount.Returns(1);
            Reader.GetName(Arg.Any<int>()).Returns("NickName");

            // Action
            var result = (await DataAccess.GetAgentBalanceDetail(metaModel, UserCurrencyList)).DataList[0];

            // Assert
            Assert.That(result.ExternalId, Is.EqualTo(expected.ExternalId));
        }

        [Test]
        public async Task GetData_HasCustIdColumn_ReturnCorrectDataForCustomerId()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetAgentBalanceDetailSp)).Returns(ObjectDb);
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>();

            var expected = SetUpReturnedData();

            Reader.FieldCount.Returns(1);
            Reader.GetName(Arg.Any<int>()).Returns("CustId");

            // Action
            var result = (await DataAccess.GetAgentBalanceDetail(metaModel, UserCurrencyList)).DataList[0];

            // Assert
            Assert.That(result.CustomerId, Is.EqualTo(expected.CustomerId));
        }

        [Test]
        public async Task GetData_HasCurrencyColumn_ReturnCorrectDataForCurrencyId()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetAgentBalanceDetailSp)).Returns(ObjectDb);
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>();

            var expected = SetUpReturnedData();

            Reader.FieldCount.Returns(1);
            Reader.GetName(Arg.Any<int>()).Returns("Currency");

            // Action
            var result = (await DataAccess.GetAgentBalanceDetail(metaModel, UserCurrencyList)).DataList[0];

            // Assert
            Assert.That(result.CurrencyId, Is.EqualTo(expected.CurrencyId));
        }

        [Test]
        public async Task GetData_HasDateColumn_ReturnCorrectDataForDate()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetAgentBalanceDetailSp)).Returns(ObjectDb);
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>();

            var expected = SetUpReturnedData();

            Reader.FieldCount.Returns(1);
            Reader.GetName(Arg.Any<int>()).Returns("Date");

            // Action
            var result = (await DataAccess.GetAgentBalanceDetail(metaModel, UserCurrencyList)).DataList[0];

            // Assert
            Assert.That(result.Date.Value.Date, Is.EqualTo(expected.Date.Value.Date));
        }

        [Test]
        public async Task GetData_DoesNotHaveDateColumn_ReturnCorrectDataForDate()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetAgentBalanceDetailSp)).Returns(ObjectDb);
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>();

            SetUpReturnedData();

            // Action
            var result = (await DataAccess.GetAgentBalanceDetail(metaModel, UserCurrencyList)).DataList[0];

            // Assert
            Assert.That(result.Date, Is.EqualTo(metaModel.DrillDownFromDate));
        }

        [TestCase("AAA")]
        [TestCase("BbB")]
        [TestCase("ccc")]
        public async Task ReadSummaryTotal_ValidDefaultBaseCurrency_IncludeDefaultBaseCurrencyIntoSummary(string defaultBaseCurrency)
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetAgentBalanceDetailSp)).Returns(ObjectDb);
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>(x => x.DefaultBaseCurrency, defaultBaseCurrency);

            var exchangeRate = FakeHelper.Create<long>();
            var expected = SetUpReturnedSummaryTotalData(defaultBaseCurrency, exchangeRate);

            // Action
            var result = await DataAccess.GetAgentBalanceDetail(metaModel, UserCurrencyList);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.SummaryTotal.Count, Is.EqualTo(SystemConstants.BaseCurrencyListOfSummaryTotalRow.Count + 1));
                AssertCommonData(result.SummaryTotal[defaultBaseCurrency.ToUpperInvariant()], expected);
            });
        }

        [TestCase("")]
        [TestCase(null)]
        public async Task ReadSummaryTotal_InvalidDefaultBaseCurrency_ReturnFixedBaseCurrencySummary(string defaultBaseCurrency)
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetAgentBalanceDetailSp)).Returns(ObjectDb);
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>(x => x.DefaultBaseCurrency, defaultBaseCurrency);

            // Action
            var result = await DataAccess.GetAgentBalanceDetail(metaModel, UserCurrencyList);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.SummaryTotal.Count, Is.EqualTo(SystemConstants.BaseCurrencyListOfSummaryTotalRow.Count));
            });
        }

        [TestCase("EuR")]
        [TestCase("usd")]
        [TestCase("GBP")]
        public async Task ReadSummaryTotal_DefaultBaseCurrencyIsFixedBaseCurrency_ReturnFixedBaseCurrencySummary(string defaultBaseCurrency)
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetAgentBalanceDetailSp)).Returns(ObjectDb);
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>(x => x.DefaultBaseCurrency, defaultBaseCurrency);

            var exchangeRate = FakeHelper.Create<long>();
            var expected = SetUpReturnedSummaryTotalData(defaultBaseCurrency, exchangeRate);

            // Action
            var result = await DataAccess.GetAgentBalanceDetail(metaModel, UserCurrencyList);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.SummaryTotal.Count, Is.EqualTo(SystemConstants.BaseCurrencyListOfSummaryTotalRow.Count));
                AssertCommonData(result.SummaryTotal[defaultBaseCurrency.ToUpperInvariant()], expected);
            });
        }

        private static void AssertCommonData(AgCasinoBalance actual, AgCasinoBalance expected)
        {
            Assert.That(actual.CustomerWinLoss, Is.EqualTo(expected.CustomerWinLoss));
            Assert.That(actual.LicenseeWL, Is.EqualTo(expected.LicenseeWL));
            Assert.That(actual.TurnOver, Is.EqualTo(expected.TurnOver));
            Assert.That(actual.TotalTransaction, Is.EqualTo(expected.TotalTransaction));
            Assert.That(actual.OpeningBalance, Is.EqualTo(expected.OpeningBalance));
            Assert.That(actual.TransferIn, Is.EqualTo(expected.TransferIn));
            Assert.That(actual.TransferOut, Is.EqualTo(expected.TransferOut));
            Assert.That(actual.ClosingBalance, Is.EqualTo(expected.ClosingBalance));
        }

        private AgCasinoBalance SetUpReturnedData()
        {
            var data = FakeHelper.Create<AgCasinoBalance>(x => x.CurrencyId, CurrencyId);

            Reader.Read().Returns(true, false);

            MapReaderInfoData(data);
            MapReaderCommonData(data);
            MapReaderCommonData(data, "Base");

            foreach (var currency in SystemConstants.BaseCurrencyListOfSummaryTotalRow)
            {
                MapReaderCommonData(data, currency);
            }

            return data;
        }

        private void MapReaderInfoData(AgCasinoBalance data)
        {
            Reader["username"].Returns(data.SystemId);
            Reader["nickname"].Returns(data.ExternalId);
            Reader["custid"].Returns(data.CustomerId);
            Reader["currency"].Returns(data.CurrencyId);
            Reader["date"].Returns(data.Date);
        }

        private void MapReaderCommonData(AgCasinoBalance data, string suffixColumn = "")
        {
            Reader["winlost" + suffixColumn].Returns(data.CustomerWinLoss);
            Reader["licenseewinlost" + suffixColumn].Returns(data.LicenseeWL);
            Reader["turnover" + suffixColumn].Returns(data.TurnOver);
            Reader["totaltrans" + suffixColumn].Returns(data.TotalTransaction);
            Reader["OpeningBalance" + suffixColumn].Returns(data.OpeningBalance);
            Reader["TransferIn" + suffixColumn].Returns(data.TransferIn);
            Reader["TransferOut" + suffixColumn].Returns(data.TransferOut);
            Reader["ClosingBalance" + suffixColumn].Returns(data.ClosingBalance);
        }

        private AgCasinoBalance SetUpReturnedSummaryTotalData(string testCurrency, long exchangeRate)
        {
            var original = FakeHelper.Create<AgCasinoBalance>(x => x.CurrencyId, CurrencyId);

            Reader.Read().Returns(true, false);

            var expected = new AgCasinoBalance
            {
                CustomerWinLoss = original.CustomerWinLoss * exchangeRate,
                LicenseeWL = original.LicenseeWL * exchangeRate,
                TurnOver = original.TurnOver * exchangeRate,
                OpeningBalance = original.OpeningBalance * exchangeRate,
                TransferIn = original.TransferIn * exchangeRate,
                TransferOut = original.TransferOut * exchangeRate,
                ClosingBalance = original.ClosingBalance * exchangeRate,
                TotalTransaction = original.TotalTransaction
            };

            MapReaderInfoData(original);
            MapReaderCommonData(original);

            foreach (var baseCurrency in SystemConstants.BaseCurrencyListOfSummaryTotalRow)
            {
                MapReaderCommonData(baseCurrency.Equals(testCurrency, StringComparison.OrdinalIgnoreCase) ? expected : original, baseCurrency);
            }

            MapReaderCommonData(expected, "Base");

            return expected;
        }
    }
}