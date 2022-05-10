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
        private ICustomerListDataAccess _customerListDataAccess;

        private IDormantCustomerListDataAccess _dormantCustomerListDataAccess;

        private CustomerListService _customerListService;

        [SetUp]
        public void SetUp()
        {
            _customerListDataAccess = Substitute.For<ICustomerListDataAccess>();
            _dormantCustomerListDataAccess = Substitute.For<IDormantCustomerListDataAccess>();
            _customerListService = new CustomerListService(
                _customerListDataAccess,
                _dormantCustomerListDataAccess);
        }

        [TearDown]
        public void TearDown()
        {
            _customerListDataAccess = null;
            _customerListService = null;
        }

        [Test]
        public void GetCustomerLoginInfo_WhenCallWithCorrectPermission_ReturnCorrectData()
        {
            // Arrange
            const string LicenseeName = "Name";
            var licenseeId = FakeHelper.Create<int>();
            var custId = FakeHelper.Create<int>();
            var expectedResult = FakeHelper.Create<LogInfo>();

            _customerListDataAccess.GetCustomerLoginInfo(custId, licenseeId, LicenseeName).Returns(expectedResult);

            // Action
            var result = _customerListService.GetCustomerLoginInfo(custId, licenseeId, LicenseeName);

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }
    }
}
