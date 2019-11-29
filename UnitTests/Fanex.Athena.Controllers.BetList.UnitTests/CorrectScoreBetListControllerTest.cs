namespace Fanex.Athena.Controllers.BetList.UnitTests
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Model.BetList.MetaModel;
    using Model.BetList.ViewModel;
    using Model.Core.DTO.Common;
    using NSubstitute;
    using NUnit.Framework;
    using Resources;

    public class CorrectScoreBetListControllerTest : BetListBaseControllerHelperTest
    {
        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            ProductService.GetProductAccess(Arg.Any<int>(), Arg.Any<string>())
                .Returns(new ProductAccess(new List<Product> { new Product { ProductCode = Product.AB } }));

            SetUpDefaultFakeData();
        }

        [Test]
        public void Index_WhenGet_ReturnCorrectView()
        {
            using (var controller = CreateController())
            {
                // Action
                var result = controller.Index() as ViewResult;

                // Assert
                Assert.That(result.ViewName, Is.EqualTo("~/Views/Desktop/BetList/CorrectScoreBetList/Main.cshtml"));
            }
        }

        [Test]
        public void Index_WhenGet_ReturnCorrectViewModel()
        {
            using (var controller = CreateController())
            {
                // Action
                var result = controller.Index() as ViewResult;
                var model = (BetListBaseViewModel)result.Model;

                // Assert
                Assert.Multiple(() =>
                {
                    AssertDefaultBetListViewModel(model.Param, new BetListMetaModel());
                    Assert.That(model.ShowEmptyContent, Is.True);
                });
            }
        }

        [TestCase(1, "CNY", null, "CNY")]
        [TestCase(0, "", "", "EUR")]
        [TestCase(0, "", "GBP", "GBP")]
        public async Task Index_ExportExcel_PassCorrectParam(
            int currencyId,
            string currency,
            string baseCurrency, string expectedCurrency)
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new BetListExcelMetaModel
                {
                    IsExportExcel = true,
                    CurrencyId = currencyId,
                    CurrencyName = currency,
                    BaseCurrency = baseCurrency
                };

                var currencyTitle = string.Format(ViewResources.Viewin,
                    expectedCurrency);
                var expectedTitle = $"{ViewResources.CorrectScore} - {currencyTitle}";

                controller.When(async x => await x.ProcessExportExcel(
                    Arg.Any<BetListExcelMetaModel>(),
                    Arg.Any<string>(),
                    Arg.Any<string>()).ConfigureAwait(false)).DoNotCallBase();

                // Action
                await controller.Index(metaModel);

                // Assert
                await controller.Received().ProcessExportExcel(
                    Arg.Is<BetListExcelMetaModel>(x => x.ShowingOption.CustomerCommVisible == DefaultLicenseeSession.IsAllowedCustomerComm
                        && string.Join(",", x.HiddenColumns) == "7,8,9"
                        && x.Title == expectedTitle
                        && x.UspKey == "Lrf_TotalBets_Sel430"
                        && x.LicenseeId == DefaultLicenseeSession.LicenseeId
                        && x.IsShowSumStake
                      ),
                    "CorrectScoreBetList",
                    null);
            }
        }

        private CorrectScoreBetListController CreateController()
        {
            var controller = Substitute.ForPartsOf<CorrectScoreBetListController>();

            controller.SessionServiceInstance = SessionService;
            controller.LangService = LangService;
            controller.LicenseeSettingServiceInstance = LicenseeSettingService;
            controller.BalanceUpDataAccessInstance = BalanceUpDataAccess;
            controller.BetListApiClient = BetListApiClient;
            controller.ProductService = ProductService;
            controller.CacheRefAdapter = CacheRefAdapter;

            return controller;
        }
    }
}