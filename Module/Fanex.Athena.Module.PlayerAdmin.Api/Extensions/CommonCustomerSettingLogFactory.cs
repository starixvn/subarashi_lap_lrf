using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Service.StatelessCore;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Extensions
{
    public class CommonCustomerSettingLogFactory : IBusinessLogBuilderFactory
    {
        public IBusinessLogBuilderExtension GetBuilder(BusinessLogType businessLogType)
        {
            return new CommonCustomerSettingLogBuilder();
        }
    }
}