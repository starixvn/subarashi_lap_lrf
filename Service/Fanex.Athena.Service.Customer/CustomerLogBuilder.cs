using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Customer.MetaModel.CustomerLog;
using Fanex.Athena.Service.StatelessCore;

namespace Fanex.Athena.Service.Customer
{
    public class CustomerLogBuilder : IBusinessLogBuilderExtension
    {
        public BusinessLogItem Build<T>(T item) where T : class
        {
            if (!(item is PlayerUpdatingLogMetaModel currentItem))
            {
                return null;
            }

            return new BusinessLogItem
            {
                CustID = currentItem.CustId,
                UserId = currentItem.UserId,
                ActionID = LogActionId.PlayerAdminUpdateBAStatus,
                TypeId = (byte)UserControlLogType.Function,
                Doing = $"LAP - {currentItem.SiteName} - {currentItem.LicenseeCustId} - {currentItem.ActionDetailId} - {currentItem.Status} - {currentItem.NewValue} - {currentItem.OldValue}"
            };
        }
    }
}
