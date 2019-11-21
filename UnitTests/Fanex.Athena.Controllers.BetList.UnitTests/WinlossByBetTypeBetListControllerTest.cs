namespace Fanex.Athena.Controllers.BetList.UnitTests
{
    using System;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Model.BetList.MetaModel;
    using NSubstitute;
    using NUnit.Framework;
    using Resources;

    public class WinlossByBetTypeBetListControllerTest : BetListBaseControllerHelperTest
    {
        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            SetUpDefaultFakeData();
        }

        [Test]
        public async Task Index_WhenCall_ReturnCorrectView()
        {
            using (var controller = CreateController())
            {
                // Action
                var result = await controller.Index(new BetListExcelMetaModel()) as ViewResult;

                // Assert
                Assert.That(result.ViewName, Is.EqualTo("~/Views/Desktop/BetList/WinlossByBetType/Main.cshtml"));
            }
        }

        [Test]
        public async Task Index_WhenCall_ReturnCorrectViewModel()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new BetListExcelMetaModel
                {
                    FromDate = new DateTime(2018, 2, 1),
                    ToDate = new DateTime(2018, 2, 10),
                    Date = new DateTime(2018, 2, 5)
                };

                // Action
                var result = await controller.Index(metaModel) as ViewResult;
                var model = (BetListMetaModel)result.Model;

                // Assert
                AssertDefaultBetListViewModel(model, metaModel);
            }
        }

        [TestCase(1, "USD", null, "USD", true)]
        [TestCase(1, "USD", "eur", "EUR", false)]
        public async Task Index_ExportExcel_PassCorrectParam(
            int currencyId,
            string currency, string baseCurrency,
            string expectedCurrency, bool hasMainTickets)
        {
            using (var controller = CreateController())
            {
                // Arrange

                var metaModel = new BetListExcelMetaModel
                {
                    IsExportExcel = true,
                    CurrencyId = currencyId,
                    CurrencyName = currency,
                    BaseCurrency = baseCurrency,
                    FromDate = new DateTime(2018, 1, 1),
                    ToDate = new DateTime(2018, 1, 1)
                };

                CacheRefAdapter.GetBettype(metaModel.BetType).Returns("BetType");

                var viewinCurrency = string.Format(ViewResources.Viewin, expectedCurrency);
                var expectedTitle = $"{ViewResources.BetList} - BetType - 1/1/2018 → 1/1/2018 - {viewinCurrency}";

                controller.When(async x => await x.ProcessExportExcel(
                    Arg.Any<BetListExcelMetaModel>(),
                    Arg.Any<string>(),
                    Arg.Any<string>())).DoNotCallBase();

                // Action
                await controller.Index(metaModel);

                // Assert
                await controller.Received().ProcessExportExcel(
                    Arg.Is<BetListExcelMetaModel>(x => x.Title == expectedTitle
                        && x.UspKey == "Lrf_BetList_SelWinLossByBetType"
                        && string.Join(",", x.HiddenColumns) == "8"
                        && x.LicenseeId == DefaultLicenseeSession.LicenseeId
                        && !x.IsShowSumStake

                        && x.PageIndex == 1
                        && x.PageSize == int.MaxValue - 1),
                    "WinLossByBetTypeBetList",
                    null);
            }
        }

        private WinlossByBetTypeBetListController CreateController()
        {
            var controller = Substitute.ForPartsOf<WinlossByBetTypeBetListController>();

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