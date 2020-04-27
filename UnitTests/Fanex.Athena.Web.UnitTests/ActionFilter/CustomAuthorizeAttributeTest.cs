using System;
using System.Linq;
using System.Web.Mvc;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.UnitTest.Common.Helpers;
using Fanex.Athena.Web.ActionFilter;

using NSubstitute;

using NUnit.Framework;

namespace Fanex.Athena.Web.UnitTests.ActionFilter
{
    public class CustomAuthorizeAttributeTest
    {
        private ISessionStorage _sessionStorage;
        private IAppSettings _appSettings;

        private CustomAuthorizeAttribute _attribute;

        [SetUp]
        public void Setup()
        {
            _sessionStorage = Substitute.For<ISessionStorage>();
            _appSettings = Substitute.For<IAppSettings>();
            _attribute = new CustomAuthorizeAttribute(_sessionStorage, _appSettings);
        }

        [Test]
        public void OnAuthorization_SkipAuthorization_NotGetUserSession()
        {
            // Arrange
            var filterContext = CreateFilterContext(true);

            // Action
            _attribute.OnAuthorization(filterContext);

            // Assert
            var temp = _sessionStorage.DidNotReceive().UserAuthInfo;
        }

        [Test]
        public void OnAuthorization_NotSkipAuthorization_GetLicenseeSession()
        {
            // Arrange
            var filterContext = CreateFilterContext(false);

            // Action
            _attribute.OnAuthorization(filterContext);

            // Assert
            var temp = _sessionStorage.Received(1).LicenseeAuthInfo;
        }

        [Test]
        public void OnAuthorization_NotAuthorized_AssignCorrectRouteValues()
        {
            // Arrange
            var filterContext = CreateFilterContext(false);

            // Action
            _attribute.OnAuthorization(filterContext);
            var result = filterContext.Result as RedirectToRouteResult;

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.RouteValues["controller"], Is.EqualTo("Utility"));
                Assert.That(result.RouteValues["action"], Is.EqualTo("LocationRestriction"));
            });
        }

        [TestCase("adsad/123asd;Auth/InvalidateSession")]
        [TestCase("abc/xyz;auth/invalidatesession")]
        [TestCase("Auth/invalidateSESSION;")]
        public void OnAuthorization_NotAuthorized_AssignCorrectStringValues(string noActionViewConfigs)
        {
            // Arrange
            var requestDomain = MvcHelper.TestingRequestDomain + "/Auth/InvalidateSession";
            var filterContext = CreateFilterContext(false, requestDomain);

            var fakeListActionNoView = noActionViewConfigs.Split(new char[] { ';' }, StringSplitOptions.RemoveEmptyEntries)
            ?? Enumerable.Empty<string>();
            _appSettings.ListActionNoView.Returns(fakeListActionNoView);

            // Action
            _attribute.OnAuthorization(filterContext);
            var result = filterContext.Result as ContentResult;

            // Assert
            Assert.That(result.Content, Is.EqualTo("Unauthorized"));
        }

        [Test]
        public void OnAuthorization_NotAuthorized_FilterContextResultNull()
        {
            // Arrange
            var filterContext = CreateFilterContext(false);
            _sessionStorage.LicenseeAuthInfo.Returns(new LicenseeAuthInfo());
            _sessionStorage.UserAuthInfo.Returns(new UserAuthInfo());

            // Action
            _attribute.OnAuthorization(filterContext);
            var result = filterContext.Result as RedirectToRouteResult;

            // Assert
            Assert.That(result, Is.Null);
        }

        private AuthorizationContext CreateFilterContext(bool isSkipAuthorization, string requestDomain = null)
        {
            var actionDescriptor = Substitute.ForPartsOf<ActionDescriptor>();
            actionDescriptor.IsDefined(typeof(AllowAnonymousAttribute), true).Returns(isSkipAuthorization);
            var filterContext = new AuthorizationContext(MvcHelper.CreateControllerContext(requestDomain: requestDomain), actionDescriptor);
            return filterContext;
        }
    }
}