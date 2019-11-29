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
    using Fanex.Athena.Module.PlayerAdmin.Helpers;
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

            var sbSettings = await _betSetting.GetSettingAsync(custId, isShowMixedSport).ConfigureAwait(false);

            var result = sbSettings.ToList();
            var sbSettingTotal = sbSettings.Count();
            result.Insert(sbSettingTotal > EsportIndex ? EsportIndex: sbSettingTotal, eSportSetting.First());

            return result;
        }

        public async Task<IResultInfo> UpdateSettingAsync(PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>> metaModel, bool isShowMixedSport)
        {
            var esportsTypeId = ((int)SportType.Esports).ToString();
            if (!metaModel.Setting.Any(x => x.Id == esportsTypeId))
            {
                return new ResultInfo { Code = 1, Message = "Invalid parameters. Setting is null."};
            }

            var result = await _betSetting.UpdateSettingAsync(metaModel, isShowMixedSport).ConfigureAwait(false);
            var logInfo = PlayerAdminBetLimitActionLogHelper.CreateLogInfo(
                metaModel,
                GetDetailedLog(metaModel.Setting.Where(x => x.Id != esportsTypeId), result.Code == 0));

            if (result.Code > 0)
            {
                _businessLogService.Write(BusinessLogType.CustomerBetSetting, logInfo);
                return result;
            }

            var esportsSetting = metaModel.Setting.Where(x => x.IsUpdated && x.Id == esportsTypeId).ToList();
            if (esportsSetting.Any())
            {
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
                result = await _dcsBetSetting.UpdateSettingAsync(dcsMetaModel).ConfigureAwait(false);

                if (logInfo is null)
                {
                    logInfo = PlayerAdminBetLimitActionLogHelper.CreateLogInfo(
                        metaModel,
                        GetDetailedLog(esportsSetting, result.Code == 0));
                }
                else
                {
                    logInfo.Detail = logInfo.Detail.Concat(GetDetailedLog(esportsSetting, result.Code == 0));
                }
            }

            _businessLogService.Write(BusinessLogType.CustomerBetSetting, logInfo);
            return result;
        }

        private static IEnumerable<PlayerBetLimitDetailedLogMetaModel> GetDetailedLog(IEnumerable<PlayerBetLimitMetaModel> setting, bool isSuccessful)
        {
           return PlayerAdminBetLimitActionLogHelper.BuildBetLimitLogDetail(
                setting,
                x => x.Id,
                isSuccessful,
                new [] { LogActionDetailId.UpdatingMinBet, LogActionDetailId.UpdatingMaxBet, LogActionDetailId.UpdatingMaxPerMatch });
        }
    }
}
