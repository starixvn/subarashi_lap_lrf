namespace Fanex.Athena.DataAccess.Report.UnitTests
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;

    using Core.UnitTests.TestHelpers;

    using Data;

    using Model.Report.MetaModel;

    using NSubstitute;

    using NUnit.Framework;

    [TestFixture]
    public class SpecialLicenseeWinLossDataAccessTest : BaseDataAccessHelperTest<SpecialLicenseeWinLossDataAccess>
    {
        private const string Sp = "Lrf_Rpt_LicWinloss_FromAPI";

        private SpecialLicenseeWinLossMetaModel _metaModel;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            ObjectDb = Substitute.For<IObjectDb>();
            DataAccess = Substitute.ForPartsOf<SpecialLicenseeWinLossDataAccess>();
            _metaModel = new SpecialLicenseeWinLossMetaModel
            {
                CurrencyId = 1,
                FromDate = new DateTime(2018, 1, 1),
                ToDate = new DateTime(2018, 2, 2),
                ProductCodeList = new[] { "SB", "invalid" },
                BaseCurrency = "USD",
                ReportBy = 1,
                BaseCurrencySetting = "USD,invalid",
                SiteName = "SiteName",
                CurrencyListXml = "<ROOT></ROOT>",
                DefaultBaseCurrency = "AAA"
            };
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            _metaModel = null;

            base.FixtureTearDown();
        }

        [Test]
        public async Task GetData_WhenCall_ParametersPassedCorrectly()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(Sp)).Returns(ObjectDb);

            // Action
            await DataAccess.GetData(_metaModel, UserCurrencyList);

            // Assert
            Assert.Multiple(() =>
            {
                ObjectDb.Received(1).SetParameterValue("fromdate", _metaModel.FromDate);
                ObjectDb.Received(1).SetParameterValue("todate", _metaModel.ToDate);
                ObjectDb.Received(1).SetParameterValue("reporttype", _metaModel.ReportBy);
                ObjectDb.Received(1).SetParameterValue("productCodes", string.Join(",", _metaModel.ProductCodeList));
                ObjectDb.Received(1).SetParameterValue("currencylist", _metaModel.CurrencyListXml);
                ObjectDb.Received(1).SetParameterValue("siteName", _metaModel.SiteName);
            });
        }

        [Test]
        public async Task ReadData_WhenCall_ReturnCorrectResult()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is(Sp)).Returns(ObjectDb);

            Reader.Read().Returns(true, false);
            Reader.FieldCount.Returns(6);
            Reader.GetName(0).Returns("LicenseeWLSB");
            Reader.GetName(1).Returns("turnoverSB");
            Reader.GetName(2).Returns("LicenseeWLSBUSD");
            Reader.GetName(3).Returns("turnoverSBUSD");
            Reader.GetName(4).Returns("LicenseeWLSBBase");
            Reader.GetName(5).Returns("turnoverSBBase");

            var readerDataMapping = new
            {
                LicenseeWLSB = 10,
                turnoverSB = 50,
                LicenseeWLSBUSD = 100,
                turnoverSBUSD = 200,
                LicenseeWLSBBase = 300,
                turnoverSBBase = 400,
                reporttype = "20170101",
                currencyid = CurrencyId
            };
            MapReaderData(readerDataMapping);

            // Action
            var result = await DataAccess.GetData(_metaModel, UserCurrencyList);
            var firstItem = result.DataList.First();
            var firstTotalItem = result.TotalDataList.First();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.DataList.Count, Is.EqualTo(1));
                Assert.That(firstItem.LicenseeWL["SB"], Is.EqualTo(10));
                Assert.That(firstItem.TurnOver["SB"], Is.EqualTo(50));

                Assert.That(firstTotalItem.CurrencyName, Is.EqualTo(CurrencyName));
                Assert.That(firstTotalItem.LicenseeWL["SB"], Is.EqualTo(10));
                Assert.That(firstTotalItem.LicenseeWL.ContainsKey("invalid"), Is.False);
                Assert.That(firstTotalItem.TurnOver["SB"], Is.EqualTo(50));
                Assert.That(firstTotalItem.TurnOver.ContainsKey("invalid"), Is.False);

                Assert.That(result.SummaryTotal["USD"].LicenseeWL["SB"], Is.EqualTo(100));
                Assert.That(result.SummaryTotal["USD"].TurnOver["SB"], Is.EqualTo(200));
                Assert.That(result.SummaryTotal["AAA"].LicenseeWL["SB"], Is.EqualTo(300));
                Assert.That(result.SummaryTotal["AAA"].TurnOver["SB"], Is.EqualTo(400));
                Assert.That(result.SummaryTotal.ContainsKey("invalid"), Is.False);
            });
        }
    }
}