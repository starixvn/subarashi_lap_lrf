using System.Collections.Generic;
using System.Web.Mvc;
using Fanex.Athena.Controllers.Base.UnitTests;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.Controllers;
using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerCommission;
using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.ViewModels.PlayerCommission;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.UnitTest.Common.Helpers;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Controllers
{
    public class PlayerCommissionControllerTests : CultureBaseControllerHelperTest
    {
        private const string AccessDeniedPath = "~/Utility/AccessDenied";
        private IProductService productService;
        private IPlayerCommissionService playerCommService;
        private PlayerCommissionController controller;
        private List<PlayerCommissionViewModel> groups;
        private PlayerCommissionViewModel currentGroup;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            productService = Substitute.For<IProductService>();
            playerCommService = Substitute.For<IPlayerCommissionService>();
            var authService = Substitute.For<IAuthorizationService>();
            controller = new PlayerCommissionController(productService, playerCommService, authService);
            controller.SessionServiceInstance = SessionService;

            var supportedProducts = new[] { "SB", "NG", "AB" };
            productService.GetAllowedProducts("CommissionGroups").Returns(supportedProducts);

            currentGroup = new PlayerCommissionViewModel();
            groups = new List<PlayerCommissionViewModel>
            {
                new PlayerCommissionViewModel()
            };

            playerCommService.GetAllCommGroups(Arg.Any<BasePlayerCommissionUpdateQuery>()).Returns(groups);
            playerCommService.GetPlayerCommissionGroup(Arg.Any<SingleMoveGroupQuery>()).Returns(currentGroup);
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            productService = null;
            playerCommService = null;
        }

        [Test]
        public void MultipleMoveGroup_HasPermission_ReturnCorrectView()
        {
            // Arrange
            var query = FakeHelper.Create<MultipleMoveGroupQuery>();
            SetupHasPermission();

            // Action
            var viewResult = (ViewResult)controller.MultipleMoveGroup(query);

            // Assert
            var viewModel = (MultipleMoveGroupViewModel)viewResult.Model;
            Assert.Multiple(() =>
            {
                Assert.AreEqual("~/Views/Desktop/Module/PlayerAdmin/PlayerCommission/MultipleMoveGroup.cshtml", viewResult.ViewName);
                Assert.AreEqual(groups, viewModel.Groups);
            });
        }

        [Test]
        public void MultipleMoveGroup_NoPermission_ReturnCorrectView()
        {
            // Arrange
            var query = FakeHelper.Create<MultipleMoveGroupQuery>();
            SetupNoPermission();

            // Action
            var viewResult = (RedirectResult)controller.MultipleMoveGroup(query);

            // Assert
            Assert.AreEqual(AccessDeniedPath, viewResult.Url);
        }

        [Test]
        public void MultipleRemoveFromGroup_HasPermission_ReturnCorrectView()
        {
            // Arrange
            var query = FakeHelper.Create<MultipleRemoveFromGroupQuery>();
            SetupHasPermission();

            // Action
            var viewResult = (ViewResult)controller.MultipleRemoveFromGroup(query);

            // Assert
            Assert.AreEqual("~/Views/Desktop/Module/PlayerAdmin/PlayerCommission/MultipleRemoveFromGroup.cshtml", viewResult.ViewName);
        }

        [Test]
        public void MultipleRemoveFromGroup_NoPermission_ReturnCorrectView()
        {
            // Arrange
            var query = FakeHelper.Create<MultipleRemoveFromGroupQuery>();
            SetupNoPermission();

            // Action
            var viewResult = (RedirectResult)controller.MultipleRemoveFromGroup(query);

            // Assert
            Assert.AreEqual(AccessDeniedPath, viewResult.Url);
        }

        [Test]
        public void MultipleUpdateGroup_HasPermission_ReturnCorrectView()
        {
            // Arrange
            var query = FakeHelper.Create<MultipleUpdateGroupQuery>();
            SetupHasPermission();

            // Action
            var viewResult = (ViewResult)controller.MultipleUpdateGroup(query);

            // Assert
            Assert.AreEqual("~/Views/Desktop/Module/PlayerAdmin/PlayerCommission/MultipleUpdateGroup.cshtml", viewResult.ViewName);
        }

        [Test]
        public void MultipleUpdateGroup_NoPermission_ReturnCorrectView()
        {
            // Arrange
            var query = FakeHelper.Create<MultipleUpdateGroupQuery>();
            SetupNoPermission();

            // Action
            var viewResult = (RedirectResult)controller.MultipleUpdateGroup(query);

            // Assert
            Assert.AreEqual(AccessDeniedPath, viewResult.Url);
        }

        [Test]
        public void SingleMoveGroup_HasPermission_ReturnCorrectView()
        {
            // Arrange
            var query = FakeHelper.Create<SingleMoveGroupQuery>();
            SetupHasPermission();

            // Action
            var viewResult = (ViewResult)controller.SingleMoveGroup(query);

            // Assert
            var viewModel = (SingleMoveGroupViewModel)viewResult.Model;
            Assert.Multiple(() =>
            {
                Assert.AreEqual("~/Views/Desktop/Module/PlayerAdmin/PlayerCommission/SingleMoveGroup.cshtml", viewResult.ViewName);
                Assert.AreEqual(2, viewModel.Groups.Count);
                Assert.AreEqual(currentGroup, viewModel.CurrentGroup);
            });
        }

        [Test]
        public void SingleMoveGroup_NoPermission_ReturnCorrectView()
        {
            // Arrange
            var query = FakeHelper.Create<SingleMoveGroupQuery>();
            SetupNoPermission();

            // Action
            var viewResult = (RedirectResult)controller.SingleMoveGroup(query);

            // Assert
            Assert.AreEqual(AccessDeniedPath, viewResult.Url);
        }

        [Test]
        public void SingleRemoveFromGroup_HasPermission_ReturnCorrectView()
        {
            // Arrange
            var query = FakeHelper.Create<SingleRemoveFromGroupQuery>();
            SetupHasPermission();

            // Action
            var viewResult = (ViewResult)controller.SingleRemoveFromGroup(query);

            // Assert
            Assert.AreEqual("~/Views/Desktop/Module/PlayerAdmin/PlayerCommission/SingleRemoveFromGroup.cshtml", viewResult.ViewName);
        }

        [Test]
        public void SingleRemoveFromGroup_NoPermission_ReturnCorrectView()
        {
            // Arrange
            var query = FakeHelper.Create<SingleRemoveFromGroupQuery>();
            SetupNoPermission();

            // Action
            var viewResult = (RedirectResult)controller.SingleRemoveFromGroup(query);

            // Assert
            Assert.AreEqual(AccessDeniedPath, viewResult.Url);
        }

        [Test]
        public void SingleUpdateGroup_HasPermission_ReturnCorrectView()
        {
            // Arrange
            var query = FakeHelper.Create<SingleUpdateGroupQuery>();
            SetupHasPermission();

            // Action
            var viewResult = (ViewResult)controller.SingleUpdateGroup(query);

            // Assert
            var viewModel = (SingleMoveGroupViewModel)viewResult.Model;
            Assert.Multiple(() =>
            {
                Assert.AreEqual("~/Views/Desktop/Module/PlayerAdmin/PlayerCommission/SingleUpdateGroup.cshtml", viewResult.ViewName);
                Assert.AreEqual(2, viewModel.Groups.Count);
                Assert.AreEqual(currentGroup, viewModel.CurrentGroup);
            });
        }

        [Test]
        public void SingleUpdateGroup_NoPermission_ReturnCorrectView()
        {
            // Arrange
            var query = FakeHelper.Create<SingleUpdateGroupQuery>();
            SetupNoPermission();

            // Action
            var viewResult = (RedirectResult)controller.SingleUpdateGroup(query);

            // Assert
            Assert.AreEqual(AccessDeniedPath, viewResult.Url);
        }

        [Test]
        public void PostMultipleMoveGroup_NoPermission_ReturnCorrectView()
        {
            // Arrange
            var query = FakeHelper.Create<MultipleMoveGroupQuery>();
            SetupNoPermission();

            // Action
            var viewResult = (RedirectResult)controller.PostMultipleMoveGroup(query).GetAwaiter().GetResult();

            // Assert
            Assert.AreEqual(AccessDeniedPath, viewResult.Url);
        }

        [Test]
        public void PostMultipleMoveGroup_InvalidQuery_ReturnCorrectView()
        {
            // Arrange
            SetupHasPermission();
            var query = FakeHelper.Create<MultipleMoveGroupQuery>();
            query.CustIds = null;

            // Action
            var viewResult = (JsonResult)controller.PostMultipleMoveGroup(query).GetAwaiter().GetResult();

            // Assert
            Assert.AreEqual("{ IsSuccessful = False }", viewResult.Data.ToString());
        }

        [Test]
        public void PostMultipleMoveGroup_ValidQuery_ReturnCorrectView()
        {
            // Arrange
            SetupHasPermission();
            var query = FakeHelper.Create<MultipleMoveGroupQuery>();
            query.CustIds = "1,2,3";
            var result = new ResultInfo();
            playerCommService.MultipleMoveGroup(query).Returns(result);

            // Action
            var viewResult = (JsonResult)controller.PostMultipleMoveGroup(query).GetAwaiter().GetResult();

            // Assert
            Assert.AreEqual(true, ((ResultInfo)viewResult.Data).IsSuccessful);
        }

        [Test]
        public void PostMultipleRemoveFromGroup_NoPermission_ReturnCorrectView()
        {
            // Arrange
            var query = FakeHelper.Create<MultipleRemoveFromGroupQuery>();
            SetupNoPermission();

            // Action
            var viewResult = (RedirectResult)controller.PostMultipleRemoveFromGroup(query).GetAwaiter().GetResult();

            // Assert
            Assert.AreEqual(AccessDeniedPath, viewResult.Url);
        }

        [Test]
        public void PostMultipleRemoveFromGroup_InvalidQuery_ReturnCorrectView()
        {
            // Arrange
            SetupHasPermission();
            var query = FakeHelper.Create<MultipleRemoveFromGroupQuery>();
            query.CustIds = null;

            // Action
            var viewResult = (JsonResult)controller.PostMultipleRemoveFromGroup(query).GetAwaiter().GetResult();

            // Assert
            Assert.AreEqual("{ IsSuccessful = False }", viewResult.Data.ToString());
        }

        [Test]
        public void PostMultipleRemoveFromGroup_ValidQuery_ReturnCorrectView()
        {
            // Arrange
            SetupHasPermission();
            var query = FakeHelper.Create<MultipleRemoveFromGroupQuery>();
            query.CustIds = "1,2,3";
            var result = new ResultInfo();
            playerCommService.MultipleRemoveFromGroup(query).Returns(result);

            // Action
            var viewResult = (JsonResult)controller.PostMultipleRemoveFromGroup(query).GetAwaiter().GetResult();

            // Assert
            Assert.AreEqual(true, ((ResultInfo)viewResult.Data).IsSuccessful);
        }

        [Test]
        public void PostMultipleUpdateGroup_NoPermission_ReturnCorrectView()
        {
            // Arrange
            var query = FakeHelper.Create<MultipleUpdateGroupQuery>();
            SetupNoPermission();

            // Action
            var viewResult = (RedirectResult)controller.PostMultipleUpdateGroup(query).GetAwaiter().GetResult();

            // Assert
            Assert.AreEqual(AccessDeniedPath, viewResult.Url);
        }

        [Test]
        public void PostMultipleUpdateGroup_InvalidQuery_ReturnCorrectView()
        {
            // Arrange
            SetupHasPermission();
            var query = FakeHelper.Create<MultipleUpdateGroupQuery>();
            query.CustIds = null;

            // Action
            var viewResult = (JsonResult)controller.PostMultipleUpdateGroup(query).GetAwaiter().GetResult();

            // Assert
            Assert.AreEqual("{ IsSuccessful = False }", viewResult.Data.ToString());
        }

        [Test]
        public void PostMultipleUpdateGroup_ValidQuery_ReturnCorrectView()
        {
            // Arrange
            SetupHasPermission();
            var query = FakeHelper.Create<MultipleUpdateGroupQuery>();
            query.CustIds = "1,2,3";
            query.Comms = new[] { (decimal)0 };

            var result = new ResultInfo();
            playerCommService.MultipleUpdateGroup(query).Returns(result);

            // Action
            var viewResult = (JsonResult)controller.PostMultipleUpdateGroup(query).GetAwaiter().GetResult();

            // Assert
            Assert.AreEqual(true, ((ResultInfo)viewResult.Data).IsSuccessful);
        }

        private void SetupHasPermission()
        {
            SessionService.UserSession.Returns(new UserAuthInfo
            {
                UserLevel = UserLevelType.Licensee
            });

            SessionService.LicenseeSession.Returns(new LicenseeAuthInfo
            {
                IsAllowedCustomerComm = true
            });
        }

        private void SetupNoPermission()
        {
            SessionService.UserSession.Returns(new UserAuthInfo
            {
                UserLevel = UserLevelType.Subsidiary
            });

            SessionService.LicenseeSession.Returns(new LicenseeAuthInfo
            {
                IsAllowedCustomerComm = false
            });
        }
    }
}
