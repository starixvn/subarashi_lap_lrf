namespace Fanex.Athena.DataAccess.Customer
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.DataAccess.Customer.Interfaces;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Common.Extensions;
    using Fanex.Data;

    public class PlayerSegmentationDataAccess : BasePlayerSegmentationDataAccess, IPlayerSegmentationDataAccess
    {
        public async Task<ApiPagingResult<PlayerInfo>> GetProblemPlayerListAsync(ProblemPlayerListMetaModel metaModel)
        {
            const string spName = "Lrf_ProblemAccount_LicenseeProblemPlayerSel";
            using (var db = GetObjectDb(spName))
            {
                AddCommmonParams(db, metaModel);
                AddPlayerListBaseParams(db, metaModel);
                AddProblemPlayerListParams(db, metaModel);

                var playerList = await ReadPlayerList(db, (reader, player) =>
                {
                    player.LastModifiedDate = reader.ToDateTime("CreatedDate").ToString(FormatKey.DateTimeFormatIn24H);
                    player.Reason = reader.ToString("Reason");
                });

                var total = ReadTotal(db);

                var result = new ApiPagingResult<PlayerInfo>(playerList,
                    metaModel.PageIndex, metaModel.PageSize,
                    metaModel.OrderCol, metaModel.SortType,
                    total);
                return result;
            }
        }

        public async Task<ApiPagingResult<PlayerInfo>> GetVipPlayerListAsync(VipPlayerListMetaModel metaModel)
        {
            const string spName = "Lrf_ProblemAccount_LicenseeVIPPlayerSel";
            using (var db = GetObjectDb(spName))
            {
                AddCommmonParams(db, metaModel);
                AddPlayerListBaseParams(db, metaModel);
                AddVipPlayerListParams(db, metaModel);

                var playerList = await ReadPlayerList(db);
                var total = ReadTotal(db);

                var result = new ApiPagingResult<PlayerInfo>(playerList,
                                   metaModel.PageIndex, metaModel.PageSize,
                                   metaModel.OrderCol, metaModel.SortType,
                                   total);
                return result;
            }
        }

        public async Task<IEnumerable<ReasonGroup>> GetReasonGroupListAsync(string langKey)
        {
            const string spName = "Lrf_ProblemAccount_ReasonGroupSel";
            using (var db = GetObjectDb(spName))
            {
                db.SetParameterValue("Langkey", langKey);
                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    var result = new List<ReasonGroup>();
                    while (reader.Read())
                    {
                        var record = new ReasonGroup
                        {
                            ReasonGroupID = Convert.ToInt16(reader["ReasonGroupID"]),
                            ReasonGroupName = reader["ReasonGroup"] as string,
                            CustomerClass = Convert.ToInt16(reader["CustomerClass"])
                        };
                        result.Add(record);
                    }
                    return result;
                }
            }
        }

        public async Task<(string ListAffectCustId, IEnumerable<UpdateStatusPlayerResult> ListUpdateStatusPlayerResult)> UpdateVipStatusAsync(UpdateStatusPlayerMetaModel metaModel)
        {
            const string spName = "Lrf_ProblemAccount_LicenseeVipPlayerUpd";
            const int commandTimeout = 180;
            using (var db = GetObjectDb(spName, commandTimeout))
            {
                AddCommmonParams(db, metaModel);
                AddVipStatusUpdateParams(db, metaModel);

                using (var reader = await db.ExecuteReaderAsync())
                {
                    var ouptParams = db.GetOutputParams();

                    var listAffectCustId = Convert.ToString(db.GetOutputParams()["CustIDList"]);

                    var result = new List<UpdateStatusPlayerResult>();
                    while (reader.Read())
                    {
                        var record = new UpdateStatusPlayerResult();
                        record.Code = Convert.ToInt16(reader["ErrCode"]);
                        record.NumberOfPlayer = Convert.ToInt16(reader["cnt"]);
                        record.Ids = reader["ErrMsg"] as string;
                        result.Add(record);
                    }

                    return (listAffectCustId, result);
                }
            }
        }

        private static void AddVipStatusUpdateParams(IObjectDb objectDb, UpdateStatusPlayerMetaModel metaModel)
        {
            objectDb.SetParameterValue("Username", metaModel.SystemIds);
            objectDb.SetParameterValue("Username2", metaModel.ExternalIds);
            objectDb.SetParameterValue("IsVip", metaModel.IsVip);
            objectDb.SetParameterValue("UserID", metaModel.UserId);
            objectDb.SetParameterValue("Ip", metaModel.Ip);
            objectDb.SetParameterValue("CustIDList", string.Empty);
        }

        private static void AddProblemPlayerListParams(IObjectDb objectDb, ProblemPlayerListMetaModel metaModel)
        {
            objectDb.SetParameterValue("FromDate", metaModel.FromDate);
            objectDb.SetParameterValue("ToDate", metaModel.ToDate);
            objectDb.SetParameterValue("IsCheckAll", metaModel.IsGetAll);
            objectDb.SetParameterValue("ReasonGroupID", metaModel.ReasonGroupIdList);
            objectDb.SetParameterValue("Langkey", metaModel.Language);
        }

        private static void AddVipPlayerListParams(IObjectDb objectDb, VipPlayerListMetaModel metaModel)
        {
            objectDb.SetParameterValue("VipOption", metaModel.VipOption);
        }
    }
}