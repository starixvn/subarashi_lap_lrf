namespace Fanex.Athena.Module.PlayerAdmin.Helpers
{
    using System.Globalization;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;

    public static class PlayerAdminProductStatusUpdateActionLogHelper
    {
        public const string Success = "Success";
        public const string False = "False";
        private const string Disable = "Disable";
        private const string Enable = "Enable";

        public static PlayerBetLimitProductStatusLogMetaModel CreateLogInfo(
            PlayerBetLimitProductStatusUpdateMetaModel metaModel,
            bool isSuccessful,
            int logDetailId)
        {
            var detail = BuildBetLimitLogDetail(metaModel, isSuccessful, logDetailId);

            return CreateLogInfo(metaModel, detail);
        }

        public static PlayerBetLimitProductStatusLogMetaModel CreateLogInfo(
            PlayerBetLimitProductStatusUpdateMetaModel metaModel,
            PlayerBetLimitProductStatusDetailLogMetaModel detail)
        {
            return new PlayerBetLimitProductStatusLogMetaModel
            {
                CustId = metaModel.CustId,
                UserId = metaModel.UserId,
                SiteName = metaModel.SiteName,
                LicenseeCustId = metaModel.LicenseeCustId,
                Detail = detail
            };
        }

        public static PlayerBetLimitProductStatusDetailLogMetaModel BuildBetLimitLogDetail(
            PlayerBetLimitProductStatusUpdateMetaModel metaModel,
            bool isSuccessful,
            int logDetailId)
        {
            var status = isSuccessful ? Success : False;

            var betLimitLogDetailItem = CreateLogDetailItemByAction(logDetailId, metaModel.ProductId.ToString(), status, metaModel);

            return betLimitLogDetailItem;
        }

        private static PlayerBetLimitProductStatusDetailLogMetaModel CreateLogDetailItemByAction(
            int logDetailId,
            string productId,
            string status,
            PlayerBetLimitProductStatusUpdateMetaModel item)
        {
            var oldStatus = item.OldStatus ? Enable : Disable;
            var newStatus = item.Status ? Enable : Disable;

            return CreateLogDetailItem(logDetailId, productId, status, oldStatus, newStatus);
        }

        private static PlayerBetLimitProductStatusDetailLogMetaModel CreateLogDetailItem(
            int logDetailId,
            string productId,
            string status,
            string oldValue,
            string newValue)
        {
            return new PlayerBetLimitProductStatusDetailLogMetaModel
            {
                DetailedId = logDetailId,
                ProductId = productId,
                Status = status,
                Old = oldValue.ToString(CultureInfo.InvariantCulture),
                New = newValue.ToString(CultureInfo.InvariantCulture)
            };
        }
    }
}