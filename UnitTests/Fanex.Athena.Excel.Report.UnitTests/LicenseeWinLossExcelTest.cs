using System;
using System.Collections.Generic;
using System.Linq;

using Fanex.Athena.Excel.Base;
using Fanex.Athena.Excel.Base.Entities;
using Fanex.Athena.Excel.Report.Helpers;
using Fanex.Athena.Excel.Report.Models;
using Fanex.Athena.Excel.Report.UnitTests.TestableClasses;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Core.MetaModel.Product;
using Fanex.Athena.Model.Report.DTO;
using Fanex.Athena.Model.Report.MetaModel;
using Fanex.Athena.Resources;
using Fanex.Athena.UnitTest.Common.Helpers;

using NPOI.SS.UserModel;

using NSubstitute;

using NUnit.Framework;

namespace Fanex.Athena.Excel.Report.UnitTests
{
    [TestFixture]
    public partial class LicenseeWinLossExcelTest : BaseReportExcelTest
    {
        private const int ColumnDate = 1;
        private const int ColumnExternalId = 2;
        private const int ColumnSystemId = 3;
        private const int ColumnCurrency = 4;

        private const int ColumnTurnoverSportBook = 5;
        private const int ColumnTurnoverTotal = 25;

        private const int ColumnActualStake = 26;

        private const int ColumnBuyBackAmountSportsbook = 27;
        private const int ColumnBuyBackAmountBA = 28;
        private const int ColumnBuyBackAmountTotal = 29;

        private const int ColumnTotalTransaction = 30;

        private const int ColumnCustomerWl = 31;
        private const int ColumnCustomerComm = 32;
        private const int ColumnCustomerTotal = 33;

        private const int ColumnLicenseeWlSportsBook = 34;
        private const int ColumnLicenseeWlTotal = 54;

        private const int ColumnBetTradeCommission = 55;
        private const int ColumnCashOutCommission = 56;
        private const int ColumnBaCommission = 57;
        private const int ColumnAmtDueToBetTrade = 58;
        private const int ColumnAmtDueToBa = 59;

        private const int ColumnTemplateCount = 60;

        private const int RowContentTemplate = 3;

        [Test]
        public void AssignNoInfoRow_WhenCall_CallRelevantMethods()
        {
            // Arrange
            var row = ExcelTestHelper.MockGetRow(FakeSheet, ColumnTemplateCount, RowContentTemplate);
            var excel = CreateExcel(CreateExcelModel());

            // Action
            excel.Public_AssignNoInfoRow(FakeSheet);

            // Assert
            row.Cells[0].Received(1).SetCellValue(ViewResources.NoInfo);
        }

        [Test]
        public void AssignSheetData_WhenCall_CallSetValueCorrectly()
        {
            // Arrange
            var row = ExcelTestHelper.MockGetRow(FakeSheet, ColumnTemplateCount, RowContentTemplate);
            var dataItem = FakeHelper.Create<LicenseeWinLoss>();
            var excelModel = CreateExcelModel();
            excelModel.DataList = new List<LicenseeWinLoss> { dataItem };

            var excel = CreateExcel(excelModel);
            excel.WhenForAnyArgs(x => x.AssignCommonData(Arg.Any<IRow>(), Arg.Any<LicenseeWinLoss>())).DoNotCallBase();
            excel.WhenForAnyArgs(x => x.AssignTotalData(Arg.Any<ISheet>(), Arg.Any<int>())).DoNotCallBase();
            excel.WhenForAnyArgs(x => x.AssignGrandTotalInEurData(Arg.Any<ISheet>(), Arg.Any<int>())).DoNotCallBase();

            // Action
            excel.Public_AssignSheetData(FakeSheet);

            // Assert
            Assert.Multiple(() =>
            {
                row.Cells[0].Received(1).SetCellValue(1);
                row.Cells[ColumnExternalId].Received(1).SetCellValue(dataItem.ExternalId);
                row.Cells[ColumnSystemId].Received(1).SetCellValue(dataItem.SystemId);
                row.Cells[ColumnDate].Received(1).SetCellValue(dataItem.Date.ToShortDateString());
                row.Cells[ColumnCurrency].Received(1).SetCellValue(dataItem.CurrencyName);

                excel.Received(1).AssignCommonData(row, dataItem);
                excel.Received(1).AssignTotalData(FakeSheet, 4);
                excel.Received(1).AssignGrandTotalInEurData(FakeSheet, Arg.Any<int>());
            });
        }

        [Test]
        public void AssignTitle_WhenCall_CallRelevantMethods()
        {
            // Arrange
            var row = ExcelTestHelper.MockGetRow(FakeSheet, ColumnTemplateCount, 0);
            var excelModel = CreateExcelModel();
            excelModel.ConvertingOption = new ConvertingOption
            {
                BaseCurrency = string.Empty,
                CurrencyName = "INH",
                IsConvert = false
            };
            var excel = CreateExcel(excelModel);

            var title = ReportExcelHelper.GetTitleCurrencyName(
                excelModel.ConvertingOption,
                excelModel.MetaModel);

            var reportTitle = ReportExcelHelper.GenerateReportTitle(
                ViewResources.LicenseeWinLoss,
                excelModel.MetaModel.FromDate,
                excelModel.MetaModel.ToDate,
                title);

            // Action
            excel.Public_AssignTitle(FakeSheet);

            // Assert
            Assert.Multiple(() =>
            {
                row.Cells[0].Received(1).SetCellValue(reportTitle);
                FakeSheet.Received(1).CreateFreezePane(0, 3);
            });
        }

