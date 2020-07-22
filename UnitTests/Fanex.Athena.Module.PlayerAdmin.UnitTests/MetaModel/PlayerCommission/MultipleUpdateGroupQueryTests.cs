using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerCommission;
using Fanex.Athena.UnitTest.Common.Helpers;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.MetaModel.PlayerCommission
{
    [TestFixture]
    public class MultipleUpdateGroupQueryTests
    {
        private MultipleUpdateGroupQuery query;

        [OneTimeSetUp]
        public void FixtureSetUp()
        {
            query = FakeHelper.Create<MultipleUpdateGroupQuery>();
            query.CustIds = "1";
        }

        [OneTimeTearDown]
        public void FixtureTearDown()
        {
            query = null;
        }

        [Test]
        public void IsValid_EmptyArray_ReturnTrue()
        {
            // Arrange
            query.Comms = new decimal[] { };

            // Action
            var actualValue = query.IsValid();

            // Assert
            Assert.AreEqual(true, actualValue);
        }

        [Test]
        public void IsValid_ValidArray_ReturnTrue()
        {
            // Arrange
            query.Comms = new decimal[] { (decimal)0, (decimal)0.15 };

            // Action
            var actualValue = query.IsValid();

            // Assert
            Assert.AreEqual(true, actualValue);
        }

        [Test]
        public void IsValid_InvalidArray_ReturnFalse()
        {
            // Arrange
            query.Comms = new decimal[] { (decimal)0.16, (decimal)0.3333 };

            // Action
            var actualValue = query.IsValid();

            // Assert
            Assert.AreEqual(false, actualValue);
        }
    }
}
