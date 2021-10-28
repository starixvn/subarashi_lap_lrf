namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Base.UnitTests;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.DTO.Configuration;
    using Fanex.Athena.Model.Core.MetaModel.Product;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using NSubstitute;

    using NUnit.Framework;

    [TestFixture]
    public class LeagueWinLossReportControllerTest : CultureBaseControllerHelperTest
    {
        private IReportAPIClient _reportAPIClient;
        private IReportSettingService _reportSettingService;
        private IProductService _productService;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();
            _reportAPIClient = Substitute.For<IReportAPIClient>();
            _reportSettingService = Substitute.For<IReportSettingService>();
            _productService = Substitute.For<IProductService>();
            SetUpDefaultFakeData();
        }

        [Test]
        public void Index_WhenCall_ReturnCorrectViewResult()
        {
            using (var controller = CreateController())
            {
                // Action
                var viewResult = controller.Index() as ViewResult;
                var viewModel = viewResult.Model as LeagueWinLossMetaModel;

                // Assert
                StringAssert.Contains("~/Views/Desktop/Report/LeagueWinLoss/Main.cshtml", viewResult.ViewName);
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
                _reportSettingService.Received(1).GetSetting(PermissionKeys.ReportLeagueWinLoss,
                SessionService.LicenseeSession.LicenseeName);
            }
        }

        [Test]
        public async Task Index_WhenCall_CallCorrectApi()
        {
            // Arrange
            var metaModel = CreateMetaModel(false);
            const int TimeOut = 300;

            using (var controller = CreateController())
            {
                // Action
                var result = await controller.Index(metaModel);

                // Assert
                Assert.Multiple(async () =>
                {
                    await _reportAPIClient.Received().PostStringAsync("api/LeagueWinLoss/GetMainData", metaModel, SessionService.UserSession.Language, TimeOut);
                });
            }
        }

        [Test]
        public async Task CurrencyData_WhenCall_CallCorrectApi()
        {
            // Arrange
            var metaModel = CreateMetaModel(false);

            using (var controller = CreateController())
            {
                // Action
                var result = await controller.CurrencyData(metaModel);

                // Assert
                Assert.Multiple(async () =>
                {
                    await _reportAPIClient.Received().PostStringAsync("api/LeagueWinLoss/GetCurrencyData", metaModel, SessionService.UserSession.Language);
                });
            }
        }

        private static LeagueWinLossMetaModel CreateMetaModel(bool isExportExcel = false)
        {
            return new LeagueWinLossMetaModel
            {
                DrillDownLevel = 0,
                CurrencyIdList = "1",
                CurrencyId = 1,
                IsExportExcel = isExportExcel,
                ProductOptions = new List<ProductOption>
                {
                    new ProductOption
                    {
                        Code = "SB",
                        Status = true
                    }
                },
                ProductCodeList = "SB"
            };
        }

        private LeagueWinLossReportController CreateController()
        {
            var reportSetting = new ReportSetting
            {
                MinDate = new DateTime(2021, 2, 15),
                MaxDate = new DateTime(2021, 3, 30),
            };

            _reportSettingService.GetSetting(PermissionKeys.ReportLeagueWinLoss, SessionService.LicenseeSession.LicenseeName).
                Returns(reportSetting);

            var productList = new List<Product>
                {
                    new Product
                    {
                       ProductCode = Product.AB
                    }
                };

            _productService.GetSingleWalletProductAccess(SessionService.LicenseeSession.LicenseeId, SessionService.UserSession.Language, FunctionNames.LeagueWinLoss).
                Returns(new ProductAccess(productList));

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

            return new LeagueWinLossReportController(_reportSettingService, _reportAPIClient)
            {
                SessionServiceInstance = SessionService,
                LangService = LangService,
                LicenseeSettingServiceInstance = Substitute.For<ILicenseeSettingService>(),
                AppSettingInstance = AppSettings,
                ProductServiceInstance = _productService
            };
        }
    }
}