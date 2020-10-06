using Fanex.Athena.Controllers.Base.UnitTests;
using Fanex.Athena.Module.PlayerAdmin.Controllers;
using Fanex.Athena.Module.PlayerAdmin.Excel;
using Fanex.Athena.Module.PlayerAdmin.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.ViewModels;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Controllers
{
    public class PlayerDetailTransactionControllerTests : CultureBaseControllerHelperTest
    {
        private IPlayerDetailTransactionService service;
        private IPlayerDetailTransactionExcel excelService;
        private PlayerDetailTransactionController controller;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();
            service = Substitute.For<IPlayerDetailTransactionService>();
            excelService = Substitute.For<IPlayerDetailTransactionExcel>();
            controller = new PlayerDetailTransactionController(service, excelService);
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            service = null;
            controller = null;
        }

        [Test]
        public void Index_Always_ReturnCorrectView()
        {
            // Action
            var viewResult = controller.Index(0, 0);

            // Assert
            var viewModel = (PlayerDetailTransactionReportViewModel)viewResult.Model;
            Assert.Multiple(() =>
            {
                Assert.AreEqual("~/Views/Desktop/Module/PlayerAdmin/PlayerDetailTransaction/Index.cshtml", viewResult.ViewName);
                Assert.AreEqual(0, viewModel.CustId);
                Assert.AreEqual(0, viewModel.CurrencyId);
            });
        }

        [Test]
        public void GetDetailTransactionReport_Always_ReturnCorrectData()
        {
            // Arrange
            var criteria = new PlayerDetailTransactionsMetaModel();
            var model = new PlayerDetailTransactionReportViewModel();
            service.GetDetailTransactionReport(criteria).Returns(model);

            // Action
            var viewResult = controller.GetDetailTransactionReport(criteria).GetAwaiter().GetResult();

            // Assert
            Assert.AreEqual(model, (PlayerDetailTransactionReportViewModel)viewResult.Data);
        }
    }
}
