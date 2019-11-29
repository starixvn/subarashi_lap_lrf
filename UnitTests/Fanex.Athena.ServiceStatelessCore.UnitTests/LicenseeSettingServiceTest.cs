namespace Fanex.Athena.ServiceStatelessCore.UnitTests
{
    using System.Collections.Generic;
    using Extension.Utility.Interfaces;
    using Fanex.Athena.DataAccess.Core.Users.Interfaces;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Service.StatelessCore;
    using Fanex.Athena.UnitTest.Common.Helpers;
    using Model.Core.DTO.Configuration;
    using NSubstitute;
    using NUnit.Framework;

    [TestFixture]
    public class LicenseeSettingServiceTest
    {
        private const string FakeLicenseeSettingsCacheKey = "LRF_FakeLicenseeSettings";

        private const string SettingJsonContent =
            @"[{ ""SiteName"": ""IvoryBet"", ""DisableBetList"": true, ""MinDate"": ""02/01/2018"", ""MaxDate"": ""yesterday"" }]";

        private LicenseeSettingService _licenseeSettingService;
        private ICustomMemoryCacheService _cache;
        private ILicenseeDataAccess _licenseeDataAccess;

        [SetUp]
        public void SetUp()
        {
            _cache = Substitute.For<ICustomMemoryCacheService>();
            _licenseeDataAccess = Substitute.For<ILicenseeDataAccess>();

            _licenseeSettingService = Substitute.ForPartsOf<LicenseeSettingService>(_cache, _licenseeDataAccess);
            _licenseeSettingService.When(x => x.GetFakeLicenseeSettingContent()).DoNotCallBase();
        }

        [Test]
        public void GetSetting_FileContentEmpty_ReturnNull()
        {
            // Arrange
            _licenseeSettingService.GetFakeLicenseeSettingContent().Returns(string.Empty);
            _cache.Get<IEnumerable<FakeLicenseeSetting>>(string.Empty).ReturnsForAnyArgs((IEnumerable<FakeLicenseeSetting>)null);

            // Action
            var result = _licenseeSettingService.GetFakeLicenseeSetting("xxx");

            // Assert
            Assert.That(result, Is.Null);
        }

        [Test]
        public void GetSetting_CacheNotContainData_SetCacheWithCorrectData()
        {
            // Arrange
            const string LicenseeName = "IvoryBet";

            _licenseeSettingService.GetFakeLicenseeSettingContent().Returns(SettingJsonContent);
            var fakeData = new[]
            {
                new FakeLicenseeSetting
                {
                    DisableBetList = true,
                    MaxDate = "yesterday",
                    MinDate = "02/01/2018",
                    SiteName = LicenseeName
                }
            };

            _cache.Get<IEnumerable<FakeLicenseeSetting>>(string.Empty).ReturnsForAnyArgs((IEnumerable<FakeLicenseeSetting>)null);

            // Action
            _licenseeSettingService.GetFakeLicenseeSetting("xx");

            // Assert
            _cache.Received(1).Set(
                Arg.Any<string>(),
                Arg.Is<IEnumerable<FakeLicenseeSetting>>(x =>
                    ObjectHelper.ToJson(x) == ObjectHelper.ToJson(fakeData)));
        }

        [Test]
        public void GetSetting_CacheContainData_ReturnSettingFromCache()
        {
            // Arrange
            _licenseeSettingService.GetFakeLicenseeSettingContent().Returns(SettingJsonContent);
            var licenseeName = FakeHelper.Create<string>();
            var fakeData = new[]
            {
                new FakeLicenseeSetting { SiteName = licenseeName }
            };
            _cache.Get<IEnumerable<FakeLicenseeSetting>>(string.Empty).ReturnsForAnyArgs(fakeData);

            // Action
            var result = _licenseeSettingService.GetFakeLicenseeSetting(licenseeName);

            // Assert
            Assert.That(result.SiteName, Is.EqualTo(licenseeName));
        }

        [Test]
        public void IsFakeLicensee_ValidLicenseeName_ReturnsTrue()
        {
            // Arrange
            const string licenseeName = "Anh";
            var setting = new List<FakeLicenseeSetting> {
                new FakeLicenseeSetting
                {
                    SiteName = licenseeName
                }
            };

            _cache.Get<IEnumerable<FakeLicenseeSetting>>(FakeLicenseeSettingsCacheKey).Returns(setting);

            // Action
            var result = _licenseeSettingService.IsFakeLicensee(licenseeName);

            // Assert
            Assert.True(result);
        }

        [Test]
        public void IsFakeLicensee_InvalidLicenseeName_ReturnsFalse()
        {
            // Arrange
            const string licenseeName = "Anh";
            var setting = new List<FakeLicenseeSetting>();

            _cache.Get<IEnumerable<FakeLicenseeSetting>>(FakeLicenseeSettingsCacheKey).Returns(setting);

            // Action
            var result = _licenseeSettingService.IsFakeLicensee(licenseeName);

            // Assert
            Assert.False(result);
        }

        [TestCase(null)]
        [TestCase("")]
        public void IsAuthorizedOnBetList_NullOrEmptyLicenseeName_ReturnsFalse(string licenseeName)
        {
            // Action
            var result = _licenseeSettingService.IsAuthorizedOnBetList(licenseeName);

            // Assert
            Assert.False(result);
        }

        [Test]
        public void IsAuthorizedOnBetList_ValidLicenseeName_ReturnsAuthorizedOnBetList()
        {
            // Arrange
            const string licenseeName = "Anh";
            var disableBetList = FakeHelper.Create<bool>();
            var setting = new List<FakeLicenseeSetting> {
                new FakeLicenseeSetting
                {
                    SiteName = licenseeName,
                    DisableBetList = disableBetList
                }
            };

            _cache.Get<IEnumerable<FakeLicenseeSetting>>(FakeLicenseeSettingsCacheKey).Returns(setting);

            // Action
            var result = _licenseeSettingService.IsAuthorizedOnBetList(licenseeName);

            // Assert
            Assert.That(result, Is.EqualTo(!disableBetList));
        }

        [Test]
        public void IsAuthorizedOnBetList_InvalidLicenseeName_ReturnsFalse()
        {
            // Arrange
            const string licenseeName = "Anh";
            var setting = new List<FakeLicenseeSetting>();

            _cache.Get<IEnumerable<FakeLicenseeSetting>>(FakeLicenseeSettingsCacheKey).Returns(setting);

            // Action
            var result = _licenseeSettingService.IsAuthorizedOnBetList(licenseeName);

            // Assert
            Assert.True(result);
        }

        [Test]
        public void GetLicenseeInfo_CacheContainLicenseeName_ReturnsLicensee()
        {
            // Arrange
            const string licenseeName = "Anh";
            const string cacheKey = "Lrf_LicenseeSelBySiteName_" + licenseeName;
            var licensee = new Licensee();
            _cache.Get<Licensee>(cacheKey).Returns(licensee);

            // Action
            var result = _licenseeSettingService.GetLicenseeInfo(licenseeName);

            // Assert
            Assert.That(result, Is.EqualTo(licensee));
        }

        [Test]
        public void GetLicenseeInfo_CacheNotContainLicenseeNameAndValidLicenseeName_ReturnsLicensee()
        {
            // Arrange
            const string licenseeName = "Anh";
            const string cacheKey = "Lrf_LicenseeSelBySiteName_" + licenseeName;
            _cache.Get<Licensee>(cacheKey).Returns((Licensee)null);
            var licensee = new Licensee();
            _licenseeDataAccess.GetLicenseeByName(licenseeName).Returns(licensee);

            // Action
            var result = _licenseeSettingService.GetLicenseeInfo(licenseeName);

            // Assert
            Assert.That(result, Is.EqualTo(licensee));
        }

        [Test]
        public void GetLicenseeInfo_CacheNotContainLicenseeNameAndInvalidLicenseeName_ReturnsNull()
        {
            // Arrange
            const string licenseeName = "Anh";
            const string cacheKey = "Lrf_LicenseeSelBySiteName_" + licenseeName;
            _cache.Get<Licensee>(cacheKey).Returns((Licensee)null);
            _licenseeDataAccess.GetLicenseeByName(licenseeName).Returns((Licensee)null);

            // Action
            var result = _licenseeSettingService.GetLicenseeInfo(licenseeName);

            // Assert
            Assert.IsNull(result);
        }
    }
}