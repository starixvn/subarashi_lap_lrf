using Fanex.Athena.Model.Core.DTO.Common;

namespace Fanex.Athena.Service.StatelessCore
{
    public interface IBusinessLogBuilderExtension
    {
        BusinessLogItem Build<T>(T item) where T : class;
    }
}
