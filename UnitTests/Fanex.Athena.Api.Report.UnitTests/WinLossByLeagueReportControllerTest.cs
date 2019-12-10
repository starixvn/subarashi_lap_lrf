namespace Fanex.Athena.Api.Report.UnitTests
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Threading.Tasks;

    using Base.UnitTests;
    using DataAccess.Report.Interfaces;

    using Excel.Report;

    using Extension.Utility;

    using Fanex.Athena.Model.Core.MetaModel.Product;
    using Model.Core.ResultModel;
    using Model.Report.DTO;
    using Model.Report.MetaModel;

    using NPOI.SS.UserModel;

    using NSubstitute;

    using NUnit.Framework;

    using Report;

    public class WinLossByLeagueReportControllerTest : BaseApiControllerHelperTest
    {
        private IWinLossByLeagueDataAccess _dataAccess;
        private WinLossByLeagueReportController _controller;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            _dataAccess = Substitute.For<IWinLossByLeagueDataAccess>();
            CreateController();

            MockSessionData();
        }

        private void CreateController()
        {
            var appSettings = Substitute.For<IAppSettings>();
            _controller = Substitute.ForPartsOf<WinLossByLeagueReportController>(
                            LangService,
                            _dataAccess,
                            appSettings);
            _controller.SessionService = SessionService;
            _controller.ProductService = ProductService;
            _controller.Request = new HttpRequestMessage();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _dataAccess = null;
            _controller = null;
        }

        [Test]
        public async Task Index_Level0_GetCorrectDataFromService()
        {
            // Arrange
            var dataListResult = new List<WinLossByLeague>
            {
                new WinLossByLeague
                {
                    BetCount = 100
                },
                new WinLossByLeague
                {
                    BetCount = 200
                }
            };

            _dataAccess.GetSummary(Arg.Any<WinLossByLeagueMetaModel>()).Returns(dataListResult);

            // Action
            var result = await _controller.Index(new WinLossByLeagueMetaModel
            {
                CurrencyId = 1
            });

            // Assert
            Assert.Multiple(() =>
            {
                _dataAccess.Received().GetSummary(Arg.Any<WinLossByLeagueMetaModel>());
                Assert.That(result.Data.Count, Is.EqualTo(2));
                Assert.That(result.Total.BetCount, Is.EqualTo(300));
            });
        }

        [Test]
        public async Task Index_Level1_GetCorrectDataFromService()
        {
            // Arrange
            const decimal ExpectedAmountDue = 999;
            const int ExpectedTotalRows = 1000;
            var dataListResult = new List<WinLossByLeague>
            {
                new WinLossByLeague()
            };
            var expectedResult = new ReportResultModel<WinLossByLeague>
            {
                DataList = dataListResult,
                TotalData = new WinLossByLeague
                {
                    AmountDue = ExpectedAmountDue
                },
                TotalRows = ExpectedTotalRows
            };

            _dataAccess.GetCustomers(Arg.Any<WinLossByLeagueMetaModel>())
                .ReturnsForAnyArgs(expectedResult);

            // Action
            var result = await _controller.Index(new WinLossByLeagueMetaModel
            {
                Level = 1,
                CurrencyId = 1
            });

            // Assert
            Assert.Multiple(() =>
            {
                _dataAccess.ReceivedWithAnyArgs().GetCustomers(Arg.Any<WinLossByLeagueMetaModel>());
                Assert.That(result.Total.AmountDue, Is.EqualTo(ExpectedAmountDue));
                Assert.That(result.TotalRows, Is.EqualTo(ExpectedTotalRows));
                Assert.That(result.Data.Count, Is.EqualTo(1));
            });
        }

        [Test]
        public async Task Excel_ValidModel_ExportWithCorrectData()
        {
            // Arrange
            var metaModel = new WinLossByLeagueMetaModel
            {
                CurrencyId = 1,
                BaseCurrency = "USD",
                ProductOptions = new List<ProductOption> { new ProductOption { Status = true, Code = "SB" } }
            };
            var excel = Substitute.ForPartsOf<WinlossByLeagueExcel>(
                string.Empty,
                new ReportResultModel<WinLossByLeague>
                {
                    DataList = new List<WinLossByLeague> { new WinLossByLeague { } },
                    TotalData = new WinLossByLeague()
                },
                metaModel,
                true);
            excel.When(x => x.Export()).DoNotCallBase();

            ReportResultModel<WinLossByLeague> resultModel = null;
            _controller.CreateExcel(
                Arg.Any<string>(),
                Arg.Do<ReportResultModel<WinLossByLeague>>(x => resultModel = x),
                Arg.Any<WinLossByLeagueMetaModel>())
                .Returns(excel);
            _controller.When(x => x.ExcelStream(Arg.Any<IWorkbook>(), Arg.Any<string>())).DoNotCallBase();
            _dataAccess.GetSummary(metaModel).Returns(new List<WinLossByLeague>
            {
                new WinLossByLeague()
            });

            // Action
            await _controller.Excel(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                excel.Received().Export();
                _controller.Received().ExcelStream(Arg.Any<IWorkbook>(), Arg.Any<string>());
                Assert.That(resultModel.DataList.Count(), Is.EqualTo(1));
                Assert.That(metaModel.PageIndex, Is.EqualTo(1));
                Assert.That(metaModel.PageSize, Is.EqualTo(int.MaxValue - 1));
            });
        }
    }
}