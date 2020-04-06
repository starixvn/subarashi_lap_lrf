using System.Collections.Generic;
using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerCommission;
using Fanex.Athena.Module.PlayerAdmin.ViewModels.PlayerCommission;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.ViewModels.PlayerCommission
{
    [TestFixture]
    public class MultipleMoveGroupViewModelTests
    {
        [Test]
        public void Constructor_Always_AssignQueryValues()
        {
            // Arrange
            var query = new MultipleMoveGroupQuery();
            var groups = new List<PlayerCommissionViewModel>();

            // Action
            var viewModel = new MultipleMoveGroupViewModel(query, groups);

            // Assert
            Assert.AreEqual(groups, viewModel.Groups);
        }
    }
}
