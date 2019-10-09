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

    public class DcsBetLimitService : IDcsBetLimitService
    {
        private static readonly int[] ProductsHasStatus = new[] { ProductTypes.Lottery };

        private readonly IDcsBetLinitRepository _repository;

        private readonly IBusinessLogService _businessLogService;

        public DcsBetLimitService(
            IDcsBetLinitRepository repository,
            [KeyFilter("PlayerAdminLogService")]IBusinessLogService businessLogService)
        {
            _repository = repository;
            _businessLogService = businessLogService;
        }

        public async Task<IEnumerable<PlayerBetLimit>> GetSettingAsync(int custId, int productId)
        {
            return await _repository.GetSettingAsync(custId, productId).ConfigureAwait(false);
        }

        public async Task<bool> GetStatusAsync(int custId, int productId)
        {
            if (!ProductsHasStatus.Contains(productId))
            {
                return true;
            }

            return await _repository.GetStatusAsync(custId, productId).ConfigureAwait(false);
        }

        public async Task<IResultInfo> UpdateSettingAsync(PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>> metaModel)
        {
            var result = await _repository.UpdateSettingAsync(metaModel).ConfigureAwait(false);

            var logDetail = metaModel.Setting
                .Where(x => x.IsUpdated)
                .SelectMany(x => CreateLogDetail(x, result.IsSuccessful));

            _businessLogService.Write(BusinessLogType.CustomerBetSetting, metaModel.CreateLogInfo(logDetail));

            return result;
        }

        private static IEnumerable<PlayerBetLimitDetailedLogMetaModel> CreateLogDetail(PlayerBetLimitMetaModel setting, bool isSuccessful)
        {
            if (setting.MinBet != setting.OldMinBet)
            {
                yield return new PlayerBetLimitDetailedLogMetaModel
                {
                    DetailedId = LogActionDetailId.UpdatingMinBet,
                    SportType = setting.Id,
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
                    SportType = setting.Id,
                    Status = isSuccessful ? LogText.Success : LogText.False,
                    Old = setting.OldMaxBet.ToString(),
                    New = setting.MaxBet.ToString()
                };
            }

            if (setting.MaxPerMatch != setting.OldMaxPerMatch)
            {
                yield return new PlayerBetLimitDetailedLogMetaModel
                {
                    DetailedId = LogActionDetailId.UpdatingMaxPerMatch,
                    SportType = setting.Id,
                    Status = isSuccessful ? LogText.Success : LogText.False,
                    Old = setting.OldMaxPerMatch.ToString(),
                    New = setting.MaxPerMatch.ToString()
                };
            }
        }
    }
}
