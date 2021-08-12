namespace Fanex.Athena.Service.Customer
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.Athena.DataAccess.Customer.Interfaces;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Extension.Utility.Interfaces;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
    using Fanex.Athena.Model.Customer.Enum;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.Customer.Interfaces;
    using Newtonsoft.Json;

    public class PlayerSegmentationService : IPlayerSegmentationService
    {
        private readonly IPlayerSegmentationDataAccess _playerDataAccess;
        private readonly IContextService _contextService;
        private readonly ISubsidiaryService _subsidiaryService;
        private readonly ICustomerClassService _customerClassService;

        public PlayerSegmentationService(
            IContextService contextService,
            IPlayerSegmentationDataAccess playerDataAccess,
            ISubsidiaryService subsidiaryService,
            ICustomerClassService customerClassService
            )
        {
            _contextService = contextService;
            _playerDataAccess = playerDataAccess;
            _subsidiaryService = subsidiaryService;
            _customerClassService = customerClassService;
        }

        public async Task<ApiPagingResult<PlayerInfo>> GetProblemPlayerListAsync(ProblemPlayerListMetaModel metaModel)
        {
            BindAgentListBySubsidiaryBiz(metaModel);
            var result = await _playerDataAccess.GetProblemPlayerListAsync(metaModel);
            BindSubsidiaryName(result.Data, metaModel.SubsidiaryList);

            return result;
        }

        public async Task<ApiPagingResult<PlayerInfo>> GetVipPlayerListAsync(VipPlayerListMetaModel metaModel)
        {
            BindAgentListBySubsidiaryBiz(metaModel);
            var result = await _playerDataAccess.GetVipPlayerListAsync(metaModel);
            BindSubsidiaryName(result.Data, metaModel.SubsidiaryList);

            return result;
        }

        public async Task<IEnumerable<UpdateStatusPlayerResult>> UpdateVipStatusAsync(UpdateStatusPlayerMetaModel metaModel)
        {
            var result = await _playerDataAccess.UpdateVipStatusAsync(metaModel);
            return result;
        }

        public async Task<IEnumerable<ReasonGroup>> GetReasonGroupListAsync(string langKey)
        {
            var result = await _playerDataAccess.GetReasonGroupListAsync(langKey);
            return result;
        }

        public PlayerSegmentationViewType GetViewType(bool anySubsidiary)
        {
            var user = _contextService.User;
            var subsidiaryViewType = _contextService.SubsidiaryViewType;

            if (user.UserLevel == UserLevelType.Subsidiary
                || subsidiaryViewType == (byte)SubsidiaryViewType.NotManagement
                || !anySubsidiary)
            {
                return PlayerSegmentationViewType.Normal;
            }

            if (subsidiaryViewType == (byte)SubsidiaryViewType.NormalManagement
                || user.WhiteLabelID.HasValue)
            {
                return PlayerSegmentationViewType.Susidiary;
            }

            return PlayerSegmentationViewType.WhiteLabel;
        }

        public Task<IEnumerable<string>> GetProblemAccCustomerClass() 
            => _playerDataAccess.GetProblemAccountCustomerClass();

        public async Task<IEnumerable<string>> GetCustomerClass()
        {
            var result = new List<string> { "0" };
            var listCategory = await _customerClassService.GetCustomerClassCategories();
            result.AddRange(listCategory
                .OrderBy(_ => _.CustomerClass)
                .Select(_ => _.CustomerClass.ToString())
                );
            return result.Distinct();
        }

        private void BindAgentListBySubsidiaryBiz(BasePlayerListMetaModel metaModel)
        {
            if (IsNormalView(metaModel))
            {
                return;
            }

            metaModel.AgentListXml = _subsidiaryService.GenerateAgentList(
                _contextService.User,
                _contextService.LicenseeName,
                metaModel.SubsidiaryList,
                metaModel.CurrencyIdList);
        }

        private void BindSubsidiaryName(IEnumerable<PlayerInfo> players, string subsidiaryList)
        {
            if (!players.Any() || string.IsNullOrEmpty(subsidiaryList))
            {
                return;
            }

            var subsidiaries = _subsidiaryService.GetSubsidiaryList(_contextService.User, _contextService.LicenseeName, subsidiaryList);
            if (!subsidiaries.Any())
            {
                return;
            }

            var subsidiaryDic = subsidiaries.ToDictionary(_ => _.AgentId, _ => _);
            foreach (var player in players)
            {
                player.Subsidiary = subsidiaryDic.ContainsKey(player.AgentId) ? subsidiaryDic[player.AgentId].OperatorId : string.Empty;
            }
        }

        public bool IsNormalView(BasePlayerListMetaModel metaModel) =>
            _contextService.UserLevel == UserLevelType.Subsidiary
            || _contextService.SubsidiaryViewType == (byte)SubsidiaryViewType.NotManagement
            || string.IsNullOrEmpty(metaModel.SubsidiaryList);
    }
}