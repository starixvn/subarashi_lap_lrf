using NPOI.SS.UserModel;

using NSubstitute;

using NUnit.Framework;

namespace Fanex.Athena.Excel.Report.UnitTests
{
    [TestFixture]
    public partial class LicenseeWinLossExcelTest : BaseReportExcelTest
    {
        [Test]
        public void ProcessUI_AllOptionsIsInvisible_HideColumnsCorrectly()
        {
            // Arrange
            var excelModel = CreateExcelModel();
            excelModel.CustomerCommVisible = false;
            excelModel.COVisible = false;
            excelModel.BTVisible = false;
            excelModel.BAVisible = false;

            var excel = CreateExcel(excelModel);
            excel.WhenForAnyArgs(x => x.ProcessUITurnover(Arg.Any<ISheet>())).DoNotCallBase();
            excel.WhenForAnyArgs(x => x.ProcessUILicenseeWinLoss(Arg.Any<ISheet>())).DoNotCallBase();
            excel.WhenForAnyArgs(x => x.HideColumnsByLevel(Arg.Any<ISheet>())).DoNotCallBase();

            // Action
            excel.Public_ProcessUI(FakeSheet);

            // Assert
            AssertHideColumns(
                FakeSheet,
                ColumnCustomerTotal,
                ColumnCustomerComm,
                ColumnCashOutCommission,
                ColumnBuyBackAmountTotal,
                ColumnBuyBackAmountBA,
                ColumnBetTradeCommission,
                ColumnBuyBackAmountSportsbook,
                ColumnActualStake,
                ColumnAmtDueToBetTrade,
                ColumnBaCommission,
                ColumnAmtDueToBa);
        }

        [Test]
        public void ProcessUI_AllOptionsIsVisible_HideColumnsCorrectly()
        {
            // Arrange
            var excelModel = CreateExcelModel();
            excelModel.SBVisible = true;
            excelModel.CustomerCommVisible = true;
            excelModel.COVisible = true;
            excelModel.BTVisible = true;
            excelModel.BAVisible = true;

            var excel = CreateExcel(excelModel);
            excel.WhenForAnyArgs(x => x.ProcessUITurnover(Arg.Any<ISheet>())).DoNotCallBase();
            excel.WhenForAnyArgs(x => x.ProcessUILicenseeWinLoss(Arg.Any<ISheet>())).DoNotCallBase();
            excel.WhenForAnyArgs(x => x.HideColumnsByLevel(Arg.Any<ISheet>())).DoNotCallBase();

            // Action
            excel.Public_ProcessUI(FakeSheet);

            // Assert
            AssertHideColumns(FakeSheet, ColumnBuyBackAmountTotal, ColumnBuyBackAmountBA);
        }
    }
}