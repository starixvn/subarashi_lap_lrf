namespace Fanex.Athena.ServiceStatelessCore.UnitTests
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using DataAccess.Core.Common.Interfaces;

    using Fanex.Athena.Service.StatelessCore;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.VendorAdapter.Interfaces;
    using Model.Core.DTO.Common;

    using NSubstitute;

    using NUnit.Framework;

    using UnitTest.Common.Helpers;

    [TestFixture]
    public class BetTypeServiceTest
    {
        private IBetTypeDataAccess _betTypeDataAccess;
        private ICacheRefAdapter _cacheAdapter;

        private IBetTypeService _betTypeService;

        [OneTimeSetUp]
        public void SetUp()
        {
            _betTypeDataAccess = Substitute.For<IBetTypeDataAccess>();
            _cacheAdapter = Substitute.For<ICacheRefAdapter>();
            _betTypeService = new BetTypeService(_betTypeDataAccess, _cacheAdapter);
        }

        [TearDown]
        public void TearDown()
        {
            _betTypeDataAccess.ClearReceivedCalls();
            _cacheAdapter.ClearReceivedCalls();
        }

        [Test]
        public void GetBettypes_WhenCall_PassCorrectParamsToDataAccess()
        {
            // Arrange
            var parentSport = new SportProductItem { ParentId = -1, ID = 2 };
            var childSport1 = new SportProductItem { ParentId = parentSport.ID, ID = FakeHelper.Create<int>() };
            var childSport2 = new SportProductItem { ParentId = parentSport.ID, ID = FakeHelper.Create<int>() };
            var sports = new List<SportProductItem> { parentSport, childSport1, childSport2 };

            var expectedSportXmlString = $"<products><product ID=\"{parentSport.ID}\" Sport=\"{childSport1.ID},{childSport2.ID}\"> </product></products>";

            var languageCode = FakeHelper.Create<string>();
            var isHideSaba = false;

            // Action
            _betTypeService.GetBettypes(sports, languageCode, isHideSaba);

            // Assert
            _betTypeDataAccess.Received().GetBettypes(expectedSportXmlString);
        }

        [Test]
        public void GetBettypes_NoChildSports_PassCorrectParamsToDataAccess()
        {
            // Arrange
            var parentSport = new SportProductItem { ParentId = -1, ID = FakeHelper.Create<int>() };
            var sports = new List<SportProductItem> { parentSport };

            var expectedSportXmlString = $"<products><product ID=\"{parentSport.ID}\" Sport=\"{parentSport.ID}\"> </product></products>";

            var languageCode = FakeHelper.Create<string>();
            var isHideSaba = false;

            // Action
            _betTypeService.GetBettypes(sports, languageCode, isHideSaba);

            // Assert
            _betTypeDataAccess.Received().GetBettypes(expectedSportXmlString);
        }

        [Test]
        public async Task GetBettypes_WhenCall_ReturnResultFromDataAccess()
        {
            // Arrange
            var expectedResult = new List<(string, int)> { ("", 1) };
            var sports = new List<SportProductItem>
            {
                new SportProductItem()
            };

            var languageCode = FakeHelper.Create<string>();
            _betTypeDataAccess.GetBettypes(Arg.Any<string>()).Returns(expectedResult);
            var isHideSaba = false;

            // Action
            var result = await _betTypeService.GetBettypes(sports, languageCode, isHideSaba);

            // Assert
            Assert.That(result.Count, Is.EqualTo(expectedResult.Count));
        }

        [Test]
        public async Task GetBettypes_SportsIsNull_ReturnEmptyDataList()
        {
            // Arrange
            var languageCode = FakeHelper.Create<string>();

            IList<SportProductItem> sports = null;
            var isHideSaba = false;

            // Action
            var result = await _betTypeService.GetBettypes(sports, languageCode, isHideSaba);

            // Assert
            Assert.That(result.Count, Is.EqualTo(0));
        }

        [Test]
        public async Task GetBettypes_SportsIsEmpty_ReturnEmptyDataList()
        {
            // Arrange
            var languageCode = FakeHelper.Create<string>();

            IList<SportProductItem> sports = new List<SportProductItem>();
            var isHideSaba = false;

            // Action
            var result = await _betTypeService.GetBettypes(sports, languageCode, isHideSaba);

            // Assert
            Assert.That(result.Count, Is.EqualTo(0));
        }
    }
}