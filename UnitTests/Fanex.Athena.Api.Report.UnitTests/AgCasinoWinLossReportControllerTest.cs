namespace Fanex.Athena.Api.Report.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Base.UnitTests;

    using DataAccess.Report.Interfaces;

    using Fanex.Athena.Excel.Report;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Service.Core.Utility.Interfaces;

    using Model.Core.ResultModel;
    using Model.Report.DTO;
    using Model.Report.MetaModel;

    using NPOI.SS.UserModel;

    using NSubstitute;

    using NUnit.Framework;

    public class AgCasinoWinLossReportControllerTest : BaseApiControllerHelperTest
    {
        private IThirdPartyWinLossDataAccess<ThirdPartyWinLoss> _dataAccess;
        private AgCasinoWinLossReportController _controller;
        private ICurrencyValidation _currencyValidation;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            MockSessionData();
        }

        [SetUp]
        public void SetUp()
        {
            _currencyValidation = Substitute.For<ICurrencyValidation>();
            _currencyValidation.IsValidCurrency(Arg.Any<int>(), Arg.Any<bool>()).Returns(true);

            _dataAccess = Substitute.For<IThirdPartyWinLossDataAccess<ThirdPartyWinLoss>>();
            CreateController();
            StubUserSessionData(new UserAuthInfo
            {
                CurrencyList = new Dictionary<int, string>(),
                CurrencyAgentList = new Dictionary<int, int[]>()
            });
            StubLicenseeSessionData(new LicenseeAuthInfo { LicenseeId = 0 });
        }

        private void CreateController()
        {
            _controller = Substitute.ForPartsOf<AgCasinoWinLossReportController>(_dataAccess,
                LangService, _currencyValidation);
            _controller.SessionService = SessionService;
            _controller.ProductService = ProductService;
            _controller.When(x => x.ExcelStream(Arg.Any<IWorkbook>(), Arg.Any<string>())).DoNotCallBase();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();
        }

        [TearDown]
        public void TearDown()
        {
            _currencyValidation = null;
            SessionService.ClearReceivedCalls();
            _dataAccess.ClearReceivedCalls();
            _dataAccess = null;
            _controller.ClearReceivedCalls();
            _controller.Dispose();
            _controller = null;
        }

        [Test]
        public async Task Index_InvalidCurrency_ReturnEmptyData()
        {
            // Arrange
            _currencyValidation.IsValidCurrency(Arg.Any<int>(), Arg.Any<bool>()).Returns(false);

            var model = new ThirdPartyWinLossMetaModel
            {
                CurrencyId = 1
            };

            // Action
            var result = await _controller.Index(model);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.IsEmpty(result.Data);
                Assert.IsEmpty(result.Total);
                Assert.IsEmpty(result.SummaryTotal);
            });
        }

        [Test]
        public async Task Index_NoDataReturnedFromService_ReturnEmptyData()
        {
            // Arrange
            var metaModel = new ThirdPartyWinLossMetaModel
            {
                CurrencyId = -1
            };

            _dataAccess.GetSummaryWinloss(Arg.Any<ThirdPartyWinLossMetaModel>(), UserCurrencyList, string.Empty).ReturnsForAnyArgs(x =>
            {
                return new SortableReportResultModel<ThirdPartyWinLoss>();
            });

            // Action
            var result = await _controller.Index(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.IsEmpty(result.Data);
                Assert.IsEmpty(result.Total);
                Assert.IsEmpty(result.SummaryTotal);
            });
        }

        [Test]
        public void Index_ValidModelLevel0_CallServiceWithCorrectParameter()
        {
            // Arrange
            var model = new ThirdPartyWinLossMetaModel
            {
                CurrencyId = -1
            };

            SetUpForGettingData();

            // Action
            _controller.Index(model);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(model.DrillDownLevel, Is.Zero);
                Assert.That(model.DrillDownCustomerId, Is.Zero);
                _dataAccess.Received().GetSummaryWinloss(model, UserCurrencyList, "Lrf_Rpt_AGCasinoWinloss");
            });
        }

        [Test]
        public async Task Index_ValidModelLevel0_ReturnCorrectData()
        {
            // Arrange
            var model = new ThirdPartyWinLossMetaModel
            {
                CurrencyId = -1
            };

            var expectedData = SetUpForGettingData();

            // Action
            var result = await _controller.Index(model);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Data, Is.EqualTo(expectedData.DataList));
                Assert.That(result.Total, Is.EqualTo(expectedData.TotalDataList));
                Assert.That(result.SummaryTotal, Is.EqualTo(expectedData.SummaryTotal));
            });
        }

        [Test]
        public async Task Index_ValidModelLevel1_ReturnCorrectData()
        {
            // Arrange
            const int Level = 1;

            var model = new ThirdPartyWinLossMetaModel
            {
                CurrencyId = -1
            };

            var expectedData = SetUpForGettingData(1);

            // Action
            var result = await _controller.Index(model, DateTime.Now, DateTime.Now.AddDays(1), Level);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Data, Is.EqualTo(expectedData.DataList));
                Assert.That(result.Total, Is.EqualTo(expectedData.TotalDataList));
                Assert.That(result.SummaryTotal, Is.EqualTo(expectedData.SummaryTotal));
            });
        }

        [Test]
        public async Task Index_ValidModelLevel2_ReturnCorrectData()
        {
            // Arrange
            const int Level = 2;

            var model = new ThirdPartyWinLossMetaModel
            {
                CurrencyId = -1
            };

            var expectedData = SetUpForGettingData(2);

            // Action
            var result = await _controller.Index(model, DateTime.Now, DateTime.Now.AddDays(1), Level);

            // Assert
            Assert.Multiple(() =>
            {
                _dataAccess.ReceivedWithAnyArgs().GetCustomerWinlossDetail(model, UserCurrencyList, "LRF_Rpt_AGCasinoWinloss_Mem");
                Assert.That(result.Data, Is.EqualTo(expectedData.DataList));
                Assert.That(result.Total, Is.EqualTo(expectedData.TotalDataList));
                Assert.That(result.SummaryTotal, Is.EqualTo(expectedData.SummaryTotal));
            });
        }

        [Test]
        public void Index_ExportExcelLevel0_ExportWithCorrectData()
        {
            // Arrange
            StubUserSessionData(new UserAuthInfo
            {
                CurrencyList = new Dictionary<int, string> { { 0, "CurrencyName0" }, { 1, "CurrencyName1" } },
                CurrencyAgentList = new Dictionary<int, int[]>()
            });

            var model = new ThirdPartyWinLossMetaModel
            {
                CurrencyId = 0,
                IsExportExcel = true,
                DrillDownCurrencyId = 1,
                FromDate = DateTime.Now,
                ToDate = DateTime.Now.AddDays(1)
            };

            var expectedFileName = $"AGWinLoss_{model.FromDate:ddMMMyyyy}_All.xls";

            SetUpForGettingData();
            SetUpForExportExcel();

            // Action
            _controller.Index(model);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(model.FromDate, Is.Not.EqualTo(model.DrillDownFromDate));
                Assert.That(model.ToDate, Is.Not.EqualTo(model.DrillDownToDate));
                _controller.Received().ExcelStream(Arg.Any<IWorkbook>(), expectedFileName);
            });
        }

        [TestCase(1)]
        [TestCase(2)]
        public void Index_ExportExcel_ExportWithCorrectData(int level)
        {
            // Arrange
            var currencyId = 2;

            StubUserSessionData(new UserAuthInfo
            {
                CurrencyList = new Dictionary<int, string> { { 1, "CurrencyName1" }, { 2, "CurrencyName2" } },
                CurrencyAgentList = new Dictionary<int, int[]>()
            });

            var model = new ThirdPartyWinLossMetaModel
            {
                CurrencyId = 1,
                IsExportExcel = true,
                FromDate = DateTime.Now.AddDays(-2),
                ToDate = DateTime.Now.AddDays(-1)
            };

            var fdate = DateTime.Now;
            var tdate = DateTime.Now.AddDays(1);
            var custId = 4;

            var expectedFileName = $"AGWinLoss_{fdate:ddMMMyyyy}_CurrencyName2.xls";

            SetUpForGettingData(level);
            SetUpForExportExcel();

            // Action
            _controller.Index(model, fdate, tdate, level, currencyId, custId);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(model.CurrencyId, Is.EqualTo(model.DrillDownCurrencyId));
                Assert.That(model.FromDate, Is.EqualTo(model.DrillDownFromDate));
                Assert.That(model.ToDate, Is.EqualTo(model.DrillDownToDate));
                _controller.Received().ExcelStream(Arg.Any<IWorkbook>(), expectedFileName);
            });
        }

        private ReportResultModel<ThirdPartyWinLoss> SetUpForGettingData(int level = 0)
        {
            var expectedData = new ReportResultModel<ThirdPartyWinLoss>
            {
                DataList = new List<ThirdPartyWinLoss> { new ThirdPartyWinLoss { Index = 1 } },
                TotalDataList = new List<ThirdPartyWinLoss> { new ThirdPartyWinLoss() },
                SummaryTotal = new Dictionary<string, ThirdPartyWinLoss> { { nameof(ThirdPartyWinLoss), new ThirdPartyWinLoss() } }
            };

            if (level == 0)
            {
                _dataAccess.GetSummaryWinloss(Arg.Any<ThirdPartyWinLossMetaModel>(), UserCurrencyList, "Lrf_Rpt_AGCasinoWinloss").Returns(expectedData);
            }
            else if (level == 1)
            {
                _dataAccess.GetAgentWinlossDetail(Arg.Any<ThirdPartyWinLossMetaModel>(), UserCurrencyList, "LRF_Rpt_AGCasinoWinloss_Ag").Returns(expectedData);
            }
            else
            {
                _dataAccess.GetCustomerWinlossDetail(Arg.Any<ThirdPartyWinLossMetaModel>(), UserCurrencyList, "LRF_Rpt_AGCasinoWinloss_Mem").Returns(expectedData);
            }

            return expectedData;
        }

        private void SetUpForExportExcel()
        {
            var excel = Substitute.ForPartsOf<ThirdPartyWinLossExcel<ThirdPartyWinLoss>>(
                   Arg.Any<string>(),
                   new ThirdPartyWinLossMetaModel(),
                   new ReportResultModel<ThirdPartyWinLoss>()
                   {
                       DataList = new ThirdPartyWinLoss[] { }
                   });
            excel.When(x => x.Export()).DoNotCallBase();

            _controller.CreateExcel(
                   Arg.Any<string>(),
                   new ThirdPartyWinLossMetaModel(),
                   new ReportResultModel<ThirdPartyWinLoss>()).ReturnsForAnyArgs(excel);
        }
    }
}