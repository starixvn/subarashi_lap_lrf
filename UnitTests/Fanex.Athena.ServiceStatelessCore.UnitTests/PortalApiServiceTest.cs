namespace Fanex.Athena.ServiceStatelessCore.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Extension.Utility.Interfaces;
    using Logging;
    using Model.Core.DTO.External;
    using NSubstitute;
    using NUnit.Framework;
    using Service.StatelessCore;
    using Service.StatelessCore.Interfaces;

    public class PortalApiServiceTestAble : PortalApiService
    {
        public PortalApiServiceTestAble(ILGAPIClient lgApiClient, ICustomMemoryCacheService cache, ILogger logger)
            : base(lgApiClient, cache, logger)
        {
        }

        public Task<T> HandleTestable<T>(string path, object payload, T defaultData)
            => Handle(path, payload, defaultData);

        public Task<T> TryGetOrAddFromCacheTestable<T>(string key, Func<Task<T>> action, int timeout)
            => TryGetOrAddFromCache(key, action, timeout);
    }

    [TestFixture]
    public class PortalApiServiceTest
    {
        [SetUp]
        public void SetUp()
        {
            _lgApiClient = Substitute.For<ILGAPIClient>();
            _logger = Substitute.For<ILogger>();
            _cache = Substitute.For<ICustomMemoryCacheService>();
            _portalApiService = new PortalApiServiceTestAble(_lgApiClient, _cache, _logger);
        }

        [TearDown]
        public void TearDown()
        {
            _lgApiClient = null;
            _logger = null;
            _cache = null;
            _portalApiService = null;
        }

        private ILGAPIClient _lgApiClient;
        private ILogger _logger;
        private ICustomMemoryCacheService _cache;
        private PortalApiServiceTestAble _portalApiService;

        [Test]
        public async Task TryGetOrAddFromCache_WhenCall_CallSetAndGetMethod()
        {
            // Arrange
            const string CacheKey = "cachekey";
            const int CacheTimeOut = 123;
            var expectedData = new[] { 1, 2, 3 };

            Func<Task<IEnumerable<int>>> action = () => Task.FromResult<IEnumerable<int>>(expectedData);
            _cache.Get<IEnumerable<int>>(Arg.Any<string>()).Returns(null as IEnumerable<int>);

            // Action
            var result = await _portalApiService.TryGetOrAddFromCacheTestable(CacheKey, action, CacheTimeOut);

            // Assert
            Assert.AreEqual(expectedData, result);
            _cache.Received().Get<IEnumerable<int>>(CacheKey);
            _cache.Received().Set(CacheKey, expectedData, CacheTimeOut);
        }

        [Test]
        public async Task Handle_FailedPortalResponse_LogError()
        {
            // Arrange
            const string ApiPath = "Portal/TestPath";
            var payload = new { test = 1 };
            var defaultData = Enumerable.Empty<int>();
            var portalResponse = new PortalApiResponse<IEnumerable<int>>
            {
                Data = Enumerable.Empty<int>(),
                ErrCode = 1,
                ErrMsg = "error msg"
            };

            _cache.Get<IEnumerable<int>>(Arg.Any<string>()).Returns(null as IEnumerable<int>);
            _lgApiClient.PostAsync<PortalApiResponse<IEnumerable<int>>>(ApiPath, payload, "en-US")
                .Returns(Task.FromResult(portalResponse));
            var expectedErrorMsgLog =
                $"An error occurred while calling LGAPI {ApiPath} - ErrorMsg: {portalResponse.ErrMsg} - ErrorCode: {portalResponse.ErrCode}";

            // Action
            var result = await _portalApiService.HandleTestable(ApiPath, payload, defaultData);

            // Assert
            Assert.AreEqual(portalResponse.Data, result);
            _logger.Received().Error(expectedErrorMsgLog);
        }

        [Test]
        public async Task Handle_ExceptionWhenCallApi_LogErrorAndReturnDefaultData()
        {
            // Arrange
            const string ApiPath = "Portal/TestPath";
            var payload = new { test = 1 };
            var defaultData = Enumerable.Empty<int>();
            var exception = new Exception("test");
            _cache.Get<IEnumerable<int>>(Arg.Any<string>()).Returns(null as IEnumerable<int>);
            _lgApiClient
                .When(x => x.PostAsync<PortalApiResponse<IEnumerable<int>>>(ApiPath, payload, "en-US"))
                .Do(x => throw exception);

            // Action
            var result = await _portalApiService.HandleTestable(ApiPath, payload, defaultData);

            // Assert
            Assert.AreEqual(defaultData, result);
            _logger.Received().Error(Arg.Any<string>(), exception);
        }

        [Test]
        public async Task GetSpecialLeaguesAsync_SuccessPortalResponse_ReturnCorrectDataAndCacheable()
        {
            // Arrange
            const string SiteName = "test";
            const string CacheKey = "SpecialLeagues_" + SiteName;
            const int CacheTimeOut = 30 * 60;
            var portalResponse = new PortalApiResponse<IEnumerable<int>>
            {
                Data = new[] { 1, 2, 3 },
                ErrCode = 0,
                ErrMsg = string.Empty
            };

            _cache.Get<IEnumerable<int>>(Arg.Any<string>()).Returns(null as IEnumerable<int>);
            _lgApiClient.PostAsync<PortalApiResponse<IEnumerable<int>>>("Portal/GetSpecialLeagues", Arg.Is<object>(x => x != null), "en-US")
                .Returns(Task.FromResult(portalResponse));

            // Action
            var result = await _portalApiService.GetSpecialLeaguesAsync(SiteName);

            // Assert
            Assert.AreEqual(portalResponse.Data, result);
            _cache.Received().Get<IEnumerable<int>>(CacheKey);
            _cache.Received().Set(CacheKey, portalResponse.Data, CacheTimeOut);
        }

        [Test]
        public async Task GetLimitLeaguesAsync_SuccessPortalResponse_ReturnCorrectDataAndCacheable()
        {
            // Arrange
            const string SiteName = "test";
            const int SportType = 1;
            const int LeagueGroupId = 2;
            const string LangCode = "en-US";
            var cacheKey = $"LimitLeagues_{SiteName}_{SportType}_{LeagueGroupId}_{LangCode}";
            const int CacheTimeOut = 30 * 60;
            var portalResponse = new PortalApiResponse<IEnumerable<PortalApiLeagueResponse>>
            {
                Data = new[] { new PortalApiLeagueResponse { LeagueId = 1, LeagueName = "league name" } },
                ErrCode = 0,
                ErrMsg = string.Empty
            };

            _cache.Get<IEnumerable<PortalApiLeagueResponse>>(Arg.Any<string>()).Returns(null as IEnumerable<PortalApiLeagueResponse>);
            _lgApiClient.PostAsync<PortalApiResponse<IEnumerable<PortalApiLeagueResponse>>>("Portal/GetLimitLeagues", Arg.Is<object>(x => x != null),
                    "en-US")
                .Returns(Task.FromResult(portalResponse));

            // Action
            var result = await _portalApiService.GetLimitLeaguesAsync(SiteName, SportType, LeagueGroupId, LangCode, false);

            // Assert
            Assert.AreEqual(portalResponse.Data, result);
            _cache.Received().Get<IEnumerable<PortalApiLeagueResponse>>(cacheKey);
            _cache.Received().Set(cacheKey, portalResponse.Data, CacheTimeOut);
        }

        [Test]
        public async Task GetLeagueGroupsAsync_SuccessPortalResponse_ReturnCorrectDataAndCacheable()
        {
            // Arrange
            const int SportType = 1;
            const string LangCode = "en-US";
            var cacheKey = $"LeagueGroups_{SportType}_{LangCode}";
            const int CacheTimeOut = 30 * 60;
            var portalResponse = new PortalApiResponse<IEnumerable<PortalApiLeagueGroupResponse>>
            {
                Data = new[]
                {
                    new PortalApiLeagueGroupResponse { LicLeagueGroupID = 1, LicGroupName = "league group name", InHouseLeagueGroupID = 2 }
                },
                ErrCode = 0,
                ErrMsg = string.Empty
            };

            _cache.Get<IEnumerable<PortalApiLeagueGroupResponse>>(Arg.Any<string>()).Returns(null as IEnumerable<PortalApiLeagueGroupResponse>);
            _lgApiClient.PostAsync<PortalApiResponse<IEnumerable<PortalApiLeagueGroupResponse>>>("Portal/GetLeagueGroups",
                    Arg.Is<object>(x => x != null), "en-US")
                .Returns(Task.FromResult(portalResponse));

            // Action
            var result = await _portalApiService.GetLeagueGroupsAsync(SportType, LangCode, false);

            // Assert
            Assert.AreEqual(portalResponse.Data, result);
            _cache.Received().Get<IEnumerable<PortalApiLeagueGroupResponse>>(cacheKey);
            _cache.Received().Set(cacheKey, portalResponse.Data, CacheTimeOut);
        }
    }
}