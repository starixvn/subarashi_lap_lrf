namespace Fanex.Athena.Module.Dashboard.Data.Dashboard
{
    using System.Collections.Generic;
    using System.Data;
    using System.Threading.Tasks;
    using Fanex.Athena.DataAccess.Core;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Module.Dashboard.Data.Interfaces;
    using Fanex.Athena.Module.Dashboard.MetaModel;
    using Fanex.Athena.Module.Dashboard.ViewModel;
    using Fanex.Common.Extensions;

    public class LicenseeDataByPlatformDataAccess : BaseDataAccess, ILicenseeDataByPlatformDataAccess
    {
        public async Task<WidgetByPlatformViewModel> GetWinLoss(DashboardBaseModel metaModel)
        {
            return await GetData(metaModel, "Lrf_GetLicenseeWLByPlatform", "LicenseeWL").ConfigureAwait(false);
        }

        public async Task<WidgetByPlatformViewModel> GetTurnover(DashboardBaseModel metaModel)
        {
            return await GetData(metaModel, "Lrf_GetLicenseeTurnoverByPlatform", "Turnover").ConfigureAwait(false);
        }

        private static WidgetByPlatformViewModel ReadData(IDataReader reader, string winlossColumnName)
        {
            var winlossColumn = winlossColumnName;

            var dataList = new List<KeyValuePair<string, decimal>>();
            var total = 0m;
            while (reader.Read())
            {
                var platformType = reader.ToInt("PlatformType");
                var key = PlatformType.GetPlatformKey(platformType);
                var value = reader.ToDecimal(winlossColumn);
                total += value;
                dataList.Add(new KeyValuePair<string, decimal>(key, value));
            }

            return new WidgetByPlatformViewModel
            {
                Data = dataList,
                Total = total
            };
        }

        private async Task<WidgetByPlatformViewModel> GetData(DashboardBaseModel metaModel, string uspName, string winlossColumnName)
        {
            if (string.IsNullOrEmpty(metaModel.AgentListXml))
            {
                return new WidgetByPlatformViewModel { Total = 0, Data = new List<KeyValuePair<string, decimal>>(0) };
            }

            using (var db = this.GetObjectDb(uspName))
            {
                var param = new
                {
                    AgentList = metaModel.AgentListXml,
                    FromDate = metaModel.FromDate,
                    ToDate = metaModel.ToDate,
                    BaseCurrency = metaModel.BaseCurrency
                };

                using (var reader = await db.ExecuteReaderAsync(param).ConfigureAwait(false))
                {
                    return ReadData(reader, winlossColumnName);
                }
            }
        }
    }
}