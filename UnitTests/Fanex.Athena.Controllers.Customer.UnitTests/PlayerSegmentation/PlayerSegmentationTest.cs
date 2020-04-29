using Fanex.Athena.Controllers.Base.UnitTests;
using Fanex.Athena.DataAccess.Customer.Interfaces;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Customer.ViewModel;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.UnitTest.Common.Helpers;
using NSubstitute;
using NUnit.Framework;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fanex.Athena.Controllers.Customer.UnitTests
{
    [TestFixture]
    public class PlayerSegmentationTest : CultureBaseControllerHelperTest
    {
        private IAuthorizationService _authService;
        private IPlayerSegmentationDataAccess _playerDataAccess;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();
            SetUpDefaultFakeData();
        }

        [SetUp]
        public void SetUp()
        {
            _playerDataAccess = Substitute.For<IPlayerSegmentationDataAccess>();
            _authService = Substitute.For<IAuthorizationService>();
        }

        [TearDown]
        public void TearDown()
        {
            _playerDataAccess.ClearReceivedCalls();
            _authService.ClearReceivedCalls();
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

        [TestCase(true, true, 2)]
        [TestCase(false, true, 1)]
        public async Task Index_Permission_ReturnViewModelCorrect(bool hasVIP, bool hasProblem, int expectedCountTabKey)
        {
            using (var controller = CreateController())
            {
                // Arrange
                _authService.HasPermissions(Arg.Any<UserAuthInfo>(), PermissionKeys.PlayerVIPManagement).Returns(hasVIP);
                _authService.HasPermissions(Arg.Any<UserAuthInfo>(), PermissionKeys.PlayerProblemManagement).Returns(hasProblem);

                // Action
                var result = await controller.Index();
                var vm = result.Model as PlayerSegmentationViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.AreEqual(hasVIP, vm.HasVIPManagementPermission);
                    Assert.AreEqual(expectedCountTabKey, vm.TabKeys.Count());

                    if (hasProblem)
                    {
                        Assert.AreEqual("ProblemPlayer", vm.TabKeys.ElementAtOrDefault(0));
                    }

                    if (hasVIP)
                    {
                        Assert.IsNotNull(vm.VipPlayerVM);
                        Assert.AreEqual("VipPlayerManagement", vm.TabKeys.ElementAtOrDefault(1));
                    }
                });
            }
        }

        [Test]
        public async Task Index_WhenCall_ReturnReasonListCorrect()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var fakeReasons = FakeHelper.Create<Dictionary<int, string>>();
                var fakeLanguage = FakeHelper.Create<string>();
                LangService.GetCurrentLanguage().Returns(fakeLanguage);
                _playerDataAccess.GetReasonGroupListAsync(fakeLanguage).Returns(Task.FromResult<IDictionary<int, string>>(fakeReasons));

                // Action
                var result = await controller.Index();
                var vm = result.Model as PlayerSegmentationViewModel;

                // Assert
                Assert.AreEqual(fakeReasons, vm.ProblemPlayerVM.ReasonList);
            }
        }

        private PlayerSegmentationController CreateController()
        {
            return new PlayerSegmentationController(_authService, _playerDataAccess)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService,
            };
        }
    }
}