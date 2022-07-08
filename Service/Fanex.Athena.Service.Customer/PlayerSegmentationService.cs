namespace Fanex.Athena.Service.Customer
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Fanex.Athena.DataAccess.Customer.Interfaces;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.Helper;
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

        public Task<IEnumerable<UpdateStatusPlayerResult>> UpdateVipStatusAsync(UpdateStatusPlayerMetaModel metaModel)
            => _playerDataAccess.UpdateVipStatusAsync(metaModel);

        public async Task<IEnumerable<ReasonGroup>> GetReasonGroupListAsync(string langKey)
            => await _playerDataAccess.GetReasonGroupListAsync(langKey);

        public async Task<ApiPagingResult<MonitoredPlayerInfo>> GetMonitoredPlayerListAsync(MonitoredPlayerListMetaModel metaModel)
        {
            var result = await _playerDataAccess.GetMonitoredPlayerListAsync(metaModel);
            BindSubsidiaryName(result.Data, metaModel.SubsidiaryList);
            CurrencyHelper.BindCurrencyDisplayName(result.Data, _sessionService.UserSession.CurrencyList);
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

        public Task<IEnumerable<MonitoredPlayerReachedHistory>> GetMonitoredPlayerReachedHistoryAsync(MonitoredPlayerReachedHistoryMetaModel metaModel)
    => _playerDataAccess.GetMonitoredPlayerReachedHistoryAsync(metaModel);

        public Task<MonitoredPlayerCommand> InsertMonitoredPlayerAsync(InsertMonitoredPlayerMetaModel metaModel)
            => _playerDataAccess.InsertMonitoredPlayerAsync(metaModel);

        public Task<MonitoredPlayerCommand> UpdateMonitoredPlayerAsync(UpdateMonitoredPlayerMetaModel metaModel)
            => _playerDataAccess.UpdateMonitoredPlayerAsync(metaModel);

        public Task<MonitoredPlayerCommand> DeleteMonitoredPlayerAsync(DeleteMonitoredPlayerMetaModel metaModel)
            => _playerDataAccess.DeleteMonitoredPlayerAsync(metaModel);

        public async Task<IEnumerable<MonitoredPlayerCommand>> BatchUpdateMonitoredPlayerAsync(BatchUpdateMonitoredPlayerMetaModel metaModel)
        {
            BuildBatchPlayerXml(metaModel);
            var commandResults = await _playerDataAccess.BatchUpdateMonitoredPlayerAsync(metaModel);
            return CombineResult(commandResults);
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

        private static IEnumerable<MonitoredPlayerCommand> CombineResult(IEnumerable<MonitoredPlayerCommand> result)
            => result.GroupBy(_ => _.ErrorCode).Select(_ => new MonitoredPlayerCommand
            {
                ErrorCode = _.Key,
                NumberOfError = _.Count(),
                ExternalId = string.Join(", ", _.Select(__ => __.ExternalId)).Trim(' ', ','),
                SystemId = string.Join(", ", _.Select(__ => __.SystemId)).Trim(' ', ',')
            });

 		private static void BuildBatchPlayerXml(BatchUpdateMonitoredPlayerMetaModel metaModel)        {
            var body = new StringBuilder();
            var index = 0;
            foreach (var player in metaModel.BatchPlayer)
            {
                body.AppendFormat("<CustList RID=\"{0}\" U1=\"{1}\" U2=\"{2}\" WT=\"{3}\" />", ++index, player.SystemId, player.ExternalId, player.WinningThreshold);
            }

            metaModel.BatchPlayerXml = "<ROOT>" + body + "</ROOT>";
        }

        private void BindSubsidiaryName<T>(IEnumerable<T> players, string subsidiaryList)
            where T : ISubsidiaryInfo
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