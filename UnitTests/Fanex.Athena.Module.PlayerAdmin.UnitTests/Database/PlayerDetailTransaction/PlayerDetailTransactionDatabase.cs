using System.Data;
using Fanex.Athena.Module.PlayerAdmin.UnitTests.Helpers;

namespace Alpha.Reports.Tests.Database.WinLossDetail
{
    public static class PlayerDetailTransactionDatabase
    {
        private static DataSet detailTransaction = FileHelper.LoadDataSet("\\Database\\PlayerDetailTransaction\\DetailTransaction.xml");

        public static DataSet DetailTransaction => detailTransaction;
    }
}
