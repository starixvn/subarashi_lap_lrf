namespace Fanex.Athena.Service.Customer
{
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.Athena.DataAccess.Customer.Interfaces;
    using Fanex.Athena.Extension;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Service.Customer.Helpers;
    using Fanex.Athena.Service.Customer.Interfaces;

    public class GroupComService : IGroupComService
    {
        private readonly IGroupComDataAccess _groupDataAccess;

        public GroupComService(IGroupComDataAccess groupDataAccess)
        {
            _groupDataAccess = groupDataAccess;
        }

        public async Task<IList<GroupCommMetaModel>> GetAllAsync(int licenseeId, IDictionary<string, bool> permissions)
        {
            var (comm, commDetails) = await _groupDataAccess.GetAllAsync(licenseeId, permissions).ConfigureAwait(false);
            var result = comm.GroupJoin(commDetails, c => c.GroupCommId, d => d.GroupCommId,
                (c, ds) => new GroupCommMetaModel
                {
                    GroupCommId = c.GroupCommId,
                    GroupColor = c.GroupColor,
                    GroupName = c.GroupName,
                    IsDefaultGroup = c.IsDefaultGroup,
                    DefaultGroupId = c.DefaultGroupId,
                    CommDetailList = ds.Where(_ => !string.IsNullOrEmpty(GroupCommHelper.GetCommSettingName(_)))
                    .ToDictionary(_ => GroupCommHelper.GetCommSettingName(_), _ => _)
                }).ToList();

            return comm;
        }

        public async Task<DataTable> GetDataForExcelAsync(int licenseeId)
        {
            var dt = await _groupDataAccess.GetDataForExcelAsync(licenseeId).ConfigureAwait(false);
            dt.DefaultView.Sort = "GroupCommID ASC";
            dt = dt.DefaultView.ToTable();
            return dt;
        }

        public GroupCommMetaModel GetById(int groupCommId, int licenseeId, IDictionary<string, bool> permissions)
        {
            return _groupDataAccess.GetById(groupCommId, licenseeId, permissions);
        }

        public async Task<IResultInfo> InsertGroupAsync(GroupCommMetaModel item, IRequest request, int userId, IDictionary<string, bool> permissions)
        {
            return await _groupDataAccess.InsertGroupAsync(item, request, userId, permissions).ConfigureAwait(false);
        }

        public async Task<IResultInfo> UpdateGroupAsync(GroupCommMetaModel newItem, IRequest request, UserAuthInfo user, IDictionary<string, bool> permissions)
        {
            var resultInfo = await _groupDataAccess.UpdateGroupAsync(newItem, request, user.UserId, permissions).ConfigureAwait(false);
            return resultInfo;
        }

        public async Task<IResultInfo> DeleteGroupAsync(DeleteGroupMetaModel model)
        {
            var resultInfo = await _groupDataAccess.DeleteGroupAsync(
                model.GroupId,
                model.LicenseeId,
                model.UserId,
                model.Ip,
                model.Language,
                model.IsRemoveCommSetting,
                model.IsResetDefault).ConfigureAwait(false);

            return resultInfo;
        }

        public bool CheckExistingGroupByName(int licenseeId, string groupName)
            => _groupDataAccess.CheckByName(licenseeId, groupName);
    }
}