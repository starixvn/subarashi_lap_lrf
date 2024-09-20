namespace Fanex.Athena.Service.Customer
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using DataAccess.Customer;
    using Interfaces;
    using Model.Core;
    using Model.Customer.DTO;
    using Model.Customer.MetaModel;
    using Resources;
    using StatelessCore.Interfaces;

    public class SabaVirtualSettingService : ISabaVirtualSettingService
    {
        private const string DefaultTextValue = "-";

        private readonly ISabaVirtualSettingDataAccess _dataAccess;
        private readonly IPortalApiService _portalApiService;

        public SabaVirtualSettingService(
            ISabaVirtualSettingDataAccess dataAccess,
            IPortalApiService portalApiService)
        {
            _dataAccess = dataAccess;
            _portalApiService = portalApiService;
        }

        public async Task<IEnumerable<SabaVirtualSettingInformationModel>> GetSabaVirtualSetting(SabaVirtuaSettingInformationMetaModel metaModel)
        {
            var settings = await _dataAccess.GetSabaVirtualSettingInformation(metaModel);
            await MapLicLeagueGroup(settings, metaModel.Language, metaModel.IsHideSaba);

            settings = settings
                .GroupBy(x => new { x.Id, x.SportType, x.LicLeagueGroupName, x.ApplyParlay, x.MaxPerMatch, x.BetDelay, x.NextBetInterval })
                .Select(x => x.First())
                .OrderBy(r => r.Id)
                .ThenBy(r => r.SportType)
                .ThenBy(r => r.LicLeagueGroupId);

            return settings;
        }

        private async Task MapLicLeagueGroup(IEnumerable<SabaVirtualSettingInformationModel> settings, string langCode, bool isHideSaba)
        {
            foreach (var setting in settings)
            {
                if (setting.LeagueGroupId > 0 && int.TryParse(setting.SportType, out var sportType))
                {
                    var leagueGroups = await _portalApiService.GetLeagueGroupsAsync(sportType, langCode, isHideSaba);
                    var matchedLeagueGroup = leagueGroups.FirstOrDefault(_ => _.InHouseLeagueGroupID == setting.LeagueGroupId);
                    setting.LicLeagueGroupId = matchedLeagueGroup?.LicLeagueGroupID ?? 0;
                    setting.LicLeagueGroupName = matchedLeagueGroup?.LicGroupName ?? DefaultTextValue;
                }
                else
                {
                    setting.LicLeagueGroupName = ViewResources.All;
                }

                if (isHideSaba)
                {
                    setting.LicLeagueGroupName = SabaHelper.RemoveSabaText(setting.LicLeagueGroupName);
                }
            }
        }
    }
}