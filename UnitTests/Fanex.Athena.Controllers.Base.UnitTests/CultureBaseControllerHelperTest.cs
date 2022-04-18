namespace Fanex.Athena.Controllers.Base.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;

    using Extension.Utility;

    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
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
            IdentityName = "user",
            CurrencyList = new Dictionary<int, string> { { 1, "UUS" } },
            UserId = 1,
            Language = "lan",
            UserName = "alex.vn",
            OnUserId = 999,
            FunctionList = new List<Function>(),
            DefaultBaseCurrency = "EUR",
            CurrencyAgentList = new Dictionary<int, int[]>(),
            AccessToken = "token",
            AccessTokenLifeTime = DateTime.Now.AddHours(1)
        };

        protected static readonly LicenseeAuthInfo DefaultLicenseeSession = new LicenseeAuthInfo
        {
            LicenseeId = 100,
            LicenseeName = "Spondemo",
            OfferedSubProductList = Enumerable.Empty<string>()
        };

        protected UrlHelper Url { get; set; }

        protected ControllerContext ControllerContext { get; set; }

        protected ILanguageService LangService { get; set; }

        protected ISessionService SessionService { get; set; }

        public IProductService ProductService { get; set; }

        protected IAppSettings AppSettings { get; set; }

        protected IDictionary<int, string> UserCurrencyList => SessionService.UserSession.CurrencyList;

        [OneTimeSetUp]
        public virtual void FixtureSetUp()
        {
            LangService = Substitute.For<ILanguageService>();
            SessionService = Substitute.For<ISessionService>();
            AppSettings = Substitute.For<IAppSettings>();
            ProductService = Substitute.For<IProductService>();
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
            ProductService = null;
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

        protected void StubGetAllowedSubProductCodeList(string productCodes, string fakeProductCodes)
        {
            ProductService.GetAllowedSubProductCodeList(
              SessionService.LicenseeSession.OfferedSubProductList,
              productCodes)
                .Returns(fakeProductCodes);
        }

        private void SetUpForContexts()
        {
            ControllerContext = MvcHelper.CreateControllerContext();
            Url = MvcHelper.CreateUrlHelper(ControllerContext.HttpContext);
        }
    }
}