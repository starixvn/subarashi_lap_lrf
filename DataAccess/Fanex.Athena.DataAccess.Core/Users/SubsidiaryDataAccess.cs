namespace Fanex.Athena.DataAccess.Report
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using Core.Users.Interfaces;
    using Fanex.Athena.Extension.Utility.Interfaces;
    using Fanex.Athena.Model.Core.DTO.Users;
    using Model.Report.DTO;

    [CLSCompliant(false)]
    public class SubsidiaryDataAccess : ISubsidiaryDataAccess
    {
        private readonly IDbFactory _dbFactory;

        public SubsidiaryDataAccess(IDbFactory dbFactory)
        {
            _dbFactory = dbFactory;
        }

        public IEnumerable<GroupSubsidiary> GetGroupSubsidiaries(string licenseeName)
        {
            var dataList = new List<GroupSubsidiary>();

            const string SpName = "Portal_Sub_GetSubsidiaryList";
            const int reportQueryMode = 0;
            using (var objectDb = _dbFactory.GetObjectDb(SpName))
            {
                using (var dataTable = new DataTable())
                {
                    dataTable.Columns.Add("Val", typeof(int));
                    int[] statusList = { 0, 1, 2, 3 };
                    foreach (var status in statusList)
                    {
                        dataTable.Rows.Add(status);
                    }

                    var parameter = new
                    {
                        SiteName = licenseeName,
                        StatusList = dataTable,
                        ForMgm = reportQueryMode
                    };

                    using (var reader = objectDb.ExecuteReader(parameter))
                    {
                        while (reader.Read())
                        {
                            dataList.Add(new GroupSubsidiary
                            {
                                WhiteLabelID = reader["WhiteLabelID"] as int?,
                                WhiteLabelName = reader["Name"] as string,
                                OperatorId = reader["OperatorId"] as string
                            });
                        }
                    }
                }
            }

            return dataList;
        }

        public IEnumerable<Subsidiary> GetSubsidiaryList(string licenseeName)
        {
            var dataList = new List<Subsidiary>();

            const string SpName = "Lrf_SubsidiarySel";

            using (var objectDb = _dbFactory.GetObjectDb(SpName))
            {
                objectDb.SetParameterValue("LicenseeName", licenseeName);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        dataList.Add(new Subsidiary
                        {
                            AgentId = Convert.ToInt32(reader["AgentID"]),
                            OperatorId = reader["OperatorID"].ToString(),
                            CurrencyId = Convert.ToInt32(reader["Currency"])
                        });
                    }
                }
            }

            return dataList;
        }
    }
}