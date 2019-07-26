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

    using Report;

    using UnitTest.Common.Helpers;

    [TestFixture]
    public class ThirdPartyWinLosDataAccessTest : BaseDataAccessHelperTest<ThirdPartyWinLossDataAccess<ThirdPartyWinLoss>>
    {
        [TestCase("Test", "Test")]
        public async Task GetSummaryWinloss_WhenCall_ParametersPassedCorrectly(string spname, string expectedSpName)
        {
            // Arrange
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>(x => x.DrillDownLevel, ReportLevel.Main);
            DataAccess.GetObjectDb(Arg.Is(expectedSpName)).Returns(ObjectDb);

            // Action
            await DataAccess.GetSummaryWinloss(metaModel, UserCurrencyList, spname);

            // Assert
            Assert.Multiple(() =>
            {
                DataAccess.Received(1).GetObjectDb(expectedSpName);
                ObjectDb.Received(1).SetParameterValue("ReportType", metaModel.ReportBy);
                AssertCommonSpParameters(metaModel, isDrilldown: false);
            });
        }

        [TestCase("Test", "Test")]
        public async Task GetCustomerWinlossDetail_WhenCall_ParametersPassedCorrectly(string spname, string expectedSpName)
        {
            // Arrange
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>(x => x.DrillDownLevel, ReportLevel.Customer);
            DataAccess.GetObjectDb(Arg.Is(expectedSpName)).Returns(ObjectDb);

            // Action
            await DataAccess.GetCustomerWinlossDetail(metaModel, UserCurrencyList, spname);

            // Assert
            Assert.Multiple(() =>
            {
                DataAccess.Received(1).GetObjectDb(expectedSpName);
                ObjectDb.Received(1).SetParameterValue("custid", metaModel.DrillDownCustomerId);
                AssertCommonSpParameters(metaModel, isDrilldown: true);
            });
        }

        [TestCase(1)]
        [TestCase(2)]
        public async Task UpdateUspParams_MetaModelProductIdIsGreaterThanZero_ParametersPassedCorrectly(int productId)
        {
            // Arrange
            const string SpName = "spName";
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>(x => x.ProductId, productId);
            DataAccess.GetObjectDb(Arg.Is(SpName)).Returns(ObjectDb);

            // Action
            await DataAccess.GetCustomerWinlossDetail(metaModel, UserCurrencyList, SpName);

            // Assert
            ObjectDb.Received(1).SetParameterValue("productid", productId);
        }

        [TestCase(0)]
        [TestCase(-1)]
        public async Task UpdateUspParams_MetaModelProductIdIsZero_ParametersPassedCorrectly(int productId)
        {
            // Arrange
            const string SpName = "spName";
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>(x => x.ProductId, productId);
            DataAccess.GetObjectDb(Arg.Is(SpName)).Returns(ObjectDb);

            // Action
            await DataAccess.GetSummaryWinloss(metaModel, UserCurrencyList, SpName);

            // Assert
            ObjectDb.DidNotReceive().SetParameterValue("productid", Arg.Any<int>());
        }

        [TestCase("Test", "Test")]
        public async Task GetAgentWinlossDetail_WhenCall_ParametersPassedCorrectly(string spname, string expectedSpName)
        {
            // Arrange
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>(x => x.DrillDownLevel, ReportLevel.Licensee);
            DataAccess.GetObjectDb(Arg.Is(expectedSpName)).Returns(ObjectDb);

            // Action
            await DataAccess.GetAgentWinlossDetail(metaModel, UserCurrencyList, spname);

            // Assert
            Assert.Multiple(() =>
            {
                DataAccess.Received(1).GetObjectDb(expectedSpName);
                AssertCommonSpParameters(metaModel, isDrilldown: true);
            });
        }

        [Test]
        public async Task GetData_HasSystemIdColumn_ReturnCorrectData()
        {
            // Arrange
            const string SpName = "Agent2";
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>();

            DataAccess.GetObjectDb(Arg.Is(SpName)).Returns(ObjectDb);

            Reader.Read().Returns(true, false);
            Reader.FieldCount.Returns(1);
            Reader.GetName(0).Returns("username");

            var readerDataMapping = new
            {
                username = "Test"
            };
            MapReaderData(readerDataMapping);

            // Action
            var result = await DataAccess.GetAgentWinlossDetail(metaModel, UserCurrencyList, SpName);

            // Assert
            Assert.That(result.DataList.First().SystemId, Is.EqualTo(readerDataMapping.username));
        }

        [Test]
        public async Task GetData_HasExternalIdColumn_ReturnCorrectData()
        {
            // Arrange
            const string SpName = "Agent3";
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>();

            DataAccess.GetObjectDb(Arg.Is(SpName)).Returns(ObjectDb);

            Reader.Read().Returns(true, false);
            Reader.FieldCount.Returns(1);
            Reader.GetName(0).Returns("nickname");

            var readerDataMapping = new
            {
                nickname = "Test"
            };
            MapReaderData(readerDataMapping);

            // Action
            var result = await DataAccess.GetAgentWinlossDetail(metaModel, UserCurrencyList, SpName);

            // Assert
            Assert.That(result.DataList.First().ExternalId, Is.EqualTo(readerDataMapping.nickname));
        }

        [Test]
        public async Task GetData_HasCustomerIdColumn_ReturnCorrectData()
        {
            // Arrange
            const string SpName = "Agent4";
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>();

            DataAccess.GetObjectDb(Arg.Is(SpName)).Returns(ObjectDb);

            Reader.Read().Returns(true, false);
            Reader.FieldCount.Returns(1);
            Reader.GetName(0).Returns("custid");

            var readerDataMapping = new
            {
                custid = 2
            };
            MapReaderData(readerDataMapping);

            // Action
            var result = await DataAccess.GetAgentWinlossDetail(metaModel, UserCurrencyList, SpName);

            // Assert
            Assert.That(result.DataList.First().CustomerId, Is.EqualTo(readerDataMapping.custid));
        }

        [Test]
        public async Task GetData_HasWinlostDateColumn_ReturnCorrectData()
        {
            // Arrange
            const string SpName = "Agent5";
            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>();

            DataAccess.GetObjectDb(Arg.Is(SpName)).Returns(ObjectDb);

            Reader.Read().Returns(true, false);
            Reader.FieldCount.Returns(1);
            Reader.GetName(0).Returns("winlostdate");

            var readerDataMapping = new
            {
                winlostdate = new DateTime(2017, 1, 2)
            };
            MapReaderData(readerDataMapping);

            // Action
            var result = await DataAccess.GetAgentWinlossDetail(metaModel, UserCurrencyList, SpName);

            // Assert
            Assert.That(result.DataList.First().Date, Is.EqualTo(readerDataMapping.winlostdate));
        }

        [Test]
        public async Task ReadSummaryTotal_HasDefaultBaseCurrency_ReturnCorrectResult()
        {
            // Arrange
            const string SpName = "Summary1";

            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>(x => x.DefaultBaseCurrency, "aaa");

            DataAccess.GetObjectDb(Arg.Is(SpName)).Returns(ObjectDb);

            Reader.Read().Returns(true, false);
            var readerDataMapping = new
            {
                winlostUSD = 100,
                winlost = 200,
                winlostBase = 300
            };

            MapReaderData(readerDataMapping);

            // Action
            var result = await DataAccess.GetSummaryWinloss(metaModel, UserCurrencyList, SpName);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.DataList.Count, Is.EqualTo(1));
                Assert.That(result.DataList.First().CustomerWinLoss, Is.EqualTo(readerDataMapping.winlost));

                Assert.That(result.SummaryTotal["USD"].CustomerWinLoss, Is.EqualTo(readerDataMapping.winlostUSD));
                Assert.That(result.SummaryTotal[metaModel.DefaultBaseCurrency.ToUpperInvariant()].CustomerWinLoss, Is.EqualTo(readerDataMapping.winlostBase));
            });
        }

        [TestCase(null)]
        [TestCase("")]
        public async Task ReadSummaryTotal_DoNotHaveDefaultBaseCurrency_ReturnCorrectResult(string defaultBaseCurrency)
        {
            // Arrange
            const string SpName = "Summary2";

            var metaModel = FakeHelper.Create<ThirdPartyWinLossMetaModel>(x => x.DefaultBaseCurrency, defaultBaseCurrency);

            DataAccess.GetObjectDb(Arg.Is(SpName)).Returns(ObjectDb);

            Reader.Read().Returns(true, false);
            var readerDataMapping = new
            {
                winlostUSD = 100,
                winlostBase = 300
            };

            MapReaderData(readerDataMapping);

            // Action
            var result = await DataAccess.GetSummaryWinloss(metaModel, UserCurrencyList, SpName);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.SummaryTotal.Count, Is.EqualTo(SystemConstants.BaseCurrencyListOfSummaryTotalRow.Count));
            });
        }

        private void AssertCommonSpParameters(ThirdPartyWinLossMetaModel metaModel, bool isDrilldown)
        {
            ObjectDb.Received(1).SetParameterValue("AgentList", metaModel.AgentListXml);
            ObjectDb.Received(1).SetParameterValue("fromdate", isDrilldown ? metaModel.DrillDownFromDate : metaModel.FromDate.Date);
            ObjectDb.Received(1).SetParameterValue("todate", isDrilldown ? metaModel.DrillDownToDate : metaModel.ToDate.Date);
            ObjectDb.Received(1).SetParameterValue("BaseCurrency", metaModel.BaseCurrency);
            ObjectDb.Received(1).SetParameterValue("DefaultBaseCurrency", metaModel.DefaultBaseCurrency);
        }
    }
}