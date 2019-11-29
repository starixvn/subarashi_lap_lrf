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
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Module.PlayerAdmin.DTO.BetLimits;
    using Fanex.Athena.Module.PlayerAdmin.Helpers;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Common;
    using Fanex.Logging;

    public class AGCasinoBetLimitService : IAGCasinoBetLimitService
    {
        private readonly ILogger _logger;

        private readonly IAppSettings _appSettings;

        private readonly IWebClientService _webClientService;

        private readonly IAGCasinoBetLimitRepository _repository;

        private readonly IBusinessLogService _businessLogService;

        public AGCasinoBetLimitService(
            ILogger logger,
            IAppSettings appSettings,
            IWebClientService webClientService,
            IAGCasinoBetLimitRepository repository,
            [KeyFilter("PlayerAdminLogService")]IBusinessLogService businessLogService)
        {
            _logger = logger;
            _appSettings = appSettings;
            _webClientService = webClientService;
            _repository = repository;
            _businessLogService = businessLogService;
        }

        public async Task<IList<AgCasinoGame>> GetGroupBettingsAsync(string siteName, int currency)
        {
            var uri = new Uri(_appSettings.GetValue("AGCasinoApiUrl"));
            var parameters = string.Format("SiteName={0}&Currency={1}", siteName, currency);
            var games = new List<AgCasinoGame>();
            try
            {
                var apiResult = await _webClientService.UploadStringAsync(uri, parameters);

                var xml = XDocument.Parse(apiResult);

                foreach (var xmlGame in xml.Descendants("Game"))
                {
                    var game = new AgCasinoGame
                    {
                        GameType = xmlGame.Attribute("GameType").Value,
                        Name = xmlGame.Attribute("Name").Value,
                        Groups = new List<AgCasinoGroup>()
                    };

                    foreach (var xmlGroup in xmlGame.Descendants("Group"))
                    {
                        game.Groups.Add(new AgCasinoGroup
                        {
                            GroupType = xmlGroup.Attribute("GroupType").Value,
                            Min = Converter.ToInt(xmlGroup.Element("Min").Value),
                            Max = Converter.ToInt(xmlGroup.Element("Max").Value)
                        });
                    }

                    games.Add(game);
                }
            }
            catch (Exception exception)
            {
                _logger.Error(LogMessageHelper.GenerateMessage(exception));
            }

            return games;
        }

        public async Task<AgCasinoBetSetting> GetBetSettingAsync(int custId)
        {
            return await _repository.GetBetSettingAsync(custId).ConfigureAwait(false);
        }

        public async Task<IResultInfo> UpdateSettingAsync(PlayerBetLimitUpdateMetaModel<AgCasinoBetLimitMetaModel> metaModel)
        {
            var result = await _repository.UpdateSettingAsync(metaModel).ConfigureAwait(false);

            var logInfo = PlayerAdminBetLimitActionLogHelper.CreateLogInfo(metaModel, result.Code == 0);

            _businessLogService.Write(BusinessLogType.CustomerBetSetting, logInfo);

            return result;
        }
    }
}
