using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerCommission;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.MetaModel.PlayerCommission
{
    [TestFixture]
    public class CommValidatorTests
    {
        [Test]
        public void IsValid_EmptyArray_ReturnTrue()
        {
            // Arrange
            var values = new decimal[] { };

            // Action
            var actualValue = CommValidator.IsValid(values);

            // Assert
            Assert.AreEqual(true, actualValue);
        }

        [Test]
        public void IsValid_ValidArray_ReturnTrue()
        {
            // Arrange
            var values = new decimal[] { (decimal)0, (decimal)0.15 };

            // Action
            var actualValue = CommValidator.IsValid(values);

            // Assert
            Assert.AreEqual(true, actualValue);
        }

        [Test]
        public void IsValid_InvalidArray_ReturnFalse()
        {
            // Arrange
            var values = new decimal[] { (decimal)0.16, (decimal)0.3333 };

            // Action
            var actualValue = CommValidator.IsValid(values);

            // Assert
            Assert.AreEqual(false, actualValue);
        }
    }
}
