namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Base.UnitTests;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Configuration;
    using Fanex.Athena.Service.Customer.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Core.DTO.Common;
    using Model.Report.ViewModel;
    using NSubstitute;
    using NUnit.Framework;

    [TestFixture]
    public class AbnormalBetReportControllerTest : CultureBaseControllerHelperTest
    {
        private IReportSettingService _reportSettingService;
        private ISportService _sportService;
        private IPlayerSegmentationService _playerService;
        private IBetTypeService _betTypeService;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();
            _reportSettingService = Substitute.For<IReportSettingService>();
            _sportService = Substitute.For<ISportService>();
            _playerService = Substitute.For<IPlayerSegmentationService>();
            _betTypeService = Substitute.For<IBetTypeService>();
            SetUpDefaultFakeData();
            StubUserSessionData(new UserAuthInfo { CurrencyAgentList = new Dictionary<int, int[]>(), CurrencyList = new Dictionary<int, string>() });
        }

        [Test]
        public async Task Index_WhenGet_ReturnCorrectViewResult()
        {
            // Arrange
            using (var controller = CreateController())
            {
                // Action
                var viewResult = (await controller.Index()) as ViewResult;
                var viewModel = viewResult.Model as AbnormalBetViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(viewResult.ViewName, Is.EqualTo("~/Views/Desktop/Report/AbnormalBet/Main.cshtml"));
                    Assert.That(viewModel.CurrencyList, Is.EqualTo(SessionService.UserSession.CurrencyList));
                    Assert.That(viewModel.IsAllowedCustomerCommission, Is.EqualTo(SessionService.LicenseeSession.IsAllowedCustomerComm));
                });
            }
        }

        private AbnormalBetReportController CreateController()
        {
            var reportSetting = new ReportSetting
            {
                MinDate = new DateTime(2021, 2, 15),
                MaxDate = new DateTime(2021, 3, 30),
            };

            _reportSettingService.GetSetting(PermissionKeys.ReportAbnormalBet, SessionService.LicenseeSession.LicenseeName).
                Returns(reportSetting);
            _sportService.GetSportAndProductAndSabaSport(SessionService.LicenseeSession.LicenseeId, SessionService.UserSession.Language, Product.SB).Returns(new List<SportProductItem>());

            return new AbnormalBetReportController(_reportSettingService, _sportService, _playerService, _betTypeService)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService
            };
        }
    }
}