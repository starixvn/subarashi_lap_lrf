namespace Fanex.Athena.Api.BetList.UnitTests
{
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Threading.Tasks;
    using Model.Core.DataDomain;
    using Fanex.Athena.Model.Auth;
    using Model.BetList.MetaModel;
    using NSubstitute;
    using NUnit.Framework;
    using UnitTest.Common.Helpers;

    public class RunningBetListControllerTest : ApiBetListBaseControllerHelperTest
    {
        private const string UspKey = "Lrf_BetList_SelRunningByBettype";

        private const string MultipleBettypeUspKey = "Lrf_BetList_SelRunningByBettypeList";

        private const string ApiPath = "/BetList/GetBetList";

        [SetUp]
        public void SetUp()
        {
            MockSessionData();

            AuthorizationService.HasPermissionOnData(SessionLicenseeId, Arg.Any<int>(), Arg.Any<long>()).Returns(true);
        }

      
        [Test]
        public async Task ThreeWayHandicap_InvalidCurrency_ReturnNull()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = SetUpForGetBetListResult(FakeHelper.Create<int>(), new Dictionary<int, string>());

                // Action
                var result = await controller.ThreeWayHandicap(metaModel);

                // Assert
                Assert.That(result, Is.Null);
            }
        }

        [TestCase(0)]
        [TestCase(1)]
        [TestCase(2)]
        public async Task CleanSheet_WhenCall_CallBetListApiWithCorrectParameters(int currencyId)
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = SetUpForGetBetListResult(currencyId, new Dictionary<int, string> { { currencyId, "Currency" } });

                var expect = new HttpResponseMessage();
                StubBetListApiPostAsync(metaModel, ApiPath, expect);

                // Action
                var actual = await controller.CleanSheet(metaModel);

                // Assert
                Assert.Multiple((TestDelegate)(() =>
                {
                    NUnit.Framework.Assert.That(expect, NUnit.Framework.Is.EqualTo(actual));
                    Assert.That(metaModel.UspKey, Is.EqualTo(UspKey));
                    Assert.That(metaModel.BetType, Is.EqualTo((int)BetType.CleanSheet));
                    BetListApiClient.Received().PostAsync((string)ApiPath, (object)metaModel, (string)SessionLanguage);
                }));
            }
        }

        [TestCase(0)]
        [TestCase(1)]
        [TestCase(2)]
        public async Task ToWinToNil_WhenCall_CallBetListApiWithCorrectParameters(int currencyId)
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = SetUpForGetBetListResult(currencyId, new Dictionary<int, string> { { currencyId, "Currency" } });

                var expect = new HttpResponseMessage();
                StubBetListApiPostAsync(metaModel, ApiPath, expect);

                // Action
                var actual = await controller.ToWinToNil(metaModel);

                // Assert
                Assert.Multiple((TestDelegate)(() =>
                {
                    NUnit.Framework.Assert.That(expect, NUnit.Framework.Is.EqualTo(actual));
                    Assert.That(metaModel.UspKey, Is.EqualTo(UspKey));
                    Assert.That(metaModel.BetType, Is.EqualTo((int)BetType.ToWinToNil));
                    BetListApiClient.Received().PostAsync((string)ApiPath, (object)metaModel, (string)SessionLanguage);
                }));
            }
        }

        [TestCase(0)]
        [TestCase(1)]
        [TestCase(2)]
        public async Task ThreeWayHandicap_WhenCall_GetBetListResultWithCorrectParameter(int currencyId)
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = SetUpForGetBetListResult(currencyId, new Dictionary<int, string> { { currencyId, "Currency" } }, MultipleBettypeUspKey);

                var expect = new HttpResponseMessage();
                StubBetListApiPostAsync(metaModel, ApiPath, expect);

                // Action
                var actual = await controller.ThreeWayHandicap(metaModel);

                // Assert
                Assert.Multiple((TestDelegate)(() =>
                {
                    NUnit.Framework.Assert.That(expect, NUnit.Framework.Is.EqualTo(actual));
                    Assert.That(metaModel.UspKey, Is.EqualTo(MultipleBettypeUspKey));
                    Assert.That(metaModel.MultipleBettype, Is.EqualTo($"{(int)BetType.ThreeWayHandicap},{(int)BetType.FirstHalfThreeWayHandicap}"));
                    BetListApiClient.Received().PostAsync((string)ApiPath, (object)metaModel, (string)SessionLanguage);
                }));
            }
        }

        private BetListMetaModel SetUpForGetBetListResult(int currencyId, Dictionary<int, string> sessionCurrencyList, string uspKey = UspKey)
        {
            var metaModel = new BetListMetaModel { CurrencyId = currencyId };

            StubUserSessionData(new UserAuthInfo { Language = SessionLanguage, CurrencyList = sessionCurrencyList });

            return metaModel;
        }

        private RunningBetListController CreateController()
        {
            return new RunningBetListController(
                SessionService,
                ProductService,
                LangService,
                AuthorizationService,
                BetListApiClient,
                BalanceUpDataAccess);
        }
    }
}