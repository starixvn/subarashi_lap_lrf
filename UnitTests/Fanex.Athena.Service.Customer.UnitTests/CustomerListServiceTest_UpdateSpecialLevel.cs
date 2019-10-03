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
        public void UpdateSpecialLevel_WhenCall_ReturnCorrectResultInfo()
        {
            // Arrange
            var custId = FakeHelper.Create<int>();
            var userId = FakeHelper.Create<int>();
            var level = FakeHelper.Create<int>();
            var ip = FakeHelper.Create<string>();
            var language = FakeHelper.Create<string>();

            var expectedResult = FakeHelper.Create<ResultInfo>();
            _customerListDataAccess.UpdateSpecialLevel(userId, custId, level, ip, language).Returns(expectedResult);

            // Action
            var result = _customerListService.UpdateSpecialLevel(userId, custId, level, ip, language);

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }
    }
}