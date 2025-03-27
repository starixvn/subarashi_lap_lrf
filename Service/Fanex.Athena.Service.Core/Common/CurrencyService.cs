using System;
using System.Collections.Generic;
using System.Linq;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.DTO.Configuration;
using Fanex.Athena.Service.Core.Common.Interfaces;
using Fanex.Athena.Service.Core.Users.Interfaces;

namespace Fanex.Athena.Service.Core.Common
{
    public class CurrencyService : ICurrencyService
    {
        private readonly IAppSettings _appSettings;
        private readonly ISessionService _sessionService;
        private readonly ICustomMemoryCacheService _cache;

        public CurrencyService(IAppSettings appSettings, ISessionService sessionService, ICustomMemoryCacheService cache)
        {
            _appSettings = appSettings;
            _sessionService = sessionService;
            _cache = cache;
        }

        public IDictionary<int, string> GetBaseCurrencyList(bool supportOnceCurrencyToBase = false)
        {
            var licenseeName = _sessionService.LicenseeSession.LicenseeName;
            var specialPlatform = _sessionService.LicenseeSession.SpecialPlatform;
            var userId = _sessionService.UserSession.UserId;
            var cacheKey = string.Format(CacheKey.MemorycacheBaseCurrencyListByLicensee, licenseeName, specialPlatform, userId, supportOnceCurrencyToBase.ToString());
            var baseCurrencyList = _cache.Get<IDictionary<int, string>>(cacheKey);
            var currencyList = _sessionService.UserSession.CurrencyList;

            if (baseCurrencyList != null)
            {
                return baseCurrencyList;
            }

            baseCurrencyList = GetByLicenseeSettings(licenseeName, specialPlatform);

            if (supportOnceCurrencyToBase && HasOneCurrencyAndNotBase(currencyList, baseCurrencyList))
            {
                baseCurrencyList.Add(-currencyList.First().Key, currencyList.First().Value);
            }

            _cache.Set(cacheKey, baseCurrencyList);

            return baseCurrencyList;
        }

        private IDictionary<int, string> GetByLicenseeSettings(string licenseeName, int specialPlatform)
        {
            if (_appSettings.OfferCryptoCurrencyLicensees.Split(',').Contains(licenseeName, StringComparer.InvariantCultureIgnoreCase))
            {
                return SystemConstants.CryptoBaseCurrencyList.ToDictionary(_ => _.Key, _ => _.Value);
            }
            else if (_appSettings.CryptoLicenseesSupportBaseEUR.Split(',').Contains(licenseeName, StringComparer.InvariantCultureIgnoreCase))
            {
                return SystemConstants.CryptoSupportEURBaseCurrencyList.ToDictionary(_ => _.Key, _ => _.Value);
            }
            else if (specialPlatform == SpecialPlatform.Jollysports || specialPlatform == SpecialPlatform.JollysportCV)
            {
                return SystemConstants.JollysportsBaseCurrencyList.ToDictionary(_ => _.Key, _ => _.Value);
            }
            else
            {
                return SystemConstants.FlatBaseCurrencyList.ToDictionary(_ => _.Key, _ => _.Value);
            }
        }

        private static bool HasOneCurrencyAndNotBase(IDictionary<int, string> currencyList, IDictionary<int, string> baseCurrencyList)
            => currencyList.Count == 1
            && !baseCurrencyList.ContainsKey(-currencyList.First().Key)
            && !baseCurrencyList.Any(_ => _.Value.Equals(currencyList.First().Value, StringComparison.OrdinalIgnoreCase));
    }
}