namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Base.UnitTests;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Configuration;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Report.ViewModel;
    using NSubstitute;

    using NUnit.Framework;

    [TestFixture]
    public class GodOfFortuneWinLossReportControllerTest : CultureBaseControllerHelperTest
    {
        private IReportSettingService _reportSettingService;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();
            _reportSettingService = Substitute.For<IReportSettingService>();
            SetUpDefaultFakeData();
        }

        [Test]
        public void Index_WhenCall_ReturnCorrectViewResult()
        {
            using (var controller = CreateController())
            {
                // Action
                var viewResult = controller.Index() as ViewResult;
                var viewModel = viewResult.Model as GodOfFortuneWinLossViewModel;

                // Assert
                Assert.Multiple((TestDelegate)(() =>
                {
                    StringAssert.Contains("~/Views/Desktop/Report/GodOfFortuneWinLoss/Main.cshtml", viewResult.ViewName);
                    Assert.That(viewModel.Param.LicenseeId, Is.EqualTo((object)SessionService.LicenseeSession.LicenseeId));
                }));
            }
        }

        [Test]
        public void Index_WhenCall_GetReportSetting()
        {
            using (var controller = CreateController())
            {
                // Action
                var viewResult = controller.Index() as ViewResult;

                // Assert
                _reportSettingService.Received(1).GetSetting(PermissionKeys.ReportGodOfFortuneWinLoss,
                SessionService.LicenseeSession.LicenseeName);
            }
        }

        private GodOfFortuneWinLossReportController CreateController()
        {
            var reportSetting = new ReportSetting
            {
                MinDate = DateTimeHelper.CreateDateTime(2021, 2, 15),
                MaxDate = DateTimeHelper.CreateDateTime(2021, 3, 30),
            };

            _reportSettingService.GetSetting(PermissionKeys.ReportGodOfFortuneWinLoss, SessionService.LicenseeSession.LicenseeName).
                Returns(reportSetting);

            var userSession = new UserAuthInfo
            {
                CurrencyList = new Dictionary<int, string> {
                    {9, "AUD" },
                    {3, "USD" },
                    {20, "UUS" }
                },
                CurrencyAgentList = new Dictionary<int, int[]>{
                    {9, new[]{ 1,2,3} },
                    {3, new[]{ 1,2,3} },
                    {20, new[]{ 1,2,3} }
                },
                Language = "lan"
            };

            SessionService.UserSession.Returns(userSession);

            return new GodOfFortuneWinLossReportController(_reportSettingService)
            {
                SessionServiceInstance = SessionService,
                LangService = LangService,
                LicenseeSettingServiceInstance = Substitute.For<ILicenseeSettingService>(),
                AppSettingInstance = AppSettings,
            };
        }
    }
}