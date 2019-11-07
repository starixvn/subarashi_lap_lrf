namespace Fanex.Athena.Api.BetList.UnitTests
{
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Threading.Tasks;

    using Fanex.Athena.Model.Auth;

    using Model.BetList.MetaModel;

    using NSubstitute;

    using NUnit.Framework;

    public class CorrectScoreBetListControllerTest : ApiBetListBaseControllerHelperTest
    {
        private const string UspKey = "Lrf_TotalBets_Sel430";

        private const string ApiPath = "/BetList/GetBetList";

        [SetUp]
        public void SetUp()
        {
            MockSessionData();

            AuthorizationService.HasPermissionOnData(Arg.Any<IDictionary<int, int[]>>(), Arg.Any<int>(), Arg.Any<long>()).Returns(true);
        }

        [TestCase(0)]
        [TestCase(-1)]
        public async Task Index_ValidMetaModel_CallBetListApiWithCorrectParameters(int currencyId)
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new BetListMetaModel
                {
                    CurrencyId = currencyId,
                };
                StubUserSessionData(new UserAuthInfo
                {
                    Language = SessionLanguage,
                    CurrencyList = new Dictionary<int, string> { { currencyId, "Test" } },
                    CurrencyAgentList = new Dictionary<int, int[]>()
                }
                );

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

        private CorrectScoreBetListController CreateController()
        {
            return new CorrectScoreBetListController(
                LangService,
                AuthorizationService,
                BetListApiClient,
                BalanceUpDataAccess)
            {
                SessionService = SessionService,
                ProductService = ProductService
            };
        }
    }
}