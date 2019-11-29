namespace Fanex.Athena.Controllers.BetList.UnitTests
{
    using System;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Model.BetList.MetaModel;
    using NSubstitute;
    using NUnit.Framework;
    using Resources;

    public class WinlossByLeagueBetListControllerTest : BetListBaseControllerHelperTest
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
                var result = await controller.Index(new WinLossByLeagueBetListMetaModel()) as ViewResult;

                // Assert
                Assert.That(result.ViewName, Is.EqualTo("~/Views/Desktop/BetList/WinlossByLeague/Main.cshtml"));
            }
        }

        [Test]
        public async Task Index_WhenCall_ReturnCorrectViewModel()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new WinLossByLeagueBetListMetaModel
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
        public async Task Index_ExportExcel_PassCorrectParam(int currencyId, string currency, string baseCurrency, string expectedCurrency, bool isFakeLicensee)
        {
            using (var controller = CreateController())
            {
                // Arrange

                var metaModel = new WinLossByLeagueBetListMetaModel
                {
                    IsExportExcel = true,
                    CurrencyId = currencyId,
                    CurrencyName = currency,
                    BaseCurrency = baseCurrency,
                    ExternalId = "External",
                    SystemId = "System",
                    FromDate = new DateTime(2018, 1, 1),
                    ToDate = new DateTime(2018, 1, 2)
                };

                LicenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(isFakeLicensee);

                var currencyTitle = currencyId == 0 ? ViewResources.AllCurrencies : string.Format(ViewResources.Viewin, expectedCurrency);
                var expectedTitle = $"{ViewResources.CustomerBetList} - 1/1/2018 → 1/2/2018 - External{(isFakeLicensee ? "" : "(System)")} - {currencyTitle}";

                controller.When(async x => await x.ProcessExportExcel(
                Arg.Any<BetListExcelMetaModel>(),
                Arg.Any<string>(), Arg.Any<string>()
                )).DoNotCallBase();

                // Action
                await controller.Index(metaModel);

                // Assert
                await controller.Received().ProcessExportExcel(
                    Arg.Is<BetListExcelMetaModel>(x => x.ShowingOption.CustomerCommVisible == DefaultLicenseeSession.IsAllowedCustomerComm
                        && x.Title == expectedTitle
                        && x.UspKey == "Lrf_BetList_WinlostByLeague_Mem"
                        && string.Join(",", x.HiddenColumns) == "1,2,8"
                        && x.LicenseeId == DefaultLicenseeSession.LicenseeId
                        && !x.IsShowSumStake
                        ),
                    "WinLossByLeagueBetList",
                    "/BetList/ExportExcelWinlossByLeague");
            }
        }

        private WinlossByLeagueBetListController CreateController()
        {
            var controller = Substitute.ForPartsOf<WinlossByLeagueBetListController>();

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