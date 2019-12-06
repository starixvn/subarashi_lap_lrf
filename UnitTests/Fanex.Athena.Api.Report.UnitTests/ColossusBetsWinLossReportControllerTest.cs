namespace Fanex.Athena.Api.Report.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Base.UnitTests;

    using Excel.Report;

    using Extension.Utility;

    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Service.Core.Utility.Interfaces;
    using Fanex.Athena.Service.Report.Interfaces;

    using Model.Core.ResultModel;
    using Model.Report.DTO;
    using Model.Report.MetaModel;
    using Model.Report.ViewModel;

    using NPOI.SS.UserModel;

    using NSubstitute;

    using NUnit.Framework;

    public class ColossusBetsWinLossReportControllerTest : BaseApiControllerHelperTest
    {
        private IColossusBetsWinLossService _service;
        private ColossusBetsWinLossReportController _controller;
        private ICurrencyValidation _currencyValidation;

        [SetUp]
        public void SetUp()
        {
            _currencyValidation = Substitute.For<ICurrencyValidation>();
            _currencyValidation.IsValidCurrency(Arg.Any<int>(), Arg.Any<bool>()).Returns(true);
            _service = Substitute.For<IColossusBetsWinLossService>();
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
            _controller = Substitute.ForPartsOf<ColossusBetsWinLossReportController>(_service,
                            LangService, _currencyValidation);
            _controller.SessionService = SessionService;
            _controller.ProductService = ProductService;

            _controller.When(x => x.ExcelStream(Arg.Any<IWorkbook>(), Arg.Any<string>())).DoNotCallBase();
        }

        [TearDown]
        public void TearDown()
        {
            _currencyValidation = null;
            _controller = null;
            _service = null;
        }

        [Test]
        public async Task Index_InvalidCurrency_ReturnEmptyData()
        {
            // Arrange
            _currencyValidation.IsValidCurrency(Arg.Any<int>(), Arg.Any<bool>()).Returns(false);
            var model = new ColossusBetsWinLossMetaModel
            {
                IsExportExcel = false,
                CurrencyId = 1,
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
            var metaModel = CreateValidMetaModel();

            _service.GetSummaryWinloss(Arg.Any<ColossusBetsWinLossMetaModel>(), Arg.Any<IDictionary<int, string>>()).Returns(
                new SortableReportResultModel<ColossusBetWinLoss>());

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
        public async Task Index_ValidModelLevel0_CallServiceWithCorrectParameter()
        {
            // Arrange
            var model = CreateValidMetaModel();

            SetUpForGettingData();

            // Action
            await _controller.Index(model);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(0, Is.EqualTo(model.DrillDownLevel));
                Assert.That(0, Is.EqualTo(model.DrillDownCustomerId));
                _service.ReceivedWithAnyArgs().GetSummaryWinloss(model, UserCurrencyList);
            });
        }

        [Test]
        public async Task Index_ValidModelLevel0_ReturnCorrectData()
        {
            // Arrange
            var model = CreateValidMetaModel();

            var expectedData = SetUpForGettingData();
            var expectedTotal = expectedData.DataList.AsEnumerable();

            // Action
            var result = await _controller.Index(model);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Data, Is.EqualTo(expectedData.DataList));
                Assert.That(result.Total, Is.EqualTo(expectedTotal));
                Assert.That(result.SummaryTotal, Is.EqualTo(expectedData.SummaryTotal));
            });
        }

        [Test]
        public async Task Index_ValidModelLevel1_CallServiceWithCorrectParameter()
        {
            // Arrange
            var model = CreateValidMetaModel();
            var level = 1;
            var fdate = DateTime.Now;
            var tdate = DateTime.Now.AddDays(1);
            var currencyId = 2;
            var custId = 3;

            SetUpForGettingData(level);

            // Action
            await _controller.Index(model, fdate, tdate, level, currencyId, custId);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(level, Is.EqualTo(model.DrillDownLevel));
                Assert.That(custId, Is.EqualTo(model.DrillDownCustomerId));
                Assert.That(fdate, Is.EqualTo(model.DrillDownFromDate));
                Assert.That(tdate, Is.EqualTo(model.DrillDownToDate));
                _service.ReceivedWithAnyArgs().GetWinlossDetail(model, UserCurrencyList);
            });
        }

        [Test]
        public async Task Index_ExportExcelLevel0_ExportWithCorrectData()
        {
            // Arrange
            var currencyId = 0;
            var drilldownCurrencyId = 1;
            var model = CreateValidMetaModel(currencyId, drilldownCurrencyId);
            model.IsExportExcel = true;
            var expectedFileName = $"ColossusBetsWinLoss_{model.FromDate:ddMMMyyy}_All.xls";
            SetUpForGettingData();

            var excel = Substitute.ForPartsOf<ColossusBetsWinLossExcel>(
                   Arg.Any<string>(),
                   Arg.Any<ColossusBetsWinLossMetaModel>(),
                   new ColossusBetWinLossViewModel
                   {
                       MainResult = new ColossusBetWinLoss[] { }
                   });
            excel.When(x => x.Export()).DoNotCallBase();

            _controller.CreateExcel(
                   Arg.Any<string>(),
                   Arg.Any<ColossusBetsWinLossMetaModel>(),
                   new ColossusBetWinLossViewModel
                   {
                       MainResult = new ColossusBetWinLoss[] { }
                   }).ReturnsForAnyArgs(excel);

            // Action
            await _controller.Index(model);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(model.FromDate, Is.Not.EqualTo(model.DrillDownFromDate));
                Assert.That(model.ToDate, Is.Not.EqualTo(model.DrillDownToDate));
                _controller.Received().ExcelStream(Arg.Any<IWorkbook>(), expectedFileName);
            });
        }

        [Test]
        public async Task Index_ExportExcelLevel1_ExportWithCorrectData()
        {
            // Arrange
            var modelCurrencyId = 1;
            var drilldownCurrencyId = 2;
            var model = CreateValidMetaModel(modelCurrencyId, drilldownCurrencyId);
            model.IsExportExcel = true;
            var level = 1;
            var fdate = new DateTime(2018, 01, 01);
            var tdate = new DateTime(2018, 01, 05);
            var currencyId = 3;
            var custId = 4;

            StubUserSessionData(new UserAuthInfo
            {
                CurrencyList = new Dictionary<int, string> {
                    { modelCurrencyId, "Currency" },
                    { drilldownCurrencyId, "Currency" },
                    { currencyId, "Currency" } },
                CurrencyAgentList = new Dictionary<int, int[]>()
            });

            var expectedFileName = $"ColossusBetsWinLoss_{fdate:ddMMMyyy}_Currency.xls";

            SetUpForGettingData(level);

            var excel = Substitute.ForPartsOf<ColossusBetsWinLossExcel>(
                   Arg.Any<string>(),
                   Arg.Any<ColossusBetsWinLossMetaModel>(),
                   new ColossusBetWinLossViewModel
                   {
                       MainResult = new ColossusBetWinLoss[] { }
                   });
            excel.When(x => x.Export()).DoNotCallBase();

            _controller.CreateExcel(
                   Arg.Any<string>(),
                   Arg.Any<ColossusBetsWinLossMetaModel>(),
                   new ColossusBetWinLossViewModel()).ReturnsForAnyArgs(excel);

            // Action
            await _controller.Index(model, fdate, tdate, level, currencyId, custId);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(model.DrillDownFromDate, Is.EqualTo(fdate));
                Assert.That(model.DrillDownToDate, Is.EqualTo(tdate));
                _controller.Received().ExcelStream(Arg.Any<IWorkbook>(), expectedFileName);
            });
        }

        private ColossusBetsWinLossMetaModel CreateValidMetaModel(int currencyId = 1, int drillDownCurrencyId = 2)
        {
            var model = new ColossusBetsWinLossMetaModel
            {
                CurrencyId = currencyId,
                AgentListXml = string.Empty,
                FromDate = DateTime.Now.AddDays(-2),
                ToDate = DateTime.Now.AddDays(-1),
                DrillDownCurrencyId = drillDownCurrencyId
            };
            StubUserSessionData(new UserAuthInfo
            {
                CurrencyList = new Dictionary<int, string>
                {
                    { currencyId, nameof(model.CurrencyId) },
                    { drillDownCurrencyId, nameof(model.DrillDownCurrencyId) },
                },
                CurrencyAgentList = new Dictionary<int, int[]>()
            });
            StubLicenseeSessionData(new LicenseeAuthInfo { LicenseeId = 0 });

            return model;
        }

        private SortableReportResultModel<ColossusBetWinLoss> SetUpForGettingData(int level = 0)
        {
            var expectedDataList = new SortableList<ColossusBetWinLoss> { new ColossusBetWinLoss { Index = 1 } };
            var expectedSummaryData = new Dictionary<string, ColossusBetWinLoss> { { nameof(ColossusBetWinLoss), new ColossusBetWinLoss() } };
            var expectedResult = new SortableReportResultModel<ColossusBetWinLoss>
            {
                SummaryTotal = expectedSummaryData,
                DataList = expectedDataList
            };
            if (level == 0)
            {
                _service.GetSummaryWinloss(Arg.Any<ColossusBetsWinLossMetaModel>(), UserCurrencyList).Returns(expectedResult);
            }
            else
            {
                _service.GetWinlossDetail(Arg.Any<ColossusBetsWinLossMetaModel>(), UserCurrencyList).Returns(expectedResult);
            }

            _service.CalculateTotal(Arg.Any<SortableList<ColossusBetWinLoss>>()).Returns(expectedDataList.AsEnumerable());

            return expectedResult;
        }
    }
}