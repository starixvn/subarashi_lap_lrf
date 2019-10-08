using System.Text;
using Fanex.Athena.Module.PlayerAdmin.Api.Extensions;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.UnitTest.Common.Helpers;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.Api.UnitTests.Extensions
{
    [TestFixture]
    public class CommonCustomerSettingLogBuilderTest
    {
        [Test]
        public void Build_IncorrectType_ReturnNull()
        {
            // Arrange
            var item = new StringBuilder();
            var builder = new CommonCustomerSettingLogBuilder();

            // Action
            var result = builder.Build(item);

            // Assert
            Assert.That(result, Is.Null);
        }

        [Test]
        public void Build_CorrectType_ReturnCorrectItem()
        {
            // Arrange
            var item = FakeHelper.Create<PlayerUpdatingLogMetaModel>();
            var builder = new CommonCustomerSettingLogBuilder();
            var expectedContent = $"LAP - {item.SiteName} - {item.LicenseeCustId} - {item.ActionDetailId} - {item.Status} - {item.NewValue} - {item.OldValue}";

            // Action
            var result = builder.Build(item);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.UserId, Is.EqualTo(item.UserId));
                Assert.That(result.CustID, Is.EqualTo(item.CustId));
                Assert.That(result.ActionID, Is.EqualTo(item.ActionId));
                Assert.That(result.Doing, Is.EqualTo(expectedContent));
            });
        }
    }
}