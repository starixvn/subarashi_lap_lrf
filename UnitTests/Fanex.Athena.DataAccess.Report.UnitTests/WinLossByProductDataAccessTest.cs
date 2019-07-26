namespace Fanex.Athena.DataAccess.Report.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Core.Configuration.Interfaces;
    using Core.UnitTests.TestHelpers;

    using Extension.Helper;

    using Model.Core.DataDomain;
    using Model.Core.DTO.Configuration;
    using Model.Core.MetaModel.Product;
    using Model.Report.MetaModel;

    using NSubstitute;

    using NUnit.Framework;

    using UnitTest.Common.Helpers;

    [TestFixture]
    public class WinLossByProductDataAccessTest : BaseDataAccessHelperTest<WinLossByProductDataAccess>
    {
        private const string GetWinlossByProductsSp = "Lrf_Rpt_WinlossByProduct";
        private const string GetWinlossByProductAgentsSp = "Lrf_Rpt_WinlossByProductDetail_Ag";
        private const string GetWinlossByProductCustomersSp = "Lrf_Rpt_WinlossByProductDetail";

        private readonly BalanceUp _balanceUp = new BalanceUp
        {
            BalanceUpDay = new DateTime(2018, 1, 1),
            MoveBetsDay = new DateTime(2018, 2, 2),
        };

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();
        }

        protected override void SetUpDataAccess()
        {
            var balanceUpDataAccess = Substitute.For<IBalanceUpDataAccess>();
            balanceUpDataAccess.GetBalanceUp().Returns(_balanceUp);

            DataAccess = Substitute.ForPartsOf<WinLossByProductDataAccess>(
                balanceUpDataAccess);
        }

        [Test]
        public async Task GetWinlossByProducts_WhenCall_ParametersPassedCorrectly()
        {
            // Arrange
            var products = new List<ProductOption>
            {
                new ProductOption { Code = "A", Status = false },
                new ProductOption { Code = "B", Status = true },
                new ProductOption { Code = "C", Status = true }
            };
            var metaModel = FakeHelper.Create<WinLossByProductMetaModel>(x => x.ProductOptions, products);

            DataAccess.GetObjectDb(Arg.Is(GetWinlossByProductsSp)).Returns(ObjectDb);

            // Action
            await DataAccess.GetWinlossByProducts(metaModel, UserCurrencyList).ConfigureAwait(false);

            // Assert
            Assert.Multiple(() =>
            {
                ObjectDb.Received(1).SetParameterValue("reporttype", metaModel.ReportBy);
                ObjectDb.Received(1).SetParameterValue("username", metaModel.Username);
                ObjectDb.Received(1).SetParameterValue("productList", "B,C");
                AssertCommonSpParameters(metaModel, isDrilldown: false);
            });
        }

        [TestCase(true)]
        [TestCase(false)]
        public async Task GetWinlossByProducts_WhenCall_ReturnCorrectResult(bool isMonthly)
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetWinlossByProductsSp)).Returns(ObjectDb);

            ObjectDb.GetParameterValue("CustID").Returns(1000);
            ObjectDb.GetParameterValue("SystemName").Returns("ABC");
            Reader.Read().Returns(true, false);

            var readerDataMapping = new
            {
                Turnover = 999,
                reporttype = "20190101"
            };
            MapReaderData(readerDataMapping);

            // Action
            var result = await DataAccess.GetWinlossByProducts(
                new WinLossByProductMetaModel
                {
                    BaseCurrency = "USD",
                    ReportBy = isMonthly ? (byte)ReportByType.Monthly : (byte)ReportByType.Daily
                },
                UserCurrencyList).ConfigureAwait(false);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.DataList.Count(), Is.EqualTo(1));
                Assert.That(result.DataList.ElementAt(0).TurnOver, Is.EqualTo(readerDataMapping.Turnover));
                Assert.That(result.DataList.ElementAt(0).Date, Is.EqualTo(ConvertHelper.ToDateTime(readerDataMapping.reporttype, isMonthly)));

                Assert.That(result.ResultInfo.ExtendedData, Is.EqualTo("1000;ABC"));
            });
        }

        [Test]
        public async Task CalculateSummaryTotal_HasDefaultBaseCurrency_ReturnCorrectResult()
        {
            // Arrange
            var metaModel = new WinLossByProductMetaModel
            {
                DefaultBaseCurrency = "aaa"
            };

            DataAccess.GetObjectDb(Arg.Is(GetWinlossByProductAgentsSp)).Returns(ObjectDb);

            Reader.Read().Returns(true, false);

            var readerDataMapping = new
            {
                Turnover = 100,
                reporttype = "20190101",
                TurnoverUSD = 200,
                TurnoverBase = 300,
                ProductCode = "Code"
            };
            MapReaderData(readerDataMapping);

            // Action
            var result = await DataAccess.GetWinlossByProductAgents(
                metaModel,
                UserCurrencyList).ConfigureAwait(false);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.SummaryTotal.ContainsKey(metaModel.DefaultBaseCurrency.ToUpperInvariant()), Is.True);
                Assert.That(result.SummaryTotal["USD"].ElementAt(0).TurnOver, Is.EqualTo(readerDataMapping.TurnoverUSD));
                Assert.That(result.SummaryTotal[metaModel.DefaultBaseCurrency.ToUpperInvariant()].ElementAt(0).TurnOver, Is.EqualTo(readerDataMapping.TurnoverBase));
            });
        }

        [TestCase(null)]
        [TestCase("")]
        public async Task CalculateSummaryTotal_DoNotHaveDefaultBaseCurrency_ReturnCorrectResult(string defaultBaseCurrency)
        {
            // Arrange
            var metaModel = new WinLossByProductMetaModel { DefaultBaseCurrency = defaultBaseCurrency };

            DataAccess.GetObjectDb(Arg.Is(GetWinlossByProductAgentsSp)).Returns(ObjectDb);

            Reader.Read().Returns(true, false);

            var readerDataMapping = new
            {
                reporttype = "20190101",
                TurnoverBase = 300,
                ProductCode = "Code"
            };
            MapReaderData(readerDataMapping);

            // Action
            var result = await DataAccess.GetWinlossByProductAgents(
                metaModel,
                UserCurrencyList).ConfigureAwait(false);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.SummaryTotal.Count, Is.EqualTo(SystemConstants.BaseCurrencyListOfSummaryTotalRow.Count));
            });
        }

        [Test]
        public async Task GetWinlossByProductAgents_WhenCall_ParametersPassedCorrectly()
        {
            // Arrange
            var products = new List<ProductOption>
            {
                new ProductOption { Code = "A", Status = true },
                new ProductOption { Code = "B", Status = false },
                new ProductOption { Code = "C", Status = true }
            };
            var metaModel = FakeHelper.Create<WinLossByProductMetaModel>(x => x.ProductOptions, products);
            DataAccess.GetObjectDb(Arg.Is(GetWinlossByProductAgentsSp)).Returns(ObjectDb);

            // Action
            await DataAccess.GetWinlossByProductAgents(metaModel, UserCurrencyList).ConfigureAwait(false);

            // Assert
            Assert.Multiple(() =>
            {
                ObjectDb.Received(1).SetParameterValue("CustID", metaModel.MemberId);
                ObjectDb.Received(1).SetParameterValue("productList", "A,C");
                AssertCommonSpParameters(metaModel, isDrilldown: true);
            });
        }

        [Test]
        public async Task GetWinlossByProductCustomers_WhenCall_ParametersPassedCorrectly()
        {
            // Arrange
            var products = new List<ProductOption>
            {
                new ProductOption { Code = "A", Status = true },
                new ProductOption { Code = "B", Status = false },
                new ProductOption { Code = "C", Status = false }
            };
            var metaModel = FakeHelper.Create<WinLossByProductMetaModel>(x => x.ProductOptions, products);
            DataAccess.GetObjectDb(Arg.Is(GetWinlossByProductCustomersSp)).Returns(ObjectDb);

            // Action
            await DataAccess.GetWinlossByProductCustomers(metaModel, UserCurrencyList).ConfigureAwait(false);

            // Assert
            Assert.Multiple(() =>
            {
                ObjectDb.Received(1).SetParameterValue("custid", metaModel.CustomerId);
                ObjectDb.Received(1).SetParameterValue("MemberID", metaModel.MemberId);
                ObjectDb.Received(1).SetParameterValue("productList", "A");
                AssertCommonSpParameters(metaModel, isDrilldown: true);
            });
        }

        [Test]
        public async Task GetData_HasSystemIdColumn_ReturnCorrectData()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetWinlossByProductCustomersSp)).Returns(ObjectDb);

            Reader.Read().Returns(true, false);
            Reader.FieldCount.Returns(1);
            Reader.GetName(0).Returns("username");
            ObjectDb.GetParameterValue("CustID").Returns(1000);
            ObjectDb.GetParameterValue("SystemName").Returns("ABC");

            var readerDataMapping = new
            {
                username = "Test"
            };
            MapReaderData(readerDataMapping);

            // Action
            var result = await DataAccess.GetWinlossByProductCustomers(
                new WinLossByProductMetaModel
                {
                    BaseCurrency = string.Empty
                },
                UserCurrencyList);

            // Assert
            Assert.That(result.DataList.ElementAt(0).SystemId, Is.EqualTo(readerDataMapping.username));
        }

        [Test]
        public async Task GetData_HasExternalIdColumn_ReturnCorrectData()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetWinlossByProductCustomersSp)).Returns(ObjectDb);

            Reader.Read().Returns(true, false);
            Reader.FieldCount.Returns(1);
            Reader.GetName(0).Returns("nickname");
            ObjectDb.GetParameterValue("CustID").Returns(1000);
            ObjectDb.GetParameterValue("SystemName").Returns("ABC");

            var readerDataMapping = new
            {
                nickname = "Test"
            };
            MapReaderData(readerDataMapping);

            // Action
            var result = await DataAccess.GetWinlossByProductCustomers(
                new WinLossByProductMetaModel
                {
                    BaseCurrency = string.Empty
                },
                UserCurrencyList).ConfigureAwait(false);

            // Assert
            Assert.That(result.DataList.ElementAt(0).ExternalId, Is.EqualTo(readerDataMapping.nickname));
        }

        [Test]
        public async Task GetData_HasCustomerIdColumn_ReturnCorrectData()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(GetWinlossByProductCustomersSp)).Returns(ObjectDb);

            Reader.Read().Returns(true, false);
            Reader.FieldCount.Returns(1);
            Reader.GetName(0).Returns("custid");
            ObjectDb.GetParameterValue("CustID").Returns(1000);
            ObjectDb.GetParameterValue("SystemName").Returns("ABC");

            var readerDataMapping = new
            {
                custid = 321
            };
            MapReaderData(readerDataMapping);

            // Action
            var result = await DataAccess.GetWinlossByProductCustomers(
                new WinLossByProductMetaModel
                {
                    BaseCurrency = string.Empty
                },
                UserCurrencyList).ConfigureAwait(false);

            // Assert
            Assert.That(result.DataList.ElementAt(0).CustomerId, Is.EqualTo(readerDataMapping.custid));
        }

        private void AssertCommonSpParameters(WinLossByProductMetaModel metaModel, bool isDrilldown)
        {
            ObjectDb.Received(1).SetParameterValue("AgentList", metaModel.AgentListXml);
            ObjectDb.Received(1).SetParameterValue("fromdate", isDrilldown ? metaModel.DrillDownFromDate.Date : metaModel.FromDate.Date);
            ObjectDb.Received(1).SetParameterValue("todate", isDrilldown ? metaModel.DrillDownToDate.Date : metaModel.ToDate.Date);
            ObjectDb.Received(1).SetParameterValue("drawfilter", metaModel.DrawFilter);
            ObjectDb.Received(1).SetParameterValue("movebetsday", _balanceUp.MoveBetsDay);
            ObjectDb.Received(1).SetParameterValue("BaseCurrency", metaModel.BaseCurrency);
            ObjectDb.Received(1).SetParameterValue("DefaultBaseCurrency", metaModel.DefaultBaseCurrency);
        }
    }
}