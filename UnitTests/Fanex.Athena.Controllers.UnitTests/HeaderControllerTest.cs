namespace Fanex.Athena.Controllers.UnitTests
{
    using System.Threading.Tasks;
    using System.Web.Mvc;

    using Controllers.Base.UnitTests;

    using DataAccess.Core.Users.Interfaces;
    using Fanex.Athena.Service.Core.OAuth;
	using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Core.ViewModel;

    using NSubstitute;

    using NUnit.Framework;

    public class HeaderControllerTest : CultureBaseControllerHelperTest
    {
        private ILicenseeDataAccess _licenseeDataAccess;
        private ISubsidiaryService _subsidiaryService;
        private ILicenseeSettingService _licenseeSettingService;
        private IInternalAuthService _authService;

        [SetUp]
        public void SetUp()
        {
            _licenseeSettingService = Substitute.For<ILicenseeSettingService>();
            _subsidiaryService = Substitute.For<ISubsidiaryService>();
        }

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            SetUpDefaultFakeData();

            _licenseeDataAccess = Substitute.For<ILicenseeDataAccess>();
            _authService = Substitute.For<IInternalAuthService>();
            LangService.When(x => x.ChangeLanguage(Arg.Any<string>())).DoNotCallBase();
        }

        [TearDown]
        public void TearDown()
        {
            _licenseeDataAccess.ClearReceivedCalls();
            _authService.ClearReceivedCalls();
            SessionService.ClearReceivedCalls();
        }

        [Test]
        public void Index_WhenCall_ReturnCorrectViewName()
        {
            using (var controller = CreateController())
            {
                // Action
                var result = controller.Index() as ViewResult;

                // Assert
                Assert.That(result.ViewName, Is.EqualTo("~/Views/Desktop/Header/Index.cshtml"));
            }
        }

        [Test]
        public void Index_WhenCall_ReturnCorrectViewModel()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const bool HasRecheckIn = true;
                AppSettings.LocalTest.Returns(!HasRecheckIn);

                const bool IsFakeLicensee = true;
                _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(IsFakeLicensee);
                // Action
                var result = controller.Index() as ViewResult;
                var model = (HeaderPageViewModel)result.Model;

                // Assert
                Assert.That(result.ViewName, Is.EqualTo("~/Views/Desktop/Header/Index.cshtml"));
                Assert.Multiple(() =>
                {
                    Assert.That(model.Language, Is.EqualTo(DefaultUserSession.Language));
                    Assert.That(model.OnUserId, Is.EqualTo(DefaultUserSession.OnUserId));
                    Assert.That(model.Language, Is.EqualTo(DefaultUserSession.Language));
                    Assert.That(model.IsInternalLogin, Is.EqualTo(DefaultUserSession.IsInternal));
                    Assert.That(model.HasRecheckIn, Is.EqualTo(HasRecheckIn));
                    Assert.That(model.UserName, Is.EqualTo(DefaultUserSession.UserName));
                    Assert.That(model.CurrentLicenseeId, Is.EqualTo(DefaultLicenseeSession.LicenseeId));
                    Assert.That(model.IsFakeLicensee, Is.EqualTo(IsFakeLicensee));
                });
            }
        }

        [TestCase(0)]
        [TestCase(null)]
        public void ChangeLicensee_LicenseeIsLessThanZero_DoNotUpdateLicenseeSession(int? licenseeId)
        {
            using (var controller = CreateController())
            {
                // Action
                _ = controller.ChangeLicensee(licenseeId);

                // Assert
                _authService.DidNotReceive().RenewOAuthInfoAsync(licenseeId ?? 0, DefaultUserSession.AccessToken);
                _authService.DidNotReceive().ReSignIn(Arg.Any<IOAuthInfo>());
            }
        }

        [Test]
        public void ChangeLicensee_NewLicenseeIsEqualToCurrent_DoNotUpdateLicenseeSession()
        {
            using (var controller = CreateController())
            {
                // Action
                _ = controller.ChangeLicensee(DefaultLicenseeSession.LicenseeId);

                // Assert
                _authService.DidNotReceive().RenewOAuthInfoAsync(DefaultLicenseeSession.LicenseeId, DefaultUserSession.AccessToken);
                _authService.DidNotReceive().ReSignIn(Arg.Any<IOAuthInfo>());
            }
        }

        [Test]
        public void ChangeLicensee_NewLicenseeIsNotBelongToUser_DoNotUpdateLicenseeSession()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const int LicenseeId = 10;
                _licenseeDataAccess.IsLicenseeBelongToUser(Arg.Any<int>(), Arg.Any<int>()).Returns(false);

                // Action
                _ = controller.ChangeLicensee(LicenseeId);

                // Assert
                _authService.DidNotReceive().RenewOAuthInfoAsync(DefaultLicenseeSession.LicenseeId, DefaultUserSession.AccessToken);
                _authService.DidNotReceive().ReSignIn(Arg.Any<IOAuthInfo>());
            }
        }

        [Test]
        public async Task ChangeLicensee_ValidNewLicenseeId_UpdateLicenseeSession()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const int LicenseeId = 10;
                _licenseeDataAccess.IsLicenseeBelongToUser(Arg.Any<int>(), Arg.Any<int>()).Returns(true);

                var oauthInfo = Substitute.For<IOAuthInfo>();
                oauthInfo.IsError.Returns(false);
                _authService.RenewOAuthInfoAsync(LicenseeId, DefaultUserSession.AccessToken).Returns(oauthInfo);

                // Action
                _ = await controller.ChangeLicensee(LicenseeId);

                // Assert
                await _authService.Received().RenewOAuthInfoAsync(LicenseeId, DefaultUserSession.AccessToken);
                _authService.Received().ReSignIn(oauthInfo);
            }
        }

        [TestCase("")]
        [TestCase("Invalid")]
        [TestCase("en-US")]
        public async Task ChangeLanguage_InvalidLanguageCode_ReturnZero(string languagesite)
        {
            using (var controller = CreateController())
            {
                // Arrange
                LangService.GetCurrentLanguage().Returns("en-US");
                LangService.ChangeLanguage(Arg.Any<string>()).Returns(false);

                // Action
                var result = await controller.ChangeLanguage(languagesite);

                // Assert
                Assert.That(result, Is.EqualTo("0"));
            }
        }

        [TestCase(" en-US")]
        [TestCase("en-US ")]
        [TestCase(" en-US ")]
        [TestCase("en-US")]
        public async Task ChangeLanguage_ValidLanguageCode_ReturnOne(string languagesite)
        {
            using (var controller = CreateController())
            {
                // Arrange
                LangService.GetCurrentLanguage().Returns("zh-TW");
                LangService.ChangeLanguage(Arg.Any<string>()).Returns(true);

                // Action
                var result = await controller.ChangeLanguage(languagesite);

                // Assert
                Assert.That(result, Is.EqualTo("1"));
            }
        }

        private HeaderController CreateController()
        {
            return new HeaderController(
                _licenseeDataAccess,
				_authService,
				_subsidiaryService)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService,
                AppSettingInstance = AppSettings,
                LicenseeSettingServiceInstance = _licenseeSettingService
            };
        }
    }
}