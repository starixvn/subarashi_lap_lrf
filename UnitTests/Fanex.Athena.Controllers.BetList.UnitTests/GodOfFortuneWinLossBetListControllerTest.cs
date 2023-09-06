namespace Fanex.Athena.Controllers.BetList.UnitTests
{
    using System;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Model.BetList.MetaModel;
    using Fanex.Athena.Resources;
    using NSubstitute;
    using NUnit.Framework;

    public class GodOfFortuneWinLossBetListControllerTest : BetListBaseControllerHelperTest
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
                Assert.That(result.ViewName, Is.EqualTo("~/Views/Desktop/BetList/GodOfFortuneWl/Main.cshtml"));
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
                    FromDate = new DateTime(2021, 2, 10),
                    ToDate = new DateTime(2021, 2, 20),
                    Date = new DateTime(2021, 2, 15)
                };

                // Action
                var result = await controller.Index(metaModel) as ViewResult;
                var model = (BetListMetaModel)result.Model;

                // Assert
                AssertDefaultBetListViewModel(model, metaModel);
            }
        }

        [TestCase(1, "USD", null, "USD", true, "Test", "Test")]
        [TestCase(1, "USD", "eur", "EUR", false, null, "GodOfFortuneWinLossBetList")]
        public async Task Index_ExportExcel_PassCorrectParam(
        int currencyId,
        string currency,
        string baseCurrency,
        string expCurrency,
        bool isFakeLic,
        string fileName,
        string expFileName)
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
                    FromDate = new DateTime(2021, 11, 1),
                    ToDate = new DateTime(2021, 12, 2),
                    ExternalId = "External",
                    SystemId = "System",
                    ExcelFileName = fileName,
                };

                LicenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(isFakeLic);

                var expectedTitle = $"{ViewResources.CustomerBetList} 11/1/2021 --> 12/2/2021 - "
                    + $"External{(isFakeLic ? "" : "(System)")} - {string.Format(ViewResources.Viewin, expCurrency)}";

                SetUpForExportingExcel(controller);

                // Action
                await controller.Index(metaModel);

                // Assert
                await controller.Received().ProcessExportExcel(
                    Arg.Is<BetListExcelMetaModel>(x => x.ShowingOption.CustomerCommVisible == DefaultLicenseeSession.IsAllowedCustomerComm
                        && x.Title == expectedTitle
                        && string.Join(",", x.HiddenColumns) == "1,2,8"
                        && x.UspKey == "Lrf_BetList_GodOfFortuneWL_Mem"
                        && x.LicenseeId == DefaultLicenseeSession.LicenseeId
                        && !x.IsShowSumStake
                       ),
                    expFileName,
                    null);
            }
        }

        private GodOfFortuneWinLossBetListController CreateController()
        {
            var controller = Substitute.ForPartsOf<GodOfFortuneWinLossBetListController>();

            controller.SessionServiceInstance = SessionService;
            controller.LangService = LangService;
            controller.LicenseeSettingServiceInstance = LicenseeSettingService;
            controller.BalanceUpDataAccessInstance = BalanceUpDataAccess;
            controller.BetListApiClient = BetListApiClient;
            controller.ProductService = ProductService;
            controller.CacheRefAdapter = CacheRefAdapter;
            controller.SubsidiaryService = SubsidiaryService;

            return controller;
        }

        private void SetUpForExportingExcel(GodOfFortuneWinLossBetListController controller)
        {
            controller.When(async x => await x.ProcessExportExcel(
                Arg.Any<BetListExcelMetaModel>(),
                Arg.Any<string>(),
                Arg.Any<string>())).DoNotCallBase();
        }
    }
}