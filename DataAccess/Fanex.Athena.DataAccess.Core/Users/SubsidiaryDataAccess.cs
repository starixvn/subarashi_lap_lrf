namespace Fanex.Athena.DataAccess.Report
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.SqlClient;
    using System.Linq;
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
                    using (var db = new SqlConnection(objectDb.DbSetting.ConnectionString))
                    using (var reader = db.ExecuteReader(
                        objectDb.DbSetting.SpName,
                        new
                        {
                            SiteName = licenseeName,
                            StatusList = dataTable.AsTableValuedParameter(statusListTableName),
                            ForMgm = reportQueryMode
                        },
                        commandType: CommandType.StoredProcedure))
                    {
                        while (reader.Read())
                        {
                            var whiteLabelID = reader["WhiteLabelID"] as int?;
                            var whiteLabel = dataList.FirstOrDefault(x => x.WhiteLabelID == whiteLabelID);

                            if (whiteLabel is null)
                            {
                                dataList.Add(new GroupSubsidiary
                                {
                                    WhiteLabelID = whiteLabelID,
                                    WhiteLabelName = reader["Name"] != DBNull.Value ? reader["Name"] as string : string.Empty,
                                    OperatorIds = new List<string> { reader["OperatorId"] as string }
                                });

                                continue;
                            }

                            var operatorId = reader["OperatorId"] as string;

                            if (whiteLabel.OperatorIds.Contains(operatorId))
                            {
                                whiteLabel.OperatorIds.Add(operatorId);
                            }
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