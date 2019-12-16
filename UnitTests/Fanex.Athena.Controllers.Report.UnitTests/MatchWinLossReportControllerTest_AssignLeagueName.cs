namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using System.Data;
    using Base.UnitTests;
    using DataAccess.Core.Configuration.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Core.DataDomain;
    using NSubstitute;
    using NUnit.Framework;
    using Report;
    using Resources;
    using Service.Report.Interfaces;
    using UnitTest.Common.Helpers;
    using VendorAdapter.Interfaces;

    [TestFixture]
    public class MatchWinLossReportControllerTest_AssignLeagueName : CultureBaseControllerHelperTest
    {
        private ICacheRefAdapter _cacheRefAdapter;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            _cacheRefAdapter = Substitute.For<ICacheRefAdapter>();

            base.FixtureSetUp();
        }

        [Test]
        public void AssignLeagueName_NumberGame_AssignCorrectLeagueName()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var row = CreateDataRow(ProductTypes.NumberGame);

                // Action
                controller.AssignLeagueName(row);

                // Assert
                Assert.That(row["leaguename"], Is.EqualTo(ViewResources.ProductNG));
            }
        }

        [Test]
        public void AssignLeagueName_OtherProduct_AssignCorrectLeagueName()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var leagueId = FakeHelper.Create<int>();
                var leagueName = "League " + leagueId;
                _cacheRefAdapter.GetLeagueName(leagueId).Returns(leagueName);
                var row = CreateDataRow(-1);
                row["leagueid"] = leagueId;

                // Action
                controller.AssignLeagueName(row);

                // Assert
                Assert.That(row["leaguename"], Is.EqualTo(leagueName));
            }
        }

        private static DataRow CreateDataRow(int newProductId)
        {
            var table = new DataTable();
            table.Columns.Add("newproductid", typeof(int));
            table.Columns.Add("leagueid", typeof(int));
            table.Columns.Add("leaguename", typeof(string));
            var row = table.NewRow();
            row["newproductid"] = newProductId;
            return row;
        }

        private MatchWinLossReportController CreateController(string productCodeList = null)
        {
            var controller = Substitute.ForPartsOf<MatchWinLossReportController>(
                Substitute.For<IBalanceUpDataAccess>(),
                _cacheRefAdapter,
                Substitute.For<IMatchWinLossService>());

            controller.LangService = LangService;
            controller.SessionServiceInstance = SessionService;
            controller.ProductServiceInstance = Substitute.For<IProductService>();

            return controller;
        }
    }
}