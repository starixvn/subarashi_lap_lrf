namespace Fanex.Athena.Service.Customer
{
    using System;
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
            var (comms, commDetails) = await _groupDataAccess.GetAllAsync(licenseeId).ConfigureAwait(false);

            return MergeCommSetting(comms, commDetails, permissions);
        }

        public GroupCommMetaModel InitCommSetting(GroupCommMetaModel comm, IDictionary<string, bool> permissions)
        {
            var commDetails = InitCommProductSetting(permissions);
            comm.CommDetailList = commDetails;

            return comm;
        }

        private IList<GroupCommMetaModel> MergeCommSetting(IEnumerable<GroupCommMetaModel> comms, IEnumerable<GroupCommDetailMetaModel> commDetails, IDictionary<string, bool> permissions)
        {
            commDetails = MapCommProductSetting(commDetails, permissions);

            return comms.GroupJoin(commDetails, c => c.GroupCommId, d => d.GroupCommId,
                (c, ds) => new GroupCommMetaModel
                {
                    GroupCommId = c.GroupCommId,
                    GroupColor = c.GroupColor,
                    GroupName = c.GroupName,
                    IsDefaultGroup = c.IsDefaultGroup,
                    DefaultGroupId = c.DefaultGroupId,
                    NumberOfCustomer = c.NumberOfCustomer,
                    CommDetailList = ds.ToDictionary(_ => _.ProductCode, _ => _)
                }).ToList();
        }

        private IDictionary<string, GroupCommDetailMetaModel> InitCommProductSetting(IDictionary<string, bool> permissions)
        {
            var commDetails = new List<GroupCommDetailMetaModel>();

            foreach (var permission in permissions)
            {
                var setting = new Tuple<int, int>(0, 0);
                if (GroupCommHelper.GetCommSetting(permission.Key, setting))
                {
                    commDetails.Add(
                        new GroupCommDetailMetaModel
                        {
                            ProductCode = permission.Key,
                            Sporttype = setting.Item1,
                            Bettype = setting.Item2
                        });
                }
            }

            return commDetails.ToDictionary(_ => _.ProductCode, _ => _);
        }

        private IEnumerable<GroupCommDetailMetaModel> MapCommProductSetting(IEnumerable<GroupCommDetailMetaModel> commDetails, IDictionary<string, bool> permissions)
        {
            foreach (var commDetail in commDetails)
            {
                commDetail.ProductCode = GroupCommHelper.GetCommSettingName(commDetail);
            }

            return commDetails.Where(_ => permissions.TryGetValue(_.ProductCode, out bool productAllow) && productAllow);
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
            var (comm, commDetails) = _groupDataAccess.GetById(groupCommId, licenseeId);

            return MergeCommSetting(comm, commDetails, permissions);
        }

        private GroupCommMetaModel MergeCommSetting(GroupCommMetaModel comm, IEnumerable<GroupCommDetailMetaModel> commDetails, IDictionary<string, bool> permissions)
        {
            commDetails = MapCommProductSetting(commDetails, permissions);
            comm.CommDetailList = commDetails.ToDictionary(_ => _.ProductCode, _ => _);

            return comm;
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