// -----------------------------------------------------------------------
// <copyright file="IGroupComService.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Service.Customer.Interfaces
{
    using System.Collections.Generic;
    using System.Data;
    using System.Threading.Tasks;

    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Customer.MetaModel;

    public interface IGroupComService
    {
        Task<IResultInfo> InsertGroupAsync(GroupCommMetaModel item, IRequest request, int userId, IDictionary<string, bool> permissions);

        Task<IResultInfo> UpdateGroupAsync(GroupCommMetaModel newItem, IRequest request, UserAuthInfo user, IDictionary<string, bool> permissions);

        Task<IList<GroupCommMetaModel>> GetAllAsync(int licenseeId, IDictionary<string, bool> permissions);

        Task<DataTable> GetDataForExcelAsync(int licenseeId);

        GroupCommMetaModel GetById(int groupCommId, int licenseeId, IDictionary<string, bool> permissions);

        bool CheckExistingGroupByName(int licenseeId, string groupName);

        Task<IResultInfo> DeleteGroupAsync(DeleteGroupMetaModel model);
    }
}