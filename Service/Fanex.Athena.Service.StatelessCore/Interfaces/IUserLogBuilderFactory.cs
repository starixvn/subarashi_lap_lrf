using Fanex.Athena.Model.Core.DataDomain;

namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    public interface IUserLogBuilderFactory
    {
        IUserLogBuilderExtension GetBuilder(BusinessLogType businessLogType);
    }
}