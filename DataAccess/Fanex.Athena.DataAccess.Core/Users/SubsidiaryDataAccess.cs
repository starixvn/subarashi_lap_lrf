namespace Fanex.Athena.DataAccess.Report
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using Core;
    using Core.Users.Interfaces;
    using Dapper;
    using Fanex.Athena.Model.Core.DTO.Users;
    using Model.Report.DTO;

    public class SubsidiaryDataAccess : BaseDataAccess, ISubsidiaryDataAccess
    {
        public IEnumerable<GroupSubsidiary> GetGroupSubsidiaries(string licenseeName)
        {
            var dataList = new List<GroupSubsidiary>();

            const string SpName = "Portal_Sub_GetSubsidiaryList";
            const int reportQueryMode = 0;
            const string statusListTableName = "dbo.TVP_Int";
            using (var objectDb = GetObjectDb(SpName))
            {
                using (var dataTable = new DataTable())
                {
                    dataTable.Columns.Add("Val", typeof(int));
                    int[] statusList = { 0, 1, 2, 3 };
                    foreach (var status in statusList)
                    {
                        dataTable.Rows.Add(status);
                    }
                    using (var reader = objectDb.ExecuteReader(new
                    {
                        SiteName = licenseeName,
                        StatusList = dataTable.AsTableValuedParameter(statusListTableName),
                        ForMgm = reportQueryMode
                    }))
                    {
                        while (reader.Read())
                        {
                            dataList.Add(new GroupSubsidiary
                            {
                                WhiteLabelID = reader["WhiteLabelID"] as int? ?? default,
                                WhiteLabelName = reader["Name"] != DBNull.Value ? reader["Name"] as string : string.Empty,
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

            using (var objectDb = GetObjectDb(SpName))
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