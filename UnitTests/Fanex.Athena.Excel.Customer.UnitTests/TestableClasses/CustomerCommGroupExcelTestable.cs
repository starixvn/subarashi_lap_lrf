using Fanex.Athena.Model.Customer.ViewModel.CommissionGroupList;
using NPOI.SS.UserModel;

namespace Fanex.Athena.Excel.Customer.UnitTests.TestableClasses
{
    public class CustomerCommGroupExcelTestable : CustomerCommGroupExcel
    {
        public CustomerCommGroupExcelTestable(
            string templatePath,
            CommissionGroupListViewModel viewModel)
            : base(templatePath, viewModel)
        {
        }

        public void Public_AssignHeader(ISheet sheet)
        {
            AssignHeader(sheet);
        }

        public void Public_AssignSheetData(ISheet sheet)
        {
            AssignSheetData(sheet);
        }

        public void Public_AssignTitle(ISheet sheet)
        {
            AssignTitle(sheet);
        }

        public void Public_ProcessUI(ISheet sheet)
        {
            ProcessUI(sheet);
        }
    }
}