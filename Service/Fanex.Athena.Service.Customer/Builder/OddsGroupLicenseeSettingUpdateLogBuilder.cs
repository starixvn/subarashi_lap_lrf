using System.Text;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Customer.MetaModel.CustomerLog;
using Fanex.Athena.Model.Customer.MetaModel.OddsGroupLicenseeSetting;

namespace Fanex.Athena.Service.StatelessCore.Extensions
{
    internal class OddsGroupLicenseeSettingUpdateLogBuilder : IUserLogBuilderExtension
    {
        public UserLogItem Build<T>(T item) where T : class
        {
            if (!(item is UpdateCustomerOddsGroupLogMetaModel currentItem))
            {
                return null;
            }

            return new UserLogItem
            {
                UserId = currentItem.UserId,
                CustID = currentItem.CustId,
                ActionID = currentItem.ActionId,
                TypeId = (byte)UserControlLogType.Function,
                Doing = $"{currentItem.SiteName} - {currentItem.LicenseeCustId} - " +
                    $"{currentItem.ActionDetailId} - {currentItem.NewValue} - " +
                    $"{currentItem.OldValue} - {currentItem.Subsidiary} - {currentItem.Currency} - " +
                    $"{currentItem.UserName}"
            };
        }
    }
}