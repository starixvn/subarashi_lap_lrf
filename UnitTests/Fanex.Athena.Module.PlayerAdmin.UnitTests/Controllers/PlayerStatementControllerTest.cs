namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Controllers
{
    using System;
    using System.Threading.Tasks;
    using Fanex.Athena.Controllers.Base.UnitTests;
    using Fanex.Athena.Module.PlayerAdmin.Controllers;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.ViewModels;
    using Fanex.Athena.UnitTest.Common.Helpers;
    using NSubstitute;
    using NUnit.Framework;

    public class PlayerStatementControllerTest : CultureBaseControllerHelperTest
    {
        private const int MaximumYear = 2;

        private IPlayerStatementService _playerStatementService;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            _playerStatementService = Substitute.For<IPlayerStatementService>();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _playerStatementService = null;
        }

        [Test]
        public void Index_WhenCall_ReturnCorrectView()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var custId = FakeHelper.Create<int>();
                var currencyId = FakeHelper.Create<int>();

                // Action
                var viewResult = controller.Index(custId, currencyId);
                var viewModel = (PlayerStatementViewModel)viewResult.Model;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(viewResult.ViewName, Is.EqualTo("~/Views/Desktop/Module/PlayerAdmin/PlayerStatement/Statement.cshtml"));
                    Assert.That(viewModel.CustId, Is.EqualTo(custId));
                    Assert.That(viewModel.CurrencyId, Is.EqualTo(currencyId));
                    Assert.That(viewModel.FromDate, Is.EqualTo(new DateTime(viewModel.ToDate.Year, viewModel.ToDate.Month, 1)));
                    Assert.That(viewModel.MinDate, Is.EqualTo(new DateTime(viewModel.ToDate.Year - MaximumYear, 1, 1)));
                });
            }
        }

        [Test]
        public async Task GetStatementUrl_ValidRequest_CallService()
        {
            using (var controller = CreateController())
            {
                // Arrange
                SetUpDefaultFakeData();

                var metaModel = new PlayerStatementMetaModel
                {
                    FromDate = DateTime.Today,
                    ToDate = DateTime.Today
                };

                // Action
                await controller.GetStatementUrl(metaModel).ConfigureAwait(false);

                // Assert
                Assert.Multiple(() =>
                {
                    _playerStatementService.Received(1).GetUrl(metaModel);
                    Assert.That(metaModel.SiteName, Is.EqualTo(DefaultLicenseeSession.LicenseeName));
                    Assert.That(metaModel.Language, Is.EqualTo(DefaultUserSession.Language));
                });
            }
        }

        private PlayerStatementController CreateController()
        {
            var result = new PlayerStatementController(
                _playerStatementService);
            result.LangService = LangService;
            result.SessionServiceInstance = SessionService;

            return result;
        }
    }
}
