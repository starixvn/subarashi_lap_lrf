namespace Fanex.Athena.Service.Core.UnitTests
{
    using Core.Users.Interfaces;

    using DataAccess.Core.Users.Interfaces;

    using Extension.Utility;
    using Extension.Utility.Interfaces;

    using Fanex.Athena.Extension.Utility.Internal;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Core.DTO.Configuration;
    using Fanex.Athena.Model.Core.DTO.Users;
    using Fanex.Athena.Model.Report.DTO;
    using Fanex.Athena.Service.Core.Users;
    using NSubstitute;

    using NUnit.Framework;

    using System;
    using System.Collections.Generic;
    using System.Linq;

    [TestFixture]
    public class SubsidiaryServiceTest
    {
        private const string LicenseeName = "12Bet";
        private ISubsidiaryDataAccess _dataAccess;
        private ICustomMemoryCacheService _cache;
        private ISubsidiaryService _service;

        private UserAuthInfo _userAuthInfo;

        [SetUp]
        public void SetUp()
        {
            _dataAccess = Substitute.For<ISubsidiaryDataAccess>();
            _cache?.Clear();
            _cache = Substitute.For<ICustomMemoryCacheService>();

            _dataAccess.GetSubsidiaryList(Arg.Any<string>()).Returns(GetSubsidiaryData());
            _cache.Get(Arg.Any<string>(), Arg.Any<Func<IEnumerable<Subsidiary>>>(), Arg.Any<int>())
                .Returns(GetSubsidiaryData());

            _service = new SubsidiaryService(_dataAccess, _cache);

            _userAuthInfo = new UserAuthInfo
            {
                CurrencyList = new Dictionary<int, string>() { { 20, "UUS" }, { 51, "IDR" }, { 13, "CNY" } },
                CurrencyAgentList = GetAgentByCurrencyData()
            };
        }

        [TearDown]
        public void TearDown()
        {
            _cache = null;
            _dataAccess = null;
            _service = null;
        }

        [TestCase(1)]
        [TestCase(null)]
        public void GetGroupSubsidiaries_DataIsInCache_DoNotCallDataAccess(int? whitelabelId)
        {
            // Arrange
            var cacheKey = string.Format(CacheKey.MemorycacheGroupSubsidiaryListByLicensee, LicenseeName);
            _cache.Get(cacheKey, Arg.Any<Func<IEnumerable<GroupSubsidiary>>>(), Arg.Any<int>())
              .Returns(FakeGroupSubsidiaryData());
            // Action
            _service.GetGroupSubsidiaries(LicenseeName, whitelabelId);

            // Assert
            _dataAccess.DidNotReceiveWithAnyArgs().GetGroupSubsidiaries(LicenseeName);
        }

        [TestCase(201)]
        [TestCase(null)]
        [TestCase(1)]
        public void GetGroupSubsidiaries_WhenCall_SetDataToCacheAndFilterByWhiteLabelID(int? whitelabelId)
        {
            // Arrange
            var cacheKey = string.Format(CacheKey.MemorycacheGroupSubsidiaryListByLicensee, LicenseeName);
            var data = FakeGroupSubsidiaryData();
            _dataAccess.GetGroupSubsidiaries(LicenseeName).Returns(data);
            ICustomMemoryCache customCache = new CustomMemoryCache();
            _cache = new CustomMemoryCacheService(customCache);
            _service = new SubsidiaryService(_dataAccess, _cache);
            // Action
            var result = _service.GetGroupSubsidiaries(LicenseeName, whitelabelId);

            // Assert
            Assert.True(_cache.Contains(cacheKey));
            _dataAccess.Received(1).GetGroupSubsidiaries(LicenseeName);
            Assert.True(!whitelabelId.HasValue && result.Count() == data.Count()
                || !result.Any(x => x.WhiteLabelID != whitelabelId.Value));
        }

        [Test]
        public void GetAllSubsidiaries_DataIsInCache_DoNotCallDataAccess()
        {
            // Arrange
            var cacheKey = $"SubsidiaryList_{LicenseeName}";

            // Action
            _service.GetAllSubsidiaries(_userAuthInfo, LicenseeName);

            // Assert
            _dataAccess.DidNotReceiveWithAnyArgs().GetSubsidiaryList(LicenseeName);
        }

        [Test]
        public void GetAllSubsidiaries_FilterOperatorByUserAgents_ReturnCorrectlyOperatorList()
        {
            // Arrange
            var cacheKey = $"SubsidiaryList_{LicenseeName}";
            var expectedResult = GetAgentByCurrencyData().SelectMany(i => i.Value);

            // Action
            var result = _service.GetAllSubsidiaries(_userAuthInfo, LicenseeName).Select(i => i.AgentId);

            // Assert
            Assert.AreEqual(true, result.Except(expectedResult).Count() == 0);
        }

        [TestCase(null)]
        [TestCase("")]
        [TestCase(" , ")]
        public void GetCurrencyAgentList_NullOrEmptySubsidairyName_ReturnEmptyList(string subsidairyNames)
        {
            // Action
            var result = _service.GetCurrencyAgentList(_userAuthInfo, LicenseeName, subsidairyNames, false, 0);

            // Assert
            Assert.AreEqual(false, result.Any());
        }

        [TestCase("alex,qc", true, 0)]
        [TestCase("alex,qc", false, 0)]
        [TestCase("qc", true, 20)]
        [TestCase("alex", false, 51)]
        public void GetCurrencyAgentList_FilterTestData_ReturnCorrectlyAgentList(
            string subsidiaryNames, bool isExcludeTest, int currencyId = 0)
        {
            // Action
            var result = _service.GetCurrencyAgentList(_userAuthInfo, LicenseeName, subsidiaryNames, isExcludeTest, currencyId);

            // Assert
            Assert.AreEqual(isExcludeTest, isExcludeTest && !result.Keys.Contains(20));
        }

        [TestCase("alex,qc", 0)]
        [TestCase("qc", 0)]
        [TestCase("alex", 20)]
        [TestCase("alex,qc", 51)]
        public void GetCurrencyAgentList_FilterAgentBySubsidiaryName_ReturnCorrectlyAgentList(
          string subsidiaryNames, int currencyId = 0)
        {
            // Arrange
            List<int> expectedResult = GetAgentListBySubsidairyNames(subsidiaryNames, currencyId);

            // Action
            var result = _service.GetCurrencyAgentList(_userAuthInfo, LicenseeName, subsidiaryNames, false, currencyId)
            .SelectMany(i => i.Value);

            // Assert
            Assert.AreEqual(expectedResult.Count(), result.Count());

            Assert.AreEqual(0, result.Except(expectedResult).Count());
        }

        [TestCase("(others)", 0)]
        [TestCase("(others),alex,qc", 0)]
        [TestCase("(others)", 20)]
        [TestCase("(others),qc", 51)]
        public void GetCurrencyAgentList_FilterAgentByOtherOption_ReturnCorrectlyAgentList(
         string subsidiaryNames, int currencyId = 0)
        {
            // Arrange
            var expectedResult = GetAgentByCurrencyData().Where(i => i.Key == currencyId || currencyId == 0)
                .SelectMany(i => i.Value).ToList()
                .Except(GetSubsidiaryData().Select(i => i.AgentId))
                .Union(GetAgentListBySubsidairyNames(subsidiaryNames, currencyId));

            // Action
            var result = _service.GetCurrencyAgentList(_userAuthInfo, LicenseeName, subsidiaryNames, false, currencyId)
            .SelectMany(i => i.Value);

            // Assert
            Assert.AreEqual(expectedResult.Count(), result.Count());

            Assert.AreEqual(0, result.Except(expectedResult).Count());
        }

        private static List<int> GetAgentListBySubsidairyNames(string subsidiaryNames, int currencyId)
        {
            var subList = subsidiaryNames.Split(new char[] { ',' });
            var agentBySub = GetSubsidiaryData().Where(i =>
              subList.Contains(i.OperatorId) && (currencyId == 0 || currencyId == i.CurrencyId)).Select(i => i.AgentId);

            return agentBySub.Intersect(GetAgentByCurrencyData().SelectMany(i => i.Value)).ToList();
        }

        private static IDictionary<int, int[]> GetAgentByCurrencyData()
        {
            return new Dictionary<int, int[]>
                {
                    { 20, new[] { 201, 202, 203, 204, 205 } },
                    { 51, new[] { 511, 512, 513, 514, 515 } },
                    { 13, new[] { 131, 132 } }
                };
        }
        private static IEnumerable<GroupSubsidiary> FakeGroupSubsidiaryData()
        {
            yield return new GroupSubsidiary
            {
                WhiteLabelID = 201,
                WhiteLabelName = "201",
                OperatorId = "alex"
            };
            yield return new GroupSubsidiary
            {
                OperatorId = "alex2"
            };
        }
        private static IEnumerable<Subsidiary> GetSubsidiaryData()
        {
            yield return new Subsidiary
            {
                AgentId = 201,
                CurrencyId = 20,
                OperatorId = "alex"
            };
            yield return new Subsidiary
            {
                AgentId = 203,
                CurrencyId = 20,
                OperatorId = "alex"
            };
            yield return new Subsidiary
            {
                AgentId = 513,
                CurrencyId = 51,
                OperatorId = "qc"
            };
            yield return new Subsidiary
            {
                AgentId = 512,
                CurrencyId = 51,
                OperatorId = "qc"
            };
            yield return new Subsidiary
            {
                AgentId = 202,
                CurrencyId = 20,
                OperatorId = "qc"
            };
            yield return new Subsidiary
            {
                AgentId = 516,
                CurrencyId = 51,
                OperatorId = "qc"
            };
            yield return new Subsidiary
            {
                AgentId = 601,
                CurrencyId = 60,
                OperatorId = "alex"
            };
        }
    }
}