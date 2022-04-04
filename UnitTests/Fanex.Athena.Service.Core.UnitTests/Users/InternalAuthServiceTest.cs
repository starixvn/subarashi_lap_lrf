namespace Fanex.Athena.Service.Core.UnitTests.Users
{
    using Core.Users;
    using Core.Users.Interfaces;

    using DataAccess.Core.Users.Interfaces;
    using Fanex.Athena.Extension.Utility.Interfaces;
    using Fanex.Athena.Service.Core.OAuth;

    using NSubstitute;

    using NUnit.Framework;

    using UnitTest.Common.Helpers;

    [TestFixture]
    public class InternalAuthServiceTest
    {
        private IOAuthService _oauthService;
        private IAuthDataAccess _authDataAccess;
        private IInternalAuthService _authService;
        private ISessionService _sessionService;
        private IFormsAuthenticationService _formsAuthService;

        [OneTimeSetUp]
        public void SetUp()
        {
            _oauthService = Substitute.For<IOAuthService>();
            _authDataAccess = Substitute.For<IAuthDataAccess>();
            _sessionService = Substitute.For<ISessionService>();
            _formsAuthService = Substitute.For<IFormsAuthenticationService>();
            _authService = new InternalAuthService(_authDataAccess, _oauthService, _sessionService, _formsAuthService);
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            _oauthService = null;
            _authDataAccess = null;
            _authService = null;
            _sessionService = null;
        }
    }
}