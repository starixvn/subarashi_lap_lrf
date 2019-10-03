namespace Fanex.Athena.Service.Customer.UnitTests
{
    using System.Collections.Generic;
    using Model.Core.DTO.Common;

    using NSubstitute;

    using NUnit.Framework;

    using Resources;

    using UnitTest.Common.Helpers;

    [TestFixture]
    public partial class CustomerListServiceTest
    {

        [Test]
        public void UpdateCustomerBAStatus_WhenCall_ReturnCorrectResultInfo()
        {
            // Arrange
            var licenseeId = FakeHelper.Create<int>();
            var custId = FakeHelper.Create<int>();
            var modifiedBy = FakeHelper.Create<int>();
            var allowBA = FakeHelper.Create<bool>();
            var request = FakeHelper.Create<Request>();

            var expectedResult = FakeHelper.Create<ResultInfo>();
            _customerListDataAccess.UpdateCustomerBAStatus(licenseeId, custId, modifiedBy, allowBA, request).Returns(expectedResult);

            // Action
            var result = _customerListService.UpdateCustomerBAStatus(licenseeId,
                custId,
                modifiedBy,
                allowBA,
                request
                );

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }
    }
}