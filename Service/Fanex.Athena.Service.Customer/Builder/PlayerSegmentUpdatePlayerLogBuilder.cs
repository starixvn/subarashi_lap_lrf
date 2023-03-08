using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Customer.MetaModel.CustomerLog;
using System.Text;

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

        private static string FormatLogDataToXml(PlayerUpdatingLogMetaModel model)
        {
            var builder = new StringBuilder();

            foreach (var custId in model.ListCustId.Split(','))
            {
                builder.Append($"<r id=\"{custId}\" log=\"LAP - {model.SiteName} - {model.LicenseeCustId} - {model.ActionDetailId} - {model.Status} - {model.NewValue} - {model.OldValue}\" />");
            }

            return $"<Root>{builder}</Root>";
        }
    }
}