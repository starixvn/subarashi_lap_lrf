using System.Collections;
using System.Data;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Criteria
{
    public class GetSubsidaryGroupsCriteria
    {
        public string LicenseeName { get; set; }
        public int QueryMode { get; set; }

        public string GetSpName() => "Portal_Sub_GetSubsidiaryList";
        public Hashtable GetSpParams()
        {
            var result = new Hashtable();
            result.Add("SiteName", LicenseeName);
            result.Add("ForMgm", QueryMode);

            var dataTable = new DataTable();
            dataTable.Columns.Add("Val", typeof(int));
            var statusList = new[] { 0, 1, 2, 3 };
            foreach (var status in statusList)
            {
                dataTable.Rows.Add(status);
            }

            result.Add("StatusList", dataTable);
            return result;
        }
    }
}
