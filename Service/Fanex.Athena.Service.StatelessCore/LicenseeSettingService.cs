// -----------------------------------------------------------------------
// <copyright file="MoveBetService.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Service.StatelessCore
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Hosting;

    using Extension.Utility.Interfaces;
    using Fanex.Athena.DataAccess.Core.Users.Interfaces;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.DTO.Configuration;

    using Interfaces;

    using Newtonsoft.Json;

    public class LicenseeSettingService : ILicenseeSettingService
    {
        private const string FakeLicenseeSettingsCacheKey = "LRF_FakeLicenseeSettings";
        private const int OneDayInSecond = 86400;

        private readonly ICustomMemoryCacheService _cache;

        private readonly ILicenseeDataAccess _licenseeDataAccess;

        public LicenseeSettingService(ICustomMemoryCacheService cache, ILicenseeDataAccess licenseeDataAccess)
        {
            _cache = cache;
            _licenseeDataAccess = licenseeDataAccess;
        }

        public bool IsFakeLicensee(string licenseeName)
        {
            return GetFakeLicenseeSetting(licenseeName) != null;
        }

        public bool IsAuthorizedOnBetList(string licenseeName)
        {
            var authorized = !string.IsNullOrEmpty(licenseeName);
            if (authorized)
            {
                var setting = GetFakeLicenseeSetting(licenseeName);
                if (setting != null)
                {
                    authorized = !setting.DisableBetList;
                }
            }

            return authorized;
        }

        public FakeLicenseeSetting GetFakeLicenseeSetting(string licenseeName)
        {
            return GetAndCacheFakeLicenseeSettingList()?.FirstOrDefault(x => x.SiteName.Equals(licenseeName, StringComparison.OrdinalIgnoreCase));
        }

        public Licensee GetLicenseeInfo(string licenseeName)
        {
            var cacheKey = "Lrf_LicenseeSelBySiteName_" + licenseeName;
            var licenseeInfo = _cache.Get<Licensee>(cacheKey);
            if (licenseeInfo == null)
            {
                licenseeInfo = _licenseeDataAccess.GetLicenseeByName(licenseeName);
                if (licenseeInfo != null)
                {
                    _cache.Set(cacheKey, licenseeInfo, OneDayInSecond);
                }
            }

            return licenseeInfo;
        }

        private IEnumerable<FakeLicenseeSetting> GetAndCacheFakeLicenseeSettingList()
        {
            var settings = _cache.Get<IEnumerable<FakeLicenseeSetting>>(FakeLicenseeSettingsCacheKey);
            if (settings == null)
            {
                settings = GetFakeLicenseeSettingList();
                if (settings.Any())
                {
                    _cache.Set(FakeLicenseeSettingsCacheKey, settings);
                }
            }

            return settings;
        }

        private IEnumerable<FakeLicenseeSetting> GetFakeLicenseeSettingList()
        {
            IEnumerable<FakeLicenseeSetting> result = null;
            var jsonContent = GetFakeLicenseeSettingContent();

            if (!string.IsNullOrEmpty(jsonContent))
            {
                result = JsonConvert.DeserializeObject<IEnumerable<FakeLicenseeSetting>>(jsonContent);
            }

            return result ?? new List<FakeLicenseeSetting>();
        }

        protected internal virtual string GetFakeLicenseeSettingContent()
        {
            const string FilePath = "~/App_Data/FakeLicenseeSetting.json";
            using (var reader = new StreamReader(HostingEnvironment.MapPath(FilePath)))
            {
                return reader.ReadToEnd();
            }
        }
    }
}