namespace Fanex.Athena.Module.PlayerAdmin.Services
{
    using System;
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

    public class SportsBookBetLimitService : ISportsBookBetLimitService
    {
        private const int EsportIndex = 2;

        private readonly ISportsBookBetLimitRepository _betSetting;

        private readonly IDcsBetLinitRepository _dcsBetSetting;

        private readonly IBusinessLogService _businessLogService;

        public SportsBookBetLimitService(
            ISportsBookBetLimitRepository betSettingRepository,
            IDcsBetLinitRepository dcsBetSettingRepository,
            [KeyFilter("PlayerAdminLogService")]IBusinessLogService businessLogService)
        {
            _betSetting = betSettingRepository;
            _dcsBetSetting = dcsBetSettingRepository;
            _businessLogService = businessLogService;
        }

        public async Task<IEnumerable<PlayerBetLimit>> GetSettingAsync(int custId, bool isShowMixedSport)
        {
            var eSportSetting = await _dcsBetSetting.GetSettingAsync(custId, ProductTypes.Sportsbooks2).ConfigureAwait(false);

            if (!eSportSetting.Any())
            {
                throw new InvalidOperationException("There is no E-sport setting data.");
            }

            var getSBSettingTask = await _betSetting.GetSettingAsync(custId, isShowMixedSport).ConfigureAwait(false);

            var result = getSBSettingTask.ToList();
            result.Insert(EsportIndex, eSportSetting.First());

            return result;
        }

        public async Task<IResultInfo> UpdateSettingAsync(PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>> metaModel, bool isShowMixedSport)
        {
            if (metaModel.Setting is null || !metaModel.Setting.Any(x => x.Id == ((int)SportType.Esports).ToString()))
            {
                return new ResultInfo
                {
                    Code = 1,
                    Message = "Invalid parameters. Setting is null."
                };
            }

            var result = await UpdateSportsBookSettingAsync(metaModel, isShowMixedSport).ConfigureAwait(false);
            if (!result.IsSuccessful)
            {
                return result;
            }

            var esportsSetting = metaModel.Setting.Where(x => x.IsUpdated && x.Id == ((int)SportType.Esports).ToString()).ToList();

            if (!esportsSetting.Any())
            {
                return result;
            }

            var dcsMetaModel = new PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>>
            {
                CustId = metaModel.CustId,
                UserId = metaModel.UserId,
                SiteName = metaModel.SiteName,
                Ip = metaModel.Ip,
                Setting = esportsSetting,
                ProductId = ProductTypes.Sportsbooks2,
                LicenseeCustId = metaModel.LicenseeCustId
            };
            return await UpdateEsportsSettingAsync(dcsMetaModel).ConfigureAwait(false);
        }

        private async Task<IResultInfo> UpdateSportsBookSettingAsync(PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>> metaModel, bool isShowMixedSport)
        {
            var result = await _betSetting.UpdateSettingAsync(metaModel, isShowMixedSport).ConfigureAwait(false);

            WriteLog(metaModel, result.IsSuccessful);

            return result;
        }

        private async Task<IResultInfo> UpdateEsportsSettingAsync(PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>> metaModel)
        {
            var result = await _dcsBetSetting.UpdateSettingAsync(metaModel).ConfigureAwait(false);

            WriteLog(metaModel, result.IsSuccessful);

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

        private void WriteLog(PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>> metaModel, bool isSuccessful)
        {
            var logDetail = metaModel.Setting
                .Where(x => x.IsUpdated)
                .SelectMany(x => CreateLogDetail(x, isSuccessful));

            _businessLogService.Write(BusinessLogType.CustomerBetSetting, metaModel.CreateLogInfo(logDetail));
        }
    }
}
