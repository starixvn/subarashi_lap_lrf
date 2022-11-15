using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Customer.MetaModel.CustomerLog;

namespace Fanex.Athena.Service.StatelessCore.Extensions
{
    internal class PlayerSegmentUpdatePlayerLogBuilder : IBusinessLogBuilderExtension
    {
        public BusinessLogItem Build<T>(T item) where T : class
        {
            if (!(item is PlayerUpdatingLogMetaModel currentItem))
            {
                return null;
            }

            return new BusinessLogItem
            {
                UserId = currentItem.UserId,
                ActionID = LogActionId.PlayerSegmentUpdateVIPPlayer,
                TypeId = (byte)UserControlLogType.Function,
                LogData = FormatLogDataToXml(currentItem)
            };
        }

        private string FormatLogDataToXml(PlayerUpdatingLogMetaModel model)
        {
            var xml = "";

            foreach (var custId in model.ListCustId.Split(','))
            {
                xml += $"<r id=\"{custId}\" log=\"LAP - {model.SiteName} - {model.LicenseeCustId} - {model.ActionDetailId} - {model.Status} - {model.NewValue} - {model.OldValue}\" />";
            }

            return $"<Root>{xml}</Root>";
        }
    }
}