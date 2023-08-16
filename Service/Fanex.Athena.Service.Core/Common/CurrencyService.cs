using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.DTO.Configuration;
using Fanex.Athena.Service.Core.Common.Interfaces;
using Fanex.Athena.Service.Core.Users.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Fanex.Athena.Service.Core.Common
{
    public class CurrencyService : ICurrencyService
    {
        private readonly IAppSettings _appSettings;
        private readonly ISessionService _sessionService;
        private readonly ICustomMemoryCacheService _cache;
        private const int OneDayInSecond = 86400;

        public CurrencyService(IAppSettings appSettings, ISessionService sessionService, ICustomMemoryCacheService cache)
        {
            _appSettings = appSettings;
            _sessionService = sessionService;
            _cache = cache;
        }

        public IReadOnlyDictionary<int, string> GetBaseCurrencyList()
        {
            var licenseeName = _sessionService.LicenseeSession.LicenseeName;
            var cacheKey = string.Format(CacheKey.MemorycacheBaseCurrencyListByLicensee, licenseeName);
            var baseCurrencyList = _cache.Get<IReadOnlyDictionary<int, string>>(cacheKey);

            if (baseCurrencyList != null)
            {
                return baseCurrencyList;
            }

            if (_appSettings.OfferCryptoCurrencyLicensees.Split(',').Contains(licenseeName, StringComparer.InvariantCultureIgnoreCase))
            {
                baseCurrencyList = SystemConstants.CryptoBaseCurrencyList;
            }
            else if (_appSettings.CryptoLicenseesSupportBaseEUR.Split(',').Contains(licenseeName, StringComparer.InvariantCultureIgnoreCase))
            {
                baseCurrencyList = SystemConstants.CryptoSupportEURBaseCurrencyList;
            }
            else
            {
                baseCurrencyList = SystemConstants.FlatBaseCurrencyList;
            }

            _cache.Set(cacheKey, baseCurrencyList, OneDayInSecond);

            return baseCurrencyList;
        }
    }
}