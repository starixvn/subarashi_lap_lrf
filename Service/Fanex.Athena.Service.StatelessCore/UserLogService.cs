using Fanex.Athena.DataAccess.Core.Common.Interfaces;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Service.StatelessCore
{
    public class UserLogService : IUserLogService
    {
        private readonly IUserLogBuilderFactory _UserLogBuilderFactory;
        private readonly IUserLogDataAccess _UserLogDataAccess;

        public UserLogService(IUserLogBuilderFactory UserLogBuilderFactory,
            IUserLogDataAccess UserLogDataAccess)
        {
            _UserLogBuilderFactory = UserLogBuilderFactory;
            _UserLogDataAccess = UserLogDataAccess;
        }

        public void Write<T>(BusinessLogType UserLogType, T item) where T : class
        {
            var logItem = _UserLogBuilderFactory.GetBuilder(UserLogType).Build<T>(item);

            if (logItem != null)
            {
                _UserLogDataAccess.WriteLog(logItem);
            }
        }
    }
}