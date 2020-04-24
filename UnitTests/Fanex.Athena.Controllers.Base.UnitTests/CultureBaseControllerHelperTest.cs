namespace Fanex.Athena.Controllers.Base.UnitTests
{
    using System.Collections.Generic;
    using System.Web.Mvc;

    using Extension.Utility;

    using Fanex.Athena.Model.Auth;

    using NSubstitute;

    using NUnit.Framework;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    using UnitTest.Common.Helpers;

    [TestFixture]
    public abstract class CultureBaseControllerHelperTest
    {
        protected static readonly UserAuthInfo DefaultUserSession = new UserAuthInfo
        {
            CurrencyList = new Dictionary<int, string> { { 1, "UUS" } },
            UserId = 1,
            Language = "lan",
            UserName = "alex.vn",
            OnUserId = 999,
            FunctionList = new List<Function>(),
            DefaultBaseCurrency = "EUR",
            CurrencyAgentList = new Dictionary<int, int[]>()
        };

        protected static readonly LicenseeAuthInfo DefaultLicenseeSession = new LicenseeAuthInfo
        {
            LicenseeId = 100,
            LicenseeName = "Spondemo"
        };

        protected UrlHelper Url { get; set; }

        protected ControllerContext ControllerContext { get; set; }

        protected ILanguageService LangService { get; set; }

        protected ISessionService SessionService { get; set; }

        protected IAppSettings AppSettings { get; set; }

        protected IDictionary<int, string> UserCurrencyList => SessionService.UserSession.CurrencyList;

        [OneTimeSetUp]
        public virtual void FixtureSetUp()
        {
            LangService = Substitute.For<ILanguageService>();
            SessionService = Substitute.For<ISessionService>();
            AppSettings = Substitute.For<IAppSettings>();
            SetUpForContexts();
        }

        [OneTimeTearDown]
        public virtual void FixtureTearDown()
        {
            Url = null;
            ControllerContext = null;
            LangService = null;
            SessionService = null;
            AppSettings = null;
        }

        protected void SetUpDefaultFakeData()
        {
            StubUserSessionData(DefaultUserSession);

            StubLicenseeSessionData(DefaultLicenseeSession);
        }

        protected void StubUserSessionData(UserAuthInfo fakeUserSession)
        {
            SessionService.UserSession.Returns(fakeUserSession);
        }

        protected void StubLicenseeSessionData(LicenseeAuthInfo fakeLicenseeSession)
        {
            SessionService.LicenseeSession.Returns(fakeLicenseeSession);
        }

        protected void StubGetValueAppSettings(string valueName, string fakeValue)
        {
            AppSettings.GetValue(valueName).Returns(fakeValue);
        }

        private void SetUpForContexts()
        {
            ControllerContext = MvcHelper.CreateControllerContext();
            Url = MvcHelper.CreateUrlHelper(ControllerContext.HttpContext);
        }
    }
}