using Fanex.Athena.Model.Core.DataDomain;

namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    public interface IUserLogService
    {
        void Write<T>(BusinessLogType businessLogType, T item) where T : class;
    }
}