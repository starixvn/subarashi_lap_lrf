namespace Fanex.Athena.Module.PlayerAdmin.Helpers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Module.PlayerAdmin.DataDomains;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;

    public static class PlayerAdminBetLimitActionLogHelper
    {
        public const string Success = "Success";

        public const string False = "False";

        public static PlayerBetLimitLogMetaModel CreateLogInfo(
            PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>> metaModel,
            Func<PlayerBetLimitMetaModel, string> getSportTypeFunc,
            bool isSuccessful,
            int[] logDetailIds)
        {
            var detail = BuildBetLimitLogDetail(metaModel.Setting, getSportTypeFunc, isSuccessful, logDetailIds);

            return CreateLogInfo(metaModel, detail);
        }

        public static PlayerBetLimitLogMetaModel CreateLogInfo(
            PlayerBetLimitUpdateMetaModel<AgCasinoBetLimitMetaModel> metaModel,
            bool isSuccessful)
        {
            return CreateLogInfo(metaModel, new PlayerBetLimitDetailedLogMetaModel[1] { BuildGroupLogDetail(metaModel.Setting, isSuccessful) });
        }

        public static PlayerBetLimitLogMetaModel CreateLogInfo<T>(
            PlayerBetLimitUpdateMetaModel<T> metaModel,
            IEnumerable<PlayerBetLimitDetailedLogMetaModel> detail)
        {
            return detail.Any()
                ? new PlayerBetLimitLogMetaModel
                {
                    CustId = metaModel.CustId,
                    UserId = metaModel.UserId,
                    SiteName = metaModel.SiteName,
                    LicenseeCustId = metaModel.LicenseeCustId,
                    Detail = detail
                }
                : null;
        }

        public static IEnumerable<PlayerBetLimitDetailedLogMetaModel> BuildBetLimitLogDetail(
            IEnumerable<PlayerBetLimitMetaModel> setting,
            Func<PlayerBetLimitMetaModel, string> getSportTypeFunc,
            bool isSuccessful,
            int[] logDetailIds)
        {
            var status = isSuccessful ? Success : False;

            foreach (var item in setting)
            {
                if (item.IsUpdated)
                {
                    var id = getSportTypeFunc(item);
                    for (var i = 0; i < logDetailIds.Length; i++)
                    {
                        var logDetailId = logDetailIds[i];
                        
                        if (logDetailId == LogActionDetailId.UpdatingMinBet && item.MinBet != item.OldMinBet)
                        {
                            yield return CreateBetLimitLogDetailItem(logDetailId, id, status, item.OldMinBet, item.MinBet);
                        }

                        if (logDetailId == LogActionDetailId.UpdatingMaxBet && item.MaxBet != item.OldMaxBet)
                        {
                            yield return CreateBetLimitLogDetailItem(logDetailId, id, status, item.OldMaxBet, item.MaxBet);
                        }

                        if ((logDetailId == LogActionDetailId.UpdatingMaxPerMatch
                            || logDetailId == LogActionDetailId.UpdatingMaxBetPerDraw)
                            && item.MaxPerMatch != item.OldMaxPerMatch)
                        {
                            yield return CreateBetLimitLogDetailItem(logDetailId, id, status, item.OldMaxPerMatch, item.MaxPerMatch);
                        }

                        if (logDetailId == LogActionDetailId.UpdatingMaxPerBall && item.MaxPerBall != item.OldMaxPerBall)
                        {
                            yield return CreateBetLimitLogDetailItem(logDetailId, id, status, item.OldMaxPerBall, item.MaxPerBall);
                        }
                    }
                }
            }
        }

        private static PlayerBetLimitDetailedLogMetaModel BuildGroupLogDetail(AgCasinoBetLimitMetaModel setting, bool isSuccessful)
        {
            return new PlayerBetLimitDetailedLogMetaModel
            {
                DetailedId = LogActionDetailId.UpdatingAGGroup,
                SportType = ((int)SportType.AgCasino).ToString(),
                Status = isSuccessful ? Success : False,
                Old = setting.OldGroup,
                New = setting.Group
            };
        }

        private static PlayerBetLimitDetailedLogMetaModel CreateBetLimitLogDetailItem(
            int logDetailId,
            string id,
            string status,
            decimal oldValue,
            decimal newValue)
        {
            return new PlayerBetLimitDetailedLogMetaModel
            {
                DetailedId = logDetailId,
                SportType = id,
                Status = status,
                Old = oldValue.ToString(),
                New = newValue.ToString()
            };
        }
    }
}
