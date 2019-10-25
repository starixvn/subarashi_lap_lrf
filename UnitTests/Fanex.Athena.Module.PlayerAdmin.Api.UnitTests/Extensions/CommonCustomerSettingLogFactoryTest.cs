using Fanex.Athena.Module.PlayerAdmin.Api.Extensions;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.Api.UnitTests.Extensions
{
    [TestFixture]
    public class CommonCustomerSettingLogFactoryTest
    {
        [Test]
        public void GetBuilder_WhenCall_ReturnCorrectType()
        {
            // Arrange
            var expectedType = typeof(CommonCustomerSettingLogBuilder);
            var factory = new CommonCustomerSettingLogFactory();

            // Action
            var result = factory.GetBuilder(Model.Core.DataDomain.BusinessLogType.CustomerUpdateBA);

            // Assert
            Assert.That(result.GetType(), Is.EqualTo(expectedType));
        }
    }
}