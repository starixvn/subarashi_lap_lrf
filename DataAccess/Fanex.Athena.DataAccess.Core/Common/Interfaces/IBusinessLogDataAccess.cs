using Fanex.Athena.Model.Core.DTO.Common;

namespace Fanex.Athena.DataAccess.Core.Common.Interfaces
{
    public interface IBusinessLogDataAccess
    {
        void Write(BusinessLogItem businessLogItem);
    }
}