namespace Fanex.Athena.Controllers.UnitTests
{
    using System.Collections.Generic;
    using System.Web.Mvc;

    using Base.UnitTests;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Model.Core.ViewModel;

    using NSubstitute;

    using NUnit.Framework;

    [TestFixture]
    public partial class MenuControllerTest : CultureBaseControllerHelperTest
    {
        private IFunctionService _functionService;
        private ILicenseeSettingService _licenseeSettingService;

        [SetUp]
        public void SetUp()
        {
            _functionService = Substitute.For<IFunctionService>();
            _licenseeSettingService = Substitute.For<ILicenseeSettingService>();
            SetUpDefaultFakeData();
        }

        [TearDown]
        public void TearDown()
        {
            _functionService = null;
            _licenseeSettingService = null;
        }

        [Test]
        public void Index_WhenCall_ReturnCorrectView()
        {
            using (var controller = CreateController())
            {
                // Arrange
                _functionService.Functions.Returns(new List<Function>());

                // Action
                var result = controller.Index() as ViewResult;

                // Assert
                StringAssert.Contains("Menu/Index.cshtml", result.ViewName);
            }
        }

        [Test]
        public void Index_WhenCall_ReturnCorrectViewModel()
        {
            using (var controller = CreateController())
            {
                // Arrange
                SessionService.UserSession.FunctionList = new List<Function> { new Function { FunctionId = 1, FunctionKey = "1" } };
                _functionService.Functions.Returns(new List<Function>());
                _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(true);
                // Action
                var result = controller.Index() as ViewResult;
                var viewModel = result.Model as MenuViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(viewModel.IsAllowedCustonmerCommission, Is.EqualTo(DefaultLicenseeSession.IsAllowedCustomerComm));
                    Assert.That(viewModel.IsInternalLogin, Is.EqualTo(DefaultUserSession.IsInternal));
                    Assert.That(viewModel.IsAllowedManagementMember, Is.EqualTo(false));
                    Assert.That(viewModel.IsFakeLicensee, Is.EqualTo(true));
                    Assert.That(viewModel.UserFunctions, Is.Empty);
                });
            }
        }

        private MenuController CreateController()
        {
            return new MenuController(_functionService)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService,
                AppSettingInstance = AppSettings,
                LicenseeSettingServiceInstance = _licenseeSettingService
            };
        }
    }
}