namespace Fanex.Athena.DataAccess.Customer.Interfaces
{
    using System.Collections.Generic;
    using System.Data;
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.Helper;
    using Fanex.Athena.Model.Customer.MetaModel;

    public interface IGroupComDataAccess
    {
        Task<IEnumerable<GroupCommSettingMetaModel>> GetAllCommSettingAsync(ProductAccess productAccess);

        Task<IResultInfo> InsertGroupAsync(GroupCommMetaModel item, IRequest request, int userId);

        Task<IResultInfo> UpdateGroupAsync(GroupCommMetaModel newItem, IRequest request, int userId);

        Task<(IList<GroupCommMetaModel>, IList<GroupCommSettingMetaModel>)> GetAllAsync(int licenseeId, ProductAccess productAccess);

        Task<GroupCommMetaModel> GetById(int groupCommId, int licenseeId, ProductAccess productAccess);

        bool CheckByName(int licenseeId, string groupName);

        Task<IResultInfo> DeleteGroupAsync(
            int groupId,
            int licenseeId,
            int userId,
            string ip,
            string language,
            bool isRemoveCommSetting,
            bool isResetDefault);
    }
}