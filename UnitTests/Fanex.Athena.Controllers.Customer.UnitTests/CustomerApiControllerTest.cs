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
        private ICustomerListService _customerListService;
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
            _customerListService = Substitute.For<ICustomerListService>();
            _licenseeDataAccess = Substitute.For<ILicenseeDataAccess>();
            _productService = Substitute.For<IProductService>();
            _authorizationService = Substitute.For<IAuthorizationService>();
        }

        [TearDown]
        public void TearDown()
        {
            _customerListService.ClearReceivedCalls();
            _licenseeSettingService = null;
            _logger = null;
            _customerListService = null;
            _licenseeDataAccess = null;
            _productService = null;
            _authorizationService = null;
            AppSettings = null;
        }

        [Test]
        public void UpdateCustStatus_LicenseeNotAllowStatusFunction_ReturnErrorResultAsync()
        {
            using (var controller = CreateController())
            {
                // Arrange
                AppSettings.GetValue("LicenseeOfferStatusFunction").Returns("0");

                // Action
                var result = controller.UpdateCustStatus(0, false, false) as JsonResult;
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
        public void UpdateCustStatus_LicenseeAllowStatusFunction_ReturnErrorResultAsync()
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
                controller.UpdateCustStatus(CustId, isClosed, isSuspended);

                // Assert
                Assert.Multiple((TestDelegate)(() =>
                {
                    _customerListService.Received(1).UpdateCustClosed(
                        Arg.Is<CustomerStatusMetaModel>(x =>
                        x.LicenseeId == licenseeId &&
                        x.LicenseeName == SessionService.LicenseeSession.LicenseeName &&
                        x.CustId == CustId &&
                        x.IsOn == isClosed &&
                        x.ModifyById == SessionService.UserSession.UserId &&
                        x.ModifyByUsername == SessionService.UserSession.UserName &&
                        x.Ip == controller.Request.UserHostAddress));

                    _customerListService.Received(1).UpdateCustSuspend(
                        Arg.Is<CustomerStatusMetaModel>(x =>
                        x.LicenseeId == licenseeId &&
                        x.LicenseeName == SessionService.LicenseeSession.LicenseeName &&
                        x.CustId == CustId &&
                        x.IsOn == isSuspended &&
                        x.ModifyById == SessionService.UserSession.UserId &&
                        x.ModifyByUsername == SessionService.UserSession.UserName &&
                        x.Ip == controller.Request.UserHostAddress));
                }));
            }
        }

        [Test]
        public void UpdateCustStatus_HasException_WriteLogAndReturnErrorAsync()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var exception = new Exception("Sdf");
                var licenseeId = SessionService.LicenseeSession.LicenseeId;
                AppSettings.LicenseeOfferStatusFunction.Returns(new[] { licenseeId });
                _customerListService.When(x => x.UpdateCustClosed(Arg.Any<CustomerStatusMetaModel>()))
                    .Throw(exception);
                // Action
                var result = controller.UpdateCustStatus(0, false, false) as JsonResult;
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
                Assert.Multiple((TestDelegate)(() =>
                {
                    _customerListService.Received(1).UpdateSpecialLevel(
                        SessionService.UserSession.UserId,
                        CustId,
                        Level,
                        Arg.Any<string>(),
                        SessionService.UserSession.Language);
                }));
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
                Assert.Multiple((TestDelegate)(() =>
                {
                    _customerListService.Received(1).UpdateOddsGroup(
                        Arg.Is<CustomerOddsGroupMetaModel>((System.Linq.Expressions.Expression<Predicate<CustomerOddsGroupMetaModel>>)(x =>
                        x.CustId == CustId &&
                        x.Ip == controller.Request.UserHostAddress &&
                        x.Language == SessionService.UserSession.Language &&
                        x.OddsGroup == OddsGroup &&
                        x.UserId == SessionService.UserSession.UserId)));
                }));
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
               _customerListService,
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