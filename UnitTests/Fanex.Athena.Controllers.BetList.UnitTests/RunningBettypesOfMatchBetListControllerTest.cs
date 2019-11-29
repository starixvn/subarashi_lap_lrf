namespace Fanex.Athena.Controllers.BetList.UnitTests
{
    using System;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Model.BetList.MetaModel;
    using NSubstitute;
    using NUnit.Framework;
    using Resources;

    public class RunningBettypesOfMatchBetListControllerTest : BetListBaseControllerHelperTest
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
                Assert.That(result.ViewName, Is.EqualTo("~/Views/Desktop/BetList/RunningBettypesOfMatchBetList/Main.cshtml"));
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

        [TestCase("USD", null, "EUR", 0, "1,2,3")]
        [TestCase("USD", "eur", "EUR", 1, "2")]
        [TestCase("USD", "eur", "EUR", 0, "")]
        public async Task Index_ExportExcel_PassCorrectParam(string currency, string baseCurrency, string expCurrency, int betType, string multiBetType)
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new BetListExcelMetaModel
                {
                    IsExportExcel = true,
                    CurrencyName = currency,
                    BaseCurrency = baseCurrency,
                    BetType = betType,
                    MultipleBettype = multiBetType
                };

                var expectedTitle = GetExpectedExcelTitle(expCurrency, betType, multiBetType);

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
                        && x.UspKey == "Lrf_BetList_SelRunningByMultipleBettypeMatch"
                        && string.Join(",", x.HiddenColumns) == "7,8,9"
                        && x.LicenseeId == DefaultLicenseeSession.LicenseeId
                        && !x.IsShowSumStake
                        ),
                    "RunningBetList",
                    null);
            }
        }

        private string GetExpectedExcelTitle(string expCurrency, int betType, string multiBetType)
        {
            CacheRefAdapter.GetLeagueName(Arg.Any<int>()).Returns("League");
            CacheRefAdapter.GetBettype(betType).Returns("BetType");

            var bettypeName = "BetType";
            if (betType == 0 && !string.IsNullOrWhiteSpace(multiBetType))
            {
                CacheRefAdapter.GetBettype(int.Parse(multiBetType.Split(',')[0])).Returns("FirstMultipleBettype");
                bettypeName = "FirstMultipleBettype";
            }

            return $"(LEAGUENAME) - {bettypeName} - {string.Format(ViewResources.Viewin, expCurrency)}";
        }

        private RunningBettypesOfMatchBetListController CreateController()
        {
            var controller = Substitute.ForPartsOf<RunningBettypesOfMatchBetListController>();

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