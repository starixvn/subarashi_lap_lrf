using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Service.StatelessCore;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Service.Customer
{
    public class CustomerBusinessLogBuilderFactory : IBusinessLogBuilderFactory
    {
        public IBusinessLogBuilderExtension GetBuilder(BusinessLogType businessLogType)
        {
            return new CustomerLogBuilder();
        }
    }
}
