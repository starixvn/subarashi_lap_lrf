namespace Fanex.Athena.ServiceStatelessCore.UnitTests
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using DataAccess.Core.Configuration.Interfaces;

    using Extension.Utility.Interfaces;

    using Fanex.Athena.Service.StatelessCore;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Logging;

    using Model.Core.DTO.Configuration;

    using NSubstitute;

    using NUnit.Framework;

    [TestFixture]
    public class MoveBetServiceTest
    {
        private const string ExpectedMessage = "Sample Message";

        private IMoveBetDataAccess _moveBetDataAccess;
        private IMoveBetService _moveBetService;
        private ICustomMemoryCacheService _cache;
        private ILogger _logger;

        [SetUp]
        public void SetUp()
        {
            _moveBetDataAccess = Substitute.For<IMoveBetDataAccess>();
            _cache = Substitute.For<ICustomMemoryCacheService>();
            _logger = Substitute.For<ILogger>();
            _moveBetService = new MoveBetService(_logger, _moveBetDataAccess, _cache);
        }

        [TearDown]
        public void TearDown()
        {
            _moveBetDataAccess = null;
            _moveBetService = null;
        }

        [Test]
        public async Task GetMoveBetNotification_CacheContainsData_ReturnResultFromCache()
        {
            // Arrange
            var expectedResult = new MoveBetNotification
            {
                ContentByLanguage = new Dictionary<string, string>
                {
                    { "vi-VN", ExpectedMessage }
                }
            };
            _cache.Get<MoveBetNotification>(Arg.Any<string>()).Returns(expectedResult);

            // Action
            var result = await _moveBetService.GetMoveBetNotificationAsync("vi-VN");

            // Assert
            Assert.That(result, Is.EqualTo(ExpectedMessage));
        }

        [Test]
        public async Task GetMoveBetNotification_WhenCall_ReturnResultFromDataAccess()
        {
            // Arrange
            var expectedResult = new MoveBetNotification
            {
                ContentByLanguage = new Dictionary<string, string>
                {
                    { "vi-VN", ExpectedMessage }
                }
            };
            _moveBetDataAccess.GetMoveBetNotificationAsync().Returns(expectedResult);

            // Action
            var result = await _moveBetService.GetMoveBetNotificationAsync("vi-VN");

            // Assert
            Assert.That(result, Is.EqualTo(ExpectedMessage));
        }

        [Test]
        public async Task GetMoveBetNotification_LanguageNotAvailable_ReturnContentWithDefaultLanguage()
        {
            // Arrange
            var expectedResult = new MoveBetNotification
            {
                ContentByLanguage = new Dictionary<string, string>
                {
                    { "en-US", ExpectedMessage }
                }
            };
            _cache.Get<MoveBetNotification>(Arg.Any<string>()).Returns(expectedResult);

            // Action
            var result = await _moveBetService.GetMoveBetNotificationAsync("vi-VN");

            // Assert
            Assert.That(result, Is.EqualTo(ExpectedMessage));
        }

        [Test]
        public async Task GetMoveBetNotification_ResultIsEmpty_ReturnEmptyString()
        {
            // Arrange
            var expectedResult = new MoveBetNotification();
            _cache.Get<MoveBetNotification>(Arg.Any<string>()).Returns(expectedResult);

            // Action
            var result = await _moveBetService.GetMoveBetNotificationAsync("vi-VN");

            // Assert
            Assert.That(result, Is.EqualTo(string.Empty));
        }

        [Test]
        public void GetMoveBetNotification_ThrowException_WriteLog()
        {
            // Arrange
            var exceptionMsg = "Failure";
            _cache.Get<MoveBetNotification>(Arg.Any<string>()).Returns(x => { throw new System.Exception(exceptionMsg); });

            // Action
            var result = _moveBetService.GetMoveBetNotificationAsync("vi-VN");

            // Assert
            _logger.Received().Error(Arg.Any<string>(), Arg.Is<System.Exception>(x => x.Message == exceptionMsg));
        }
    }
}