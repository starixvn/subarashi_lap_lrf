namespace Fanex.Athena.Service.Customer
{
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.Athena.DataAccess.Customer.Interfaces;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.Helper;
    using Fanex.Athena.Model.Customer.MetaModel;
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
            var (comms, commValues) = await _groupDataAccess.GetAllAsync(licenseeId).ConfigureAwait(false);

            return MergeCommSetting(comms, commValues, permissions);
        }

        private IList<GroupCommMetaModel> MergeCommSetting(IEnumerable<GroupCommMetaModel> comms, IEnumerable<GroupCommSettingMetaModel> commValues, IDictionary<string, bool> permissions)
        {
            commValues = MapCommProductSetting(commValues, permissions);

            return comms.GroupJoin(commValues, c => c.GroupCommId, d => d.GroupCommId,
                (c, ds) => new GroupCommMetaModel
                {
                    GroupCommId = c.GroupCommId,
                    GroupColor = c.GroupColor,
                    GroupName = c.GroupName,
                    IsDefaultGroup = c.IsDefaultGroup,
                    DefaultGroupId = c.DefaultGroupId,
                    NumberOfCustomer = c.NumberOfCustomer,
                    CommValues = ds.ToDictionary(_ => CommissionGroupHelper.GetProductCode(_.Sporttype, _.Bettype), _ => _)
                }).ToList();
        }

        private GroupCommMetaModel MergeCommSetting(GroupCommMetaModel comm, IEnumerable<GroupCommSettingMetaModel> commValues, IDictionary<string, bool> permissions)
        {
            commValues = MapCommProductSetting(commValues, permissions);
            comm.CommValues = commValues.ToDictionary(_ => CommissionGroupHelper.GetProductCode(_.Sporttype, _.Bettype), _ => _);

            return comm;
        }

        private IEnumerable<GroupCommSettingMetaModel> MapCommProductSetting(IEnumerable<GroupCommSettingMetaModel> commValues, IDictionary<string, bool> permissions)
        {
            return commValues.Where(_ => permissions.TryGetValue(CommissionGroupHelper.GetProductCode(_.Sporttype, _.Bettype), out bool productAllow) && productAllow);
        }

        public GroupCommMetaModel GetById(int groupCommId, int licenseeId, IDictionary<string, bool> permissions)
        {
            var (comm, commValues) = _groupDataAccess.GetById(groupCommId, licenseeId);

            return MergeCommSetting(comm, commValues, permissions);
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