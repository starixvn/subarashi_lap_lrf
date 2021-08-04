namespace Fanex.Athena.Module.PlayerAdmin.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Xml.Linq;
    using Autofac.Features.AttributeFilters;
    using Fanex.Athena.Extension.Helpers;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Extension.Utility.Interfaces;
    using Fanex.Athena.Model.BetSettings.MetaModel;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.PlayerAdmin.DataDomains;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Module.PlayerAdmin.DTO.BetLimits;
    using Fanex.Athena.Module.PlayerAdmin.Helpers;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Common;
    using Fanex.Logging;

    public class RngCasinoBetLimitService : IRngCasinoBetLimitService
    {
        private readonly ILogger _logger;

        private readonly IAppSettings _appSettings;

        private readonly IWebClientService _webClientService;

        private readonly IRngCasinoBetLimitRepository _repository;

        private readonly IBusinessLogService _businessLogService;

        private readonly ILGAPIClient _lgClient;

        private const int RngCasinoSportId = 251;

        public RngCasinoBetLimitService(
            ILogger logger,
            IAppSettings appSettings,
            IWebClientService webClientService,
            IRngCasinoBetLimitRepository repository,
            ILGAPIClient lgClient,
            [KeyFilter("PlayerAdminLogService")]IBusinessLogService businessLogService)
        {
            _logger = logger;
            _appSettings = appSettings;
            _webClientService = webClientService;
            _repository = repository;
            _lgClient = lgClient;
            _businessLogService = businessLogService;
        }

        public async Task<IResultInfo> UpdateStatusAsync(PlayerBetLimitProductStatusUpdateMetaModel metaModel, BetSettingCasinoStatusMetaModel param, bool isSyncCasino)
        {
            if (isSyncCasino && !_appSettings.IsDisableRngCasino)
            {
                const string apiPath = "/RngCasino/Status";
                var updatingCasino = await _lgClient.PostAsync<APIResult<bool>>(apiPath, param, "en-US").ConfigureAwait(false);

                if (updatingCasino != null && !updatingCasino.Data)
                {
                    return new ResultInfo
                    {
                        Code = 1,
                        Message = ViewResources.UpdateUnSuccess
                    };
                }
                else
                {
                    var result = await _repository.UpdateStatusAsync(metaModel, RngCasinoSportId);

                    var logInfo = PlayerAdminProductStatusUpdateActionLogHelper.CreateLogInfo(
                                metaModel,
                                result.Code == 0,
                                LogActionDetailId.UpdatingProductStatus);

                    _businessLogService.Write(BusinessLogType.CustomerBetSetting, logInfo);
                    return result;
                }
            }

            return new ResultInfo { Code = 1, Message = ViewResources.RNGCasinoUpdateSettingUnAvailableMsg };
        }
    }
}