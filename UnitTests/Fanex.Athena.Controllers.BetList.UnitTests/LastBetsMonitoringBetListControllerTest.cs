namespace Fanex.Athena.Controllers.BetList.UnitTests
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Base.UnitTests;
    using DataAccess.Core.Common.Interfaces;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Service.Customer.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.BetList.ViewModel;
    using NSubstitute;
    using NUnit.Framework;

    public class LastBetsMonitoringBetListControllerTest : CultureBaseControllerHelperTest
    {
        private ISportService _sportService;
        private IPlayerSegmentationService _playerSegmentationService;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            _sportService = Substitute.For<ISportService>();
            _playerSegmentationService = Substitute.For<IPlayerSegmentationService>();

            SetUpDefaultFakeData();
        }

        [Test]
        public async Task Index_WhenCall_ReturnCorrectView()
        {
            using (var controller = CreateController())
            {
                // Arrange
                _sportService.GetAllSports().Returns(new Dictionary<int, string>());
                _playerSegmentationService.GetCustomerClass().Returns(new List<string>());

                // Action
                var result = await controller.Index() as ViewResult;

                // Assert
                Assert.That(result.ViewName, Is.EqualTo("~/Views/Desktop/BetList/LastBetsMonitoringNew/Main.cshtml"));
            }
        }

        [Test]
        public async Task Index_WhenCall_ReturnCorrectViewModel()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const string ParlayId = "999";

                var sports = new List<SportProductItem>() { new SportProductItem { ID = 1, ParentId = 0, Name = "Test Sport" } };

                _sportService.GetSportAndProductAndSabaSport(DefaultLicenseeSession.LicenseeId, DefaultUserSession.Language, string.Empty).Returns(sports);
                _playerSegmentationService.GetCustomerClass().Returns(new List<string> { "1" });
                // Action
                var result = await controller.Index() as ViewResult;
                var model = (LastBetsMonitoringViewModel)result.Model;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(model.Param.LicenseeId, Is.EqualTo(DefaultLicenseeSession.LicenseeId));
                    Assert.That(model.SportsList.Count, Is.EqualTo(2));
                    Assert.That(model.SportsList.ElementAt(0).Value, Is.EqualTo(sports[0].ID.ToString()));
                    Assert.That(model.SportsList.ElementAt(1).Value, Is.EqualTo(ParlayId));
                    Assert.That(model.CustomerClassList.ElementAt(0), Is.EqualTo("1"));
                });
            }
        }

        private LastBetsMonitoringBetListController CreateController()
        {
            return new LastBetsMonitoringBetListController(_sportService, _playerSegmentationService)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService,
                ProductServiceInstance = ProductService
            };
        }
    }
}