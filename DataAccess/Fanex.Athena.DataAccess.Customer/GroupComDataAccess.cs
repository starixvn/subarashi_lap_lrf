namespace Fanex.Athena.DataAccess.Customer
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Fanex.Athena.DataAccess.Core;
    using Fanex.Athena.DataAccess.Customer.Interfaces;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Common;

    public class GroupComDataAccess : BaseDataAccess, IGroupComDataAccess
    {
        public async Task<IEnumerable<GroupCommSettingMetaModel>> GetAllCommSettingAsync()
        {
            const string UspName = "Lrf_LicenseeCommProductList";

            var comSettings = new List<GroupCommSettingMetaModel>();

            using (var db = GetObjectDb(UspName))
            {
                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    while (reader.Read())
                    {
                        comSettings.Add(new GroupCommSettingMetaModel(reader));
                    }
                }
            }

            return comSettings;
        }

        public async Task<(IList<GroupCommMetaModel>, IList<GroupCommSettingMetaModel>)> GetAllAsync(int licenseeId)
        {
            const string UspName = "Lrf_LicenseeGroupCommSel";

            var comms = new List<GroupCommMetaModel>();
            var commDetails = new List<GroupCommSettingMetaModel>();

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
                        commDetails.Add(new GroupCommSettingMetaModel(reader)
                        {
                            Discount = Convert.ToDecimal(reader["Discount"]),
                            GroupCommId = Convert.ToInt32(reader["GroupDiscountID"])
                        });
                    }
                }
            }

            return (comms, commDetails);
        }

        public async Task<GroupCommMetaModel> GetById(int groupCommId, int licenseeId)
        {
            const string UspName = "Lrf_GroupCommGetById";
            var comm = new GroupCommMetaModel();
            var commValues = new List<GroupCommSettingMetaModel>();

            using (var db = GetObjectDb(UspName))
            {
                db.SetParameterValue("LicenseeId", licenseeId);
                db.SetParameterValue("GroupDiscountID", groupCommId);

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    if (reader.Read())
                    {
                        comm.GroupName = Converter.ToString2(reader["GroupName"]);
                        comm.MapData(reader);
                    }

                    reader.NextResult();

                    while (reader.Read())
                    {
                        commValues.Add(new GroupCommSettingMetaModel(reader)
                        {
                            Discount = Convert.ToDecimal(reader["Discount"])
                        });
                    }
                }
            }

            comm.CommValues = commValues;

            return comm;
        }

        public async Task<IResultInfo> InsertGroupAsync(GroupCommMetaModel item, IRequest request, int userId)
        {
            const string UspName = "Lrf_LicenseeGroupCommIns";

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
                db.SetParameterValue("GroupDiscountID", null);
                db.SetParameterValue("DiscountSettings", BuildDiscountSettingsXmlString(item));

                AddResultParam(db);
                await db.ExecuteNonQueryAsync().ConfigureAwait(false);

                item.GroupCommId = Converter.ToInt(db.GetParameterValue("GroupDiscountID"));

                return GetResult(db);
            }
        }

        public async Task<IResultInfo> UpdateGroupAsync(GroupCommMetaModel newItem, IRequest request, int userId)
        {
            const string UspName = "Lrf_LicenseeGroupCommUpd";

            using (var db = GetObjectDb(UspName, 900))
            {
                db.SetParameterValue("LicenseeID", newItem.LicenseeId);
                db.SetParameterValue("GroupDiscountID", newItem.GroupCommId);
                db.SetParameterValue("GroupName", newItem.GroupName);
                db.SetParameterValue("GroupColor", newItem.GroupColor);
                db.SetParameterValue("DiscountSettings", BuildDiscountSettingsXmlString(newItem));
                db.SetParameterValue("UserId", userId);
                db.SetParameterValue("Ip", request.Ip);
                db.SetParameterValue("langkey", request.Language);
                db.SetParameterValue("IsDefault", newItem.IsDefaultGroup);
                db.SetParameterValue("IsResetDefault", newItem.IsResetDefault);
                db.SetParameterValue("StrCustID", null);
                AddResultParam(db);
                await db.ExecuteNonQueryAsync().ConfigureAwait(false);
                newItem.GroupCommId = Converter.ToInt(db.GetParameterValue("GroupDiscountID"));
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
                db.SetParameterValue("GroupDiscountID", groupId);
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

        private static string BuildDiscountSettingsXmlString(GroupCommMetaModel metaModel)
        {
            const string XmlPattern = "<Root>{0}</Root>";
            const string XmlElementPattern = "<r SportType=\"{0}\" BetType=\"{1}\" Discount=\"{2}\" />";
            var xmlElementBuilder = new StringBuilder();

            foreach (var setting in metaModel.CommValues)
            {
                xmlElementBuilder.Append(string.Format(
                    XmlElementPattern,
                    setting.Sporttype,
                    setting.Bettype,
                    setting.Discount));
            }

            return string.Format(XmlPattern, xmlElementBuilder);
        }
    }
}