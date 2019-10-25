using Fanex.Athena.Model.Core.DataDomain;

namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    public interface IBusinessLogBuilderFactory
    {
        IBusinessLogBuilderExtension GetBuilder(BusinessLogType businessLogType);
    }
}