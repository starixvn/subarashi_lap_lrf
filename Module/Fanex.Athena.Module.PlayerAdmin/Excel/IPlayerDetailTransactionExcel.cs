using Fanex.Athena.Module.PlayerAdmin.ViewModels;
using NPOI.SS.UserModel;

namespace Fanex.Athena.Module.PlayerAdmin.Excel
{
    public interface IPlayerDetailTransactionExcel
    {
        IWorkbook Workbook { get; set; }

        void SetData(string templatePath, PlayerDetailTransactionReportViewModel data);

        void Export();
    }
}
