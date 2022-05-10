namespace Fanex.Athena.Service.Customer.UnitTests
{
    using Model.Core.DTO.Common;
    using Model.Customer.MetaModel;

    using NSubstitute;

    using NUnit.Framework;

    using UnitTest.Common.Helpers;

    [TestFixture]
    public partial class CustomerListServiceTest
    {
        [Test]
        public void UpdateCustClosed_WhenCall_ReturnResultInfoFromDataAccessAsync()
        {
            // Arrange
            var metaModel = FakeHelper.Create<CustomerStatusMetaModel>();
            var expectedResult = FakeHelper.Create<ResultInfo>();
            _customerListDataAccess.UpdateCustClosed(metaModel).Returns(expectedResult);

            // Action
            var result = _customerListService.UpdateCustClosed(metaModel);

            // Asserts
            Assert.That(result, Is.EqualTo(expectedResult));
        }

     
        [Test]
        public void UpdateCustSuspend_IsUpdateCasinoCustomer_CloseCasinoSuccess_ReturnResultInfoFromDataAccessAsync()
        {
            // Arrange
            var metaModel = FakeHelper.Create<CustomerStatusMetaModel>();
            var expectedResult = FakeHelper.Create<ResultInfo>();
            _customerListDataAccess.UpdateCustSuspend(metaModel).Returns(expectedResult);

            // Action
            var result = _customerListService.UpdateCustSuspend(metaModel);

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }
    }
}