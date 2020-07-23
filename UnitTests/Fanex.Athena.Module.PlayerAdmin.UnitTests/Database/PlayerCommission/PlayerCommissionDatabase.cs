using System.Data;
using Fanex.Athena.Module.PlayerAdmin.UnitTests.Helpers;

namespace Alpha.Reports.Tests.Database.WinLossDetail
{
    public static class PlayerCommissionDatabase
    {
        private static DataSet commGroups = FileHelper.LoadDataSet("\\Database\\PlayerCommission\\CommGroups.xml");
        private static DataSet commGroupById = FileHelper.LoadDataSet("\\Database\\PlayerCommission\\CommGroupById.xml");

        public static DataSet CommGroups => commGroups;
        public static DataSet CommGroupById => commGroupById;
    }
}
