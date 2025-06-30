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
        Task<IEnumerable<GroupCommSettingMetaModel>> InitCommValues(ProductAccess productAccess);

        Task<IResultInfo> InsertGroupAsync(GroupCommMetaModel item, IRequest request, int userId);

        Task<IResultInfo> UpdateGroupAsync(GroupCommMetaModel newItem, IRequest request, UserAuthInfo user);

        Task<(IList<GroupCommMetaModel>, IDictionary<string, string>)> GetAllAsync(int licenseeId, ProductAccess productAccess);

        Task<GroupCommMetaModel> GetById(int groupCommId, int licenseeId, ProductAccess productAccess);

        bool CheckExistingGroupByName(int licenseeId, string groupName);

        Task<IResultInfo> DeleteGroupAsync(DeleteGroupMetaModel model);
    }
}