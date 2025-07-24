namespace Fanex.Athena.Service.Customer
{
    using System.Collections;
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

        public async Task<IEnumerable<GroupCommSettingMetaModel>> InitCommValues(ProductAccess productAccess)
        {
            var commSettings = await _groupDataAccess.GetAllCommSettingAsync(productAccess).ConfigureAwait(false);

            return commSettings.Where(_ => CommissionGroupHelper.GetProductPermissions(productAccess, _.ProductCode))
                .OrderBy(_ => CommissionGroupHelper.ProductListComparer(_.ProductCode)).ThenBy(_ => _.ProductCode); ;
        }

        public async Task<(IList<GroupCommMetaModel>, IDictionary<string, string>)> GetAllAsync(int licenseeId, ProductAccess productAccess)
        {
            var (comms, commValues) = await _groupDataAccess.GetAllAsync(licenseeId, productAccess).ConfigureAwait(false);
            var productList = commValues
                .Where(_ => CommissionGroupHelper.GetProductPermissions(productAccess, _.ProductCode))
                .Select(_ => _.ProductCode).Distinct()
                .OrderBy(_ => CommissionGroupHelper.ProductListComparer(_))
                .ThenBy(_ => _)
                .ToDictionary(_ => _, _ => productAccess.GetProductName(_));

            return (MergeCommSetting(comms, commValues), productList);
        }

        private static IList<GroupCommMetaModel> MergeCommSetting(IEnumerable<GroupCommMetaModel> comms, IEnumerable<GroupCommSettingMetaModel> commValues)
        {
            return comms.GroupJoin(commValues, c => c.GroupCommId, d => d.GroupCommId,
                (c, ds) => new GroupCommMetaModel
                {
                    GroupCommId = c.GroupCommId,
                    GroupColor = c.GroupColor,
                    GroupName = c.GroupName,
                    IsDefaultGroup = c.IsDefaultGroup,
                    DefaultGroupId = c.DefaultGroupId,
                    NumberOfCustomer = c.NumberOfCustomer,
                    CommValues = ds,
                }).ToList();
        }

        public async Task<GroupCommMetaModel> GetById(int groupCommId, int licenseeId, ProductAccess productAccess)
        {
            var result = await _groupDataAccess.GetById(groupCommId, licenseeId, productAccess);

            var commSettings = await _groupDataAccess.GetAllCommSettingAsync(productAccess).ConfigureAwait(false);
            var existingCommissionValues = result.CommValues.ToList();
            var existingProductCodes = existingCommissionValues.Select(p => p.ProductCode).ToHashSet();

            existingCommissionValues.AddRange(commSettings.Where(setting => !existingProductCodes.Contains(setting.ProductCode)));

            result.CommValues = existingCommissionValues
                .Where(_ => CommissionGroupHelper.GetProductPermissions(productAccess, _.ProductCode))
                .OrderBy(_ => _, new GroupCommSettingComparer())
                .ThenBy(_ => _.ProductCode);

            return result;
        }

        public async Task<IResultInfo> InsertGroupAsync(GroupCommMetaModel item, IRequest request, int userId)
        {
            return await _groupDataAccess.InsertGroupAsync(item, request, userId).ConfigureAwait(false);
        }

        public async Task<IResultInfo> UpdateGroupAsync(GroupCommMetaModel newItem, IRequest request, UserAuthInfo user)
        {
            return await _groupDataAccess.UpdateGroupAsync(newItem, request, user.UserId).ConfigureAwait(false);
        }

        public async Task<IResultInfo> DeleteGroupAsync(DeleteGroupMetaModel model)
        {
            return await _groupDataAccess.DeleteGroupAsync(
                model.GroupId,
                model.LicenseeId,
                model.UserId,
                model.Ip,
                model.Language,
                model.IsRemoveCommSetting,
                model.IsResetDefault).ConfigureAwait(false);
        }

        public bool CheckExistingGroupByName(int licenseeId, string groupName)
            => _groupDataAccess.CheckByName(licenseeId, groupName);
    }
}