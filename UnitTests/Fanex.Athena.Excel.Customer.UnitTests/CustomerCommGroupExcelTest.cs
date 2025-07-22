using System.Collections.Generic;

using Fanex.Athena.Excel.Base;
using Fanex.Athena.Excel.Base.Extension;
using Fanex.Athena.Excel.Customer.UnitTests.TestableClasses;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Customer.MetaModel;
using Fanex.Athena.Model.Customer.ViewModel.CommissionGroupList;
using Fanex.Athena.Resources;
using Fanex.Athena.UnitTest.Common.Helpers;

using NPOI.SS.UserModel;

using NSubstitute;

using NUnit.Framework;

namespace Fanex.Athena.Excel.Customer.UnitTests
{
    [TestFixture]
    public class CustomerCommGroupExcelTest
    {
        private const int ColumnGroupName = 1;
        private const int ColumnDefaultGroup = 2;
        private const int ColumnNoOfCustomer = 3;
        private const int ColumnSbCommission = 4;
        private const int ColumnNgCommission = 5;
        private const int ColumnCsCommission = 6;

        private const int ColumnCount = 7;
        private ISheet _sheet;

        [SetUp]
        public void Setup()
        {
            _sheet = Substitute.For<ISheet>();
        }

        [Test]
        public void AssignHeader_WhenCall_CallRelevantMethods()
        {
            // Arrange
            var row = ExcelTestHelper.MockGetRow(_sheet, ColumnCount, ReportBase.RowHeaderTemplate);
            var excel = CreateExcel();

            // Action
            excel.Public_AssignHeader(_sheet);

            // Assert
            Assert.Multiple(() =>
            {
                _sheet.Received().CopyRow(excel.TemplateSheet, ReportBase.RowHeaderTemplate, ReportBase.RowHeaderTemplate);
                row.Cells[0].Received(1).SetCellValue("#");
                row.Cells[ColumnGroupName].Received(1).SetCellValue(ViewResources.GroupName);
                row.Cells[ColumnDefaultGroup].Received(1).SetCellValue(ViewResources.DefaultGroup);
                row.Cells[ColumnNoOfCustomer].Received(1).SetCellValue(ViewResources.NoOfCustmer);
            });
        }

        [Test]
        public void AssignSheetData_WhenCall_CallSetValueCorrectly()
        {
            // Arrange
            var row = ExcelTestHelper.MockGetRow(_sheet, ColumnCount, 2);
            var excel = CreateExcel();

            // Action
            excel.Public_AssignSheetData(_sheet);

            // Assert
            Assert.Multiple(() =>
            {
                row.Cells[ColumnGroupName].Received(1).SetCellValue("GroupA");
                row.Cells[ColumnDefaultGroup].Received(1).SetCellValue("X");
                row.Cells[ColumnNoOfCustomer].Received(1).SetCellValue(100);
            });
        }

        [Test]
        public void AssignTitle_WhenCall_CallRelevantMethods()
        {
            // Arrange
            _sheet.LastRowNum.Returns(2);
            ExcelTestHelper.MockGetRow(_sheet, ColumnCount);
            var excel = CreateExcel();

            // Action
            excel.Public_AssignTitle(_sheet);

            // Assert
            Assert.Multiple(() =>
            {
                _sheet.Received().SetTextRowValue(
                    excel.TemplateSheet,
                   0,
                    0,
                    5,
                    ViewResources.CommissionGroupList);
                _sheet.Received(1).CreateFreezePane(0, 2);
                _sheet.ReceivedWithAnyArgs().DeleteRow(0);
            });
        }

        [Test]
        public void ProcessUI_AllProductsInvisible_CallEnoughHideColumnMethod()
        {
            // Arrange
            var excel = CreateExcel();

            // Action
            excel.Public_ProcessUI(_sheet);

            // Assert
            Assert.Multiple(() =>
            {
                _sheet.DidNotReceiveWithAnyArgs().HideColumn(0);
            });
        }

        [Test]
        public void ProcessUI_AllProductsVisible_NotCallAnyHideColumnMethod()
        {
            // Arrange
            var excel = CreateExcel(new ShowingOption
            {
                SBVisible = true,
                NGVisible = true,
                CSVisible = true
            });

            // Action
            excel.Public_ProcessUI(_sheet);

            // Assert
            Assert.Multiple(() =>
            {
                _sheet.DidNotReceiveWithAnyArgs().HideColumn(0);
            });
        }

        private static CustomerCommGroupExcelTestable CreateExcel(ShowingOption showingOption = null)
        {
            var group = new GroupCommMetaModel
            {
                GroupCommId = 1,
                GroupName = "GroupA",
                IsDefaultGroup = true,
                NumberOfCustomer = 100,
                CommValues = new List<GroupCommSettingMetaModel>
                {
                    new GroupCommSettingMetaModel
                    {
                        Discount = 1,
                        Bettype = 1,
                        ProductCode = "SB",
                        Sporttype = 1
                    }
                }
            };

            var excel = Substitute.ForPartsOf<CustomerCommGroupExcelTestable>(
                string.Empty,
                new CommissionGroupListViewModel(new List<GroupCommMetaModel> { group }, new List<string>()));
            excel.TemplateSheet.Returns(Substitute.For<ISheet>());
            return excel;
        }
    }
}