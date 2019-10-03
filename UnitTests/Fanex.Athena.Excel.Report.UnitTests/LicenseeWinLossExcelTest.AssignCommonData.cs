using System.Collections.Generic;
using System.Linq;

using Fanex.Athena.Excel.Base.Extension;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Report.DTO;
using Fanex.Athena.UnitTest.Common.Helpers;

using NSubstitute;

using NUnit.Framework;

namespace Fanex.Athena.Excel.Report.UnitTests
{
    [TestFixture]
    public partial class LicenseeWinLossExcelTest : BaseReportExcelTest
    {
        [Test]
        public void AssignCommonData_WhenCall_AssignValueToTurnoverAndLicenseeWLColumns()
        {
            // Arrange
            var item = new LicenseeWinLoss
            {
                TurnOver = new Dictionary<string, decimal>
                {
                    { Product.SB, 1 }, { Product.BA, 3 }
                },
                LicenseeWL = new Dictionary<string, decimal>
                {
                    { Product.SB, 4 }, { Product.BT, 5 }
                }
            };

            var row = ExcelTestHelper.MockGetRow(FakeSheet, ColumnTemplateCount, 0);
            var excelModel = CreateExcelModel(productCodes: new[] { Product.SB, Product.BT, Product.BA });
            var excel = CreateExcel(excelModel);

            // Action
            excel.AssignCommonData(row, item);

            // Assert
            Assert.Multiple(() =>
            {
                row.Cells[ColumnTurnoverSportBook].Received(1).SetCellValue(item.TurnOver[Product.SB]);
                row.Cells[ColumnTurnoverSportBook + 1].DidNotReceiveWithAnyArgs().SetCellValue(0);
                row.Cells[ColumnTurnoverSportBook + 2].Received(1).SetCellValue(item.TurnOver[Product.BA]);

                row.Cells[ColumnLicenseeWlSportsBook].Received(1).SetCellValue(item.LicenseeWL[Product.SB]);
                row.Cells[ColumnLicenseeWlSportsBook + 1].Received(1).SetCellValue(item.LicenseeWL[Product.BT]);
                row.Cells[ColumnLicenseeWlSportsBook + 2].DidNotReceiveWithAnyArgs().SetCellValue(0);
            });
        }

        [Test]
        public void AssignCommonData_WhenCall_SetValueToColumns()
        {
            // Arrange
            var row = ExcelTestHelper.MockGetRow(FakeSheet, ColumnTemplateCount, 0);

            var dataItem = FakeHelper.Create<LicenseeWinLoss>();
            var excelModel = CreateExcelModel();
            excelModel.DataList = new List<LicenseeWinLoss> { dataItem };

            var excel = CreateExcel(excelModel);

            // Action
            excel.AssignCommonData(row, dataItem);

            // Assert
            Assert.Multiple(() =>
            {
                row.Cells[ColumnTurnoverTotal].Received(1).SetCellValue(dataItem.TurnOver.Sum(a => a.Value));

                row.Cells[ColumnTotalTransaction].Received(1).SetCellValue(dataItem.TotalTransaction);
                row.Cells[ColumnCustomerWl].Received(1).SetCellValue(dataItem.CustomerWinLoss);
                row.Cells[ColumnCustomerComm].Received(1).SetCellValue(dataItem.CustomerComm);
                row.Cells[ColumnCustomerTotal].Received(1).SetCellValue(dataItem.CustomerTotal);

                row.Cells[ColumnActualStake].Received(1).SetCellValue(dataItem.ActualStake);

                row.Cells[ColumnBuyBackAmountSportsbook].Received(1).SetCellValue(dataItem.BuyBackAmountSB);
                row.Cells[ColumnBuyBackAmountBA].Received(1).SetCellValue(dataItem.BuyBackAmountBA);
                row.Cells[ColumnBuyBackAmountTotal].Received(1).SetCellValue(dataItem.TotalBuyBackAmount);

                row.Cells[ColumnLicenseeWlTotal].Received(1).SetCellValue(dataItem.LicenseeWL.Sum(a => a.Value));
                row.Cells[ColumnCashOutCommission].Received(1).SetCellValue(dataItem.CashOutCommission);
                row.Cells[ColumnBetTradeCommission].Received(1).SetCellValue(dataItem.BetTradeCommission);
                row.Cells[ColumnBaCommission].Received(1).SetCellValue(dataItem.BACommission);
                row.Cells[ColumnAmtDueToBetTrade].Received(1).SetCellValue(dataItem.AmtDueToBetTrade);
                row.Cells[ColumnAmtDueToBa].Received(1).SetCellValue(dataItem.AmtDueToBA);
            });
        }
    }
}