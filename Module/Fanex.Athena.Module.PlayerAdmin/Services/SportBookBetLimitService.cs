namespace Fanex.Athena.Module.PlayerAdmin.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Repository.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;

    public class SportBookBetLimitService : ISportBookBetLimitService
    {
        private const int EsportIndex = 2;

        private readonly ISportBookBetLimitRepository _betSetting;

        private readonly IDcsBetLinitRepository _dcsBetSetting;

        public SportBookBetLimitService(
            ISportBookBetLimitRepository betSettingRepository,
            IDcsBetLinitRepository dcsBetSettingRepository)
        {
            _betSetting = betSettingRepository;
            _dcsBetSetting = dcsBetSettingRepository;
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

        public async Task<IResultInfo> UpdateSettingAsync(PlayerBetLimitUpdateMetaModel metaModel)
        {
            if (metaModel.Setting is null || metaModel.Setting.Any(x => x.SportId == ((int)SportType.Esports).ToString()))
            {
                return new ResultInfo
                {
                    Code = 1,
                    Message = "Invalid parameters. Setting is null."
                };
            }

            var result = await _betSetting.UpdateSettingAsync(metaModel).ConfigureAwait(false);
            if (!result.IsSuccessful)
            {
                return result;
            }

            var dcsMetaModel = new PlayerBetLimitUpdateMetaModel
            {
                CustId = metaModel.CustId,
                UserId = metaModel.UserId,
                Ip = metaModel.Ip,
                Setting = metaModel.Setting.Where(x => x.SportId == ((int)SportType.Esports).ToString())
            };
            return await _dcsBetSetting.UpdateSettingAsync(metaModel).ConfigureAwait(false);
        }
    }
}
