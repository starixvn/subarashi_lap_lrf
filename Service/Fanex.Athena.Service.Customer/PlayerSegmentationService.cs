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
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Logging;
    using Newtonsoft.Json;

    public class PlayerSegmentationService : IPlayerSegmentationService
    {
        private readonly IPlayerSegmentationDataAccess _playerDataAccess;
        private readonly ISessionService _sessionService;
        private readonly ISubsidiaryService _subsidiaryService;
        private readonly ICTSApiClient _ctsApiClient;
        private readonly ILogger _logger;

        private const string ADD_LIC_VIP_PATH = "/api/cts/AddLicVIP";
        private const string REMOVE_LIC_VIP_PATH = "/api/cts/RemoveLicVIP";

        public PlayerSegmentationService(
            ISessionService sessionService,
            IPlayerSegmentationDataAccess playerDataAccess,
            ISubsidiaryService subsidiaryService,
            ICTSApiClient cTSApiClient,
            ILogger logger
            )
        {
            _sessionService = sessionService;
            _playerDataAccess = playerDataAccess;
            _subsidiaryService = subsidiaryService;
            _ctsApiClient = cTSApiClient;
            _logger = logger;
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
            var listAffCustId = result.ListAffectCustId;
            var returnResult = result.ListUpdateStatusPlayerResult;

            if (!metaModel.IsUseCtsApi)
            {
                return returnResult;
            }    

            if (string.IsNullOrWhiteSpace(listAffCustId))
            {
                LogAbnormalRequest(metaModel, result.ListUpdateStatusPlayerResult);
            }
            else 
            {
                var path = metaModel.IsVip ? ADD_LIC_VIP_PATH : REMOVE_LIC_VIP_PATH;
                await _ctsApiClient.PostAsync(path, new { CustIds = listAffCustId }, _sessionService.UserSession.Language);
            }

            return returnResult;
        }

        public async Task<IEnumerable<ReasonGroup>> GetReasonGroupListAsync(string langKey)
        {
            var result = await _playerDataAccess.GetReasonGroupListAsync(langKey);
            return result;
        }

        private void LogAbnormalRequest(UpdateStatusPlayerMetaModel metaModel, IEnumerable<UpdateStatusPlayerResult> updateResult)
        {
            const int successCode = 0;
            if (updateResult.Any(r => r.Code == successCode))
            {
                _logger.ErrorAsync($"Sp return empty list custid when UpdateVipStatus \n" +
                    $"Sp param: {JsonConvert.SerializeObject(metaModel)} \n" +
                    $"Return result: {JsonConvert.SerializeObject(updateResult)}");
            }
            
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