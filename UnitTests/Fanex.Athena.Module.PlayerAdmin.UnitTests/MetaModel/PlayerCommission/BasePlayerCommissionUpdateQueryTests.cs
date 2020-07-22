using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerCommission;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.MetaModel.PlayerCommission
{
    [TestFixture]
    public class BasePlayerCommissionUpdateQueryTests
    {
        [TestCase("1,2,3", true)]
        [TestCase(null, false)]
        [TestCase("", false)]
        [TestCase(" ", false)]
        [TestCase("  ", false)]
        [TestCase("1,a,3", false)]
        [TestCase("a,1,3", false)]
        [TestCase("a,1,a", false)]
        [TestCase("a,a,a", false)]
        public void IsValid_Always_ReturnCorrectValue(string custIds, bool expectedValue)
        {
            // Arrange
            var query = new BasePlayerCommissionUpdateQuery();
            query.CustIds = custIds;

            // Action
            var actualValue = query.IsValid();

            // Assert
            Assert.AreEqual(expectedValue, actualValue);
        }
    }
}
