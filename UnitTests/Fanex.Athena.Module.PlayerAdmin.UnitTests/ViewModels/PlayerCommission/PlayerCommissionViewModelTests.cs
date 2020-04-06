using System.Collections.Generic;
using System.Data;
using Fanex.Athena.Module.PlayerAdmin.ViewModels.PlayerCommission;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.ViewModels.PlayerCommission
{
    [TestFixture]
    public class PlayerCommissionViewModelTests
    {
        [Test]
        public void MapData_Always_AssignQueryValues()
        {
            // Arrange
            var reader = Substitute.For<IDataReader>();
            var viewModel = new PlayerCommissionViewModel();
            var columns = new Dictionary<string, string>
            {
                ["CS"] = "CS",
                ["FW"] = "FW"
            };

            var visibility = new Dictionary<string, bool>
            {
                ["CS"] = true,
                ["FW"] = false
            };

            // Action
            viewModel.MapData(reader, columns, visibility);

            // Assert
            Assert.AreEqual(2, viewModel.CommValues.Count);
        }

        [Test]
        public void InitDefaultValue_Always_InitCorrectValues()
        {
            // Arrange
            var viewModel = new PlayerCommissionViewModel();
            var columns = new Dictionary<string, bool>
            {
                ["CS"] = true
            };

            // Action
            viewModel.InitDefaultValue(columns);

            // Assert
            Assert.AreEqual(1, viewModel.CommValues.Count);
        }
    }
}
