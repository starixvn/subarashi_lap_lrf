namespace Fanex.Athena.DataAccess.Customer
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.DataAccess.Customer.Interfaces;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Common.Extensions;
    using Fanex.Data;

    public class PlayerSegmentationDataAccess : BasePlayerSegmentationDataAccess, IPlayerSegmentationDataAccess
    {
        private const string ExternalIdColumn = "username2";
        private const string SystemIdColumn = "username";
        private const string FromDateColumn = "FromDate";
        private const string ToDateColumn = "ToDate";
        private const string ErrCodeColumn = "ErrCode";
        private const string LangkeyColumn = "Langkey";

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

        public async Task<ApiPagingResult<SabaVirtualPlayer>> GetSabaVirtualPlayerListAsync(SabaVirtualPlayerListMetaModel metaModel)
        {
            const string spName = "Lrf_Licensee_DangerLevelSel";

            using (var db = GetObjectDb(spName))
            {
                AddCommmonParams(db, metaModel);
                db.SetParameterValue(FromDateColumn, metaModel.FromDate);
                db.SetParameterValue(ToDateColumn, metaModel.ToDate);
                db.SetParameterValue("UserName", SqlHelper.ToSqlTextSearch(metaModel.UserName));
                db.SetParameterValue("IsCheckAll", metaModel.IsGetAll);
                db.SetParameterValue("OrderCol", metaModel.OrderCol);
                db.SetParameterValue("SortType", metaModel.SortType);
                db.SetParameterValue("PageIndex", metaModel.PageIndex);
                db.SetParameterValue("PageSize", metaModel.PageSize);
                db.SetParameterValue("TotalItems", 0);
                db.SetParameterValue(LangkeyColumn, metaModel.Language);
                db.SetParameterValue("Sporttype", metaModel.SportIdList);
                db.SetParameterValue("Level", metaModel.LevelIdList);

                var playerList = new LinkedList<SabaVirtualPlayer>();

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    while (reader.Read())
                    {
                        var lastModifiedDate = reader["LastModifiedDate"] != DBNull.Value ? reader.ToDateTime("LastModifiedDate").ToString(FormatKey.DateTimeFormatIn24H) : "-";

                        var player = new SabaVirtualPlayer
                        {
                            CustId = Convert.ToInt32(reader["CustId"]),
                            ExternalId = reader[ExternalIdColumn] as string,
                            SystemId = reader[SystemIdColumn] as string,
                            LastModifiedDate = lastModifiedDate,
                            SoccerLevel = Convert.ToInt16(reader["SoccerLevel"]),
                            BasketballLevel = Convert.ToInt16(reader["BasketballLevel"]),
                            AgentId = Convert.ToInt32(reader["AgentID"])
                        };

                        playerList.AddLast(player);
                    }
                }

                var total = ReadTotal(db);

                var result = new ApiPagingResult<SabaVirtualPlayer>(playerList,
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
                db.SetParameterValue(LangkeyColumn, langKey);
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

        public async Task<IEnumerable<SubIssue>> GetAbnormalSubIssueAsync(string langKey)
        {
            const string spName = "Lrf_AbnormalBet_SubIssueSel";
            using (var db = GetObjectDb(spName))
            {
                db.SetParameterValue(LangkeyColumn, langKey);
                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    var result = new List<SubIssue>();
                    while (reader.Read())
                    {
                        var record = new SubIssue
                        {
                            SubIssueTypeId = Convert.ToInt16(reader["SubIssueTypeId"]),
                            SubIssueTypeName = reader["SubIssueTypeName"] as string,
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
                AddTrackingParams(db, metaModel);

                var result = new List<UpdateStatusPlayerResult>();
                using (var reader = await db.ExecuteReaderAsync())
                {
                    while (reader.Read())
                    {
                        var record = new UpdateStatusPlayerResult();
                        record.Code = Convert.ToInt16(reader[ErrCodeColumn]);
                        record.NumberOfPlayer = Convert.ToInt16(reader["cnt"]);
                        record.Ids = reader["ErrMsg"] as string;
                        result.Add(record);
                    }
                }
                var listAffectCustId = Convert.ToString(db.GetParameterValue("CustIDList"));
                return (listAffectCustId, result);
            }
        }

        public async Task<string> GetXmlPresenterForMonitoredPlayerReachLishtAsync(MonitoredPlayerListMetaModel metaModel)
        {
            const string spName = "Acc_Dep_WLMonitored_HistorySelByAG";
            const int defaultSportType = 0;
            using (var db = GetObjectDb(spName))
            {
                AddCommmonParams(db, metaModel);
                db.SetParameterValue(FromDateColumn, metaModel.FromDate);
                db.SetParameterValue(ToDateColumn, metaModel.ToDate);
                db.SetParameterValue("XMLReachList", string.Empty);
                db.SetParameterValue("Sporttype", defaultSportType);
                await db.ExecuteNonQueryAsync();
                return Convert.ToString(db.GetOutputParams()["XMLReachList"]);
            }
        }

        public async Task<ApiPagingResult<MonitoredPlayerInfo>> GetMonitoredPlayerListAsync(MonitoredPlayerListMetaModel metaModel)
        {
            const string spName = "Acc_Dep_WLMonitored_Player_Sel";
            using (var db = GetObjectDb(spName))
            {
                AddCommmonParams(db, metaModel);
                db.SetParameterValue("UserName", SqlHelper.ToSqlTextSearch(metaModel.UserName));
                db.SetParameterValue("XMLReachList", metaModel.XMLReachList);
                db.SetParameterValue("PageIndex", metaModel.PageIndex);
                db.SetParameterValue("PageSize", metaModel.PageSize);
                db.SetParameterValue("IsGetAll", metaModel.IsGetAll);
                db.SetParameterValue("SortType", metaModel.OrderCol);
                db.SetParameterValue("IsDesc", metaModel.SortType != 1);

                var monitoredPlayerList = new List<MonitoredPlayerInfo>();
                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    while (reader.Read())
                    {
                        var player = new MonitoredPlayerInfo();
                        player.CustId = Convert.ToInt32(reader["CustId"]);
                        player.ExternalId = reader[ExternalIdColumn] as string;
                        player.SystemId = reader[SystemIdColumn] as string;
                        player.CurrencyId = Convert.ToInt32(reader["ExchangeId"]);
                        player.AgentId = Convert.ToInt32(reader["recommend"]);
                        player.CurrentWinningThreshold = Convert.ToDecimal(reader["CurrentWinningThreshold"]);
                        player.NoOfReached = int.TryParse(reader["NoOfReached"]?.ToString(), out int noOfReached) ? (int?)noOfReached : null;
                        player.LastReachedDate = DateTime.TryParse(reader["LastReachedDate"]?.ToString(), out DateTime lastReachedDate) ? (DateTime?)lastReachedDate : null;
                        player.ProblemPlayer = Convert.ToBoolean(reader["ProblemPlayer"]);
                        player.VipPlayer = Convert.ToBoolean(reader["VIPPlayer"]);

                        monitoredPlayerList.Add(player);
                    }
                }

                var total = ReadTotal(db);

                var result = new ApiPagingResult<MonitoredPlayerInfo>(monitoredPlayerList,
                    metaModel.PageIndex, metaModel.PageSize,
                    metaModel.OrderCol, metaModel.SortType,
                    total);

                return result;
            }
        }

        public async Task<IEnumerable<MonitoredPlayerReachedHistory>> GetMonitoredPlayerReachedHistoryAsync(MonitoredPlayerReachedHistoryMetaModel metaModel)
        {
            const string spName = "Acc_Dep_WLMonitored_Player_ReachDetail_Sel";
            using (var db = GetObjectDb(spName))
            {
                db.SetParameterValue("CustID", metaModel.CustId);
                db.SetParameterValue(FromDateColumn, metaModel.FromDate);
                db.SetParameterValue(ToDateColumn, metaModel.ToDate);
                db.SetParameterValue("SortType", metaModel.OrderCol);
                db.SetParameterValue("IsDesc", metaModel.SortType != 1);

                var reachedHistory = new List<MonitoredPlayerReachedHistory>();
                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    while (reader.Read())
                    {
                        var reachedHistoryItem = new MonitoredPlayerReachedHistory
                        {
                            ReachedDate = DateTime.Parse(reader["CreatedDate"].ToString()),
                            DailyWinningThreshold = Convert.ToDecimal(reader["WinningThreshold"]),
                            TotalWinningAmount = Convert.ToDecimal(reader["WinLossAmount"])
                        };
                        reachedHistory.Add(reachedHistoryItem);
                    }
                }

                return reachedHistory;
            }
        }

        public async Task<MonitoredPlayerCommand> InsertMonitoredPlayerAsync(InsertMonitoredPlayerMetaModel metaModel)
        {
            const string spName = "Acc_Dep_WLMonitored_Player_Ins";
            const int commandTimeout = 180;
            using (var db = GetObjectDb(spName, commandTimeout))
            {
                AddCommmonParams(db, metaModel);
                AddTrackingParams(db, metaModel);
                db.SetParameterValue("username", metaModel.SystemId?.Trim());
                db.SetParameterValue("username2", metaModel.ExternalId?.Trim());
                db.SetParameterValue("WinningThreshold", metaModel.WinningThreshold);

                await db.ExecuteNonQueryAsync();

                return new MonitoredPlayerCommand
                {
                    ErrorCode = Convert.ToInt32(db.GetParameterValue(ErrCodeColumn))
                };
            }
        }

        public async Task<MonitoredPlayerCommand> UpdateMonitoredPlayerAsync(UpdateMonitoredPlayerMetaModel metaModel)
        {
            const string spName = "Acc_Dep_WLMonitored_Player_Upd";
            const int commandTimeout = 180;
            using (var db = GetObjectDb(spName, commandTimeout))
            {
                AddCommmonParams(db, metaModel);
                AddTrackingParams(db, metaModel);
                db.SetParameterValue("CustID", metaModel.CustId);
                db.SetParameterValue("WinningThreshold", metaModel.WinningThreshold);

                await db.ExecuteNonQueryAsync();

                return new MonitoredPlayerCommand
                {
                    ErrorCode = Convert.ToInt32(db.GetParameterValue(ErrCodeColumn))
                };
            }
        }

        public async Task<MonitoredPlayerCommand> DeleteMonitoredPlayerAsync(DeleteMonitoredPlayerMetaModel metaModel)
        {
            const string spName = "Acc_Dep_WLMonitored_Player_Del";
            const int commandTimeout = 180;
            using (var db = GetObjectDb(spName, commandTimeout))
            {
                AddCommmonParams(db, metaModel);
                AddTrackingParams(db, metaModel);
                db.SetParameterValue("CustList", metaModel.CustIds.Trim());

                await db.ExecuteNonQueryAsync();

                return new MonitoredPlayerCommand
                {
                    ErrorCode = Convert.ToInt32(db.GetParameterValue(ErrCodeColumn))
                };
            }
        }

        public async Task<IEnumerable<MonitoredPlayerCommand>> BatchUpdateMonitoredPlayerAsync(BatchUpdateMonitoredPlayerMetaModel metaModel)
        {
            const string spName = "Acc_Dep_WLMonitored_Player_BatchUpd";
            const int commandTimeout = 180;
            using (var db = GetObjectDb(spName, commandTimeout))
            {
                AddCommmonParams(db, metaModel);
                AddTrackingParams(db, metaModel);
                db.SetParameterValue("XML", metaModel.BatchPlayerXml);

                var commandResult = new List<MonitoredPlayerCommand>();
                using (var reader = await db.ExecuteReaderAsync())
                {
                    while (reader.Read())
                    {
                        var result = new MonitoredPlayerCommand
                        {
                            ErrorCode = Convert.ToInt32(reader[ErrCodeColumn]),
                            SystemId = reader[SystemIdColumn] as string,
                            ExternalId = reader[ExternalIdColumn] as string
                        };

                        commandResult.Add(result);
                    }
                }
                return commandResult;
            }
        }

        private static void AddVipStatusUpdateParams(IObjectDb objectDb, UpdateStatusPlayerMetaModel metaModel)
        {
            objectDb.SetParameterValue("Username", metaModel.SystemIds);
            objectDb.SetParameterValue("Username2", metaModel.ExternalIds);
            objectDb.SetParameterValue("IsVip", metaModel.IsVip);
            objectDb.SetParameterValue("CustIDList", null);
        }

        private static void AddProblemPlayerListParams(IObjectDb objectDb, ProblemPlayerListMetaModel metaModel)
        {
            objectDb.SetParameterValue(FromDateColumn, metaModel.FromDate);
            objectDb.SetParameterValue(ToDateColumn, metaModel.ToDate);
            objectDb.SetParameterValue("IsCheckAll", metaModel.IsGetAll);
            objectDb.SetParameterValue("ReasonGroupID", metaModel.ReasonGroupIdList);
            objectDb.SetParameterValue(LangkeyColumn, metaModel.Language);
        }

        private static void AddVipPlayerListParams(IObjectDb objectDb, VipPlayerListMetaModel metaModel)
        {
            objectDb.SetParameterValue("VipOption", metaModel.VipOption);
            objectDb.SetParameterValue("IsCheckAll", metaModel.IsCheckAll);
            objectDb.SetParameterValue(FromDateColumn, metaModel.FromDate);
            objectDb.SetParameterValue(ToDateColumn, metaModel.ToDate);
        }
    }
}