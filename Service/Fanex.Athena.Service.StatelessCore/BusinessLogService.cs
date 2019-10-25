using Fanex.Athena.DataAccess.Core.Common.Interfaces;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Service.StatelessCore
{
    public class BusinessLogService : IBusinessLogService
    {
        private readonly IBusinessLogBuilderFactory _businessLogBuilderFactory;
        private readonly IBusinessLogDataAccess _businessLogDataAccess;

        public BusinessLogService(IBusinessLogBuilderFactory businessLogBuilderFactory,
            IBusinessLogDataAccess businessLogDataAccess)
        {
            _businessLogBuilderFactory = businessLogBuilderFactory;
            _businessLogDataAccess = businessLogDataAccess;
        }

        public void Write<T>(BusinessLogType businessLogType, T item) where T : class
        {
            var logItem = _businessLogBuilderFactory.GetBuilder(businessLogType).Build<T>(item);

            if (logItem != null)
            {
                _businessLogDataAccess.Write(logItem);
            }
        }
    }
}