using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerCommission;
using Fanex.Athena.Module.PlayerAdmin.ViewModels.PlayerCommission;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.ViewModels.PlayerCommission
{
    [TestFixture]
    public class MultipleRemoveFromGroupViewModelTests
    {
        [Test]
        public void Constructor_Always_AssignQueryValues()
        {
            // Arrange
            var query = new MultipleRemoveFromGroupQuery
            {
                CustIds = "1,2"
            };

            // Action
            var viewModel = new MultipleRemoveFromGroupViewModel(query);

            // Assert
            Assert.AreEqual(2, viewModel.CustIds.Length);
        }
    }
}
