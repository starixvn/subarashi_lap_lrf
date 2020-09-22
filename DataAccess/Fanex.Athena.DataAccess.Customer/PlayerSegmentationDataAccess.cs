namespace Fanex.Athena.DataAccess.Customer
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.DataAccess.Core.Extensions;
    using Fanex.Athena.DataAccess.Customer.Interfaces;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Model.Customer.MetaModel.PlayerSegmentation;
    using Fanex.Athena.VendorAdapter.Interfaces;
    using Fanex.Common.Extensions;
    using Fanex.Data;

    public class PlayerSegmentationDataAccess : BasePlayerSegmentationDataAccess, IPlayerSegmentationDataAccess
    {
        private readonly ICacheRefAdapter _cacheRefAdapter;
        public PlayerSegmentationDataAccess(ICacheRefAdapter cacheRefAdapter)
        {
            _cacheRefAdapter = cacheRefAdapter;
        }

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
                    player.MarkDate = reader.ToDateTime("CreatedDate").ToString(FormatKey.DateTimeFormatIn24H);
                    player.CustomerClass = reader.ToString("CustomerClass");
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

        public async Task<IDictionary<int, string>> GetReasonGroupListAsync(string langKey)
        {
            const string spName = "Lrf_ProblemAccount_ReasonGroupSel";
            using (var db = GetObjectDb(spName))
            {
                db.SetParameterValue("Langkey", langKey);
                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    var result = new Dictionary<int, string>();
                    while (reader.Read())
                    {
                        var reasonGroupId = Convert.ToInt16(reader["ReasonGroupID"]);
                        var reasonGroupName = reader["ReasonGroup"] as string;
                        result.Add(reasonGroupId, reasonGroupName);
                    }
                    return result;
                }
            }
        }

        public async Task<IEnumerable<UpdateStatusPlayerResult>> UpdateVipStatusAsync(UpdateStatusPlayerMetaModel metaModel)
        {
            const string spName = "Lrf_ProblemAccount_LicenseeVipPlayerUpd";
            const int commandTimeout = 180;
            using (var db = GetObjectDb(spName, commandTimeout))
            {
                AddCommmonParams(db, metaModel);
                AddVipStatusUpdateParams(db, metaModel);

                using (var reader = await db.ExecuteReaderAsync())
                {
                    var result = new List<UpdateStatusPlayerResult>();
                    while (reader.Read())
                    {
                        var record = new UpdateStatusPlayerResult();
                        record.Code = Convert.ToInt16(reader["ErrCode"]);
                        record.NumberOfPlayer = Convert.ToInt16(reader["cnt"]);
                        record.Ids = reader["ErrMsg"] as string;
                        result.Add(record);
                    }

                    return result;
                }
            }
        }

        public async Task<IEnumerable<CustomerClassModel>> GetCustomerClassInformation(GetCustomerClassInformationMetaModel metaModel)
        {
            using (var db = GetObjectDb(metaModel.GetSettingKey(), 180))
            {
                db.SetParameterValue("Site", metaModel.SiteName);

                using (var reader = await db.ExecuteReaderAsync())
                {
                    var result = new List<CustomerClassModel>();
                    while (reader.Read())
                    {
                        var betDelay = reader.ToNullableDecimal("BetDelay");
                        var leadgroupId = Convert.ToString(reader["LeagueGroupId"]);

                        var record = new CustomerClassModel
                        {
                            CustomerClass = Convert.ToString(reader["CustomerClass"]),
                            LiveType = Convert.ToInt16(reader["Liveindicator"]),
                            SportTypeName = _cacheRefAdapter.GetSportName(Convert.ToString(reader["SportType"])),
                            LeagueGroupId = string.Equals(leadgroupId, "0") ? "-" : leadgroupId,
                            BetDelay = FormatNumber(betDelay.HasValue ? betDelay * 100 : null, "{0:#,##0.##}%"),
                            BetInterval = FormatNumber(reader.ToNullableDecimal("NextBetInterval"), "{0:#,##0.##}"),
                            MaxBet = FormatNumber(reader.ToNullableDecimal("MaxBet"), "{0:#,##0.##}"),
                            MaxPerMatch = FormatNumber(reader.ToNullableDecimal("MaxPerMatch"), "{0:#,##0.##}")
                        };

                        result.Add(record);
                    }

                    return result;
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
        }

        private static void AddProblemPlayerListParams(IObjectDb objectDb, ProblemPlayerListMetaModel metaModel)
        {
            objectDb.SetParameterValue("FromDate", metaModel.FromDate);
            objectDb.SetParameterValue("ToDate", metaModel.ToDate);
            objectDb.SetParameterValue("IsCheckAll", metaModel.IsGetAll);
            objectDb.SetParameterValue("BaseCurrency", metaModel.BaseCurrency);
            objectDb.SetParameterValue("ReasonGroupID", metaModel.ReasonGroupIdList);
            objectDb.SetParameterValue("Langkey", metaModel.Language);
        }

        private static void AddVipPlayerListParams(IObjectDb objectDb, VipPlayerListMetaModel metaModel)
        {
            objectDb.SetParameterValue("VipOption", metaModel.VipOption);
        }

        public static string FormatNumber(decimal? value, string format)
            => value == null ? "-" : string.Format(format, value);
    }
}
