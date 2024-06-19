namespace Fanex.Athena.DataAccess.Customer
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Fanex.Athena.DataAccess.Core;
    using Fanex.Athena.DataAccess.Customer.Interfaces;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.Helper;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Common;
    using Fanex.Common.Extensions;

    public class GroupComDataAccess : BaseDataAccess, IGroupComDataAccess
    {
        public async Task<(IList<GroupCommMetaModel>, IList<GroupCommDetailMetaModel>)> GetAllAsync(int licenseeId, IDictionary<string, bool> permissions)
        {
            const string UspName = "Lrf_LicenseeGroupCommSel";

            var comms = new List<GroupCommMetaModel>();
            var comDetails = new List<GroupCommDetailMetaModel>();

            using (var db = GetObjectDb(UspName))
            {
                db.SetParameterValue("LicenseeID", licenseeId);

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    while (reader.Read())
                    {
                        var comm = new GroupCommMetaModel
                        {
                            GroupName = Converter.ToString2(reader["GroupName"]),
                            NumberOfCustomer = Converter.ToInt(reader["NumberOfCustomer"])
                        };
                        comm.MapData(reader);
                        comms.Add(comm);
                    }

                    reader.NextResult();

                    while (comms.Any() && reader.Read())
                    {
                        comDetails.Add(new GroupCommDetailMetaModel(reader));
                    }
                }
            }

            return (comms, comDetails);
        }

        public async Task<DataTable> GetDataForExcelAsync(int licenseeId)
        {
            const string UspName = "Lrf_LicenseeGroupCommSel";
            using (var db = GetObjectDb(UspName))
            {
                db.SetParameterValue("LicenseeID", licenseeId);

                var dataset = await db.ExecuteDataSetAsync().ConfigureAwait(false);
                return dataset.Tables.Count > 0 ? dataset.Tables[0] : new DataTable();
            }
        }

        public GroupCommMetaModel GetById(int groupCommId, int licenseeId, IDictionary<string, bool> permissions)
        {
            const string UspName = "Lrf_GroupCommGetById";
            var comm = new GroupCommMetaModel();
            var hardcodedColumns = CommissionGroupHelper.MapHardcodedNameFromDB(permissions, isUpdate: false);

            using (var db = GetObjectDb(UspName))
            {
                db.SetParameterValue("LicenseeId", licenseeId);
                db.SetParameterValue("GroupCommID", groupCommId);

                using (var reader = db.ExecuteReader())
                {
                    var visibility = CommissionGroupHelper.GetProductColumns(reader, hardcodedColumns);

                    while (reader.Read())
                    {
                        comm.GroupName = Converter.ToString2(reader["GroupName"]);
                        comm.MapData(reader);
                    }
                }
            }

            return comm;
        }

        public async Task<IResultInfo> InsertGroupAsync(GroupCommMetaModel item, IRequest request, int userId, IDictionary<string, bool> permissions)
        {
            const string UspName = "Lrf_LicenseeGroupCommIns";
            var hardcodedColumns = CommissionGroupHelper.MapHardcodedNameFromDB(permissions, isUpdate: false);

            using (var db = GetObjectDb(UspName))
            {
                db.SetParameterValue("LicenseeID", item.LicenseeId);
                db.SetParameterValue("GroupName", item.GroupName);
                db.SetParameterValue("GroupColor", item.GroupColor);
                db.SetParameterValue("UserID", userId);
                db.SetParameterValue("IP", request.Ip);
                db.SetParameterValue("langkey", request.Language);
                db.SetParameterValue("IsDefault", item.IsDefaultGroup);
                db.SetParameterValue("IsResetDefault", item.IsResetDefault);
                db.SetParameterValue("GroupCommID", null);

                var comms = item.CommValues;
                foreach (var comm in comms)
                {
                    db.SetParameterValue(hardcodedColumns[comm.Key] + "Comm", comm.Value);
                }

                AddResultParam(db);
                await db.ExecuteNonQueryAsync().ConfigureAwait(false);

                item.GroupCommId = Converter.ToInt(db.GetParameterValue("GroupCommID"));

                return GetResult(db);
            }
        }

        public async Task<IResultInfo> UpdateGroupAsync(GroupCommMetaModel newItem, IRequest request, int userId, IDictionary<string, bool> permissions)
        {
            const string UspName = "Lrf_LicenseeGroupCommUpd";
            var hardcodedColumns = CommissionGroupHelper.MapHardcodedNameFromDB(permissions, isUpdate: false);

            using (var db = GetObjectDb(UspName, 900))
            {
                var comms = newItem.CommValues;
                foreach (var p in permissions)
                {
                    var code = hardcodedColumns[p.Key];
                    db.SetParameterValue(code + "Comm", comms[p.Key]);
                    if (p.Key == Product.SB || p.Key == "Parlay")
                    {
                        continue;
                    }

                    db.SetParameterValue("IsUpdate" + code, permissions[p.Key]);
                }

                db.SetParameterValue("LicenseeID", newItem.LicenseeId);
                db.SetParameterValue("GroupCommId", newItem.GroupCommId);
                db.SetParameterValue("GroupName", newItem.GroupName);
                db.SetParameterValue("GroupColor", newItem.GroupColor);
                db.SetParameterValue("UserId", userId);
                db.SetParameterValue("Ip", request.Ip);
                db.SetParameterValue("langkey", request.Language);
                db.SetParameterValue("IsDefault", newItem.IsDefaultGroup);
                db.SetParameterValue("IsResetDefault", newItem.IsResetDefault);
                db.SetParameterValue("StrCustID", null);
                AddResultParam(db);
                await db.ExecuteNonQueryAsync().ConfigureAwait(false);
                newItem.GroupCommId = Converter.ToInt(db.GetParameterValue("GroupCommID"));
                var resultInfo = GetResult(db);
                resultInfo.ExtendedData = Converter.ToString2(db.GetParameterValue("StrCustID"));
                return resultInfo;
            }
        }

        public async Task<IResultInfo> DeleteGroupAsync(
            int groupId,
            int licenseeId,
            int userId,
            string ip,
            string language,
            bool isRemoveCommSetting,
            bool isResetDefault)
        {
            const string UspName = "Lrf_LicenseeGroupCommDel";

            using (var db = GetObjectDb(UspName, 600))
            {
                db.SetParameterValue("LicenseeId", licenseeId);
                db.SetParameterValue("GroupCommId", groupId);
                db.SetParameterValue("UserId", userId);
                db.SetParameterValue("Ip", ip);
                db.SetParameterValue("langkey", language);
                db.SetParameterValue("IsRemovePlayercomm", isRemoveCommSetting);
                db.SetParameterValue("IsResetDefault", isResetDefault);
                AddResultParam(db);
                db.SetParameterValue("StrCustID", null);
                await db.ExecuteScalarAsync().ConfigureAwait(false);
                var resultInfo = GetResult(db);
                resultInfo.ExtendedData = Converter.ToString2(db.GetParameterValue("StrCustID"));
                return resultInfo;
            }
        }

        public bool CheckByName(int licenseeId, string groupName)
        {
            const string UspName = "Lrf_GroupCommCheckByName";

            using (var db = GetObjectDb(UspName))
            {
                db.SetParameterValue("LicenseeId", licenseeId);
                db.SetParameterValue("GroupName", groupName);

                return Converter.ToInt(db.ExecuteScalar()) != 1;
            }
        }
    }
}