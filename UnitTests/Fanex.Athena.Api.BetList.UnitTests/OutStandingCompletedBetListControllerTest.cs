namespace Fanex.Athena.Api.BetList.UnitTests
{
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Threading.Tasks;

    using Fanex.Athena.Model.Auth;

    using Model.BetList.MetaModel;

    using NSubstitute;

    using NUnit.Framework;

    public class OutStandingCompletedBetListControllerTest : ApiBetListBaseControllerHelperTest
    {
        private const string UspKey = "Lrf_BetList_CustomerList_Mem";

        private const string BetListCustomerOutstandingName = "BetList_CustomerOutstanding";

        private const string ApiPath = "/BetList/GetBetListPaging";

        [SetUp]
        public void SetUp()
        {
            MockSessionData();

            AuthorizationService.HasPermissionOnData(SessionLicenseeId, Arg.Any<int>(), Arg.Any<long>()).Returns(true);
        }

        [TestCase(0)]
        [TestCase(1)]
        [TestCase(2)]
        public async Task Detail_WhenCall_ReturnCorrectResult(int currencyId)
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new BetListMetaModel { CurrencyId = currencyId, ProductCodeList = "Product1,Product2" };

                StubUserSessionData(new UserAuthInfo
                {
                    Language = SessionLanguage,
                    CurrencyList = new Dictionary<int, string> { { currencyId, "Currency" } },
                    CurrencyAgentList = new Dictionary<int, int[]>()
                });

                var expect = new HttpResponseMessage();
                StubBetListApiPostAsync(metaModel, ApiPath, expect);

                // Action
                var actual = await controller.Index(1, 10, metaModel);

                // Assert
                Assert.Multiple((TestDelegate)(() =>
                {
                    NUnit.Framework.Assert.That(actual, Is.EqualTo(expect));
                    Assert.That(metaModel.UspKey, Is.EqualTo(UspKey));
                    BetListApiClient.Received().PostAsync((string)ApiPath, (object)metaModel, (string)SessionLanguage);
                }));
            }
        }

        private OutStandingCompletedBetListController CreateController()
        {
            return new OutStandingCompletedBetListController(
                SessionService,
                ProductService,
                LangService,
                AuthorizationService,
                BetListApiClient,
                BalanceUpDataAccess);
        }
    }
}