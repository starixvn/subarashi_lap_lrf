namespace Fanex.Athena.Module.PlayerAdmin.Helpers
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
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
            return CreateLogInfo(metaModel, new[] { BuildGroupLogDetail(metaModel.Setting, isSuccessful) });
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
            var updatedItems = setting.Where(x => x.IsUpdated);
            foreach (var item in updatedItems)
            {
                var sportId = getSportTypeFunc?.Invoke(item);
                for (var i = 0; i < logDetailIds.Length; i++)
                {
                    var logDetailId = logDetailIds[i];
                    var betLimitLogDetailItem = CreateLogDetailItemByAction(logDetailId, sportId, status, item);

                    if (betLimitLogDetailItem != null)
                    {
                        yield return betLimitLogDetailItem;
                    }
                }
            }
        }

        private static PlayerBetLimitDetailedLogMetaModel CreateLogDetailItemByAction(
            int logDetailId,
            string sportId,
            string status,
            PlayerBetLimitMetaModel item)
        {
            if (logDetailId == LogActionDetailId.UpdatingMinBet && item.MinBet != item.OldMinBet)
            {
                return CreateLogDetailItem(logDetailId, sportId, status, item.OldMinBet, item.MinBet);
            }

            if (logDetailId == LogActionDetailId.UpdatingMaxBet && item.MaxBet != item.OldMaxBet)
            {
                return CreateLogDetailItem(logDetailId, sportId, status, item.OldMaxBet, item.MaxBet);
            }

            if ((logDetailId == LogActionDetailId.UpdatingMaxPerMatch
                || logDetailId == LogActionDetailId.UpdatingMaxBetPerDraw)
                && item.MaxPerMatch != item.OldMaxPerMatch)
            {
                return CreateLogDetailItem(logDetailId, sportId, status, item.OldMaxPerMatch, item.MaxPerMatch);
            }

            if (logDetailId == LogActionDetailId.UpdatingMaxPerBall && item.MaxPerBall != item.OldMaxPerBall)
            {
                return CreateLogDetailItem(logDetailId, sportId, status, item.OldMaxPerBall, item.MaxPerBall);
            }

            return null;
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

        private static PlayerBetLimitDetailedLogMetaModel CreateLogDetailItem(
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
                Old = oldValue.ToString(CultureInfo.InvariantCulture),
                New = newValue.ToString(CultureInfo.InvariantCulture)
            };
        }
    }
}