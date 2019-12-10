namespace Fanex.Athena.Api.Report.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Base.UnitTests;

    using DataAccess.Report.Interfaces;

    using Excel.Report;

    using Extension.Utility;

    using Fanex.Athena.Service.Core.Utility.Interfaces;

    using Model.Core.ResultModel;
    using Model.Report.DTO;
    using Model.Report.MetaModel;
    using Model.Report.ViewModel;

    using NPOI.SS.UserModel;

    using NSubstitute;

    using NUnit.Framework;

    using Report;

    using UnitTest.Common.Helpers;

    public class CashOutWinLossReportControllerTest : BaseApiControllerHelperTest
    {
        private ICashOutWinLossDataAccess _dataAccess;
        private CashOutWinLossReportController _controller;
        private ICurrencyValidation _currencyValidation;

        [SetUp]
        public void Setup()
        {
            MockSessionData();
            _dataAccess = Substitute.For<ICashOutWinLossDataAccess>();
            _currencyValidation = Substitute.For<ICurrencyValidation>();
            _currencyValidation.IsValidCurrency(Arg.Any<int>(), Arg.Any<bool>()).Returns(true);
            CreateController();
        }

        private void CreateController()
        {
            _controller = Substitute.ForPartsOf<CashOutWinLossReportController>(_dataAccess,
                            LangService, _currencyValidation);
            _controller.SessionService = SessionService;
            _controller.ProductService = ProductService;
        }

        [TearDown]
        public void TearDown()
        {
            _dataAccess = null;
            _controller = null;
            _currencyValidation = null;
        }

        [Test]
        public async Task Index_InvalidCurrency_ReturnEmptyResult()
        {
            // Arrange
            var metaModel = new ThirdPartyWinLossMetaModel { CurrencyId = -9 };
            _currencyValidation.IsValidCurrency(Arg.Any<int>(), Arg.Any<bool>()).Returns(false);
            // Action
            var result = await _controller.Index(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Data, Is.Empty);
                Assert.That(result.Total, Is.Empty);
                Assert.That(result.SummaryTotal, Is.Empty);
            });
        }

        [Test]
        public async Task Index_Level0_CallGetSummaryMethodInService()
        {
            // Arrange
            const int CurrencyId = -2, Level = 0, CustId = 1;
            var metaModel = new ThirdPartyWinLossMetaModel
            {
                CurrencyId = CurrencyId,
                IsExcludedTestData = true,
                DrillDownFromDate = new DateTime(2017, 4, 1),
                DrillDownToDate = new DateTime(2017, 4, 18),
                DrillDownLevel = 0,
                DrillDownCurrencyId = CurrencyId,
                DrillDownCustomerId = CustId,
                AgentListXml = "<ROOT></ROOT>"
            };
            var dataListResult = new SortableList<CashOutWinLoss>
            {
                new CashOutWinLoss()
            };
            var totalDataResult = dataListResult.ToList();
            var summaryTotalResult = new Dictionary<string, CashOutWinLoss> { { "EUR", new CashOutWinLoss() } };
            _dataAccess.GetSummary(Arg.Is<ThirdPartyWinLossMetaModel>(x => IsValidMetaModelForLevel0(x, Level)), UserCurrencyList).Returns(
                new SortableReportResultModel<CashOutWinLoss>
                {
                    SummaryTotal = summaryTotalResult,
                    DataList = dataListResult,
                    TotalDataList = totalDataResult
                });

            var expectedResult = CreateResultData(dataListResult, totalDataResult, summaryTotalResult);

            // Action
            var result = ObjectHelper.ToJson(await _controller.Index(metaModel, null, null, Level, CurrencyId, CustId));

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }

        [Test]
        public async Task Index_Level1_CallGetDetailMethodInService()
        {
            // Arrange
            const int CurrencyId = -2, Level = 1, CustId = 1;
            var fromDate = new DateTime(2017, 4, 1);
            var toDate = new DateTime(2017, 4, 18);
            var metaModel = new ThirdPartyWinLossMetaModel
            {
                CurrencyId = CurrencyId,
                IsExcludedTestData = true,
                DrillDownLevel = Level,
                DrillDownCurrencyId = CurrencyId,
                DrillDownCustomerId = CustId,
                AgentListXml = "<ROOT></ROOT>"
            };
            var dataListResult = new SortableList<CashOutWinLoss>
            {
                new CashOutWinLoss()
            };
            var totalDataResult = dataListResult.ToList();
            var summaryTotalResult = new Dictionary<string, CashOutWinLoss> { { "EUR", new CashOutWinLoss() } };
            _dataAccess.GetDetail(Arg.Is<ThirdPartyWinLossMetaModel>(x => IsValidMetaModelForLevel0(x, Level)), UserCurrencyList).Returns(
                new SortableReportResultModel<CashOutWinLoss>
                {
                    SummaryTotal = summaryTotalResult,
                    DataList = dataListResult,
                    TotalDataList = totalDataResult
                });
            var expectedResult = CreateResultData(dataListResult, totalDataResult, summaryTotalResult);

            // Action
            var result = ObjectHelper.ToJson(await _controller.Index(metaModel, fromDate, toDate, Level, CurrencyId, CustId));

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }

        [Test]
        public async Task Index_DataListParamReturnEmpty_ReturnEmptyResult()
        {
            // Arrange
            const int CurrencyId = -2, Level = 1, CustId = 1;
            var fromDate = new DateTime(2017, 4, 1);
            var toDate = new DateTime(2017, 4, 18);
            var metaModel = new ThirdPartyWinLossMetaModel
            {
                CurrencyId = -1,
                IsExcludedTestData = true,
                DrillDownLevel = Level,
                DrillDownCurrencyId = CurrencyId,
                DrillDownCustomerId = CustId,
                AgentListXml = "<ROOT></ROOT>"
            };

            _dataAccess.GetDetail(Arg.Any<ThirdPartyWinLossMetaModel>(), UserCurrencyList).ReturnsForAnyArgs(new SortableReportResultModel<CashOutWinLoss>());

            var expectedResult = CreateResultData(new List<CashOutWinLoss>(), new List<CashOutWinLoss>(), new Dictionary<string, CashOutWinLoss>());

            // Action
            var result = ObjectHelper.ToJson(await _controller.Index(metaModel, fromDate, toDate, Level, CurrencyId, CustId));

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }

        [Test]
        public void Index_IsExportExcelTrue_CallExcelStream()
        {
            // Arrange
            const int CurrencyId = -2, Level = 1, CustId = 1;
            var fromDate = new DateTime(2017, 4, 1);
            var toDate = new DateTime(2017, 4, 18);
            var metaModel = new ThirdPartyWinLossMetaModel
            {
                CurrencyId = -1,
                IsExcludedTestData = true,
                DrillDownLevel = Level,
                DrillDownCurrencyId = CurrencyId,
                DrillDownCustomerId = CustId,
                IsExportExcel = true,
                DrillDownFromDate = fromDate,
                DrillDownToDate = toDate,
                FromDate = fromDate
            };
            _dataAccess.GetSummary(Arg.Any<ThirdPartyWinLossMetaModel>(), UserCurrencyList).ReturnsForAnyArgs(new SortableReportResultModel<CashOutWinLoss>());
            var excel = Substitute.ForPartsOf<CashOutWinLossExcel>(
                string.Empty,
                metaModel,
                new CashOutWinLossViewModel
                {
                    MainResult = new CashOutWinLoss[] { }
                });
            excel.When(x => x.Export()).DoNotCallBase();
            _controller.CreateExcel(
                Arg.Any<string>(),
                Arg.Any<string>(),
                Arg.Any<ThirdPartyWinLossMetaModel>(),
                Arg.Any<CashOutWinLossViewModel>())
                .Returns(excel);
            _controller.When(x => x.ExcelStream(Arg.Any<IWorkbook>(), Arg.Any<string>())).DoNotCallBase();

            // Action
            _controller.Index(metaModel);

            // Assert
            _controller.Received().ExcelStream(Arg.Any<IWorkbook>(), Arg.Any<string>());
        }

        public async Task Index_IsExportExcelTrueWithDifferentLevelAndCurrency_UpdateMetanData(
            )
        {
            // Arrange
            const int CustId = 1, DrilldownCurrency = 2;
            var fromDate = new DateTime(2017, 4, 1);
            var toDate = new DateTime(2017, 4, 18);
            var metaModel = new ThirdPartyWinLossMetaModel
            {
                CurrencyId = 1,
                IsExcludedTestData = true,
                IsExportExcel = true,
                FromDate = fromDate.AddDays(1),
                ToDate = toDate.AddDays(1)
            };

            _dataAccess.GetSummary(Arg.Any<ThirdPartyWinLossMetaModel>(), UserCurrencyList).ReturnsForAnyArgs(new SortableReportResultModel<CashOutWinLoss>());
            var excel = Substitute.ForPartsOf<CashOutWinLossExcel>(
                string.Empty,
                metaModel,
                new CashOutWinLossViewModel
                {
                    MainResult = new CashOutWinLoss[] { }
                });
            excel.When(x => x.Export()).DoNotCallBase();
            _controller.CreateExcel(
                Arg.Any<string>(),
                Arg.Any<string>(),
                Arg.Any<ThirdPartyWinLossMetaModel>(),
                Arg.Any<CashOutWinLossViewModel>())
                .Returns(excel);
            _controller.When(x => x.ExcelStream(Arg.Any<IWorkbook>(), Arg.Any<string>())).DoNotCallBase();

            SessionService.UserSession.CurrencyList = new Dictionary<int, string> { { 1, "Currency" } };

            var expectedFromDate = fromDate;
            var expectedToDate = toDate;
            var expectedCurrency = metaModel.CurrencyId;

            // Action
            await _controller.Index(metaModel, fromDate, toDate, 0, DrilldownCurrency, CustId);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(metaModel.FromDate, Is.EqualTo(expectedFromDate));
                Assert.That(metaModel.ToDate, Is.EqualTo(expectedToDate));
                Assert.That(metaModel.CurrencyId, Is.EqualTo(expectedCurrency));
            });
        }

        private static bool IsValidMetaModelForLevel0(ThirdPartyWinLossMetaModel metaModel, int level)
        {
            return metaModel.DrillDownCurrencyId == -2 && metaModel.DrillDownLevel == level &&
                metaModel.DrillDownCustomerId == 1 && metaModel.DrillDownFromDate == new DateTime(2017, 4, 1) &&
                metaModel.DrillDownToDate == new DateTime(2017, 4, 18) && metaModel.AgentListXml == "<ROOT></ROOT>";
        }

        private string CreateResultData(List<CashOutWinLoss> data, List<CashOutWinLoss> total, Dictionary<string, CashOutWinLoss> summaryTotal)
        {
            return ObjectHelper.ToJson(
                new
                {
                    Data = data,
                    Total = total,
                    SummaryTotal = summaryTotal
                });
        }
    }
}