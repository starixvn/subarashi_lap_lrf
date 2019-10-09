namespace Fanex.Athena.Module.PlayerAdmin.Extensions
{
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Service.StatelessCore;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    public class PlayerAdminBusinessLogBuilderFactory : IBusinessLogBuilderFactory
    {
        public IBusinessLogBuilderExtension GetBuilder(BusinessLogType businessLogType)
        {
            return new PlayerBetLimitLogBuilder();
        }
    }
}
