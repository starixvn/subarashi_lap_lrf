using System.Collections.Generic;
using System.Threading.Tasks;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.Criteria.PlayerCommission;
using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerCommission;
using Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.ViewModels.PlayerCommission;
using Fanex.Athena.Resources;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Module.PlayerAdmin.Services
{
    public class PlayerCommissionService : IPlayerCommissionService
    {
        private readonly IPlayerCommissionRepository repository;
        private readonly ILGAPIClient lgClient;

        public PlayerCommissionService(IPlayerCommissionRepository repository, ILGAPIClient lgClient)
        {
            this.repository = repository;
            this.lgClient = lgClient;
        }

        public IEnumerable<PlayerCommissionViewModel> GetAllCommGroups(BasePlayerCommissionUpdateQuery query)
        {
            var criteria = new GetAllCommGroupsCriteria(query);
            return repository.GetAllCommGroups(criteria);
        }

        public async Task<IResultInfo> MultipleMoveGroup(MultipleMoveGroupQuery query)
        {
            var groupInfo = repository.GetCommissionGroupById(new GetCommissionGroupByIdCriteria(query));
            if (groupInfo?.CommValues == null)
            {
                return new ResultInfo { Code = 1, Message = ViewResources.GroupNotExists };
            }

            var criteria = new MultipleMoveGroupCriteria(query);
            var result = await repository.MultipleMoveGroup(criteria);

            if (!IsUpdateRNGCasino(result, query.Permissions))
            {
                return result;
            }

            var callApiSuccess = await UpdateCommToAPI(new UpdateCommToAPICriteria
            {
                CustomerIdList = result.ExtendedData,
                Comm = groupInfo.CommValues[Product.CS],
                IP = query.IP,
                UserId = query.UserId,
                Username = query.Username
            });

            return callApiSuccess ? result : new ResultInfo { Code = 1, Message = ViewResources.CasinoAPI_UpdateCommError };
        }

        public async Task<IResultInfo> MultipleRemoveFromGroup(MultipleRemoveFromGroupQuery query)
        {
            var criteria = new MultipleRemoveFromGroupCriteria(query);
            var result = await repository.MultipleRemoveFromGroup(criteria);

            if (!IsUpdateRNGCasino(result, query.Permissions) || !query.IsRemovePlayerComm)
            {
                return result;
            }

            var callApiSuccess = await UpdateCommToAPI(new UpdateCommToAPICriteria
            {
                CustomerIdList = result.ExtendedData,
                Comm = 0,
                IP = query.IP,
                UserId = query.UserId,
                Username = query.Username
            });

            return callApiSuccess ? result : new ResultInfo { Code = 1, Message = ViewResources.CasinoAPI_UpdateCommError };
        }

        public async Task<IResultInfo> MultipleUpdateGroup(MultipleUpdateGroupQuery query)
        {
            var criteria = new MultipleUpdateGroupCriteria(query);
            var result = await repository.MultipleUpdateGroup(criteria);

            if (!IsUpdateRNGCasino(result, query.Permissions))
            {
                return result;
            }

            decimal rngComm = 0;
            for (var i = 0; i < query.Products.Length; i++)
            {
                if (string.Equals(query.Products[i], Product.CS))
                {
                    rngComm = query.Comms[i];
                }
            }

            var callApiSuccess = await UpdateCommToAPI(new UpdateCommToAPICriteria
            {
                CustomerIdList = result.ExtendedData,
                Comm = rngComm,
                IP = query.IP,
                UserId = query.UserId,
                Username = query.Username
            });

            return callApiSuccess ? result : new ResultInfo { Code = 1, Message = ViewResources.CasinoAPI_UpdateCommError };
        }

        public PlayerCommissionViewModel GetPlayerCommissionGroup(SingleMoveGroupQuery query)
        {
            var criteria = new GetPlayerCommissionGroupCriteria(query);

            return repository.GetPlayerCommissionGroup(criteria);
        }

        private async Task<bool> UpdateCommToAPI(UpdateCommToAPICriteria criteria)
        {
            var customerIds = criteria.CustomerIdList.Split(',');
            if (customerIds.Length == 0)
            {
                return true;
            }

            var metalModel = new RNGCasinoUpdateMemberComCriteria
            {
                Comm = criteria.Comm,
                CustomerId = customerIds,
                FromIp = criteria.IP,
                ModifyBy = criteria.UserId,
                ModifyUserName = criteria.Username
            };

            const string apiPath = "/RNGCasinoCustomer/UpdateCommission";
            var result = await lgClient.PostAsync<APIResult<bool>>(apiPath, metalModel, "en-US").ConfigureAwait(false);

            return result != null && result.Data;
        }

        private static bool IsUpdateRNGCasino(IResultInfo result, IDictionary<string, bool> permissions)
            => result.IsSuccessful
            && permissions.ContainsKey(Product.CS)
            && permissions[Product.CS]
            && !string.IsNullOrWhiteSpace(result.ExtendedData);
    }
}
