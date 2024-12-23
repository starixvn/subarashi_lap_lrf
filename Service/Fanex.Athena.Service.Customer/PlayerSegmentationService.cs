namespace Fanex.Athena.Service.Customer
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Autofac.Features.AttributeFilters;
    using Core.Users.Interfaces;
    using DataAccess.Customer.Interfaces;
    using Interfaces;
    using Logging;
    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;
    using Model.Core.Helper;
    using Model.Customer.DTO;
    using Model.Customer.DTO.PlayerSegmentation;
    using Model.Customer.MetaModel;
    using Model.Customer.MetaModel.CustomerLog;
    using Newtonsoft.Json;
    using Resources;
    using StatelessCore.Interfaces;

    public class PlayerSegmentationService : IPlayerSegmentationService
    {
        private const string ADD_LIC_VIP_PATH = "/api/cts/AddLicVIP";
        private const string REMOVE_LIC_VIP_PATH = "/api/cts/RemoveLicVIP";
        private const string HEALTH_CHECK_PATH = "/api/cts/HealthCheck";
        private readonly IBusinessLogService _businessLogService;
        private readonly ICTSApiClient _ctsApiClient;
        private readonly ICustomerClassService _customerClassService;
        private readonly ILogger _logger;
        private readonly IPlayerSegmentationDataAccess _playerDataAccess;
        private readonly ISessionService _sessionService;
        private readonly ISubsidiaryService _subsidiaryService;

        public PlayerSegmentationService(
            ISessionService sessionService,
            ICustomerClassService customerClassService,
            IPlayerSegmentationDataAccess playerDataAccess,
            [KeyFilter("PlayerSegmentLogService")] IBusinessLogService businessLogService,
            ISubsidiaryService subsidiaryService,
            ICTSApiClient cTSApiClient,
            ILogger logger
        )
        {
            _sessionService = sessionService;
            _customerClassService = customerClassService;
            _businessLogService = businessLogService;
            _playerDataAccess = playerDataAccess;
            _subsidiaryService = subsidiaryService;
            _ctsApiClient = cTSApiClient;
            _logger = logger;
        }

        public async Task<ApiPagingResult<PlayerInfo>> GetVipPlayerListAsync(VipPlayerListMetaModel metaModel)
        {
            var riskLevels = await _customerClassService.GetAllRiskLevel();
            metaModel.RiskLevels = riskLevels;

            var result = await _playerDataAccess.GetVipPlayerListAsync(metaModel);
            BindSubsidiaryName(result.Data, metaModel.SubsidiaryList);
            BindRiskLevelName(result.Data, riskLevels);

            return result;
        }

        public async Task<IEnumerable<UpdateStatusPlayerResult>> UpdateVipStatusAsync(UpdateStatusPlayerMetaModel metaModel)
        {
            var isOk = await _ctsApiClient.HealthCheck(HEALTH_CHECK_PATH);

            if (!isOk)
            {
                return null;
            }

            var (listAffCustId, updateResult) = await _playerDataAccess.UpdateVipStatusAsync(metaModel);
            if (!metaModel.IsUseCtsApi)
            {
                return updateResult;
            }

            if (string.IsNullOrWhiteSpace(listAffCustId))
            {
                await LogAbnormalRequest(metaModel, updateResult);
            }
            else
            {
                // write log TW
                const int successCode = 0;
                var logMetaModel = new PlayerUpdatingLogMetaModel
                {
                    LicenseeCustId = metaModel.LicenseeCustId,
                    SiteName = metaModel.SiteName,
                    UserId = metaModel.UserId,
                    ListCustId = listAffCustId,
                    ActionId = LogActionId.PlayerSegmentUpdateVIPPlayer,
                    ActionDetailId = LogActionDetailId.UpdatingVIPPlayer,
                    Status = updateResult.Any(r => r.Code == successCode) ? LogText.Success : LogText.False,
                    NewValue = metaModel.IsVip ? LogText.On : LogText.Off,
                    OldValue = !metaModel.IsVip ? LogText.On : LogText.Off
                };
                _businessLogService.Write(BusinessLogType.PlayerSegmentationUpdatePlayer, logMetaModel);

                // write log CTS
                var path = metaModel.IsVip ? ADD_LIC_VIP_PATH : REMOVE_LIC_VIP_PATH;
                await _ctsApiClient.PostAsync(path, new { CustIds = listAffCustId }, _sessionService.UserSession.Language);
            }

            return updateResult;
        }

        public async Task<ApiPagingResult<MonitoredPlayerInfo>> GetMonitoredPlayerListAsync(MonitoredPlayerListMetaModel metaModel)
        {
            var xmlReachList = await _playerDataAccess.GetXmlPresenterForMonitoredPlayerReachLishtAsync(metaModel);
            metaModel.XMLReachList = xmlReachList;
            var result = await _playerDataAccess.GetMonitoredPlayerListAsync(metaModel);
            BindSubsidiaryName(result.Data, metaModel.SubsidiaryList);
            CurrencyHelper.BindCurrencyDisplayName(result.Data, _sessionService.UserSession.CurrencyList);
            return result;
        }

        public Task<IEnumerable<MonitoredPlayerReachedHistory>> GetMonitoredPlayerReachedHistoryAsync(
            MonitoredPlayerReachedHistoryMetaModel metaModel)
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

        public bool IsNormalView(BasePlayerListMetaModel metaModel) =>
            _subsidiaryService.IsIgnoredSubsidiarySearch(metaModel.SubsidiarySearch, metaModel.SubsidiaryList, _sessionService.UserSession);

        private async Task LogAbnormalRequest(UpdateStatusPlayerMetaModel metaModel, IEnumerable<UpdateStatusPlayerResult> updateResult)
        {
            const int successCode = 0;
            if (updateResult.Any(r => r.Code == successCode))
            {
                await _logger.ErrorAsync("Sp return empty list custid when UpdateVipStatus \n" +
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

        private static void BuildBatchPlayerXml(BatchUpdateMonitoredPlayerMetaModel metaModel)
        {
            var body = new StringBuilder();
            var index = 0;
            foreach (var player in metaModel.BatchPlayer)
            {
                body.AppendFormat("<CustList RID=\"{0}\" U1=\"{1}\" U2=\"{2}\" WT=\"{3}\" />", ++index, player.SystemId, player.ExternalId,
                    player.WinningThreshold);
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

            var subsidiaries =
                _subsidiaryService.GetSubsidiaryList(_sessionService.UserSession, _sessionService.LicenseeSession.LicenseeName, subsidiaryList);
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

        private static void BindRiskLevelName(IEnumerable<PlayerInfo> players, IEnumerable<RiskLevel> riskLevels)
        {
            players.ToList().ForEach(player =>
            {
                player.RiskLevel = riskLevels.FirstOrDefault(_ => _.CustomerClassList.Contains(player.CustomerClass))?.Name ??
                                   ViewResources.Uncategorized;
            });
        }
    }
}