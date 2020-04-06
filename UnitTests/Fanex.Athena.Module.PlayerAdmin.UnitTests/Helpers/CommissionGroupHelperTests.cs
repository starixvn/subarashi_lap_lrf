using System.Collections.Generic;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Core.Helper;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Helpers
{
    [TestFixture]
    public class CommissionGroupHelperTests
    {
        [TestCase(false, 3)]
        [TestCase(true, 2)]
        public void MapHardcodedNameFromDB_Always_ReturnCorrectValue(bool isUpdate, int expectedLength)
        {
            // Arrange
            var permissions = new Dictionary<string, bool>
            {
                ["SB"] = true,
                ["CS"] = true,
                ["AB"] = true
            };

            // Action
            var actualValue = CommissionGroupHelper.MapHardcodedNameFromDB(permissions, isUpdate);

            // Assert
            Assert.AreEqual(expectedLength, actualValue.Count);
        }

        [Test]
        public void GetProductPermissions_Always_ReturnCorrectValue()
        {
            // Arrange
            var productList = new List<Product>();
            var productAccess = new ProductAccess(productList);

            // Action
            var actualValue = CommissionGroupHelper.GetProductPermissions(new[] { "SB", "CS" }, productAccess);

            // Assert
            Assert.AreEqual(2, actualValue.Count);
        }
    }
}
