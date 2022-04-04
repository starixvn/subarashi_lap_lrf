namespace Fanex.Athena.Service.Customer
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.Athena.DataAccess.Customer.Interfaces;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.Customer.Interfaces;

    public class PlayerSegmentationService : IPlayerSegmentationService
    {
        private readonly IPlayerSegmentationDataAccess _playerDataAccess;
        private readonly ISessionService _sessionService;
        private readonly ISubsidiaryService _subsidiaryService;
        private readonly ICustomerClassService _customerClassService;

        public PlayerSegmentationService(
            ISessionService sessionService,
            IPlayerSegmentationDataAccess playerDataAccess,
            ISubsidiaryService subsidiaryService,
            ICustomerClassService customerClassService
            )
        {
            _sessionService = sessionService;
            _playerDataAccess = playerDataAccess;
            _subsidiaryService = subsidiaryService;
            _customerClassService = customerClassService;
        }

        public async Task<ApiPagingResult<PlayerInfo>> GetProblemPlayerListAsync(ProblemPlayerListMetaModel metaModel)
        {
            var result = await _playerDataAccess.GetProblemPlayerListAsync(metaModel);
            BindSubsidiaryName(result.Data, metaModel.SubsidiaryList);

            return result;
        }

        public async Task<ApiPagingResult<PlayerInfo>> GetVipPlayerListAsync(VipPlayerListMetaModel metaModel)
        {
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

        private void BindSubsidiaryName(IEnumerable<PlayerInfo> players, string subsidiaryList)
        {
            if (!players.Any() || string.IsNullOrEmpty(subsidiaryList))
            {
                return;
            }

            var subsidiaries = _subsidiaryService.GetSubsidiaryList(_sessionService.UserSession, _sessionService.LicenseeSession.LicenseeName, subsidiaryList);
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
            _subsidiaryService.IsIgnoredSubsidiarySearch(metaModel.SubsidiarySearch, metaModel.SubsidiaryList, _sessionService.UserSession);
    }
}