namespace Fanex.Athena.Api.Base.UnitTests
{
    using System.Collections.Generic;

    using Extension.Utility;

    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Model.Core.DTO.Common;

    using NSubstitute;

    using NUnit.Framework;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    public abstract class BaseApiControllerHelperTest
    {
        protected const int SessionLicenseeId = 1;
        protected const int BetListTimeOut = 100;
        protected const string SessionLicenseeName = "Test";

        protected const int SessionUserId = 1;

        protected const string SessionUserName = "Test User";

        protected const string SessionLanguage = "en-US";

        protected const string AgentListXml = "<ROOT></ROOT>";

        protected ISessionService SessionService { get; private set; }

        protected IProductService ProductService { get; private set; }

        protected IAppSettings AppSetting { get; private set; }

        protected ILanguageService LangService { get; private set; }

        protected IDictionary<int, string> UserCurrencyList =>
            SessionService.UserSession.CurrencyList;

        [OneTimeSetUp]
        public virtual void FixtureSetUp()
        {
            SessionService = Substitute.For<ISessionService>();
            SessionService.UserSession.Returns(new UserAuthInfo
            {
                Language = SessionLanguage,
                CurrencyList = new Dictionary<int, string>(),
                CurrencyAgentList = new Dictionary<int, int[]>()
            });
            ProductService = Substitute.For<IProductService>();
            AppSetting = Substitute.For<IAppSettings>();
            LangService = Substitute.For<ILanguageService>();

            LangService.GetCurrentLanguage().Returns("en-US");
            LangService.When(x => x.SetPageCulture(Arg.Any<string>())).DoNotCallBase();
            AppSetting.GetValue("BetListApiOutInSecond").Returns(BetListTimeOut.ToString());
        }

        [OneTimeTearDown]
        public virtual void FixtureTearDown()
        {
            SessionService = null;
            ProductService = null;
            AppSetting = null;
            LangService = null;
        }

        protected void MockSessionData()
        {
            var userSession = new UserAuthInfo
            {
                UserId = SessionUserId,
                UserName = SessionUserName,
                CurrencyList = new Dictionary<int, string> { { 1, "EUR" }, { 2, "USD" } },
                Language = SessionLanguage,
                CurrencyAgentList = new Dictionary<int, int[]>()
            };

            var licenseeSession = new LicenseeAuthInfo
            {
                LicenseeId = SessionLicenseeId,
                LicenseeName = SessionLicenseeName
            };

            StubUserSessionData(userSession);
            StubLicenseeSessionData(licenseeSession);
        }

        protected void StubSingleWalletProductAccess(string[] productCode)
        {
            var productList = new List<Product>();

            for (var i = 0; i < productCode.Length; i++)
            {
                productList.Add(new Product { ProductCode = productCode[i] });
            }

            ProductService.GetSingleWalletProductAccess(Arg.Any<int>(), Arg.Any<string>(), functionConfigKey: Arg.Any<string>()).Returns(new ProductAccess(productList));
        }

        protected void StubProductAccess(string[] productCode)
        {
            var productList = new List<Product>();

            for (var i = 0; i < productCode.Length; i++)
            {
                productList.Add(new Product { ProductCode = productCode[i] });
            }

            ProductService.GetProductAccess(Arg.Any<int>(), Arg.Any<string>(), functionConfigKey: Arg.Any<string>()).Returns(new ProductAccess(productList));
        }

        protected void StubUserSessionData(UserAuthInfo userSession)
        {
            SessionService.UserSession.Returns(userSession);
        }

        protected void StubLicenseeSessionData(LicenseeAuthInfo licenseeSession)
        {
            SessionService.LicenseeSession.Returns(licenseeSession);
        }

        protected void StubGetValueAppSettings(string valueName, string value)
        {
            AppSetting.GetValue(valueName).Returns(value);
        }
    }
}