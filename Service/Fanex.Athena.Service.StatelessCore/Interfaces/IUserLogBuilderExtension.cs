using Fanex.Athena.Model.Core.DTO.Common;

namespace Fanex.Athena.Service.StatelessCore
{
    public interface IUserLogBuilderExtension
    {
        UserLogItem Build<T>(T item) where T : class;
    }
}