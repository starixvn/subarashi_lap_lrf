namespace Fanex.Athena.DataAccess.Report.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Core.Configuration.Interfaces;
    using Core.UnitTests.TestHelpers;

    using Extension.Utility;

    using Fanex.Athena.Model.Core.DTO.Configuration;

    using Model.Core.DataDomain;
    using Model.Core.ResultModel;
    using Model.Report.DTO;
    using Model.Report.MetaModel;

    using NSubstitute;

    using NUnit.Framework;

    using UnitTest.Common.Helpers;

    public class CashOutWinLossDataAccessTest : BaseDataAccessHelperTest<CashOutWinLossDataAccess>
    {
        private const string GetSummarySp = "Lrf_Rpt_CashoutWinloss";

        private const string GetDetailSp = "Lrf_Rpt_CashoutWinloss_Detail";

        private readonly BalanceUp _balance = new BalanceUp
        {
            MoveBetsDay = new DateTime(2017, 1, 1)
        };

        protected override void SetUpDataAccess()
        {
            var balanceUpDataAccess = Substitute.For<IBalanceUpDataAccess>();

            balanceUpDataAccess.GetBalanceUp().Returns(_balance);

            DataAccess = Substitute.ForPartsOf<CashOutWinLossDataAccess>(
                balanceUpDataAccess);
        }

        [Test]
        public async Task GetSummary_WhenCall_ParameterPassedCorrectly()
        {
            // Arrange
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>();

            DataAccess.GetObjectDb(Arg.Is(GetSummarySp)).Returns(ObjectDb);
            Reader.Read().Returns(false);

            // Action
            await DataAccess.GetSummary(metaModel, UserCurrencyList).ConfigureAwait(false);

            // Assert
            Assert.Multiple(() =>
            {
                AssertUspParameters(metaModel, isDrilldown: false);
                ObjectDb.Received(1).SetParameterValue("ReportType", metaModel.ReportBy);
            });
        }

        [Test]
        public async Task GetSummary_Level0AndConditionIsTrue_ReturnCorrectData()
        {
            // Arrange
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>(x => x.DrillDownLevel, ReportLevel.Main);

            DataAccess.GetObjectDb(Arg.Is(GetSummarySp)).Returns(ObjectDb);
            ConfigCheckingColumnForReader();
            Reader.Read().Returns(true, false);

            var fakeData = CreateFakeData();
            MapReaderData(fakeData);

            var expectedCashoutWinLossData = ObjectHelper.ToJson(CreateExpectedCashoutWinLossData(metaModel, isDrillDown: false, rowSpan: 1));

            // Action
            var result = await DataAccess.GetSummary(metaModel, UserCurrencyList);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(ObjectHelper.ToJson(result.DataList), Is.EqualTo(expectedCashoutWinLossData));
            });
        }

        [Test]
        public async Task GetSummary_WhenCallWithLevel1AndConditionIsFalse_ReturnCorrectData()
        {
            // Arrange
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>(x => x.DrillDownLevel, ReportLevel.Licensee);

            DataAccess.GetObjectDb(Arg.Is(GetSummarySp)).Returns(ObjectDb);
            Reader.Read().Returns(true, false);
            Reader.FieldCount.Returns(0);

            var fakeData = CreateFakeData();
            MapReaderData(fakeData);

            var cashoutWinLossData = CreateExpectedCashoutWinLossData(metaModel, isDrillDown: true, rowSpan: 1);
            cashoutWinLossData[0].Date = metaModel.DrillDownFromDate;
            cashoutWinLossData[0].SystemId = string.Empty;
            cashoutWinLossData[0].ExternalId = string.Empty;
            cashoutWinLossData[0].CustomerId = 0;

            var expectedCashoutWinLossData = ObjectHelper.ToJson(cashoutWinLossData);

            // Action
            var result = await DataAccess.GetSummary(metaModel, UserCurrencyList);

            // Assert
            Assert.That(ObjectHelper.ToJson(result.DataList), Is.EqualTo(expectedCashoutWinLossData));
        }

        [Test]
        public async Task GetSummary_WhenCall_ReturnCorrectRowSpan()
        {
            // Arrange
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>(x => x.DrillDownLevel, ReportLevel.Main);

            DataAccess.GetObjectDb(Arg.Is(GetSummarySp)).Returns(ObjectDb);
            ConfigCheckingColumnForReader();
            Reader.Read().Returns(true, true, true, false);

            const string GroupDate1 = "20170120";
            const string GroupDate2 = "20170122";
            var fakeData = CreateFakeData();
            MapReaderData(fakeData);
            Reader["reporttype"].Returns(GroupDate2, GroupDate1, GroupDate2);

            const int ExpectedRowSpan1 = 1;
            const int ExpectedRowSpan2 = 2;

            // Action
            var result = await DataAccess.GetSummary(metaModel, UserCurrencyList);
            var firstGroupDate1 = result.DataList[0];
            var firstGroupDate2 = result.DataList[1];

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(firstGroupDate1.RowSpan, Is.EqualTo(ExpectedRowSpan1));
                Assert.That(firstGroupDate2.RowSpan, Is.EqualTo(ExpectedRowSpan2));
            });
        }

        [Test]
        public async Task GetDetail_WhenCall_ParameterPassedCorrectly()
        {
            // Arrange
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>();

            DataAccess.GetObjectDb(Arg.Is(GetDetailSp)).Returns(ObjectDb);
            Reader.Read().Returns(false);

            // Action
            await DataAccess.GetDetail(metaModel, UserCurrencyList);

            // Assert
            AssertUspParameters(metaModel, isDrilldown: true);
        }

        [Test]
        public async Task GetDetail_WhenCall_ReturnCorrectData()
        {
            // Arrange
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>(x => x.DrillDownLevel, ReportLevel.Customer);

            DataAccess.GetObjectDb(Arg.Is(GetDetailSp)).Returns(ObjectDb);
            Reader.Read().Returns(true, false);
            ConfigCheckingColumnForReader();

            var fakeData = CreateFakeData();
            MapReaderData(fakeData);
            var expectedResult = new SortableReportResultModel<CashOutWinLoss>
            {
                DataList = CreateExpectedCashoutWinLossData(metaModel, isDrillDown: true, rowSpan: 0),
                TotalDataList = CreateExpectedCashoutWinLossTotalData(metaModel, isDrillDown: true, rowSpan: 0)
            };

            // Action
            var result = await DataAccess.GetDetail(metaModel, UserCurrencyList);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(ObjectHelper.ToJson(result.DataList), Is.EqualTo(ObjectHelper.ToJson(expectedResult.DataList)));
                Assert.That(ObjectHelper.ToJson(result.TotalDataList), Is.EqualTo(ObjectHelper.ToJson(expectedResult.TotalDataList)));
            });
        }

        [Test]
        public async Task ReadSummaryTotal_ValidDefaultBaseCurrency_IncludeDefaultBaseCurrencyData()
        {
            // Arrange
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>(x => x.DefaultBaseCurrency, "AAA");

            DataAccess.GetObjectDb(Arg.Is(GetDetailSp)).Returns(ObjectDb);
            Reader.Read().Returns(true, false);

            var fakeData = CreateFakeData();
            MapReaderData(fakeData);

            var expected = CreateExpectedFixedSummaryTotalData();
            expected.Add(metaModel.DefaultBaseCurrency.ToUpperInvariant(), CreateExpectedDefaultBaseCurrencySummaryTotalData());

            // Action
            var result = await DataAccess.GetDetail(metaModel, UserCurrencyList);

            // Assert
            Assert.That(ObjectHelper.ToJson(result.SummaryTotal), Is.EqualTo(ObjectHelper.ToJson(expected)));
        }

        [TestCase(null)]
        [TestCase("")]
        public async Task ReadSummaryTotal_InvalidDefaultBaseCurrency_DoNotIncludeDefaultBaseCurrencyData(string defaultBaseCurrency)
        {
            // Arrange
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>(x => x.DefaultBaseCurrency, defaultBaseCurrency);

            DataAccess.GetObjectDb(Arg.Is(GetDetailSp)).Returns(ObjectDb);
            Reader.Read().Returns(true, false);

            var fakeData = CreateFakeData();
            MapReaderData(fakeData);

            var expected = CreateExpectedFixedSummaryTotalData();

            // Action
            var result = await DataAccess.GetDetail(metaModel, UserCurrencyList);

            // Assert
            Assert.That(ObjectHelper.ToJson(result.SummaryTotal), Is.EqualTo(ObjectHelper.ToJson(expected)));
        }

        [TestCase("euR")]
        [TestCase("usd")]
        [TestCase("GBP")]
        public async Task ReadSummaryTotal_DefaultBaseCurrencyIsFixedBaseCurrency_ReturnDataOfFixedBaseCurrencies(string defaultBaseCurrency)
        {
            // Arrange
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>(x => x.DefaultBaseCurrency, defaultBaseCurrency);

            DataAccess.GetObjectDb(Arg.Is(GetDetailSp)).Returns(ObjectDb);
            Reader.Read().Returns(true, false);

            var fakeData = CreateFakeData();
            MapReaderData(fakeData);

            var expected = CreateExpectedFixedSummaryTotalData();
            var defaultBaseCurrencyData = CreateExpectedDefaultBaseCurrencySummaryTotalData();
            expected[defaultBaseCurrency.ToUpperInvariant()] = defaultBaseCurrencyData;

            // Action
            var result = await DataAccess.GetDetail(metaModel, UserCurrencyList);

            // Assert
            Assert.That(ObjectHelper.ToJson(result.SummaryTotal), Is.EqualTo(ObjectHelper.ToJson(expected)));
        }

        private static Dictionary<string, object> CreateFakeData()
        {
            return new Dictionary<string, object>
            {
                { "systemid", "1" }, { "externalid", "2" }, { "custid", 3 },
                { "cashoutvalue", 10m }, { "buybackamountSB", 10.5m }, { "buybackamountBA", 11m },
                { "ticketpayout", 11.5m }, { "cashoutcomm", 12m }, { "AmountDue_TicketPayout", 13m },
                { "AmountDue_Comm", 14m }, { "Amount_Total", 15m }, { "currencyid", CurrencyId }, { "currencyname", CurrencyName },
                { "cashouttime", 2 }, { "cashoutticket", 3 }, { "reporttype", "20170417" },
                { "cashoutvalueEUR", 10m }, { "buybackamountSBEUR", 10.5m }, { "buybackamountBAEUR", 11m },
                { "ticketpayoutEUR", 11.5m }, { "cashoutcommEUR", 12m }, { "AmountDue_TicketPayoutEUR", 13m },
                { "AmountDue_CommEUR", 14m }, { "Amount_TotalEUR", 15m },
                { "cashoutvalueUSD", 10m }, { "buybackamountSBUSD", 10.5m }, { "buybackamountBAUSD", 11m },
                { "ticketpayoutUSD", 11.5m }, { "cashoutcommUSD", 12m }, { "AmountDue_TicketPayoutUSD", 13m },
                { "AmountDue_CommUSD", 14m }, { "Amount_TotalUSD", 15m },
                { "cashoutvalueGBP", 10m }, { "buybackamountSBGBP", 10.5m }, { "buybackamountBAGBP", 11m },
                { "ticketpayoutGBP", 11.5m }, { "cashoutcommGBP", 12m }, { "AmountDue_TicketPayoutGBP", 13m },
                { "AmountDue_CommGBP", 14m }, { "Amount_TotalGBP", 15m },
                { "cashoutvalueBase", 12m }, { "buybackamountSBBase", 13.5m }, { "buybackamountBABase", 13m },
                { "ticketpayoutBase", 13.5m }, { "cashoutcommBase", 14m }, { "AmountDue_TicketPayoutBase", 15m },
                { "AmountDue_CommBase", 16m }, { "Amount_TotalBase", 17m },
            };
        }

        private static SortableList<CashOutWinLoss> CreateExpectedCashoutWinLossData(ThirdPartyWinLossMetaModel metaModel, bool isDrillDown, int rowSpan = 0)
        {
            return new SortableList<CashOutWinLoss>
            {
                new CashOutWinLoss
                {
                    RowSpan = rowSpan,
                    Index = 1,
                    SystemId = "1",
                    ExternalId = "2",
                    CustomerId = 3,
                    CurrencyId = CurrencyId,
                    CurrencyName = CurrencyName,
                    CashOutTimes = 2,
                    CashOutValue = 10m,
                    CashOutTickets = 3,
                    BuyBackAmountSB = 10.5m,
                    BuyBackAmountBA = 11m,
                    TicketPayout = 11.5m,
                    CashOutCommission = 12m,
                    SettleAmountTicketPayout = 13m,
                    SettleAmountBuyBackComm = 14m,
                    SettleAmountTotal = 15m,
                    Date = isDrillDown ? metaModel.DrillDownFromDate : new DateTime(2017, 4, 17)
                }
            };
        }

        private static SortableList<CashOutWinLoss> CreateExpectedCashoutWinLossTotalData(ThirdPartyWinLossMetaModel metaModel, bool isDrillDown, int rowSpan)
        {
            var data = CreateExpectedCashoutWinLossData(metaModel, isDrillDown, rowSpan);
            data[0].Index = 0;
            data[0].Date = DateTime.MinValue;
            data[0].SystemId = null;
            data[0].ExternalId = null;
            data[0].CustomerId = 0;
            data[0].CurrencyId = 0;
            return data;
        }

        private static IDictionary<string, CashOutWinLoss> CreateExpectedFixedSummaryTotalData()
        {
            return new Dictionary<string, CashOutWinLoss>
            {
                { "EUR",
                    new CashOutWinLoss
                    {
                        CashOutValue = 10m,
                        CashOutTickets = 3,
                        CashOutTimes = 2,
                        BuyBackAmountSB = 10.5m,
                        BuyBackAmountBA = 11m,
                        TicketPayout = 11.5m,
                        CashOutCommission = 12m,
                        SettleAmountTicketPayout = 13m,
                        SettleAmountBuyBackComm = 14m,
                        SettleAmountTotal = 15m
                    }
                },
                { "USD",
                    new CashOutWinLoss
                    {
                        CashOutValue = 10m,
                        CashOutTickets = 3,
                        CashOutTimes = 2,
                        BuyBackAmountSB = 10.5m,
                        BuyBackAmountBA = 11m,
                        TicketPayout = 11.5m,
                        CashOutCommission = 12m,
                        SettleAmountTicketPayout = 13m,
                        SettleAmountBuyBackComm = 14m,
                        SettleAmountTotal = 15m
                    }
                },
                { "GBP",
                    new CashOutWinLoss
                    {
                        CashOutValue = 10m,
                        CashOutTickets = 3,
                        CashOutTimes = 2,
                        BuyBackAmountSB = 10.5m,
                        BuyBackAmountBA = 11m,
                        TicketPayout = 11.5m,
                        CashOutCommission = 12m,
                        SettleAmountTicketPayout = 13m,
                        SettleAmountBuyBackComm = 14m,
                        SettleAmountTotal = 15m
                    }
                }
            };
        }

        private static CashOutWinLoss CreateExpectedDefaultBaseCurrencySummaryTotalData()
        {
            return new CashOutWinLoss
            {
                CashOutValue = 12m,
                CashOutTickets = 3,
                CashOutTimes = 2,
                BuyBackAmountSB = 13.5m,
                BuyBackAmountBA = 13m,
                TicketPayout = 13.5m,
                CashOutCommission = 14m,
                SettleAmountTicketPayout = 15m,
                SettleAmountBuyBackComm = 16m,
                SettleAmountTotal = 17m
            };
        }

        private void ConfigCheckingColumnForReader()
        {
            Reader.FieldCount.Returns(3);
            Reader.GetName(0).Returns("systemid");
            Reader.GetName(1).Returns("externalid");
            Reader.GetName(2).Returns("custid");
        }

        private void AssertUspParameters(ThirdPartyWinLossMetaModel metaModel, bool isDrilldown)
        {
            ObjectDb.Received(1).SetParameterValue("fromdate", isDrilldown ? metaModel.DrillDownFromDate : metaModel.FromDate.Date);
            ObjectDb.Received(1).SetParameterValue("todate", isDrilldown ? metaModel.DrillDownToDate : metaModel.ToDate.Date);
            ObjectDb.Received(1).SetParameterValue("AgentList", metaModel.AgentListXml);
            ObjectDb.Received(1).SetParameterValue("MoveBetsDay", _balance.MoveBetsDay);
            ObjectDb.Received(1).SetParameterValue("BaseCurrency", metaModel.BaseCurrency);
            ObjectDb.Received(1).SetParameterValue("DefaultBaseCurrency", metaModel.DefaultBaseCurrency);
        }
    }
}