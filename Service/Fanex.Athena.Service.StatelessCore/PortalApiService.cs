namespace Fanex.Athena.Service.StatelessCore
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.Athena.Extension.Helpers;
    using Fanex.Athena.Extension.Utility.Interfaces;
    using Fanex.Athena.Model.Core.DTO.External;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Logging;

    [CLSCompliant(false)]
    public class PortalApiService : IPortalApiService
    {
        private const string DefaultLanguage = "en-US";
        private const int ThirtyMinutes = 30 * 60;
        private readonly ILGAPIClient _lgApiClient;
        private readonly ILogger _logger;
        private readonly ICustomMemoryCacheService _cache;

        public PortalApiService(ILGAPIClient lgApiClient, ICustomMemoryCacheService cache, ILogger logger)
        {
            _lgApiClient = lgApiClient;
            _logger = logger;
            _cache = cache;
        }

        public Task<IEnumerable<int>> GetSpecialLeaguesAsync(string licenseeName)
        {
            const string path = "Portal/GetSpecialLeagues";
            return TryGetOrAddFromCache(
                $"SpecialLeagues_{licenseeName}",
                () => Handle(path, new { SiteName = licenseeName }, Enumerable.Empty<int>()),
                ThirtyMinutes);
        }

        public async Task<IEnumerable<PortalApiLeagueResponse>> GetLimitLeaguesAsync(string licenseeName, int sportType, int leagueGroupId, string langCode)
        {
            const string path = "Portal/GetLimitLeagues";
            var payload = new
            {
                SiteName = licenseeName,
                SportType = sportType,
                LeagueGroupId = leagueGroupId,
                LangCode = MapLangCode(langCode)
            };

            var result = await TryGetOrAddFromCache($"LimitLeagues_{licenseeName}_{sportType}_{leagueGroupId}_{langCode}",
                () => Handle(path, payload, Enumerable.Empty<PortalApiLeagueResponse>()),
                ThirtyMinutes).ConfigureAwait(false);

            return result.OrderBy(_ => _.LeagueName);
        }

        public Task<IEnumerable<PortalApiLeagueGroupResponse>> GetLeagueGroupsAsync(int sportType, string langCode)
        {
            const string path = "Portal/GetLeagueGroups";
            var payload = new
            {
                SportType = sportType,
                LangCode = MapLangCode(langCode)
            };
            return TryGetOrAddFromCache($"LeagueGroups_{sportType}_{langCode}",
                () => Handle(path, payload, Enumerable.Empty<PortalApiLeagueGroupResponse>()),
                ThirtyMinutes);
        }

        protected async Task<T> Handle<T>(string path, object payload, T defaultData)
        {
            try
            {
                var response = await _lgApiClient
                .PostAsync<PortalApiReponse<T>>(path, payload, DefaultLanguage)
                .ConfigureAwait(false);

                if (response.ErrorCoode != 0)
                {
                    _logger.Error($"An error occurred while calling LGAPI {path} - ErrorMsg: {response.ErrorMsg} - ErrorCode: {response.ErrorCoode}");
                }

                return response.Data;
            }
            catch (Exception ex)
            {
                _logger.Error($"An error occurred while calling LGAPI {path} - {LogMessageHelper.GenerateMessage(ex)}", ex);
                return defaultData;
            }
        }

        protected async Task<T> TryGetOrAddFromCache<T>(string key, Func<Task<T>> action, int timeout)
        {
            var result = _cache.Get<T>(key);
            if (!ReferenceEquals(result, default(T)))
            {
                return result;
            }

            result = await action.Invoke().ConfigureAwait(false);
            _cache.Set(key, result, timeout);
            return result;
        }

        private static string MapLangCode(string langCode)
           => string.Equals(langCode, "zh-CN", StringComparison.OrdinalIgnoreCase) ? "cs" : "en";
    }
}