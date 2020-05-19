// -----------------------------------------------------------------------
// <copyright file="GroupComService.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Service.Customer
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.Athena.DataAccess.Customer.Interfaces;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Service.Customer.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    public class GroupComService : IGroupComService
    {
        private readonly IGroupComDataAccess _groupDataAccess;
        private readonly ILGAPIClient _lgClient;

        public GroupComService(
            IGroupComDataAccess groupDataAccess, ILGAPIClient lgClient)
        {
            _groupDataAccess = groupDataAccess;
            _lgClient = lgClient;
        }

        public async Task<IList<GroupCommMetaModel>> GetAllAsync(int licenseeId)
        {
            return await _groupDataAccess.GetAllAsync(licenseeId).ConfigureAwait(false);
        }

        public async Task<DataTable> GetDataForExcelAsync(int licenseeId)
        {
            return await _groupDataAccess.GetDataForExcelAsync(licenseeId).ConfigureAwait(false);
        }

        public GroupCommMetaModel GetById(int groupCommId, int licenseeId)
        {
            return _groupDataAccess.GetById(groupCommId, licenseeId);
        }

        public async Task<IResultInfo> InsertGroupAsync(GroupCommMetaModel item, IRequest request, int userId)
        {
            return await _groupDataAccess.InsertGroupAsync(item, request, userId).ConfigureAwait(false);
        }

        public async Task<IResultInfo> UpdateGroupAsync(GroupCommMetaModel newItem, IRequest request, UserAuthInfo user)
        {
            var resultInfo = await _groupDataAccess.UpdateGroupAsync(newItem, request, user.UserId).ConfigureAwait(false);
            var callApiSuccess = true;
            if (newItem.IsUpdateCS && !string.IsNullOrEmpty(resultInfo.ExtendedData))
            {
                var custtomerList = resultInfo.ExtendedData.Split(new[] { ',' });
                if (custtomerList.Length > 0)
                {
                    var apiCasinoMetalModel = new RNGCasinoUpdateMemberComMetaModel
                    {
                        Comm = newItem.CSComm,
                        CustomerId = custtomerList,
                        FromIp = request.Ip,
                        ModifyBy = user.UserId,
                        ModifyUserName = user.UserName
                    };

                    callApiSuccess = await CallApiToUpdateCommAsync(apiCasinoMetalModel).ConfigureAwait(false);
                }
            }

            if (!callApiSuccess)
            {
                resultInfo.Code = 1;
                resultInfo.Message = "Having errors when calling CasinoAPI to update customer commission.";
            }

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
            var callApiSuccess = true;

            if (model.IsRemoveCommSetting && model.IsAllowedCSComm && !string.IsNullOrEmpty(resultInfo.ExtendedData))
            {
                var custtomerList = resultInfo.ExtendedData.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                if (custtomerList.Length > 0)
                {
                    var apiCasinoMetalModel = new RNGCasinoUpdateMemberComMetaModel
                    {
                        Comm = 0,
                        CustomerId = custtomerList,
                        FromIp = model.Ip,
                        ModifyBy = model.UserId,
                        ModifyUserName = model.UserName
                    };

                    callApiSuccess = await CallApiToUpdateCommAsync(apiCasinoMetalModel).ConfigureAwait(false);
                }
            }

            if (!callApiSuccess)
            {
                resultInfo.Code = 1;
                resultInfo.Message = "Having errors when calling CasinoAPI to update customer commission.";
            }

            return resultInfo;
        }

        public bool CheckExistingGroupByName(int licenseeId, string groupName)
        {
            return _groupDataAccess.CheckByName(licenseeId, groupName);
        }

        private async Task<bool> CallApiToUpdateCommAsync(RNGCasinoUpdateMemberComMetaModel metalModel)
        {
            const string apiPath = "/RNGCasinoCustomer/UpdateCommission";
            var customerArray = SplitCustomer(metalModel.CustomerId);
            List<bool> resultList = new List<bool> { };

            foreach (var customerList in customerArray)
            {
                var tempMetalModel = metalModel;
                tempMetalModel.CustomerId = customerList;

                var result = await _lgClient.PostAsync<APIResult<bool>>(apiPath, metalModel, "en-US").ConfigureAwait(false);
                resultList.Add(result != null && result.Data);
            }

            return resultList.All(x => x == true);
        }

        private static List<string[]> SplitCustomer(string[] customers, int maxCustomer = 500)
        {
            List<string[]> data = new List<string[]>();
            for (int i = 0; i < customers.Length; i += maxCustomer)
            {
                data.Add(customers.Skip(i).Take(maxCustomer).ToArray());
            }

            return data;
        }
    }
}