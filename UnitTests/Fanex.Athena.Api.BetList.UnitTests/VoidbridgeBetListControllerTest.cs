namespace Fanex.Athena.Api.BetList.UnitTests
{
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Threading.Tasks;

    using Model.BetList.MetaModel;

    using NSubstitute;

    using NUnit.Framework;

    public class VoidbridgeBetListControllerTest : ApiBetListBaseControllerHelperTest
    {
        private const string UspKey = "Lrf_BetList_RNG_Detail";

        private const string ApiPath = "/BetList/GetBetList";

        [SetUp]
        public void SetUp()
        {
            MockSessionData();

            AuthorizationService.HasPermissionOnData(Arg.Any<IDictionary<int, int[]>>(), Arg.Any<int>(), Arg.Any<long>()).Returns(true);
        }

        [Test]
        public async Task Detail_WhenCall_CallBetListApiWithCorrectParameters()
        {
            using (var controller = new VoidbridgeBetListController(
                LangService,
                AuthorizationService,
                BetListApiClient,
                BalanceUpDataAccess)
            {
                SessionService = SessionService,
                ProductService = ProductService
            })
            {
                // Arrange
                var expect = new HttpResponseMessage();
                var metaModel = new BetListMetaModel();

                StubBetListApiPostAsync(metaModel, ApiPath, expect);

                // Action
                var actual = await controller.Detail(metaModel);

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(expect, Is.EqualTo(actual));
                    Assert.That(metaModel.UspKey, Is.EqualTo(UspKey));
                    BetListApiClient.Received().PostAsync(ApiPath, metaModel, SessionLanguage);
                });
            }
        }
    }
}