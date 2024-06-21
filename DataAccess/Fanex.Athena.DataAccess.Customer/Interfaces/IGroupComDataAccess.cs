namespace Fanex.Athena.DataAccess.Customer.Interfaces
{
    using System.Collections.Generic;
    using System.Data;
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Customer.MetaModel;

    public interface IGroupComDataAccess
    {
        Task<IResultInfo> InsertGroupAsync(GroupCommMetaModel item, IRequest request, int userId, IDictionary<string, bool> permissions);

        Task<IResultInfo> UpdateGroupAsync(GroupCommMetaModel newItem, IRequest request, int userId, IDictionary<string, bool> permissions);

        Task<(IList<GroupCommMetaModel>, IList<GroupCommDetailMetaModel>)> GetAllAsync(int licenseeId);

        Task<DataTable> GetDataForExcelAsync(int licenseeId);

        (GroupCommMetaModel, IList<GroupCommDetailMetaModel>) GetById(int groupCommId, int licenseeId);

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