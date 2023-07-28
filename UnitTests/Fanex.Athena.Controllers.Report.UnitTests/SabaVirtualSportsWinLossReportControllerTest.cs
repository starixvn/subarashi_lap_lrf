namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using Base.UnitTests;
    using Fanex.Athena.DataAccess.Core.Common.Interfaces;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Configuration;
    using Fanex.Athena.Model.Core.MetaModel.Common;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.UnitTest.Common.Helpers;
    using Model.Core.DTO.Common;
    using Model.Report.ViewModel;
    using NSubstitute;
    using NUnit.Framework;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;

    [TestFixture]
    public class SabaVirtualSportsWinLossReportControllerTest : CultureBaseControllerHelperTest
    {
        private ISportService _sportService;

        private ILeagueDataAccess _leagueDataAccess;

        private IReportSettingService _reportSettingService;
        private IPortalApiService _portalApiService;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();
            _sportService = Substitute.For<ISportService>();
            _leagueDataAccess = Substitute.For<ILeagueDataAccess>();
            _reportSettingService = Substitute.For<IReportSettingService>();
            _portalApiService = Substitute.For<IPortalApiService>();
            _portalApiService.GetSpecialLeaguesAsync(DefaultLicenseeSession.LicenseeName)
                .Returns(Task.FromResult(Enumerable.Empty<int>()));
            SetUpDefaultFakeData();
        }

        [Test]
        public async Task Index_WhenCall_ReturnCorrectViewResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var sports = new List<SportProductItem>
                {
                    new SportProductItem { ID = 1, ParentId = 0 }
                };
                var expected = new Dictionary<int, string>
                {
                    { 1, ViewResources.Soccer},
                    { -1, ViewResources.SoccerPinGoal }
            //         (1, (int)SportType.Soccer, ViewResources.Soccer, new[] { (int)SportType.SabaSoccer, (int)SportType.SabaFutsal }),
            //(2, (int)SportType.Soccer, ViewResources.SoccerPinGoal, new[] { (int)SportType.SabaSoccerPingoal }),
            //(3, (int)SportType.BasketBall, ViewResources.Basketball, new[] { (int)SportType.SabaBasketball }),
            //(4, (int)SportType.BasketBall, ViewResources.BasketballPinGoal, new[] { (int)SportType.SabaBasketballPinGoal }),
            //(5, (int)SportType.Cricket, ViewResources.Cricket , new[] { (int)SportType.SabaCricket }),
            //(6, (int)SportType.Esports, ViewResources.ESportsPinGoal, new[] { (int)SportType.SabaESportsPinGoal }),
                };
                var leagues = new Dictionary<int, string>();

                _sportService.GetSportsAndProducts(
                    SessionService.LicenseeSession.LicenseeId,
                    SessionService.UserSession.Language,
                    Product.SB).Returns(sports);
                _reportSettingService.GetSetting(PermissionKeys.ReportSabaVirtualSportsWinLoss, Arg.Any<string>()).Returns(new ReportSetting());

                // Action
                var viewResult = await controller.Index() as ViewResult;
                var viewModel = viewResult.Model as SabaVirtualSportsWinLossViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(viewResult.ViewName, Is.EqualTo("~/Views/Desktop/Report/SabaVirtualSportsWinLoss/Main.cshtml"));
                    Assert.That(viewModel.Sports, Is.EqualTo(expected));
                    Assert.That(viewModel.Leagues, Is.EqualTo(leagues));
                });
            }
        }

        [Test]
        public async Task GetLeaguesBySport_WhenCall_ReturnCorrectResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new LeagueMetaModel
                {
                    CurrencyId = 111,
                    SportId = 0
                };
                var data = new List<League>
                {
                    new League { LeagueId = 1, LeagueName = "League1", LeagueGroupId = 42 }
                };
                var sabaSport = new List<SabaSport>
                {
                    new SabaSport { Id = -1, LeagueGroupIds = new [] { 42 }, Name = "Test", SportTypeId = 1}
                };

                _sportService.GetSabaSports().Returns(sabaSport);
                _leagueDataAccess.GetLeaguesBySport(metaModel, Arg.Any<IEnumerable<int>>()).Returns(data);

                // Action
                var result = await controller.GetLeaguesBySport(metaModel) as JsonResult;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(ObjectHelper.ToJson(result.Data), Is.EqualTo(@"[{""Key"":0,""Value"":""All""},{""Key"":1,""Value"":""League1""}]"));
                });
            }
        }

        private SabaVirtualSportsWinLossReportController CreateController()
        {
            var productService = Substitute.For<IProductService>();
            productService.GetSingleWalletProductAccess(
                           SessionService.LicenseeSession.LicenseeId,
                           SessionService.UserSession.Language,
                           Arg.Is<string>(x => x == FunctionNames.SabaVirtualSportsWinLoss))
                           .Returns(new ProductAccess(new List<Product>()));

            return new SabaVirtualSportsWinLossReportController(
                _sportService,
                _leagueDataAccess,
                _reportSettingService,
                _portalApiService)
            {
                SessionServiceInstance = SessionService,
                LangService = LangService,
                LicenseeSettingServiceInstance = Substitute.For<ILicenseeSettingService>(),
                AppSettingInstance = AppSettings,
                ProductServiceInstance = productService
            };
        }
    }
}