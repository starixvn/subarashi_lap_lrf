namespace Fanex.Athena.Service.Core.UnitTests.Users
{
    using DataAccess.Core.Users.Interfaces;

    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Service.Core.Users;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Logging;
    using LAP.ONEBook.Security;
    using NSubstitute;

    using NUnit.Framework;

    using UnitTest.Common.Helpers;

    [TestFixture]
    public class OneAuthenticationServiceTest_GetTokenInfo
    {
        private OneAuthenticationService _oneAuthenticationService;
        private IOneBookSecurityWrapper _oneBookSecurityWrapper;
        private IAppSettings _appSettings;

        [SetUp]
        public void SetUp()
        {
            _oneBookSecurityWrapper = Substitute.For<IOneBookSecurityWrapper>();
            _appSettings = Substitute.For<IAppSettings>();
            _appSettings.DefaultBaseCurrency.Returns("EUR");
            _oneAuthenticationService = Substitute.ForPartsOf<OneAuthenticationService>(
                null,
                null,
                null,
                _oneBookSecurityWrapper,
                Substitute.For<ILogger>(),
                 _appSettings,
                Substitute.For<IOneAuthDataAccess>()

                );
        }

        [TearDown]
        public void TearDown()
        {
            _oneAuthenticationService = null;
            _oneBookSecurityWrapper = null;
            _appSettings = null;
        }

        [Test]
        public void GetTokenInfo_WhenCall_ReturnValidInfo()
        {
            // Arrange
            var token = FakeHelper.Create<string>();

            var expectedResult = new DefaultAuthInfo<OneAuthPermission, OneAuthCurrency>
            {
                IsAdminstrator = true,
                Currency = new OneAuthCurrency[]
                {
                    new OneAuthCurrency()
                },
                Permissions = new OneAuthPermission[]
                {
                    new OneAuthPermission()
                }
            };
            _oneBookSecurityWrapper.Authenticate(token)
                .Returns(expectedResult);

            // Action
            var result = _oneAuthenticationService.GetTokenInfo(token);

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }
    }
}