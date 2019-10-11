namespace Fanex.Athena.Service.Core.UnitTests.Users
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;

    using Core.Users.Interfaces;

    using DataAccess.Core.Users.Interfaces;

    using Extension.Utility.Interfaces;

    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.Enum;
    using Fanex.Athena.Service.Core.Users;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Logging;
    using LAP.ONEBook.Security;
    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;

    using Newtonsoft.Json;

    using NSubstitute;

    using NUnit.Framework;

    using Resources;

    using UnitTest.Common.Helpers;

    [TestFixture]
    public class OneAuthenticationServiceTest_SignIn
    {
        private OneAuthenticationService _oneAuthenticationService;
        private ISessionService _sessionService;
        private ILicenseeSettingService _licenseeSettingService;
        private IFormsAuthenticationService _formAuthenticationService;
        private IOneBookSecurityWrapper _oneBookSecurityWrapper;
        private ILogger _logger;
        private IOneAuthDataAccess _oneAuthDataAccess;
        private IAppSettings _appSettings;

        [SetUp]
        public void SetUp()
        {
            _sessionService = Substitute.For<ISessionService>();
            _licenseeSettingService = Substitute.For<ILicenseeSettingService>();
            _formAuthenticationService = Substitute.For<IFormsAuthenticationService>();
            _oneBookSecurityWrapper = Substitute.For<IOneBookSecurityWrapper>();
            _logger = Substitute.For<ILogger>();
            _oneAuthDataAccess = Substitute.For<IOneAuthDataAccess>();
            _oneAuthDataAccess.GetUserInfo(Arg.Any<int>(), Arg.Any<string>()).Returns(new OneAuthUserInfo());
            _appSettings = Substitute.For<IAppSettings>();
            _appSettings.DefaultBaseCurrency.Returns("EUR");
            _oneAuthenticationService = Substitute.ForPartsOf<OneAuthenticationService>(
                _sessionService,
                _licenseeSettingService,
                _formAuthenticationService,
                _oneBookSecurityWrapper,
                _logger,
                _appSettings,
                _oneAuthDataAccess);
        }

        [TearDown]
        public void TearDown()
        {
            _oneAuthenticationService = null;
            _sessionService = null;
            _licenseeSettingService = null;
            _formAuthenticationService = null;
            _appSettings = null;
        }

        [Test]
        public void SignIn_GetLicenseeInfoReturnNull_ReturnCorrectErrorResultInfo()
        {
            // Arrange
            var tokenInfo = FakeHelper.Create<DefaultAuthInfo<OneAuthPermission, OneAuthCurrency>>();
            _licenseeSettingService.GetLicenseeInfo(tokenInfo.SiteName).Returns(x => { return null; });

            var expectedResult = new ResultInfo
            {
                Code = OneAuthorizationErrorCode.LicenseeIsNotExisted,
                Message = ViewResources.LicenseeIsNotExisted
            };

            // Action
            var result = _oneAuthenticationService.SignIn(Arg.Any<HttpContextBase>(), tokenInfo);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Code, Is.EqualTo(expectedResult.Code));
                Assert.That(result.Message, Is.EqualTo(expectedResult.Message));
            });
        }

        [Test]
        public void SignIn_InvalidCurrencyList_ReturnCorrectErrorResultInfo()
        {
            // Arrange
            var tokenInfo = new DefaultAuthInfo<OneAuthPermission, OneAuthCurrency>
            {
                SiteName = FakeHelper.Create<string>(),
                Currency = null
            };

            var licensee = FakeHelper.Create<Licensee>();
            _licenseeSettingService.GetLicenseeInfo(tokenInfo.SiteName).Returns(licensee);

            var expectedResult = new ResultInfo
            {
                Code = OneAuthorizationErrorCode.UserNotHaveCurrency,
                Message = ViewResources.UserNotHaveCurrency
            };

            _oneAuthenticationService.When(x => x.ValidateCurrencyList(Arg.Any<OneAuthUserInfo>())).DoNotCallBase();
            _oneAuthenticationService.ValidateCurrencyList(Arg.Any<OneAuthUserInfo>()).Returns(expectedResult);

            // Action
            var result = _oneAuthenticationService.SignIn(Arg.Any<HttpContextBase>(), tokenInfo);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Code, Is.EqualTo(expectedResult.Code));
                Assert.That(result.Message, Is.EqualTo(expectedResult.Message));
            });
        }

        [Test]
        public void SignIn_NotHaveUserSession_CreateNewSession()
        {
            // Arrange
            var tokenInfo = CreateValidFakeToken(false);

            var licensee = FakeHelper.Create<Licensee>();
            _licenseeSettingService.GetLicenseeInfo(tokenInfo.SiteName).Returns(licensee);

            _sessionService.UserSession.Returns(x => null);
            _sessionService.LicenseeSession.Returns(x => null);

            var fakeHttpContext = Substitute.For<HttpContextBase>();

            // Action
            _oneAuthenticationService.SignIn(fakeHttpContext, tokenInfo);

            // Result
            Assert.Multiple(() =>
            {
                _sessionService.Received().AssignCurrenciesToUserSession(
                    Arg.Is<UserAuthInfo>(x => AssertNewUserSession(x, tokenInfo)),
                    licensee.Id,
                    Arg.Any<IEnumerable<CurrencyUser>>());
                _sessionService.Received().AssignSessions(
                    Arg.Is<UserAuthInfo>(x => AssertNewUserSession(x, tokenInfo)),
                    Arg.Is<LicenseeAuthInfo>(x => AssertNewLicenseeSession(x, licensee)));
            });
        }

        [Test]
        public void SignIn_IsInValidIdentity_CreateNewSession()
        {
            // Arrange
            var tokenInfo = CreateValidFakeToken(false);

            var licensee = FakeHelper.Create<Licensee>();
            _licenseeSettingService.GetLicenseeInfo(tokenInfo.SiteName).Returns(licensee);

            _sessionService.UserSession.Returns(new UserAuthInfo());
            _sessionService.LicenseeSession.Returns(new LicenseeAuthInfo());

            var fakeHttpContext = Substitute.For<HttpContextBase>();
            fakeHttpContext.User.Identity.Returns(x => { return null; });

            // Action
            _oneAuthenticationService.SignIn(fakeHttpContext, tokenInfo);

            // Result
            Assert.Multiple(() =>
            {
                _sessionService.Received().AssignCurrenciesToUserSession(
                    Arg.Is<UserAuthInfo>(x => AssertNewUserSession(x, tokenInfo)),
                    licensee.Id,
                    Arg.Any<IEnumerable<CurrencyUser>>());
                _sessionService.Received().AssignSessions(
                    Arg.Is<UserAuthInfo>(x => AssertNewUserSession(x, tokenInfo)),
                    Arg.Is<LicenseeAuthInfo>(x => AssertNewLicenseeSession(x, licensee)));
            });
        }

        [Test]
        public void SignIn_IsInValidSessionUser_CreateNewSession()
        {
            // Arrange
            var tokenInfo = CreateValidFakeToken(false);

            var licensee = FakeHelper.Create<Licensee>();
            _licenseeSettingService.GetLicenseeInfo(tokenInfo.SiteName).Returns(licensee);

            var inValidUser = new UserAuthInfo
            {
                UserId = 0,
                VendorIdentityID = null,
                IsInternal = false,
                VendorID = null,
                ApplicationMode = AppMode.Self
            };
            _sessionService.UserSession.Returns(inValidUser);

            var validLicensee = new LicenseeAuthInfo
            {
                LicenseeId = Math.Abs(FakeHelper.Create<int>()) + 1
            };
            _sessionService.LicenseeSession.Returns(validLicensee);

            var fakeHttpContext = CreateValidFakeContext(tokenInfo.UserID);

            // Action
            _oneAuthenticationService.SignIn(fakeHttpContext, tokenInfo);

            // Result
            Assert.Multiple(() =>
            {
                _sessionService.Received().AssignCurrenciesToUserSession(
                    Arg.Is<UserAuthInfo>(x => AssertNewUserSession(x, tokenInfo)),
                    licensee.Id,
                    Arg.Any<IEnumerable<CurrencyUser>>());
                _sessionService.Received().AssignSessions(
                    Arg.Is<UserAuthInfo>(x => AssertNewUserSession(x, tokenInfo)),
                    Arg.Is<LicenseeAuthInfo>(x => AssertNewLicenseeSession(x, licensee)));
            });
        }

        [Test]
        public void SignIn_IsInValidLicenseeUser_CreateNewSession()
        {
            // Arrange
            var tokenInfo = CreateValidFakeToken(false);

            var licensee = FakeHelper.Create<Licensee>();
            _licenseeSettingService.GetLicenseeInfo(tokenInfo.SiteName).Returns(licensee);

            var validUser = new UserAuthInfo
            {
                UserId = Math.Abs(FakeHelper.Create<int>()) + 1,
                VendorIdentityID = FakeHelper.Create<string>(),
                IsInternal = true,
                VendorID = FakeHelper.Create<string>(),
                ApplicationMode = AppMode.Parasitic
            };
            _sessionService.UserSession.Returns(validUser);

            var inValidLicensee = new LicenseeAuthInfo
            {
                LicenseeId = 0
            };
            _sessionService.LicenseeSession.Returns(inValidLicensee);

            var fakeHttpContext = CreateValidFakeContext(tokenInfo.UserID);

            // Action
            _oneAuthenticationService.SignIn(fakeHttpContext, tokenInfo);

            // Result
            Assert.Multiple(() =>
            {
                _sessionService.Received().AssignCurrenciesToUserSession(
                    Arg.Is<UserAuthInfo>(x => AssertNewUserSession(x, tokenInfo)),
                    licensee.Id,
                    Arg.Any<IEnumerable<CurrencyUser>>());
                _sessionService.Received().AssignSessions(
                    Arg.Is<UserAuthInfo>(x => AssertNewUserSession(x, tokenInfo)),
                    Arg.Is<LicenseeAuthInfo>(x => AssertNewLicenseeSession(x, licensee)));
            });
        }

        [Test]
        public void SignIn_SessionIsAnotherUser_CreateNewSession()
        {
            // Arrange
            var tokenInfo = CreateValidFakeToken(false);

            var licensee = new Licensee { Id = Math.Abs(FakeHelper.Create<int>()) + 1 };
            _licenseeSettingService.GetLicenseeInfo(tokenInfo.SiteName).Returns(licensee);

            var validAnotherUser = new UserAuthInfo
            {
                UserId = Math.Abs(FakeHelper.Create<int>()) + 1,
                IsInternal = true,
                ApplicationMode = AppMode.Parasitic,
                VendorID = tokenInfo.VendorID + 1,
                UserName = tokenInfo.UserID + 1,
                VendorIdentityID = tokenInfo.UserID + 1
            };
            _sessionService.UserSession.Returns(validAnotherUser);

            var validAnotherLicensee = new LicenseeAuthInfo
            {
                LicenseeId = licensee.Id + 1
            };
            _sessionService.LicenseeSession.Returns(validAnotherLicensee);

            var fakeHttpContext = CreateValidFakeContext(tokenInfo.UserID);

            // Action
            _oneAuthenticationService.SignIn(fakeHttpContext, tokenInfo);

            // Result
            Assert.Multiple(() =>
            {
                _sessionService.Received().AssignCurrenciesToUserSession(
                    Arg.Is<UserAuthInfo>(x => AssertNewUserSession(x, tokenInfo)),
                    licensee.Id,
                    Arg.Any<IEnumerable<CurrencyUser>>());
                _sessionService.Received().AssignSessions(
                    Arg.Is<UserAuthInfo>(x => AssertNewUserSession(x, tokenInfo)),
                    Arg.Is<LicenseeAuthInfo>(x => AssertNewLicenseeSession(x, licensee)));
            });
        }

        [Test]
        public void SignIn_IsAuthenticatedAndIsSameSession_UpdateCurrentSession()
        {
            // Arrange
            var tokenInfo = CreateValidFakeToken(false, "en");

            var licensee = new Licensee { Id = Math.Abs(FakeHelper.Create<int>()) + 1 };
            _licenseeSettingService.GetLicenseeInfo(tokenInfo.SiteName).Returns(licensee);

            var validUser = new UserAuthInfo
            {
                UserId = Math.Abs(FakeHelper.Create<int>()) + 1,
                IsInternal = true,
                ApplicationMode = AppMode.Parasitic,
                VendorID = tokenInfo.VendorID,
                UserName = tokenInfo.UserID,
                VendorIdentityID = tokenInfo.UserID,
                Language = "en-US"
            };
            _sessionService.UserSession.Returns(validUser);

            var validLicensee = new LicenseeAuthInfo
            {
                LicenseeId = licensee.Id
            };
            _sessionService.LicenseeSession.Returns(validLicensee);

            var fakeHttpContext = CreateValidFakeContext(tokenInfo.UserID);

            // Action
            _oneAuthenticationService.SignIn(fakeHttpContext, tokenInfo);

            // Result
            Assert.Multiple(() =>
            {
                _sessionService.Received().AssignCurrenciesToUserSession(
                    validUser,
                    licensee.Id,
                    Arg.Any<IEnumerable<CurrencyUser>>());
            });
        }

        [TestCase("en", "en-US")]
        [TestCase("ch", "zh-TW")]
        [TestCase("cs", "zh-CN")]
        [TestCase("zhcn", "zh-Hans")]
        [TestCase("jp", "ja-JP")]
        [TestCase("th", "th-TH")]
        [TestCase("vn", "vi-VN")]
        [TestCase("invalid", "en-Us")]
        public void SignIn_IsAuthenticatedAndIsSameSession_LanguageIsChanged_UpdateLanguage(string tokenLanguage, string expectedLanguageChanged)
        {
            // Arrange
            var tokenInfo = CreateValidFakeToken(false, tokenLanguage);

            var licensee = new Licensee { Id = Math.Abs(FakeHelper.Create<int>()) + 1 };
            _licenseeSettingService.GetLicenseeInfo(tokenInfo.SiteName).Returns(licensee);

            var validUser = new UserAuthInfo
            {
                UserId = Math.Abs(FakeHelper.Create<int>()) + 1,
                IsInternal = true,
                ApplicationMode = AppMode.Parasitic,
                VendorID = tokenInfo.VendorID,
                UserName = tokenInfo.UserID,
                VendorIdentityID = tokenInfo.UserID,
                Language = string.Empty
            };
            _sessionService.UserSession.Returns(validUser);

            var validLicensee = new LicenseeAuthInfo
            {
                LicenseeId = licensee.Id
            };
            _sessionService.LicenseeSession.Returns(validLicensee);

            var fakeHttpContext = CreateValidFakeContext(tokenInfo.UserID);

            // Action
            _oneAuthenticationService.SignIn(fakeHttpContext, tokenInfo);

            // Result
            _sessionService.Received().UpdateLanguage(expectedLanguageChanged);
        }

        [Test]
        public void SignIn_GetPermissionList_IsNotAdminstrator_GetFromToken_ReturnCorrectData()
        {
            // Arrange
            var tokenInfo = CreateValidFakeToken(false);

            var licensee = FakeHelper.Create<Licensee>();
            _licenseeSettingService.GetLicenseeInfo(tokenInfo.SiteName).Returns(licensee);

            _sessionService.UserSession.Returns(x => null);
            _sessionService.LicenseeSession.Returns(x => null);

            var fakeHttpContext = Substitute.For<HttpContextBase>();

            // Action
            _oneAuthenticationService.SignIn(fakeHttpContext, tokenInfo);

            // Result
            Assert.Multiple(() =>
            {
                _sessionService.Received().AssignCurrenciesToUserSession(
                    Arg.Any<UserAuthInfo>(),
                    licensee.Id,
                    Arg.Any<IEnumerable<CurrencyUser>>());
            });
        }

        [Test]
        public void SignIn_GetPermissionList_IsAdminstrator_GetFromFile_HasData_ReturnEmptyData()
        {
            // Arrange
            var tokenInfo = CreateValidFakeToken(true);

            var licensee = FakeHelper.Create<Licensee>();
            _licenseeSettingService.GetLicenseeInfo(tokenInfo.SiteName).Returns(licensee);

            _sessionService.UserSession.Returns(x => null);
            _sessionService.LicenseeSession.Returns(x => null);

            var expected = new[]
            {
                new { FunctionId = FakeHelper.Create<int>(), FunctionKey = FakeHelper.Create<string>() },
                new { FunctionId = FakeHelper.Create<int>(), FunctionKey = FakeHelper.Create<string>() }
            };
            var jsonString = JsonConvert.SerializeObject(expected);
            _oneAuthenticationService.GetStringFromFile(Arg.Any<string>()).Returns(jsonString);

            var fakeHttpContext = Substitute.For<HttpContextBase>();

            // Action
            _oneAuthenticationService.SignIn(fakeHttpContext, tokenInfo);

            // Result
            Assert.Multiple(() =>
            {
                _sessionService.Received().AssignCurrenciesToUserSession(
                    Arg.Any<UserAuthInfo>(),
                    licensee.Id,
                    Arg.Any<IEnumerable<CurrencyUser>>());
            });
        }

        [TestCase(true)]
        [TestCase(false)]
        public void ValidateCurrencyList_CurrencyListIsNullOrEmpty_ReturnErrorResultInfo(bool isNull)
        {
            // Arrange
            var userInfo = new OneAuthUserInfo { CurrencyUserList = isNull ? null : new List<CurrencyUser>() };

            // Action
            var result = _oneAuthenticationService.ValidateCurrencyList(userInfo);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Code, Is.EqualTo(OneAuthorizationErrorCode.UserNotHaveCurrency));
                Assert.That(result.Message, Is.EqualTo(ViewResources.UserNotHaveCurrency));
            });
        }

        [Test]
        public void ValidateCurrencyList_CurrencyListHasDuplicateAgent_ReturnErrorResultInfo()
        {
            // Arrange
            var currency = new CurrencyUser
            {
                CurrencyId = 888,
                CurrencyName = "ABCD",
                AgentIdList = new[] { 12, 34, 56, 78, 34 }
            };
            var userInfo = new OneAuthUserInfo { CurrencyUserList = new[] { currency } };

            // Action
            var result = _oneAuthenticationService.ValidateCurrencyList(userInfo);

            // Assert
            Assert.Multiple(() =>
            {
                _logger.Received(1).Error($"Duplicate agentid in currency permissions: currency ({currency.CurrencyId}-{currency.CurrencyName})" +
                        $", duplicate agents (34)");
                Assert.That(result.Code, Is.EqualTo(OneAuthorizationErrorCode.InvalidCurrencyPermission));
                Assert.That(result.Message, Is.EqualTo(ViewResources.InvalidCurrencyPermission));
            });
        }

        private HttpContextBase CreateValidFakeContext(string identityName)
        {
            var fakeHttpContext = Substitute.For<HttpContextBase>();
            fakeHttpContext.User.Identity.IsAuthenticated.Returns(true);
            fakeHttpContext.User.Identity.Name.Returns(identityName);

            return fakeHttpContext;
        }

        private DefaultAuthInfo<OneAuthPermission, OneAuthCurrency> CreateValidFakeToken(bool isAdminstrator = false, string language = "")
        {
            return new DefaultAuthInfo<OneAuthPermission, OneAuthCurrency>
            {
                SiteName = FakeHelper.Create<string>(),
                Currency = FakeHelper.CreateMany<OneAuthCurrency>(2).ToArray(),
                Permissions = FakeHelper.CreateMany<OneAuthPermission>(2).ToArray(),
                IsAdminstrator = isAdminstrator,
                UserID = FakeHelper.Create<string>(),
                VendorID = FakeHelper.Create<string>(),
                Language = language
            };
        }

        private bool AssertNewUserSession(UserAuthInfo newUser, DefaultAuthInfo<OneAuthPermission, OneAuthCurrency> token)
        => newUser.UserId == token.UserSEQ
                && newUser.OnUserId == token.UserSEQ
                && newUser.UserName == token.UserID
                && newUser.IsInternal
                && !newUser.FunctionList.Any()
                && newUser.DefaultReportUrl == "LicenseeWinLossReport"
                && newUser.ApplicationMode == AppMode.Parasitic
                && newUser.VendorID == token.VendorID
                && newUser.VendorIdentityID == token.UserID;

        private bool AssertNewLicenseeSession(LicenseeAuthInfo newLicensee, Licensee licenseeInfo)
        => newLicensee.LicenseeId == licenseeInfo.Id
                && newLicensee.IsAllowedCustomerComm == licenseeInfo.IsAllowedCustomerComm
                && newLicensee.IsEnableBA == licenseeInfo.IsEnableBA
                && newLicensee.LicenseeName == licenseeInfo.Name;
    }
}