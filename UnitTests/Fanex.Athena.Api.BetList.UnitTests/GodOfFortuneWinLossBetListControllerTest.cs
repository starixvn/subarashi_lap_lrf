namespace Fanex.Athena.Api.BetList.UnitTests
{
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Threading.Tasks;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Model.BetList.MetaModel;
    using Model.Core.DTO.Configuration;

    using NSubstitute;

    using NUnit.Framework;

    public class GodOfFortuneWinLossBetListControllerTest : ApiBetListBaseControllerHelperTest
    {
        private const string UspKey = "Lrf_BetList_GodOfFortuneWL_Mem";

        private const string ApiPath = "/BetList/GetBetList";

        private IReportSettingService _reportSettingService;

        [SetUp]
        public void SetUp()
        {
            MockSessionData();

            _reportSettingService = Substitute.For<IReportSettingService>();

            AuthorizationService.HasPermissionOnData(Arg.Any<IDictionary<int, int[]>>(), Arg.Any<int>(), Arg.Any<long>()).Returns(true);
        }

        [TearDown]
        public void TearDown()
        {
            _reportSettingService = null;
        }

        [Test]
        public async Task Index_InvalidDateRange_ReturnNull()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new BetListMetaModel { FromDate = DateTimeHelper.CreateDateTime(2021, 1, 1) };

                StubUserSessionData(new UserAuthInfo
                {
                    CurrencyList = new Dictionary<int, string>(),
                    CurrencyAgentList = new Dictionary<int, int[]>()
                });

                _reportSettingService.GetSetting(PermissionKeys.ReportLicenseeWinLoss, Arg.Any<string>()).Returns(new ReportSetting
                {
                    MinDate = DateTimeHelper.CreateDateTime(2021, 2, 2),
                    MaxDate = DateTimeHelper.CreateDateTime(2021, 3, 3)
                });

                // Action
                var result = await controller.Index(metaModel);

                // Assert
                Assert.That(result, Is.Null);
            }
        }

        [TestCase(0)]
        [TestCase(1)]
        [TestCase(2)]
        public async Task Index_WhenCall_CallBetListApiWithCorrectParameters(int currencyId)
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new BetListMetaModel { CurrencyId = currencyId };

                StubUserSessionData(new UserAuthInfo
                {
                    Language = SessionLanguage,
                    CurrencyList = new Dictionary<int, string> { { currencyId, "Currency" } },
                    CurrencyAgentList = new Dictionary<int, int[]>()
                });

                var expect = new HttpResponseMessage();
                StubBetListApiPostAsync(metaModel, ApiPath, expect);

                // Action
                var actual = await controller.Index(metaModel);

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(expect, Is.EqualTo(actual));
                    Assert.That(metaModel.UspKey, Is.EqualTo(UspKey));
                    BetListApiClient.Received().PostAsync(ApiPath, metaModel, SessionLanguage);
                });
            }
        }

        private GodOfFortuneWinLossBetListController CreateController()
        {
            return new GodOfFortuneWinLossBetListController(
                LangService,
                AuthorizationService,
                BetListApiClient,
                BalanceUpDataAccess,
                _reportSettingService)
            {
                SessionService = SessionService,
                ProductService = ProductService,
                SubsidiaryService = SubsidiaryService
            };
        }
    }
}