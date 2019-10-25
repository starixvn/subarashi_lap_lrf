namespace Fanex.Athena.Module.PlayerAdmin.Extensions
{
    using System.Linq;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Service.StatelessCore;
    using Newtonsoft.Json;

    public class PlayerBetLimitLogBuilder : IBusinessLogBuilderExtension
    {
        public BusinessLogItem Build<T>(T item) where T : class
        {
            if (!(item is PlayerBetLimitLogMetaModel currentItem) || currentItem.Detail is null || !currentItem.Detail.Any())
            {
                return null;
            }

            return new BusinessLogItem
            {
                CustID = currentItem.CustId,
                UserId = currentItem.UserId,
                ActionID = LogActionId.PlayerAdminUpdateBetLimit,
                TypeId = (byte)UserControlLogType.Function,
                Doing = "LAP - " + currentItem.SiteName + " - " + currentItem.LicenseeCustId + " - "  + JsonConvert.SerializeObject(currentItem.Detail)
            };
        }
    }
}