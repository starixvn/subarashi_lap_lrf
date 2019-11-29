namespace Fanex.Athena.Controllers.BetList.UnitTests
{
    using System;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Model.BetList.MetaModel;
    using NSubstitute;
    using NUnit.Framework;
    using Resources;

    public class PendingFundsBetListControllerTest : BetListBaseControllerHelperTest
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
                Assert.That(result.ViewName, Is.EqualTo("~/Views/Desktop/BetList/PendingFunds/Main.cshtml"));
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
                Assert.Multiple(() =>
                {
                    Assert.That(model.LicenseeId, Is.EqualTo(DefaultLicenseeSession.LicenseeId));
                    Assert.That(model.UserId, Is.EqualTo(DefaultUserSession.UserId));
                    Assert.That(model.BalanceUpDay.Date, Is.EqualTo(BalanceUp.BalanceUpDay.Date));
                    Assert.That(model.MoveBetsDay.Date, Is.EqualTo(BalanceUp.MoveBetsDay.Date));
                    Assert.That(model.Date.Date, Is.EqualTo(metaModel.Date.Date));
                });
            }
        }

        [TestCase("USD", null, "EUR", true)]
        [TestCase("USD", "eur", "EUR", false)]
        public async Task Index_ExportExcel_PassCorrectParam(string currency, string baseCurrency, string expectedCurrency, bool isFakeLicensee)
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new BetListExcelMetaModel
                {
                    IsExportExcel = true,
                    CurrencyId = 0,
                    CurrencyName = currency,
                    BaseCurrency = baseCurrency,
                    ExternalId = "External",
                    SystemId = "System"
                };

                LicenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(isFakeLicensee);
                var currencyTitle = string.Format(ViewResources.Viewin, expectedCurrency);
                var expectedTitle = $"Running {ViewResources.BetList} - External{(isFakeLicensee ? "" : "(System)")} - {currencyTitle}";

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
                        && x.UspKey == "Lrf_BetList_SelRunningByDate_Mem"
                        && string.Join(",", x.HiddenColumns) == "1,2,7,8,9"
                        && x.LicenseeId == DefaultLicenseeSession.LicenseeId
                        && !x.IsShowSumStake
                        ),
                    "CustomerPendingFundsBetList",
                    null);
            }
        }

        private PendingFundsBetListController CreateController()
        {
            var controller = Substitute.ForPartsOf<PendingFundsBetListController>();

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