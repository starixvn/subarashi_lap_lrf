namespace Fanex.Athena.Controllers.BetSettings.UnitTests
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Model.Core.DataDomain;
    using Model.BetSettings.DTO;
    using Model.BetSettings.MetaModel;
    using Model.BetSettings.ViewModel;
    using Model.Core.DTO.Common;
    using NSubstitute;
    using NUnit.Framework;
    using Resources;
    using Service.BetSettings.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    public class AgCasinoBetSettingControllerTest : BetSettingBaseControllerHelperTest
    {
        private IAgCasinoBetSettingService _betSettingService;
        private IAuthorizationService _authorizationService;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            SetUpDefaultFakeData();
        }

        [SetUp]
        public void SetUp()
        {
            SetUpDefaultFakeBetSettingData();
        }

        [Test]
        public async Task Index_NoPermission_RedirectToAccessDeniedPage()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new BetSettingMetaModel { CustId = 100 };
                _authorizationService.HasPermissionOnData(Arg.Any<IDictionary<int, int[]>>(), metaModel.CustId, 0).Returns(false);

                // Action
                var result = await controller.Index(metaModel) as RedirectResult;

                // Assert
                Assert.That(result.Url, Is.EqualTo("~/Utility/AccessDenied"));
            }
        }

        [Test]
        public async Task Index_HasPermission_ReturnCorrectViewResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new BetSettingMetaModel { CustId = 100 };

                _authorizationService.HasPermissionOnData(Arg.Any<IDictionary<int, int[]>>(), metaModel.CustId, 0).Returns(true);

                _betSettingService.GetViewModelAsync(metaModel.CustId, DefaultLicenseeSession.LicenseeName)
                    .Returns(new AgCasinoBetSettingViewModel());

                // Action
                var result = await controller.Index(metaModel) as ViewResult;

                // Assert
                Assert.Multiple(() =>
                {
                    AssertRequiredProperties((BetSettingBaseViewModel)result.Model, metaModel);
                    Assert.That(result.ViewName, Is.EqualTo("~/Views/Desktop/Customer/BetSetting/AgCasino.cshtml"));
                });
            }
        }

        [Test]
        public async Task UpdateStatus_NoPermission_ReturnAccessDeniedResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                ProductService.GetProductAccess(DefaultLicenseeSession.LicenseeId, DefaultUserSession.Language)
                    .Returns(new ProductAccess(new List<Product>()));

                // Action
                var result = await controller.UpdateStatus(0, string.Empty, 0) as JsonResult;
                var resultInfo = (ResultInfo)result.Data;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(resultInfo.Code, Is.EqualTo(-1));
                    Assert.That(resultInfo.Message, Is.EqualTo(ViewResources.AccessDeniedMsg));
                });
            }
        }

        [Test]
        public async Task UpdateStatus_UpdateSuccessfully_ReturnSuccessfullResultInfo()
        {
            using (var controller = CreateController())
            {
                // Arrange
                ProductService.GetProductAccess(DefaultLicenseeSession.LicenseeId, DefaultUserSession.Language)
                    .Returns(new ProductAccess(new List<Product> { new Product { ProductID = ProductTypes.AgCasino } }));

                CoreBetSettingService.IsBetSettingEditable(DefaultUserSession).Returns(true);

                _betSettingService.UpdateStatusAsync(
                   DefaultUserSession.CurrencyAgentList,
                   DefaultUserSession.UserId,
                   Arg.Any<int>(),
                   DefaultUserSession.Language,
                   Arg.Any<string>(),
                   Arg.Any<bool>()).Returns(Task.FromResult<IResultInfo>(new ResultInfo { Code = 0 }));

                // Action
                var result = await controller.UpdateStatus(0, string.Empty, 0) as JsonResult;
                var resultInfo = (ResultInfo)result.Data;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(resultInfo.Code, Is.EqualTo(0));
                    Assert.That(resultInfo.Message, Is.EqualTo(string.Format(ViewResources.UpdateSuccess, string.Empty)));
                });
            }
        }

        [Test]
        public async Task UpdateStatus_UpdateFailed_ReturnFailedResultInfo()
        {
            using (var controller = CreateController())
            {
                // Arrange
                ProductService.GetProductAccess(DefaultLicenseeSession.LicenseeId, DefaultUserSession.Language)
                    .Returns(new ProductAccess(new List<Product> { new Product { ProductID = ProductTypes.AgCasino } }));

                CoreBetSettingService.IsBetSettingEditable(DefaultUserSession).Returns(true);

                _betSettingService.UpdateStatusAsync(
                   Arg.Any<IDictionary<int, int[]>>(),
                   DefaultUserSession.UserId,
                   Arg.Any<int>(),
                   DefaultUserSession.Language,
                   Arg.Any<string>(),
                   Arg.Any<bool>()).Returns(Task.FromResult<IResultInfo>(new ResultInfo { Code = 1, Message = "Error" }));

                // Action
                var result = await controller.UpdateStatus(0, string.Empty, 0) as JsonResult;
                var resultInfo = (ResultInfo)result.Data;

                // Assert
                Assert.That(resultInfo.IsSuccessful, Is.False);
            }
        }

        [Test]
        public async Task UpdateBetSetting_NoPermission_ReturnAccessDeniedResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                ProductService.GetProductAccess(DefaultLicenseeSession.LicenseeId, DefaultUserSession.Language)
                    .Returns(new ProductAccess(new List<Product>()));

                // Action
                var result = await controller.UpdateBetSetting(string.Empty, string.Empty) as JsonResult;
                var resultInfo = (ResultInfo)result.Data;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(resultInfo.Code, Is.EqualTo(-1));
                    Assert.That(resultInfo.Message, Is.EqualTo(ViewResources.AccessDeniedMsg));
                });
            }
        }

        [Test]
        public async Task UpdateBetSetting_UpdateSuccessfully_ReturnSuccessfullResultInfo()
        {
            using (var controller = CreateController())
            {
                // Arrange
                ProductService.GetProductAccess(DefaultLicenseeSession.LicenseeId, DefaultUserSession.Language)
                    .Returns(new ProductAccess(new List<Product> { new Product { ProductID = ProductTypes.AgCasino } }));

                CoreBetSettingService.IsBetSettingEditable(DefaultUserSession).Returns(true);

                _betSettingService.UpdateAgCasinoBetSettingAsync(
                   Arg.Any<CommonBetSetting>(),
                   Arg.Any<string>(), Arg.Any<IDictionary<int, int[]>>()).Returns(Task.FromResult<IResultInfo>(new ResultInfo { Code = 0 }));

                // Action
                var result = await controller.UpdateBetSetting(string.Empty, string.Empty) as JsonResult;
                var resultInfo = (ResultInfo)result.Data;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(resultInfo.Code, Is.EqualTo(0));
                    Assert.That(resultInfo.Message, Is.EqualTo(string.Format(ViewResources.UpdateAgCasinoBetSettingSuccessMsg, string.Empty)));
                });
            }
        }

        [Test]
        public async Task UpdateBetSetting_UpdateFailed_ReturnFailedResultInfo()
        {
            using (var controller = CreateController())
            {
                // Arrange
                ProductService.GetProductAccess(DefaultLicenseeSession.LicenseeId, DefaultUserSession.Language)
                    .Returns(new ProductAccess(new List<Product> { new Product { ProductID = ProductTypes.AgCasino } }));

                CoreBetSettingService.IsBetSettingEditable(DefaultUserSession).Returns(true);

                _betSettingService.UpdateAgCasinoBetSettingAsync(
                   Arg.Any<CommonBetSetting>(),
                   Arg.Any<string>(), Arg.Any<IDictionary<int, int[]>>())
                   .Returns(Task.FromResult<IResultInfo>(new ResultInfo { Code = 1, Message = "Error" }));

                // Action
                var result = await controller.UpdateBetSetting(string.Empty, string.Empty) as JsonResult;
                var resultInfo = (ResultInfo)result.Data;

                // Assert
                Assert.That(resultInfo.IsSuccessful, Is.False);
            }
        }

        private AgCasinoBetSettingController CreateController()
        {
            _betSettingService = Substitute.For<IAgCasinoBetSettingService>();
            _authorizationService = Substitute.For<IAuthorizationService>();
            var controller = new AgCasinoBetSettingController(
                LangService,
                SessionService,
                CoreBetSettingService,
                ProductService,
                _betSettingService, LicenseeSettingService, _authorizationService)
            {
                ControllerContext = ControllerContext
            };

            controller.HttpContext.Request["custid"].Returns("1");

            return controller;
        }
    }
}