namespace Fanex.Athena.Service.Customer.UnitTests
{
    using System.Collections.Generic;
    using Model.Core.DTO.Common;
    using Model.Customer.MetaModel;

    using NSubstitute;

    using NUnit.Framework;

    using Resources;

    using UnitTest.Common.Helpers;

    [TestFixture]
    public partial class CustomerListServiceTest
    {
        [Test]
        public void UpdateOddsGroup_WhenCall_ReturnCorrectData()
        {
            // Arrange
            var metaModel = FakeHelper.Create<CustomerOddsGroupMetaModel>();

            var expectedResult = FakeHelper.Create<ResultInfo>();
            _customerListDataAccess.UpdateOddsGroup(metaModel).Returns(expectedResult);

            // Action
            var result = _customerListService.UpdateOddsGroup(metaModel);

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }

    }
}