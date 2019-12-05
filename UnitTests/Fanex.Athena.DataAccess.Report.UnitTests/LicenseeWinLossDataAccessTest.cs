namespace Fanex.Athena.DataAccess.Report.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Core.Configuration.Interfaces;
    using Core.UnitTests.TestHelpers;

    using Data;

    using Model.Core.DTO.Configuration;
    using Model.Core.MetaModel.Product;
    using Model.Report.MetaModel;

    using NSubstitute;

    using NUnit.Framework;

    [TestFixture]
    public class LicenseeWinLossDataAccessTest : BaseDataAccessHelperTest<LicenseeWinLossDataAccess>
    {
        private const string GetSummaryWinlossSp = "Lrf_Rpt_LicWinloss";

        private const string GetCustomerWinlossDetailSp = "Lrf_Rpt_LicWinlossDetail";

        private const string GetAgentWinlossDetailSp = "Lrf_Rpt_LicWinlossDetail_Ag";

        private LicenseeWinLossMetaModel _metaModel;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            var balanceUpDataAccess = Substitute.For<IBalanceUpDataAccess>();
            var balance = new BalanceUp
            {
                MoveBetsDay = new DateTime(2016, 8, 10),
                BalanceUpDay = new DateTime(2016, 8, 31)
            };
            balanceUpDataAccess.GetBalanceUp().Returns(balance);

            ObjectDb = Substitute.For<IObjectDb>();
            DataAccess = Substitute.ForPartsOf<LicenseeWinLossDataAccess>(
                balanceUpDataAccess);

            _metaModel = new LicenseeWinLossMetaModel
            {
                DrillDownCustomerId = 999,
                DrillDownFromDate = new DateTime(2018, 1, 1),
                DrillDownToDate = new DateTime(2018, 2, 2),
                ProductOptions = GetProductOptions(),
                BaseCurrency = "USD",
                ReportBy = 1,
                LicenseeId = 2,
                AgentListXml = "3",
                FromDate = new DateTime(2017, 1, 1),
                ToDate = new DateTime(2017, 2, 2),
                DrawFilter = 4,
                DefaultBaseCurrency = "AAA"
            };
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            _metaModel = null;

            base.FixtureTearDown();
        }

        [TestCase(true)]
        [TestCase(false)]
        public async Task GetSummaryWinloss_WhenCall_ParametersPassedCorrectly(bool checkPromotionPrize)
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetSummaryWinlossSp)).Returns(ObjectDb);

            // Action
            await DataAccess.GetSummaryWinloss(_metaModel, UserCurrencyList, checkPromotionPrize);

            // Assert
            Assert.Multiple(() =>
            {
                ObjectDb.Received(1).SetParameterValue("reporttype", _metaModel.ReportBy);
                AssertCommonSpParameters(isDrilldown: false, checkPromotionPrize);
            });
        }

        [Test]
        public async Task ReadData_WhenCall_ReturnCorrectResult()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetSummaryWinlossSp)).Returns(ObjectDb);

            Reader.Read().Returns(true, false);
            Reader.FieldCount.Returns(7);
            Reader.GetName(0).Returns("LicenseeWLSB");
            Reader.GetName(1).Returns("turnoverSB");
            Reader.GetName(2).Returns("username");
            Reader.GetName(3).Returns("nickname");
            Reader.GetName(4).Returns("custid");
            Reader.GetName(5).Returns("LicenseeWLSB");
            Reader.GetName(6).Returns("turnoverSB");

            var readerDataMapping = new
            {
                username = "testacc",
                LicenseeWLSB = 100,
                turnoverSB = 200,
                reporttype = "20170101",
                nickname = "nickname test",
                custid = 108
            };

            MapReaderData(readerDataMapping);

            // Action
            var result = await DataAccess.GetSummaryWinloss(_metaModel, UserCurrencyList);
            var firstOriginalItem = result.DataList.First();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.DataList.Count, Is.EqualTo(1));
                Assert.That(firstOriginalItem.SystemId, Is.EqualTo(readerDataMapping.username));
                Assert.That(firstOriginalItem.ExternalId, Is.EqualTo(readerDataMapping.nickname));
                Assert.That(firstOriginalItem.CustomerId, Is.EqualTo(readerDataMapping.custid));
                Assert.That(firstOriginalItem.LicenseeWL["SB"], Is.EqualTo(readerDataMapping.LicenseeWLSB));
                Assert.That(firstOriginalItem.TurnOver["SB"], Is.EqualTo(readerDataMapping.turnoverSB));
            });
        }

        [Test]
        public async Task GetSummaryTotal_HasSummaryData_ReturnSummaryTotalCorrectly()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetSummaryWinlossSp)).Returns(ObjectDb);

            Reader.Read().Returns(false, true);
            Reader.NextResult().Returns(true);
            Reader.FieldCount.Returns(4);
            Reader.GetName(0).Returns("LicenseeWLSBUSD");
            Reader.GetName(1).Returns("turnoverSBUSD");
            Reader.GetName(2).Returns("LicenseeWLSB");
            Reader.GetName(3).Returns("turnoverSB");

            var readerDataMapping = new
            {
                LicenseeWLSBUSD = 100,
                turnoverSBUSD = 200,
                reporttype = "20170101",
                LicenseeWLSB = 300,
                turnoverSB = 400,
                winlost = 500,
                winlostUSD = 600,
                PromotionPrize = 1
            };
            MapReaderData(readerDataMapping);

            // Action
            var result = await DataAccess.GetSummaryWinloss(_metaModel, UserCurrencyList);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.SummaryTotal["USD"].CustomerWinLoss, Is.EqualTo(readerDataMapping.winlostUSD));
                Assert.That(result.SummaryTotal["USD"].LicenseeWL["SB"], Is.EqualTo(readerDataMapping.LicenseeWLSBUSD));
                Assert.That(result.SummaryTotal["USD"].TurnOver["SB"], Is.EqualTo(readerDataMapping.turnoverSBUSD));
                Assert.That(result.SummaryTotal[_metaModel.DefaultBaseCurrency].CustomerWinLoss, Is.EqualTo(readerDataMapping.winlost));
                Assert.That(result.SummaryTotal[_metaModel.DefaultBaseCurrency].LicenseeWL["SB"], Is.EqualTo(readerDataMapping.LicenseeWLSB));
                Assert.That(result.SummaryTotal[_metaModel.DefaultBaseCurrency].TurnOver["SB"], Is.EqualTo(readerDataMapping.turnoverSB));
                Assert.That(result.AdditionalInfo, Is.EqualTo(readerDataMapping.PromotionPrize.ToString()));
            });
        }

        [TestCase(false, true)]
        [TestCase(false, false)]
        [TestCase(true, false)]
        public async Task GetSummaryTotal_HasNoSummaryData_ReturnSummaryTotalCorrectly(bool hasReturnedData, bool isNotEmpty)
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetSummaryWinlossSp)).Returns(ObjectDb);

            Reader.Read().Returns(false, isNotEmpty);
            Reader.NextResult().Returns(hasReturnedData);
            Reader.FieldCount.Returns(0);

            var readerDataMapping = new
            {
                winlost = 500,
                winlostUSD = 600
            };
            MapReaderData(readerDataMapping);

            // Action
            var result = await DataAccess.GetSummaryWinloss(_metaModel, UserCurrencyList);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.SummaryTotal["USD"].CustomerWinLoss, Is.Zero);
                Assert.That(result.SummaryTotal["USD"].LicenseeWL, Is.Empty);
                Assert.That(result.SummaryTotal[_metaModel.DefaultBaseCurrency].CustomerWinLoss, Is.Zero);
                Assert.That(result.SummaryTotal[_metaModel.DefaultBaseCurrency].TurnOver, Is.Empty);
                Assert.That(result.AdditionalInfo, Is.EqualTo("0"));
            });
        }

        [TestCase(true)]
        [TestCase(false)]
        public async Task GetCustomerWinlossDetail_WhenCall_ParametersPassedCorrectly(bool checkPromotionPrize)
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetCustomerWinlossDetailSp)).Returns(ObjectDb);

            // Action
            await DataAccess.GetCustomerWinlossDetail(_metaModel, UserCurrencyList, checkPromotionPrize);

            // Assert
            Assert.Multiple(() =>
            {
                ObjectDb.Received(1).SetParameterValue("custid", _metaModel.DrillDownCustomerId);
                AssertCommonSpParameters(isDrilldown: true, checkPromotionPrize);
            });
        }

        [TestCase(true)]
        [TestCase(false)]
        public async Task GetAgentWinlossDetail_WhenCall_ParametersPassedCorrectly(bool checkPromotionPrize)
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetAgentWinlossDetailSp)).Returns(ObjectDb);

            // Action
            await DataAccess.GetAgentWinlossDetail(_metaModel, UserCurrencyList, checkPromotionPrize);

            // Assert
            AssertCommonSpParameters(isDrilldown: true, checkPromotionPrize);
        }

        private void AssertCommonSpParameters(bool isDrilldown, bool checkPromotionPrize)
        {
            ObjectDb.Received(1).SetParameterValue("licenseeid", _metaModel.LicenseeId);
            ObjectDb.Received(1).SetParameterValue("AgentList", _metaModel.AgentListXml);
            ObjectDb.Received(1).SetParameterValue("fromdate", isDrilldown ? _metaModel.DrillDownFromDate : _metaModel.FromDate);
            ObjectDb.Received(1).SetParameterValue("todate", isDrilldown ? _metaModel.DrillDownToDate : _metaModel.ToDate);
            ObjectDb.Received(1).SetParameterValue("drawfilter", _metaModel.DrawFilter);
            ObjectDb.Received(1).SetParameterValue("showSB", true);
            ObjectDb.Received(1).SetParameterValue("showNG", false);
            ObjectDb.Received(1).SetParameterValue("BaseCurrency", _metaModel.BaseCurrency);
            ObjectDb.Received(1).SetParameterValue("DefaultBaseCurrency", _metaModel.DefaultBaseCurrency);
            ObjectDb.Received(1).SetParameterValue("CheckPromotionPrize", checkPromotionPrize);
        }

        private IList<ProductOption> GetProductOptions()
        {
            return new List<ProductOption>
            {
                new ProductOption { Code = "SB", Status = true },
                new ProductOption { Code = "NG", Status = false }
            };
        }
    }
}