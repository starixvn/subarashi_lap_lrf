namespace Fanex.Athena.Service.Customer.UnitTests
{


    using DataAccess.Customer.Interfaces;

    using Extension.Utility;

    using Model.Customer.DTO;

    using NSubstitute;

    using NUnit.Framework;

    using StatelessCore.Interfaces;

    using UnitTest.Common.Helpers;

    [TestFixture]
    public partial class CustomerListServiceTest
    {
        private ICustomerDataAccess _customerDataAccess;

        private ICustomerListDataAccess _customerListDataAccess;

        private IDormantCustomerListDataAccess _dormantCustomerListDataAccess;

        private IAuthorizationService _authorizationService;

        private IProductService _productService;

        private IAppSettings _appSettings;

        private CustomerListService _customerListService;
        private ILGAPIClient _lgClient;


        [SetUp]
        public void SetUp()
        {
            _customerDataAccess = Substitute.For<ICustomerDataAccess>();
            _customerListDataAccess = Substitute.For<ICustomerListDataAccess>();
            _dormantCustomerListDataAccess = Substitute.For<IDormantCustomerListDataAccess>();
            _authorizationService = Substitute.For<IAuthorizationService>();
            _productService = Substitute.For<IProductService>();
            _appSettings = Substitute.For<IAppSettings>();
            _appSettings.GetValue(Arg.Any<string>()).Returns("FakePath");
            _lgClient = Substitute.For<ILGAPIClient>();
            _customerListService = new CustomerListService(
                _customerDataAccess,
                _customerListDataAccess,
                _dormantCustomerListDataAccess,
                _authorizationService,
                _productService,
                _appSettings,
                _lgClient);
        }

        [TearDown]
        public void TearDown()
        {
            _customerListDataAccess = null;
            _authorizationService = null;
            _productService = null;
            _appSettings = null;
            _customerListService = null;
            _lgClient = null;
        }

        [Test]
        public void GetCustomerLoginInfo_WhenCallWithCorrectPermission_ReturnCorrectData()
        {
            // Arrange
            const string LicenseeName = "Name";
            var licenseeId = FakeHelper.Create<int>();
            var custId = FakeHelper.Create<int>();
            var expectedResult = FakeHelper.Create<LogInfo>();

            _authorizationService.HasPermissionOnData(Arg.Any<IDictionary<int, int[]>>(), custId, 0).Returns(true);
            _customerListDataAccess.GetCustomerLoginInfo(custId, licenseeId, LicenseeName).Returns(expectedResult);

            // Action
            var result = _customerListService.GetCustomerLoginInfo(custId, licenseeId, LicenseeName, _currencyAgents);

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }

        [Test]
        public void GetCustomerLoginInfo_HaveNoPermission_DataAccessIsNotCalled()
        {
            // Arrange
            const string LicenseeName = "Name";
            var licenseeId = FakeHelper.Create<int>();
            var custId = FakeHelper.Create<int>();

            _authorizationService.HasPermissionOnData(Arg.Any<IDictionary<int, int[]>>(), custId, 0).Returns(false);

            // Action
            var result = _customerListService.GetCustomerLoginInfo(custId, licenseeId, LicenseeName, _currencyAgents);

            // Assert
            Assert.Multiple(() =>
            {
                _customerListDataAccess.DidNotReceive().GetCustomerLoginInfo(custId, licenseeId, LicenseeName);
                Assert.That(result, Is.Not.Null);
            });
        }
    }
}