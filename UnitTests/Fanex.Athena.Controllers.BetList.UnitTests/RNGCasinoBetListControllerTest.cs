namespace Fanex.Athena.Controllers.BetList.UnitTests
{
    using System;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Model.BetList.MetaModel;
    using NSubstitute;
    using NUnit.Framework;
    using Resources;

    public class RNGCasinoBetListControllerTest : BetListBaseControllerHelperTest
    {
        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            SetUpDefaultFakeData();
        }

        [Test]
        public async Task Detail_WhenCall_ReturnCorrectView()
        {
            using (var controller = CreateController())
            {
                // Action
                var result = await controller.Detail(new BetListExcelMetaModel()) as ViewResult;

                // Assert
                Assert.That(result.ViewName, Is.EqualTo("~/Views/Desktop/BetList/RngCasinoDetail/Main.cshtml"));
            }
        }

        [Test]
        public async Task Detail_WhenCall_ReturnCorrectViewModel()
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
                var result = await controller.Detail(metaModel) as ViewResult;
                var model = (BetListMetaModel)result.Model;

                // Assert
                AssertDefaultBetListViewModel(model, metaModel);
            }
        }

        [Test]
        public async Task Detail_ExportExcel_PassCorrectParam()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new BetListExcelMetaModel
                {
                    Date = new DateTime(2018, 2, 5),
                    IsExportExcel = true,
                    CurrencyId = 0
                };
                var expectedTitle = $"{ViewResources.ProductCS} - {ViewResources.DetailedBetlist} - {metaModel.Date.ToString("MM/dd/yyyy")}";

                controller.When(async x => await x.ProcessExportExcel(
                    Arg.Any<BetListExcelMetaModel>(),
                    Arg.Any<string>(),
                    Arg.Any<string>())).DoNotCallBase();

                // Action
                await controller.Detail(metaModel);

                // Assert
                await controller.Received().ProcessExportExcel(
                    Arg.Is<BetListExcelMetaModel>(x => x.Title == expectedTitle
                        && x.UspKey == "Lrf_BetList_RNG_Detail"
                        && string.Join(",", x.HiddenColumns) == "1,2,8,9"
                        && x.LicenseeId == DefaultLicenseeSession.LicenseeId
                        && !x.IsShowSumStake
                        ),
                    "RngCasinoDetail",
                    null);
            }
        }

        private RNGCasinoBetListController CreateController()
        {
            var controller = Substitute.ForPartsOf<RNGCasinoBetListController>();

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