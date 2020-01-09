using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Fanex.Athena.Controllers.Base.UnitTests;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Auth.Enum;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Report.DTO;
using Fanex.Athena.Model.Report.MetaModel;
using Fanex.Athena.Model.Report.ViewModel;
using Fanex.Athena.Service.Report.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.UnitTest.Common.Helpers;
using Newtonsoft.Json;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Controllers.Report.UnitTests
{
    [TestFixture]
    public class ExchangeVoidedControllerTest : CultureBaseControllerHelperTest
    {
        private const string Environment = "TEST";

        private ILGAPIClient _lgAPIClient;

        private IAuthorizationService _authService;

        private IExchangeVoidedService _exchangeService;

        [SetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            _lgAPIClient = Substitute.For<ILGAPIClient>();
            _authService = Substitute.For<IAuthorizationService>();
            _exchangeService = Substitute.For<IExchangeVoidedService>();

            SetUpDefaultFakeData();
        }

        [TearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _lgAPIClient = null;
            _authService = null;
        }

        [Test]
        public void Index_WhenCall_ReturnCorrectView()
        {
            // Arrange
            CreateAndStubUserSession();
            const string ExpectedView = "~/Views/Desktop/Report/ExchangeVoided/Index.cshtml";

            using (var controller = CreateController())
            {
                // Action
                var result = controller.Index() as ViewResult;

                // Assert
                Assert.That(result.ViewName, Is.EqualTo(ExpectedView));
                Assert.That((bool)result.Model, Is.True);
            }
        }

        [Test]
        public void Index_IsSuperAdmin_ReturnCorrectViewModelWithAllTab()
        {
            // Arrange
            var userSession = JsonConvert.DeserializeObject<UserAuthInfo>(JsonConvert.SerializeObject(DefaultUserSession));
            userSession.ApplicationMode = AppMode.Parasitic;
            userSession.IsSuperAdmin = true;
            StubUserSessionData(userSession);

            const int TotalTabCount = 4;

            using (var controller = CreateController())
            {
                // Action
                var result = controller.Index() as ViewResult;
                var tabList = result.ViewBag.TabList as IEnumerable<string>;
                var hasAllPermissionsOfTab = BtcViewInfo.TabList.Intersect(tabList).Count() == TotalTabCount;

                // Assert
                Assert.That(hasAllPermissionsOfTab, Is.True);
            }
        }

        [Test]
        public async Task Index_DoNotHavePermission_ReturnEmptyResult()
        {
            // Arrange
            var metaModel = new ExchangeVoidedMetaModel();
            const bool HasExchangePermission = false;

            using (var controller = CreateController(HasExchangePermission))
            {
                var expectedResult = JsonConvert.SerializeObject(
                    new ExchangeVoidedViewModel { DataList = new List<ExchangeVoidedItem>(), TotalPage = 0 });

                // Action
                var result = await controller.Index(metaModel) as JsonResult;
                var jsonData = JsonConvert.SerializeObject(result.Data);

                // Assert
                Assert.Multiple(async () =>
                {
                    Assert.That(jsonData, Is.EqualTo(expectedResult));
                    await _exchangeService.DidNotReceiveWithAnyArgs().GetData(default);
                });
            }
        }

        [Test]
        public async Task Index_HavePermission_CallServiceWithCorrectparameter()
        {
            // Arrange
            CreateAndStubUserSession();
            var metaModel = new ExchangeVoidedMetaModel();

            using (var controller = CreateController())
            {
                var expectedData = FakeHelper.Create<ExchangeVoidedViewModel>();
                _exchangeService.GetData(metaModel).Returns(Task.FromResult(expectedData));

                // Action
                var result = await controller.Index(metaModel) as JsonResult;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.Data, Is.EqualTo(expectedData));
                    Assert.That(metaModel.Environment, Is.EqualTo(Environment));
                    Assert.That(metaModel.Language, Is.EqualTo(SessionService.UserSession.Language));
                });
            }
        }

        private ExchangeVoidedController CreateController(bool hasExchangePermission = true)
        {
            var appSetting = Substitute.For<IAppSettings>();
            appSetting.Environment.Returns(Environment);

            var licenseeName = SessionService.LicenseeSession.LicenseeName;
            _authService.CheckProductBelongsTo(licenseeName, ProductTypes.Exchange).Returns(hasExchangePermission);

            return new ExchangeVoidedController(
                appSetting,
                _authService,
                _exchangeService
                )
            {
                SessionServiceInstance = SessionService
            };
        }

        private void CreateAndStubUserSession()
        {
            var userSession = JsonConvert.DeserializeObject<UserAuthInfo>(JsonConvert.SerializeObject(DefaultUserSession));
            userSession.ApplicationMode = AppMode.Self;
            userSession.FunctionList = new List<Function>
            {
                    new Function{ FunctionKey =  PermissionKeys.BtcAdvancedSearch }
            };
            StubUserSessionData(userSession);
        }
    }
}