        [Test]
        public void AssignGrandTotalInEurData_WhenCall_CallRelevantMethods()
        {
            // Arrange
            const int RowIndex = 10;
            var item = FakeHelper.Create<LicenseeWinLoss>();
            var excelModel = CreateExcelModel();
            excelModel.SummaryTotal = new Dictionary<string, LicenseeWinLoss>
            {
                { "USD", item }
            };

            var row = ExcelTestHelper.MockGetRow(FakeSheet, ColumnTemplateCount, RowIndex);
            var excel = CreateExcel(excelModel);
            excel.WhenForAnyArgs(x => x.AssignCommonData(Arg.Any<IRow>(), Arg.Any<LicenseeWinLoss>())).DoNotCallBase();

            // Action
            excel.AssignGrandTotalInEurData(FakeSheet, RowIndex);

            // Assert
            Assert.Multiple(() =>
            {
                excel.Received(1).AssignCommonData(row, item);
                row.Cells[0].Received(1).SetCellValue(ViewResources.Totalin + " USD");
            });
        }

        [Test]
        public void AssignTotalData_WhenCall_CallRelevantMethods()
        {
            // Arrange
            const int RowIndex = 10;
            var item1 = FakeHelper.Create<LicenseeWinLoss>();
            var item2 = FakeHelper.Create<LicenseeWinLoss>();
            var excelModel = CreateExcelModel();
            excelModel.TotalData = new List<LicenseeWinLoss> { item1, item2 };

            var row1 = ExcelTestHelper.MockGetRow(FakeSheet, ColumnTemplateCount, RowIndex);
            var row2 = ExcelTestHelper.MockGetRow(FakeSheet, ColumnTemplateCount, RowIndex + 1);
            var excel = CreateExcel(excelModel);
            excel.WhenForAnyArgs(x => x.AssignCommonData(Arg.Any<IRow>(), Arg.Any<LicenseeWinLoss>())).DoNotCallBase();

            // Action
            excel.AssignTotalData(FakeSheet, RowIndex);

            // Assert
            Assert.Multiple(() =>
            {
                excel.Received(1).AssignCommonData(row1, item1);
                row1.Cells[0].Received(1).SetCellValue(ViewResources.Total);
                row1.Cells[ColumnCurrency].SetCellValue(item1.CurrencyName);

                excel.Received(1).AssignCommonData(row2, item2);
                row2.Cells[0].DidNotReceiveWithAnyArgs().SetCellValue(0);
                row2.Cells[ColumnCurrency].SetCellValue(item2.CurrencyName);
            });
        }

        [Test]
        public void ProcessUILicenseeWinLoss_WhenCall_CallRelevantMethods()
        {
            // Arrange
            var cell = ExcelTestHelper.MockGetCell(FakeSheet, ReportBase.RowHeaderTemplate, ColumnLicenseeWlSportsBook);
            var excelModel = CreateExcelModel(productCodes: new[] { Product.SB, Product.BA });
            var excel = CreateExcel(excelModel);

            // Action
            excel.ProcessUILicenseeWinLoss(FakeSheet);

            // Assert
            Assert.Multiple(() =>
            {
                cell.Received(1).SetCellValue(ViewResources.LicenseeW_L);
                FakeSheet.Received(1).SetColumnHidden(ColumnLicenseeWlSportsBook + 1, true);
            });
        }

        [Test]
        public void ProcessUITurnover_WhenCall_CallRelevantMethods()
        {
            // Arrange
            var cell = ExcelTestHelper.MockGetCell(FakeSheet, ReportBase.RowHeaderTemplate, ColumnTurnoverSportBook);
            var excelModel = CreateExcelModel(productCodes: new[] { Product.SB, Product.BT });
            var excel = CreateExcel(excelModel);

            // Action
            excel.ProcessUITurnover(FakeSheet);

            // Assert
            Assert.Multiple(() =>
            {
                cell.Received(1).SetCellValue(ViewResources.Turnover);
                FakeSheet.Received(1).SetColumnHidden(ColumnTurnoverSportBook + 1, true);
            });
        }

        [TestCase(0, new[] { ColumnExternalId, ColumnSystemId })]
        [TestCase(1, new[] { ColumnExternalId, ColumnDate })]
        [TestCase(3, new[] { ColumnDate })]
        public void HideColumnsByLevel_WhenCall_HideColumns(int level, int[] hiddenColumns)
        {
            // Arrange
            var excelModel = CreateExcelModel(level);
            var excel = CreateExcel(excelModel);

            // Action
            excel.HideColumnsByLevel(FakeSheet);

            // Assert
            AssertHideColumns(FakeSheet, hiddenColumns);
        }

        private static LicenseeWinLossExcelTestable CreateExcel(LicenseeWinLossExcelModel excelModel)
        {
            var excel = Substitute.ForPartsOf<LicenseeWinLossExcelTestable>(
                string.Empty,
                excelModel);
            excel.TemplateSheet.Returns(Substitute.For<ISheet>());
            return excel;
        }

        private static LicenseeWinLossExcelModel CreateExcelModel(int level = 0, string[] productCodes = null)
        {
            var metaModel = new LicenseeWinLossMetaModel
            {
                BaseCurrency = string.Empty,
                CurrencyName = "INH",
                FromDate = new DateTime(2018, 1, 1),
                ToDate = new DateTime(2018, 2, 2),
                CurrencyId = 1,
                DrillDownLevel = level,
                ProductOptions = (productCodes ?? new string[] { }).Select(x => new ProductOption
                {
                    Code = x,
                    Status = true,
                    Name = x
                }).ToList()
            };

            var excelModel = new LicenseeWinLossExcelModel
            {
                MetaModel = metaModel,
                DataList = new List<LicenseeWinLoss>()
            };

            return excelModel;
        }
    }
}