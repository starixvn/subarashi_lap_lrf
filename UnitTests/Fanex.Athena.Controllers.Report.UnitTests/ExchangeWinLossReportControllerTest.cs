using Fanex.Athena.Extension.Utility;

namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Base.UnitTests;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Core.DTO.Configuration;
    using Model.Report.ViewModel;
    using NSubstitute;
    using NUnit.Framework;

    public class ExchangeWinLossReportControllerTest : CultureBaseControllerHelperTest
    {
        private readonly DateTime _minDate = DateTimeHelper.CreateDateTime(2017, 1, 1);
        private readonly DateTime _maxDate = DateTimeHelper.CreateDateTime(2018, 1, 3);

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            StubUserSessionData(DefaultUserSession);
            StubLicenseeSessionData(DefaultLicenseeSession);
        }

        [Test]
        public void Index_WhenGet_ReturnCorrectViewName()
        {
            using (var controller = CreateController())
            {
                // Action
                var viewResult = controller.Index() as ViewResult;

                // Assert
                Assert.That(viewResult.ViewName, Is.EqualTo("~/Views/Desktop/Report/ExchangeWinLoss/Main.cshtml"));
            }
        }

        [Test]
        public void Index_WhenGet_ReturnCorrectViewModel()
        {
            using (var controller = CreateController())
            {
                // Action
                var viewResult = controller.Index() as ViewResult;
                var model = (ExchangeWinLossViewModel)viewResult.Model;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(model.MinDate, Is.EqualTo(_minDate));
                    Assert.That(model.MaxDate, Is.EqualTo(_maxDate));
                });
            }
        }

        private ExchangeWinLossReportController CreateController()
        {
            var reportSettingService = Substitute.For<IReportSettingService>();
            var currencyService = Substitute.For<ICurrencyService>();
            reportSettingService.GetSetting(PermissionKeys.ReportExchangeWinLoss, Arg.Any<string>()).Returns(new ReportSetting
            {
                MinDate = _minDate,
                MaxDate = _maxDate
            });
            currencyService.GetBaseCurrencyList().Returns(new Dictionary<int, string>());

            var controller = Substitute.ForPartsOf<ExchangeWinLossReportController>(reportSettingService, Substitute.For<ISubsidiaryService>(), currencyService);
            controller.LangService = LangService;
            controller.SessionServiceInstance = SessionService;
            controller.AppSettingInstance = Substitute.For<IAppSettings>();

            return controller;
        }
    }
}