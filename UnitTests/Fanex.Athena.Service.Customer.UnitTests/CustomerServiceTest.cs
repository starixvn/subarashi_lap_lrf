namespace Fanex.Athena.Service.Customer.UnitTests
{
    using System.Collections.Generic;
    using DataAccess.Customer.Interfaces;

    using Model.Customer.DTO;

    using NSubstitute;

    using NUnit.Framework;

    using StatelessCore.Interfaces;

    using UnitTest.Common.Helpers;

    [TestFixture]
    public class CustomerServiceTest
    {
        private ICustomerDataAccess _customerDataAccess;

        private IAuthorizationService _authorizationService;

        private CustomerService _customerService;
        private readonly IDictionary<int, int[]> _currencyAgents = new Dictionary<int, int[]> { { 1, new int[] { 100, 200 } } };

        [SetUp]
        public void SetUp()
        {
            _customerDataAccess = Substitute.For<ICustomerDataAccess>();

            _authorizationService = Substitute.For<IAuthorizationService>();
            _customerService = new CustomerService(_customerDataAccess, _authorizationService);
        }

        [TearDown]
        public void TearDown()
        {
            _customerDataAccess = null;
            _authorizationService = null;
        }

        [Test]
        public void GetCustomerInfo_WhenCallWithCorrectPermission_ReturnCorrectData()
        {
            // Arrange
            var custId = FakeHelper.Create<int>();
            _authorizationService.HasPermissionOnData(Arg.Any<IDictionary<int, int[]>>(), custId, 0).Returns(true);

            var expectedResult = FakeHelper.Create<CustomerInfo>();
            _customerDataAccess.GetCustomerInfo(custId).Returns(expectedResult);

            // Action
            var result = _customerService.GetCustomerInfo(_currencyAgents, custId);

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }

        [Test]
        public void GetCustomerInfo_HaveNoPermission_DataAccessIsNotCalled()
        {
            // Arrange
            var custId = FakeHelper.Create<int>();
            _authorizationService.HasPermissionOnData(Arg.Any<IDictionary<int, int[]>>(), custId, 0).Returns(false);

            // Action
            var result = _customerService.GetCustomerInfo(_currencyAgents, custId);

            // Assert
            Assert.Multiple(() =>
            {
                _customerDataAccess.DidNotReceive().GetCustomerInfo(custId);
                Assert.That(result, Is.Not.Null);
            });
        }
    }
}