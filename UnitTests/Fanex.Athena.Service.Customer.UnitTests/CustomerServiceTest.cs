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

        private CustomerService _customerService;

        [SetUp]
        public void SetUp()
        {
            _customerDataAccess = Substitute.For<ICustomerDataAccess>();

            _customerService = new CustomerService(_customerDataAccess);
        }

        [TearDown]
        public void TearDown()
        {
            _customerDataAccess = null;
        }

        [Test]
        public void GetCustomerInfo_WhenCall_ReturnCorrectData()
        {
            // Arrange
            var custId = FakeHelper.Create<int>();
            var expectedResult = FakeHelper.Create<CustomerInfo>();
            _customerDataAccess.GetCustomerInfo(custId).Returns(expectedResult);

            // Action
            var result = _customerService.GetCustomerInfo(custId);

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }
       
    }
}