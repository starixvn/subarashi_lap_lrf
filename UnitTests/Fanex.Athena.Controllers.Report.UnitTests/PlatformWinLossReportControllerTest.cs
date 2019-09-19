namespace Fanex.Athena.Controllers.TotalBets.UnitTests
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Base.UnitTests;
    using Fanex.Athena.Model.Core.MetaModel.Product;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;
    using Model.Report.ViewModel;
    using NSubstitute;
    using NUnit.Framework;
    using Report;

    [TestFixture]
    public class PlatformWinLossReportControllerTest : CultureBaseControllerHelperTest
    {
        private IReportAPIClient _reportAPIClient;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            _reportAPIClient = Substitute.For<IReportAPIClient>();
            SetUpDefaultFakeData();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _reportAPIClient = null;
        }

        [Test]
        public void Index_WhenCall_ReturnCorrectViewResult()
        {
            using (var controller = CreateController())
            {
                // Action
                var viewResult = controller.Index() as ViewResult;
                var viewModel = viewResult.Model as PlatformWinLossViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(viewResult.ViewName, Is.EqualTo("~/Views/Desktop/Report/PlatformWinLoss/Main.cshtml"));
                    Assert.That(viewModel.CurrencyList, Is.EqualTo(SessionService.UserSession.CurrencyList));
                });
            }
        }

        [Test]
        public async Task Index_WhenCallWithLevel0_CallCorrectApi()
        {
            // Arrange
            var metaModel = CreateMetaModel(0);

            using (var controller = CreateController())
            {
                // Action
                var result = await controller.Index(metaModel);

                // Assert
                Assert.Multiple(async () =>
                {
                    await _reportAPIClient.Received().PostAsyncString("api/PlatformWinLoss/GetSummaryData", metaModel, SessionService.UserSession.Language);
                });
            }
        }

        [Test]
        public async Task Index_WhenCallWithLevel1_CallCorrectApi()
        {
            // Arrange
            var metaModel = CreateMetaModel(1);

            using (var controller = CreateController())
            {
                // Action
                var result = await controller.Index(metaModel);

                // Assert
                Assert.Multiple(async () =>
                {
                    await _reportAPIClient.Received().PostAsyncString("api/PlatformWinLoss/GetMemberData", metaModel, SessionService.UserSession.Language);
                });
            }
        }

        [Test]
        public async Task Index_WhenExportWithLevel0_CallCorrectApi()
        {
            // Arrange
            var metaModel = CreateMetaModel(0, true);

            using (var controller = CreateController())
            {
                // Action
                var result = await controller.Index(metaModel);

                // Assert
                Assert.Multiple(async () =>
                {
                    await _reportAPIClient.Received().PostByteContentAsync("api/PlatformWinLoss/ExportSummaryData", metaModel, SessionService.UserSession.Language, MediaType.MsgPack);
                });
            }
        }

        [Test]
        public async Task Index_WhenExportWithLevel1_CallCorrectApi()
        {
            // Arrange
            var metaModel = CreateMetaModel(1, true);

            using (var controller = CreateController())
            {
                // Action
                var result = await controller.Index(metaModel);

                // Assert
                Assert.Multiple(async () =>
                {
                    await _reportAPIClient.Received().PostByteContentAsync("api/PlatformWinLoss/ExportMemberData", metaModel, SessionService.UserSession.Language, MediaType.MsgPack);
                });
            }
        }

        private static PlatformWinLossMetaModel CreateMetaModel(int level, bool isExportExcel = false)
        {
            return new PlatformWinLossMetaModel
            {
                Level = level,
                PlatformType = PlatformType.Asia,
                Year = 2017,
                Month = 1,
                FromDay = 1,
                ToDay = 2,
                CurrencyId = 1,
                IsExportExcel = isExportExcel,
                ProductOptions = new List<ProductOption>
                {
                    new ProductOption
                    {
                        Code = "SB",
                        Status = true
                    }
                }
            };
        }

        private PlatformWinLossReportController CreateController()
        {
            var productService = Substitute.For<IProductService>();
            productService.GetSingleWalletProductAccess(
                SessionService.LicenseeSession.LicenseeId,
                SessionService.UserSession.Language,
                FunctionNames.PlatformWinloss).Returns(new ProductAccess(new List<Product>()));
            return new PlatformWinLossReportController(
                LangService,
                SessionService,
                productService,
                _reportAPIClient);
        }
    }
}