namespace Fanex.Athena.Controllers.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Base.UnitTests;
    using Customer;
    using DataAccess.Core.Users.Interfaces;
    using Fanex.Athena.Extension.Helpers;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Logging;
    using Model.Core.DTO.Common;
    using Model.Core.ViewModel;
    using Model.Customer.MetaModel;
    using NSubstitute;
    using NUnit.Framework;
    using Resources;
    using Service.Customer.Interfaces;
    using UnitTest.Common.Extensions;

    [TestFixture]
    public partial class CustomerApiControllerTest : CultureBaseControllerHelperTest
    {
        private ILogger _logger;
        private ICustomerCommService _customerCommService;
        private ICustomerListService _customerListService;
        private IGroupComService _groupComService;
        private ILicenseeDataAccess _licenseeDataAccess;
        private IProductService _productService;
        private IAuthorizationService _authorizationService;

        private ILicenseeSettingService _licenseeSettingService;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();
            SetUpDefaultFakeData();
        }

        [SetUp]
        public void SetUp()
        {
            _licenseeSettingService = Substitute.For<ILicenseeSettingService>();
            AppSettings = Substitute.For<IAppSettings>();
            _logger = Substitute.For<ILogger>();
            _customerCommService = Substitute.For<ICustomerCommService>();
            _customerListService = Substitute.For<ICustomerListService>();
            _groupComService = Substitute.For<IGroupComService>();
            _licenseeDataAccess = Substitute.For<ILicenseeDataAccess>();
            _productService = Substitute.For<IProductService>();
            _authorizationService = Substitute.For<IAuthorizationService>();
        }

        [TearDown]
        public void TearDown()
        {
            _customerListService.ClearReceivedCalls();
            _groupComService.ClearReceivedCalls();
            _licenseeSettingService = null;
            _logger = null;
            _customerCommService = null;
            _customerListService = null;
            _groupComService = null;
            _licenseeDataAccess = null;
            _productService = null;
            _authorizationService = null;
            AppSettings = null;
        }

        [Test]
        public async Task UpdateCustStatus_LicenseeNotAllowStatusFunction_ReturnErrorResultAsync()
        {
            using (var controller = CreateController())
            {
                // Arrange
                AppSettings.GetValue("LicenseeOfferStatusFunction").Returns("0");

                // Action
                var result = await controller.UpdateCustStatus(0, false, false).ConfigureAwait(false) as JsonResult;
                var resultInfo = result.Data as ResultInfo;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(resultInfo.IsSuccessful, Is.False);
                    Assert.That(resultInfo.Message, Is.EqualTo(ViewResources.FunctionNoAvailableMsg));
                });
            }
        }

        [Test]
        public async Task UpdateCustStatus_LicenseeAllowStatusFunction_ReturnErrorResultAsync()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const int CustId = 200;
                bool isClosed = true;
                bool isSuspended = true;
                var licenseeId = SessionService.LicenseeSession.LicenseeId;
                AppSettings.LicenseeOfferStatusFunction.Returns(new[] { licenseeId });

                // Action
                await controller.UpdateCustStatus(CustId, isClosed, isSuspended);

                // Assert
                Assert.Multiple(() =>
                {
                    _customerListService.Received(1).UpdateCustClosedAsync(
                        Arg.Is<CustomerStatusMetaModel>(x =>
                        x.LicenseeId == licenseeId &&
                        x.LicenseeName == SessionService.LicenseeSession.LicenseeName &&
                        x.CustId == CustId &&
                        x.IsOn == isClosed &&
                        x.ModifyById == SessionService.UserSession.UserId &&
                        x.ModifyByUsername == SessionService.UserSession.UserName &&
                        x.Ip == controller.Request.UserHostAddress),
                        SessionService.UserSession.Language);

                    _customerListService.Received(1).UpdateCustSuspendAsync(
                        Arg.Is<CustomerStatusMetaModel>(x =>
                        x.LicenseeId == licenseeId &&
                        x.LicenseeName == SessionService.LicenseeSession.LicenseeName &&
                        x.CustId == CustId &&
                        x.IsOn == isSuspended &&
                        x.ModifyById == SessionService.UserSession.UserId &&
                        x.ModifyByUsername == SessionService.UserSession.UserName &&
                        x.Ip == controller.Request.UserHostAddress),
                        SessionService.UserSession.Language);
                });
            }
        }

        [Test]
        public async Task UpdateCustStatus_HasException_WriteLogAndReturnErrorAsync()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var exception = new Exception("Sdf");
                var licenseeId = SessionService.LicenseeSession.LicenseeId;
                AppSettings.LicenseeOfferStatusFunction.Returns(new[] { licenseeId });
                _customerListService.When(x => x.UpdateCustClosedAsync(Arg.Any<CustomerStatusMetaModel>(), Arg.Any<string>()))
                    .Throw(exception);
                // Action
                var result = await controller.UpdateCustStatus(0, false, false).ConfigureAwait(false) as JsonResult;
                var resultInfo = result.Data as ResultInfo;
                var errorMessage = LogMessageHelper.GenerateMessage(exception);

                // Assert
                Assert.Multiple(() =>
                {
                    _logger.Received(1).Error(errorMessage, exception);
                    Assert.That(resultInfo.Code, Is.EqualTo(1));
                    Assert.That(resultInfo.Message, Is.EqualTo(ViewResources.HttpError_Default));
                });
            }
        }

        [Test]
        public void UpdateSpecialLevel_FakeLicensee_ReturnErrorResult()
        {
            using (var controller = CreateController())
            {
                // Arrange

                _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(true);

                // Action
                var result = controller.UpdateSpecialLevel(0, 0) as JsonResult;
                var resultInfo = result.Data as ResultViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    _customerListService.DidNotReceiveWithAnyArgs().UpdateSpecialLevel(0, 0, 0, string.Empty, string.Empty);
                    Assert.That(resultInfo.Success, Is.False);
                    Assert.That(resultInfo.Message, Is.EqualTo(ViewResources.FunctionDeniedMsg));
                });
            }
        }

        [Test]
        public void UpdateSpecialLevel_RealLicensee_CallServiceToUpdate()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const int CustId = 100;
                const int Level = 200;

                // Action
                controller.UpdateSpecialLevel(CustId, Level);

                // Assert
                Assert.Multiple(() =>
                {
                    _customerListService.Received(1).UpdateSpecialLevel(
                        SessionService.UserSession.UserId,
                        CustId,
                        Level,
                        Arg.Any<string>(),
                        SessionService.UserSession.Language);
                });
            }
        }

        [Test]
        public void UpdateOddsGroup_FakeLicensee_ReturnErrorResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(true);

                // Action
                var result = controller.UpdateOddsGroup(0, string.Empty) as JsonResult;
                var resultInfo = result.Data as ResultViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    _customerListService.DidNotReceiveWithAnyArgs().UpdateOddsGroup(Arg.Any<CustomerOddsGroupMetaModel>());
                    Assert.That(resultInfo.Success, Is.False);
                    Assert.That(resultInfo.Message, Is.EqualTo(ViewResources.FunctionDeniedMsg));
                });
            }
        }

        [Test]
        public void UpdateOddsGroup_RealLicensee_CallServiceToUpdate()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const int CustId = 100;
                const string OddsGroup = "abc";

                // Action
                controller.UpdateOddsGroup(CustId, OddsGroup);

                // Assert
                Assert.Multiple(() =>
                {
                    _customerListService.Received(1).UpdateOddsGroup(
                        Arg.Is<CustomerOddsGroupMetaModel>(x =>
                        x.CustId == CustId &&
                        x.Ip == controller.Request.UserHostAddress &&
                        x.Language == SessionService.UserSession.Language &&
                        x.OddsGroup == OddsGroup &&
                        x.UserId == SessionService.UserSession.UserId));
                });
            }
        }

        [Test]
        public async Task RemoveFromGroupCom_NotAllowedCustomerComm_ReturnErrorResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                SessionService.LicenseeSession.Returns(new LicenseeAuthInfo
                {
                    IsAllowedCustomerComm = false
                });

                // Action
                var result = await controller.RemoveFromGroupCom(string.Empty, false) as JsonResult;
                var resultData = result.Data;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(controller.Response.StatusCode, Is.EqualTo(403));
                    Assert.That(resultData.GetValue("ErrCode"), Is.EqualTo(403));
                });
            }
        }

        [Test]
        public async Task RemoveFromGroupCom_WhenCall_CallRemoveCustomerComm()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const string CustmerIds = "1,2";
                bool isRemovePlayerComm = true;
                _productService.GetProductAccess(0, string.Empty, string.Empty).ReturnsForAnyArgs(new ProductAccess(new List<Product>()));
                SessionService.LicenseeSession.Returns(new LicenseeAuthInfo
                {
                    IsAllowedCustomerComm = true
                });

                // Action
                var result = await controller.RemoveFromGroupCom(CustmerIds, isRemovePlayerComm) as JsonResult;
                var resultData = result.Data as ResultViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    _customerCommService.Received(1).RemoveCustomersFromGroupAsync(
                        Arg.Is<RemoveFromGroupComMetaModel>(x =>
                        x.CustomerIds == CustmerIds && x.IsRemovePlayercomm == isRemovePlayerComm),
                        false);
                    Assert.That(resultData.ExtendedData.GetValue("GroupName"), Is.EqualTo("None"));
                    Assert.That(resultData.ExtendedData.GetValue("GroupColor"), Is.EqualTo("#ffffff"));
                });
            }
        }

        [Test]
        public void CreateUpdatingBaResult_AllowBA_ReturnCorrectResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const bool IsAllowBA = true;
                const bool IsSuccess = true;
                const string Message = "lcvkl";
                const string OddsGroup = "dklfjgljdlfg";

                // Action
                var result = controller.CreateUpdatingBaResult(IsAllowBA, IsSuccess, Message, OddsGroup) as JsonResult;
                var resultData = result.Data as dynamic;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(resultData.IsSuccessful, Is.EqualTo(IsSuccess));
                    Assert.That(resultData.Message, Is.EqualTo(Message));
                    Assert.That(resultData.IsBA, Is.EqualTo(IsAllowBA));
                    Assert.That(resultData.BAStatus, Is.EqualTo("On"));
                    Assert.That(resultData.ConfirmMessage, Is.EqualTo(ViewResources.AlertTurnOffBAMsg));
                    Assert.That(resultData.Tooltip, Is.EqualTo(ViewResources.TurnOffBaTooltip));
                    Assert.That(resultData.OddsGroup, Is.EqualTo(OddsGroup));
                });
            }
        }

        [Test]
        public void CreateUpdatingBaResult_NotAllowBA_ReturnCorrectResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const bool IsAllowBA = false;
                const bool IsSuccess = false;

                // Action
                var result = controller.CreateUpdatingBaResult(IsAllowBA, IsSuccess, string.Empty) as JsonResult;
                var resultData = result.Data as dynamic;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(resultData.IsSuccessful, Is.EqualTo(IsSuccess));
                    Assert.That(resultData.IsBA, Is.EqualTo(IsAllowBA));
                    Assert.That(resultData.BAStatus, Is.EqualTo("Off"));
                    Assert.That(resultData.ConfirmMessage, Is.EqualTo(ViewResources.AlertTurnOnBAMsg));
                    Assert.That(resultData.Tooltip, Is.EqualTo(ViewResources.TurnOnBaTooltip));
                });
            }
        }

        private CustomerApiController CreateController()
        {
            var controller = Substitute.ForPartsOf<CustomerApiController>(
               _logger,
               _customerCommService,
               _customerListService,
               _groupComService,
               _licenseeDataAccess,
               _productService,
               _authorizationService
               );

            controller.LangService = LangService;
            controller.SessionServiceInstance = SessionService;
            controller.AppSettingInstance = AppSettings;
            controller.LicenseeSettingServiceInstance = _licenseeSettingService;
            controller.ControllerContext = ControllerContext;
            return controller;
        }
    }
}