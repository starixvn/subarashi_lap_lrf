namespace Fanex.Athena.Module.PlayerAdmin.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Autofac.Features.AttributeFilters;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.PlayerAdmin.DataDomains;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    public class RngKenoBetLimitService : IRngKenoBetLimitService
    {
        private readonly IRngKenoBetLimitRepository _repository;

        private readonly IBusinessLogService _businessLogService;

        public RngKenoBetLimitService(
            IRngKenoBetLimitRepository repository,
            [KeyFilter("PlayerAdminLogService")]IBusinessLogService businessLogService)
        {
            _repository = repository;
            _businessLogService = businessLogService;
        }

        public async Task<IEnumerable<PlayerBetLimit>> GetSettingAsync(int custId)
        {
            return await _repository.GetSettingAsync(custId).ConfigureAwait(false);
        }

        public async Task<IResultInfo> UpdateSettingAsync(PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>> metaModel)
        {
            var result = await _repository.UpdateSettingAsync(metaModel).ConfigureAwait(false);

            var sportType = ((int)SportType.Keno).ToString();
            var logDetail = metaModel.Setting
                .Where(x => x.IsUpdated)
                .SelectMany(x => CreateLogDetail(x, sportType, result.IsSuccessful));

            _businessLogService.Write(BusinessLogType.CustomerBetSetting, metaModel.CreateLogInfo(logDetail));

            return result;
        }

        private static IEnumerable<PlayerBetLimitDetailedLogMetaModel> CreateLogDetail(PlayerBetLimitMetaModel setting, string sportType, bool isSuccessful)
        {
            if (setting.MinBet != setting.OldMinBet)
            {
                yield return new PlayerBetLimitDetailedLogMetaModel
                {
                    DetailedId = LogActionDetailId.UpdatingMinBet,
                    SportType = sportType,
                    Status = isSuccessful ? LogText.Success : LogText.False,
                    Old = setting.OldMinBet.ToString(),
                    New = setting.MinBet.ToString()
                };
            }

            if (setting.MaxBet != setting.OldMaxBet)
            {
                yield return new PlayerBetLimitDetailedLogMetaModel
                {
                    DetailedId = LogActionDetailId.UpdatingMaxBet,
                    SportType = sportType,
                    Status = isSuccessful ? LogText.Success : LogText.False,
                    Old = setting.OldMaxBet.ToString(),
                    New = setting.MaxBet.ToString()
                };
            }

            if (setting.MaxPerMatch != setting.OldMaxPerMatch)
            {
                yield return new PlayerBetLimitDetailedLogMetaModel
                {
                    DetailedId = LogActionDetailId.UpdatingMaxBetPerDraw,
                    SportType = sportType,
                    Status = isSuccessful ? LogText.Success : LogText.False,
                    Old = setting.OldMaxPerMatch.ToString(),
                    New = setting.MaxPerMatch.ToString()
                };
            }
        }
    }
}
