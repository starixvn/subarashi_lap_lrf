namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Controllers
{
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.Athena.Controllers.Base.UnitTests;
    using Fanex.Athena.Module.PlayerAdmin.Controllers;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.ViewModels;
    using Fanex.Athena.UnitTest.Common.Helpers;
    using NSubstitute;
    using NUnit.Framework;

    public class PlayerBetLimitControllerTest : CultureBaseControllerHelperTest
    {
        private IPlayerBetLimitRepository _playerBetLimitRepository;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            _playerBetLimitRepository = Substitute.For<IPlayerBetLimitRepository>();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _playerBetLimitRepository = null;
        }

        [Test]
        public async Task Index_WhenCall_ReturnCorrectView()
        {
            using (var controller = CreateController())
            {
                // Arrange
                SetUpDefaultFakeData();

                var custId = FakeHelper.Create<int>();
                var currencyId = FakeHelper.Create<int>();
                var licenseeCustId = FakeHelper.Create<int>();

                var products = FakeHelper.CreateMany<PlayerBetLimitProduct>(2);
                _playerBetLimitRepository.GetEnableBetLimitProducts(DefaultLicenseeSession.LicenseeName)
                    .Returns(Task.FromResult(products));

                // Action
                var viewResult = await controller.Index(custId, currencyId, licenseeCustId).ConfigureAwait(false);
                var viewModel = (PlayerBetLimitProductViewModel)viewResult.Model;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(viewResult.ViewName, Is.EqualTo("~/Views/Desktop/Module/PlayerAdmin/PlayerBetLimit/Index.cshtml"));
                    Assert.That(viewModel.CustId, Is.EqualTo(custId));
                    Assert.That(viewModel.CurrencyId, Is.EqualTo(currencyId));
                    Assert.That(viewModel.ProductId, Is.EqualTo(products.First().ProductId));
                });
            }
        }

        private PlayerBetLimitController CreateController()
        {
            var result = new PlayerBetLimitController(_playerBetLimitRepository);
            result.LangService = LangService;
            result.SessionServiceInstance = SessionService;

            return result;
        }
    }
}
