namespace Fanex.Athena.DataAccess.Core.Common.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.DTO.Users;
    using Fanex.Athena.Model.Customer.MetaModel;

    public interface IUserLogDataAccess
    {
        Task<IList<UserLog>> ReadLog(UserLogMetaModel model);

        void WriteLog(UserLogItem businessLogItem);
    }
}