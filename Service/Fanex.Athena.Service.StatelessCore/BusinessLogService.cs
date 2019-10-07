using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
            IBusinessLogDataAccess businessLogDataAccess )
        {
            _businessLogBuilderFactory = businessLogBuilderFactory;
            _businessLogDataAccess = businessLogDataAccess;
        }
        public void Write<T>(BusinessLogType bussinessLogType, T item) where T : class
        {
            var logItem = _businessLogBuilderFactory.GetBuilder(bussinessLogType).Build<T>(item);
            _businessLogDataAccess.Write(logItem);

        }
    }
}
