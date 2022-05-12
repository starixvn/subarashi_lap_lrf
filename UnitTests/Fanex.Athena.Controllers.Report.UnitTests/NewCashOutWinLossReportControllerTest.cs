namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Base.UnitTests;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Configuration;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Core.DTO.Common;
    using NSubstitute;
    using NUnit.Framework;

    [TestFixture]
    public class NewCashOutWinLossReportTest : CultureBaseControllerHelperTest
    {
        private IReportSettingService _reportSettingService;
        private ISubsidiaryService _subsidiaryService;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();
            _reportSettingService = Substitute.For<IReportSettingService>();
            _subsidiaryService = Substitute.For<ISubsidiaryService>();
            SetUpDefaultFakeData();
            StubUserSessionData(new UserAuthInfo { CurrencyAgentList = new Dictionary<int, int[]>(), CurrencyList = new Dictionary<int, string>() });
        }

        [Test]
        public void Index_WhenGet_ReturnCorrectViewResult()
        {
            // Arrange
            using (var controller = CreateController())
            {
                // Action
                var viewResult = controller.Index() as ViewResult;

                // Assert
                Assert.That(viewResult.ViewName, Is.EqualTo("~/Views/Desktop/Report/NewCashOutWinLoss/Main.cshtml"));
            }
        }

        private NewCashOutWinLossReportController CreateController()
        {
            var productService = Substitute.For<IProductService>();

            var reportSetting = new ReportSetting
            {
                MinDate = new DateTime(2021, 2, 15),
                MaxDate = new DateTime(2021, 3, 30),
            };

            _reportSettingService.GetSetting(PermissionKeys.ReportNewCashOutWinLoss, SessionService.LicenseeSession.LicenseeName).
                Returns(reportSetting);

            var subsidiaryTree = new List<CheckedItem>();
            _subsidiaryService.GetSubsidiaryTree(DefaultUserSession, DefaultLicenseeSession.LicenseeName).Returns(subsidiaryTree);

            return new NewCashOutWinLossReportController(_reportSettingService, _subsidiaryService)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService,
                ProductServiceInstance = productService
            };
        }
    }
}