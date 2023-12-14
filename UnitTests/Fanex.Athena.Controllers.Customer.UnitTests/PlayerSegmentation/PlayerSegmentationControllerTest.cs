using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Fanex.Athena.Controllers.Base.UnitTests;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
using Fanex.Athena.Model.Customer.ViewModel;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.Customer.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.UnitTest.Common.Helpers;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Controllers.Customer.UnitTests
{
    [TestFixture]
    public partial class PlayerSegmentationControllerTest : CultureBaseControllerHelperTest
    {
        private IAuthorizationService _authService;
        private ISubsidiaryService _subsidiaryService;
        private IPlayerSegmentationService _playerService;
        private ICustomerClassService _customerClassService;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();
            SetUpDefaultFakeData();
        }

        [SetUp]
        public void SetUp()
        {
            _subsidiaryService = Substitute.For<ISubsidiaryService>();
            _playerService = Substitute.For<IPlayerSegmentationService>();
            _authService = Substitute.For<IAuthorizationService>();
            _customerClassService = Substitute.For<ICustomerClassService>();
        }

        [TearDown]
        public void TearDown()
        {
            _subsidiaryService.ClearReceivedCalls();
            _playerService.ClearReceivedCalls();
            _authService.ClearReceivedCalls();
            _customerClassService.ClearReceivedCalls();
        }

        [Test]
        public async Task Index_WhenCall_ReturnViewCorrect()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const string ExpectedViewName = "~/Views/Desktop/Customer/PlayerSegmentation/Main.cshtml";

                // Action
                var result = await controller.Index();

                // Assert
                StringAssert.AreEqualIgnoringCase(ExpectedViewName, result.ViewName);
            }
        }

        [Test]
        public async Task Index_Permission_ReturnViewModelCorrect()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const bool hasVIP = true;
                const int expectedCountTabKey = 1;
                _authService.HasPermissions(Arg.Any<UserAuthInfo>(), PermissionKeys.PlayerVIPManagement).Returns(hasVIP);

                // Action
                var result = await controller.Index();
                var vm = result.Model as PlayerSegmentationViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.AreEqual(hasVIP, vm.HasVIPManagementPermission);
                    Assert.AreEqual(expectedCountTabKey, vm.TabKeys.Count());
                    Assert.IsNotNull(vm.VipPlayerVM);
                    Assert.AreEqual("VipPlayerManagement", vm.TabKeys.ElementAtOrDefault(0));
                });
            }
        }

        [Test]
        public async Task Index_WhenCall_ReturnReasonListCorrect()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var fakeReasons = FakeHelper.Create<List<ReasonGroup>>();
                var fakeLanguage = FakeHelper.Create<string>();
                LangService.GetCurrentLanguage().Returns(fakeLanguage);
                _playerService.GetReasonGroupListAsync(fakeLanguage).Returns(Task.FromResult<IEnumerable<ReasonGroup>>(fakeReasons));
                var expectedReasons = fakeReasons.ToDictionary(_ => _.ReasonGroupID, _ => _.ReasonGroupName);

                // Action
                var result = await controller.Index();
                var vm = result.Model as PlayerSegmentationViewModel;

                // Assert
                Assert.AreEqual(expectedReasons, vm.ProblemPlayerVM.ReasonList);
            }
        }

        private PlayerSegmentationController CreateController()
        {
            return new PlayerSegmentationController(_authService, _subsidiaryService, _playerService, _customerClassService)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService,
            };
        }
    }
}