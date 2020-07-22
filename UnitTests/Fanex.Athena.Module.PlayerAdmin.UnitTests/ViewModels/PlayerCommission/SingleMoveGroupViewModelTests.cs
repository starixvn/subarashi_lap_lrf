using System.Collections.Generic;
using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerCommission;
using Fanex.Athena.Module.PlayerAdmin.ViewModels.PlayerCommission;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.ViewModels.PlayerCommission
{
    [TestFixture]
    public class SingleMoveGroupViewModelTests
    {
        [Test]
        public void Constructor_Always_AssignQueryValues()
        {
            // Arrange
            var query = new SingleMoveGroupQuery
            {
                CustIds = "1,2",
                Permissions = new Dictionary<string, bool> { ["CS"] = true }
            };

            var groups = new List<PlayerCommissionViewModel>();
            var currentGroup = new PlayerCommissionViewModel();

            // Action
            var viewModel = new SingleMoveGroupViewModel(query, groups, currentGroup, true);

            // Assert
            Assert.AreEqual(1, viewModel.Groups.Count);
        }

        [Test]
        public void Constructor_CurrentGroupIsNone_NotInsertGroupNone()
        {
            // Arrange
            var query = new SingleMoveGroupQuery
            {
                CustIds = "1,2",
                Permissions = new Dictionary<string, bool> { ["CS"] = true }
            };

            var groups = new List<PlayerCommissionViewModel>();
            var currentGroup = new PlayerCommissionViewModel
            {
                GroupCommId = 1
            };

            // Action
            var viewModel = new SingleMoveGroupViewModel(query, groups, currentGroup, true);

            // Assert
            Assert.AreEqual(0, viewModel.Groups.Count);
        }
    }
}
