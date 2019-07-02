namespace Fanex.Athena.Module.Dashboard.Data.Dashboard
{
    using System.Collections;
    using System.Threading.Tasks;
    using Fanex.Athena.DataAccess.Core;
    using Fanex.Athena.Module.Dashboard.Data.Interfaces;
    using Fanex.Athena.Module.Dashboard.MetaModel;
    using Fanex.Common.Extensions;

    public class SingleValueDataAccess : BaseDataAccess, ISingleValueDataAccess
    {
        public async Task<decimal> GetCustomerBalance(DashboardBaseModel metaModel)
        {
            return await GetData(metaModel, "Lrf_GetCustomerBalance", "ClosingBalance").ConfigureAwait(false);
        }

        public async Task<decimal> GetPendingFunds(DashboardBaseModel metaModel)
        {
            return await GetData(metaModel, "Lrf_GetLicenseePendingFunds", "PendingFund", false).ConfigureAwait(false);
        }

        public async Task<decimal> GetTodayDeposit(DashboardBaseModel metaModel)
        {
            return await GetData(metaModel, "Lrf_GetLicenseeTodayDeposit", "Deposit").ConfigureAwait(false);
        }

        public async Task<decimal> GetTodayWithdrawal(DashboardBaseModel metaModel)
        {
            return await GetData(metaModel, "Lrf_GetLicenseeTodayWithdrawal", "Withdrawal").ConfigureAwait(false);
        }

        private async Task<decimal> GetData(DashboardBaseModel metaModel, string uspName, string columnName, bool hasReportDate = true)
        {
            using (var db = this.GetObjectDb(uspName))
            {
                var param = new Hashtable();
                param.Add("LicenseeID", metaModel.LicenseeId);
                param.Add("CurrencyIDList", metaModel.CurrencyIDList);
                param.Add("BaseCurrency", metaModel.BaseCurrency);
                if (hasReportDate)
                {
                    param.Add("ReportDate", metaModel.FromDate);
                }

                using (var reader = await db.ExecuteReaderAsync(param).ConfigureAwait(false))
                {
                    return reader.Read() ? reader.ToDecimal(columnName) : 0;
                }
            }
        }
    }
}