using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.Api.Controllers;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.UnitTest.Common.Helpers;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.Api.UnitTests.Controllers
{
    [TestFixture]
    public class SiteSettingControllerTest
    {
        private ILicenseeSettingService _licenseeSettingService;

        private IAuthorizationService _authService;

        [SetUp]
        public void Setup()
        {
            _licenseeSettingService = Substitute.For<ILicenseeSettingService>();
            _authService = Substitute.For<IAuthorizationService>();
        }

        [TearDown]
        public void TearDown()
        {
            _licenseeSettingService = null;
            _authService = null;
        }

        [Test]
        public void GetSetting_WhenCall_ReturnCorrectResult()
        {
            // Arrange
            var expectedLicenseeInfo = new Licensee { IsAllowedCustomerComm = true, IsEnableBA = true };
            _licenseeSettingService.GetLicenseeInfo(ExternalApiHelper.DefaultSiteName).Returns(expectedLicenseeInfo);
            _authService.CheckProductBelongsTo(ExternalApiHelper.DefaultSiteName, ProductTypes.BA).Returns(true);

            using (var controller = CreateController())
            {
                // Action
                var result = controller.GetSetting();

                // Assert
                Assert.That(result.IsAllowedBA, Is.True);
                Assert.That(result.IsAllowedCustomerComm, Is.True);
            }
        }

        private SiteSettingController CreateController()
        {
            var actionContext = ExternalApiHelper.CreateMockActionContext();
            var httpContext = ExternalApiHelper.CreateHttpContext();

            return new SiteSettingController(_licenseeSettingService, _authService)
            {
                ActionContext = actionContext
            };
        }
    }
}