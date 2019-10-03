// -----------------------------------------------------------------------
// <copyright file="CustomerService.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Service.Customer
{
    using System.Threading.Tasks;


    using DataAccess.Customer.Interfaces;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Service.Customer.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    public class CustomerCommService : ICustomerCommService
    {
        private readonly ICustomerCommDataAccess _customerCommDataAccess;

        private readonly IGroupComDataAccess _groupComDataAccess;
        private readonly ILGAPIClient _lgClient;

        public CustomerCommService(
            ICustomerCommDataAccess customerCommDataAccess,
            IGroupComDataAccess groupComDataAccess, ILGAPIClient lgClient)
        {
            _customerCommDataAccess = customerCommDataAccess;
            _groupComDataAccess = groupComDataAccess;
            _lgClient = lgClient;
        }

        public async Task<IResultInfo> UpdateCustomersCommissionAsync(UpdatedCustomerComMetaModel metaModel,
            bool isSyncCSComm = false)
        {
            var result = await _customerCommDataAccess.UpdateCustomersCommissionAsync(metaModel);
            var callApiSuccess = true;
            if (result.IsSuccessful && isSyncCSComm && !string.IsNullOrWhiteSpace(result.ExtendedData))
            {
                callApiSuccess = await CallApiToUpdateCommAsync(result.ExtendedData, metaModel.CSComm, metaModel.Ip, metaModel.UserId, metaModel.UserName);
            }

            return callApiSuccess ? result : new ResultInfo
            {
                Code = 1,
                Message = "Having errors when calling CasinoAPI to update customer commission."
            };
        }

        /// <summary>
        ///     Move customers to new group including 2 following steps:
        ///     1: Remove all customers commission in group.
        ///     2: Update new customers commission in this group.
        /// </summary>
        /// <param name="metaModel">The metal model.</param>
        /// <returns>The result information.</returns>
        public async Task<IResultInfo> MoveCustomersToGroupAsync(MoveToGroupComMetaModel metaModel)
        {
            var groupInfo = _groupComDataAccess.GetById(metaModel.GroupComId, metaModel.LicenseeId);
            if (groupInfo == null)
            {
                return new ResultInfo
                {
                    Code = 1,
                    Message = "Group does not exists"
                };
            }

            var callApiSuccess = true;
            IResultInfo result = await _customerCommDataAccess.MoveCustomersToGroupAsync(metaModel);
            if (result.IsSuccessful && metaModel.IsAllowedRNG && !string.IsNullOrWhiteSpace(result.ExtendedData))
            {
                callApiSuccess =
                    await CallApiToUpdateCommAsync(result.ExtendedData, groupInfo.CSComm, metaModel.Ip, metaModel.UserId, metaModel.UserName);
            }

            return callApiSuccess ? result : new ResultInfo
            {
                Code = 1,
                Message = "Having errors when calling CasinoAPI to update customer commission."
            };
        }

        public async Task<IResultInfo> RemoveCustomersFromGroupAsync(RemoveFromGroupComMetaModel metaModel, bool isAllowedRNGCasino)
        {
            var result = await _customerCommDataAccess.RemoveCustomersFromGroupAsync(metaModel);
            var callApiSuccess = true;
            if (result.IsSuccessful && metaModel.IsRemovePlayercomm && isAllowedRNGCasino && !string.IsNullOrWhiteSpace(result.ExtendedData))
            {
                callApiSuccess = await CallApiToUpdateCommAsync(result.ExtendedData, 0, metaModel.Ip, metaModel.UserId, metaModel.UserName);
            }

            return callApiSuccess ? result : new ResultInfo
            {
                Code = 1,
                Message = "Having errors when calling CasinoAPI to update customer commission."
            };
        }

        private async Task<bool> CallApiToUpdateCommAsync(string customerIdList, decimal commission, string ip, int userId, string userName)
        {
            var customerIds = customerIdList.Split(',');
            if (customerIds.Length > 0)
            {
                var metalModel = new RNGCasinoUpdateMemberComMetaModel
                {
                    Comm = commission,
                    CustomerId = customerIds,
                    FromIp = ip,
                    ModifyBy = userId,
                    ModifyUserName = userName
                };

                const string apiPath = "/RNGCasinoCustomer/UpdateCommission";
                var result = await _lgClient.PostAsync<APIResult<bool>>(apiPath, metalModel, "en-US").ConfigureAwait(false);
                return result != null && result.Data;
            }

            return true;
        }
    }
}