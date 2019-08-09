namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Controllers
{
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.Athena.Controllers.Base.UnitTests;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Module.PlayerAdmin.Controllers;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.ViewModels;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.UnitTest.Common.Helpers;
    using NSubstitute;
    using NUnit.Framework;

    public class PlayerBetlistControllerTest : CultureBaseControllerHelperTest
    {
        private IBetListApiClient _betListApiClient;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            _betListApiClient = Substitute.For<IBetListApiClient>();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _betListApiClient = null;
        }

        [Test]
        public void Running_WhenCall_ReturnCorrectView()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var custId = FakeHelper.Create<int>();
                var currencyList = new Dictionary<int, string> { { 0, "Test" } };
                StubUserSessionData(new UserAuthInfo
                {
                    CurrencyList = currencyList
                });

                // Action
                var viewResult = controller.Running(custId, currencyList.ElementAt(0).Key);
                var viewModel = (PlayerRunningBetListViewModel)viewResult.Model;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(viewResult.ViewName, Is.EqualTo("~/Views/Desktop/Module/PlayerAdmin/PlayerBetList/Running.cshtml"));
                    Assert.That(viewModel.Currency, Is.EqualTo(currencyList.ElementAt(0).Value));
                });
            }
        }

        [TestCase("asc", "invalid", "asc", null)]
        [TestCase("desc", "", "desc", null)]
        [TestCase("invalid", "stake", null, "stake")]
        [TestCase("", "stake", null, "stake")]
        public async Task GetRunningBetList_WhenCall_CallApiWithCorrectParameter(string sortOrder, string sortBy, string expectedSortOrder, string expectedSortBy)
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new PlayerRunningBetListMetalModel
                {
                    SortBy = sortBy,
                    SortOrder = sortOrder
                };

                var currencyList = new Dictionary<int, string> { { 0, "Test" } };
                var currencyAgentList = new Dictionary<int, int[]> { { 0, FakeHelper.CreateMany<int>(2).ToArray() } };
                var language = FakeHelper.Create<string>();
                StubUserSessionData(new UserAuthInfo
                {
                    CurrencyList = currencyList,
                    CurrencyAgentList = currencyAgentList,
                    Language = language
                });

                // Action
                await controller.GetRunningBetList(metaModel);

                // Assert
                Assert.Multiple(() =>
                {
                    _betListApiClient.Received(1).PostAsync<dynamic>(
                        Arg.Is<string>(x => x == "/PlayerAdminBetList/GetBetList"),
                        Arg.Is<PlayerRunningBetListMetalModel>(x => x.SortBy == expectedSortBy && x.SortOrder == expectedSortOrder),
                        Arg.Is<string>(x => x == language));
                });
            }
        }

        [Test]
        public async Task ExportRunningBetList_WhenCall_CallApiWithCorrectParameter()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = FakeHelper.Create<PlayerRunningBetListMetalModel>();
                var currencyList = new Dictionary<int, string> { { 1, "Test" } };
                var currencyAgentList = new Dictionary<int, int[]> { { 1, FakeHelper.CreateMany<int>(2).ToArray() } };
                var language = FakeHelper.Create<string>();
                StubUserSessionData(new UserAuthInfo
                {
                    CurrencyList = currencyList,
                    CurrencyAgentList = currencyAgentList,
                    Language = language
                });

                _betListApiClient.PostAsyncStream("/PlayerAdminBetList/Export", metaModel, language).Returns(Task.FromResult<Stream>(new MemoryStream(0)));

                // Action
                var result = await controller.ExportRunningBetList(metaModel);

                // Assert
                Assert.Multiple(() =>
                {
                    _betListApiClient.Received(1).PostAsyncStream(
                        Arg.Is<string>(x => x == "/PlayerAdminBetList/Export"),
                        Arg.Is<PlayerRunningBetListMetalModel>(metaModel),
                        Arg.Is<string>(x => x == language));
                });
            }
        }

        private PlayerBetlistController CreateController()
        {
            return new PlayerBetlistController(
                LangService,
                SessionService,
                _betListApiClient);
        }
    }
}