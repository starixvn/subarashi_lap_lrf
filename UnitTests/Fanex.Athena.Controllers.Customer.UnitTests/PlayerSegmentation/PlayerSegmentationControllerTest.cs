namespace Fanex.Athena.Controllers.Customer.UnitTests
{
    using System.Linq;
    using System.Threading.Tasks;
    using Base.UnitTests;
    using Model.Auth;
    using Model.Auth.DataDomain;
    using Model.Customer.ViewModel;
    using NSubstitute;
    using NUnit.Framework;
    using Service.Core.Users.Interfaces;
    using Service.Customer.Interfaces;
    using Service.StatelessCore.Interfaces;

    [TestFixture]
    public partial class PlayerSegmentationControllerTest : CultureBaseControllerHelperTest
    {
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
            _authService = Substitute.For<IAuthorizationService>();
            _customerClassService = Substitute.For<ICustomerClassService>();
        }

        [TearDown]
        public void TearDown()
        {
            _subsidiaryService.ClearReceivedCalls();
            _authService.ClearReceivedCalls();
            _customerClassService.ClearReceivedCalls();
        }

        private IAuthorizationService _authService;
        private ISubsidiaryService _subsidiaryService;
        private ICustomerClassService _customerClassService;

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

        //[Test]
        //public async Task Index_WhenCall_ReturnReasonListCorrect()
        //{
        //    using (var controller = CreateController())
        //    {
        //        // Arrange
        //        var fakeReasons = FakeHelper.Create<List<ReasonGroup>>();
        //        var fakeLanguage = FakeHelper.Create<string>();
        //        LangService.GetCurrentLanguage().Returns(fakeLanguage);
        //        _playerService.GetReasonGroupListAsync(fakeLanguage).Returns(Task.FromResult<IEnumerable<ReasonGroup>>(fakeReasons));
        //        var expectedReasons = fakeReasons.ToDictionary(_ => _.ReasonGroupID, _ => _.ReasonGroupName);

        //        // Action
        //        var result = await controller.Index();
        //        var vm = result.Model as PlayerSegmentationViewModel;

        //        // Assert
        //        Assert.AreEqual(expectedReasons, vm.ProblemPlayerVM.ReasonList);
        //    }
        //}

        private PlayerSegmentationController CreateController()
        {
            return new PlayerSegmentationController(_authService, _subsidiaryService, _customerClassService)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService
            };
        }
    }
}