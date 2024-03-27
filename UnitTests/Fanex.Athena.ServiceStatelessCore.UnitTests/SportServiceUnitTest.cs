using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Fanex.Athena.DataAccess.Core.Common.Interfaces;
using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Core.DTO.Configuration;
using Fanex.Athena.Service.StatelessCore;
using Fanex.Athena.VendorAdapter.Interfaces;
using NSubstitute;
using NSubstitute.ReturnsExtensions;
using NUnit.Framework;

namespace Fanex.Athena.ServiceStatelessCore.UnitTests
{
    [TestFixture]
    public class SportServiceUnitTest
    {
        private ISportTypeDataAccess _sportTypeDataAccess;
        private ICustomMemoryCacheService _cacheService;
        private ICacheRefAdapter _cacheRefAdapter;

        [SetUp]
        public void SetUp()
        {
            _sportTypeDataAccess = Substitute.For<ISportTypeDataAccess>();
            _cacheRefAdapter = Substitute.For<ICacheRefAdapter>();
            _cacheService = Substitute.For<ICustomMemoryCacheService>();
        }

        [TearDown]
        public void TearDown()
        {
            _sportTypeDataAccess = null;
            _cacheRefAdapter = null;
            _cacheService = null;
        }

        [Test]
        public async Task GetSportForProductAsync_WhenHaveCache_ReturnCacheValue()
        {
            //Arange
            var siteName = "12B";
            var productCode = "Sport";
            var cacheKey = CacheKey.MemorycacheSportListByLicensee + siteName + productCode;
            var sportList = new List<SportGame> { new SportGame { GameCode = "abac", GameName = "abc" } };
            var service = CreateService();
            _cacheService.Get<IList<SportGame>>(cacheKey).Returns(sportList);

            //Action
            var result = await service.GetSportForProductAsync(siteName, productCode);

            //Assert
            Assert.AreSame(sportList, result);
        }

        [Test]
        public async Task GetSportForProductAsync_WhenHaveNoCache_ReturnValueFromDataAccess()
        {
            //Arange
            var siteName = "12B";
            var productCode = "Sport";
            var sportList = new List<SportGame> { new SportGame { GameCode = "abac", GameName = "abc" } };
            var service = CreateService();
            _cacheService.Get<IList<SportGame>>(Arg.Any<string>()).ReturnsNull();
            _sportTypeDataAccess.GetSportForProductsAsync(siteName, productCode).Returns(sportList);

            //Action
            var result = await service.GetSportForProductAsync(siteName, productCode);

            //Assert
            Assert.AreSame(sportList, result);
        }

        [Test]
        public async Task GetAllSports_WhenCall_ReturnCorrectly()
        {
            //Arrange
            var service = CreateService();
            var expectedResult = new Dictionary<int, string> { { 1, "a" } };
            _sportTypeDataAccess.GetAllSports().Returns(expectedResult);

            //Action
            var result = await service.GetAllSports();

            //Assert
            Assert.AreSame(expectedResult, result);
        }

        [Test]
        public async Task GetSportsAndProducts_WhenCall_ReturnCorrectly()
        {
            //Arrange
            const int licenseeId = 1;
            const string lang = "VN";
            const string productCode = "Sport";
            var service = CreateService();
            var expectedResult = new List<SportProductItem>();
            _sportTypeDataAccess.GetSportsAndProducts(licenseeId, lang, productCode).Returns(expectedResult);

            //Action
            var result = await service.GetSportsAndProducts(licenseeId, lang, productCode);

            //Assert
            Assert.AreSame(expectedResult, result);
        }

        [Test]
        public async Task GetSportAndProductAndSabaSport_WhenCall_ReturnCorrectly()
        {
            //Arrange
            const int licenseeId = 1;
            const string lang = "VN";
            const string productCode = "Sport";
            const bool isHideSaba = false;
            var service = CreateService();
            var sabaSports = service.GetSabaSports();
            var expectedResult = new List<SportProductItem>();
            _sportTypeDataAccess.GetSportsAndProducts(licenseeId, lang, productCode).Returns(expectedResult);

            //Action
            var result = await service.GetSportAndProductAndSabaSport(licenseeId, lang, isHideSaba, productCode);

            //Assert
            Assert.Multiple(() =>
            {
                Assert.AreEqual(sabaSports.Count(), result.Count());
                Assert.AreEqual(string.Join(",", sabaSports.Select(s => s.Id)), string.Join(",", result.Select(r => r.ID)));
            });
        }

        private SportService CreateService()
            => new SportService(_sportTypeDataAccess, _cacheRefAdapter, _cacheService);
    }
}