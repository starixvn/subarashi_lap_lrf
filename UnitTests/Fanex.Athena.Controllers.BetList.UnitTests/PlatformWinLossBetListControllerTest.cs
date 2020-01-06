namespace Fanex.Athena.Controllers.BetList.UnitTests
{
    using System;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Model.BetList.MetaModel;
    using Model.Core.DataDomain;
    using NSubstitute;
    using NUnit.Framework;
    using Resources;

    public class PlatformWinLossBetListControllerTest : BetListBaseControllerHelperTest
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
                Assert.That(result.ViewName, Is.EqualTo("~/Views/Desktop/BetList/PlatformWinLoss/Main.cshtml"));
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

        [TestCase(1, "USD", "eur", "EUR", false, PlatformType.Asia, nameof(PlatformType.Asia))]
        [TestCase(1, "USD", "usd", "USD", true, PlatformType.China, nameof(PlatformType.China))]
        [TestCase(1, "USD", "gbp", "GBP", true, PlatformType.Euro, nameof(PlatformType.Euro))]
        [TestCase(1, "USD", null, "USD", true, PlatformType.Wap, nameof(PlatformType.Wap))]
        [TestCase(1, "USD", null, "USD", true, PlatformType.Mobile, nameof(PlatformType.Mobile))]
        [TestCase(1, "USD", null, "USD", true, PlatformType.Tablet, nameof(PlatformType.Tablet))]
        [TestCase(0, "", null, "EUR", true, PlatformType.NewAsia, nameof(PlatformType.NewAsia))]
        [TestCase(0, "", null, "EUR", true, PlatformType.DeepLink, nameof(PlatformType.DeepLink))]
        [TestCase(0, "", null, "EUR", true, PlatformType.NativeApp, nameof(PlatformType.NativeApp))]
        [TestCase(0, "", null, "EUR", true, PlatformType.BetfromOthers, nameof(PlatformType.BetfromOthers))]
        [TestCase(0, "", null, "EUR", true, PlatformType.All, nameof(PlatformType.All))]
        public async Task Index_ExportExcel_PassCorrectParam(
            int currencyId,
            string currency,
            string baseCurrency,
            string expectedCurrency,
            bool isFakeLic,
            int platform,
            string platformName)
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
                    ToDate = new DateTime(2018, 2, 2),
                    ExternalId = "External",
                    SystemId = "System",
                    PlatformType = platform
                };

                LicenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(isFakeLic);

                var expectedTitle = $"{ViewResources.Customer} {ViewResources.BetList} - 1/1/2018 --> 2/2/2018 - External{(isFakeLic ? "" : "(System)")}"
                    + $" - {ViewResources.Platform}: {ViewResources.ResourceManager.GetString(platformName)} - {string.Format(ViewResources.Viewin, expectedCurrency)}";

                controller.When(async x => await x.ProcessExportExcel(
                    Arg.Any<BetListExcelMetaModel>(),
                    Arg.Any<string>(),
                    Arg.Any<string>())).DoNotCallBase();

                // Action
                await controller.Index(metaModel);

                // Assert
                await controller.Received().ProcessExportExcel(
                    Arg.Is<BetListExcelMetaModel>(x => x.ShowingOption.CustomerCommVisible == DefaultLicenseeSession.IsAllowedCustomerComm
                        && x.Title == expectedTitle
                        && x.UspKey == "Lrf_BetList_PlatformWinLoss_Mem"
                        && string.Join(",", x.HiddenColumns) == "1,2,8"
                        && x.LicenseeId == DefaultLicenseeSession.LicenseeId
                        && !x.IsShowSumStake
                       ),
                    "PlatformWinLossBetList",
                    null);
            }
        }

        private PlatformWinLossBetListController CreateController()
        {
            var controller = Substitute.ForPartsOf<PlatformWinLossBetListController>();

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