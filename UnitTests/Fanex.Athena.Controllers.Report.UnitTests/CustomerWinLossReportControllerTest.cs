namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Base.UnitTests;
    using Fanex.Athena.Controllers.Base;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;
    using Model.Core.DTO.Configuration;
    using Model.Report.ViewModel;
    using NSubstitute;
    using NUnit.Framework;
    using Report;

    [TestFixture]
    public class CustomerWinLossReportControllerTest : CultureBaseControllerHelperTest
    {
        private IReportAPIClient _reportApiClient;

        private const int TimeOutInSecond = 180;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            SetUpDefaultFakeData();
        }

        [Test]
        public void Index_WhenGet_ReturnCorrectViewResult()
        {
            using (var controller = CreateController())
            {
                // Action
                var viewResult = controller.Index() as ViewResult;
                var viewModel = viewResult.Model as CustomerWinLossViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(viewResult.ViewName, Is.EqualTo("~/Views/Desktop/Report/CustomerWinLoss/Main.cshtml"));
                    Assert.That(viewModel.IsHistory, Is.False);
                });
            }
        }

        [Test]
        public void History_WhenGet_ReturnCorrectViewResult()
        {
            using (var controller = CreateController())
            {
                // Action
                var viewResult = controller.History() as ViewResult;
                var viewModel = viewResult.Model as CustomerWinLossViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(viewResult.ViewName, Is.EqualTo("~/Views/Desktop/Report/CustomerWinLoss/Main.cshtml"));
                    Assert.That(viewModel.IsHistory, Is.True);
                });
            }
        }

        [Test]
        public async Task PostIndex_ExportExcel_ReturnCorrectFileContentResult()
        {
            // Arrange
            var language = SessionService.UserSession.Language;
            var expectedResponseData = new Tuple<Stream, string>(new MemoryStream(new byte[] { 1 }), "application/octet-stream");

            var metaModel = new CustomerWinLossMetaModel { IsExportExcel = true };

            using (var controller = CreateController())
            {
                _reportApiClient.PostAsync("api/CustomerWinLoss/ExportExcel", metaModel, language, timeOut: TimeOutInSecond)
                    .Returns(expectedResponseData);

                // Action
                var result = await controller.Index(metaModel) as FileStreamResult;

                // Assert
                Assert.That(result.FileStream, Is.EqualTo(expectedResponseData.Item1));
                Assert.That(result.ContentType, Is.EqualTo(expectedResponseData.Item2));
            }
        }

        [Test]
        public async Task PostIndex_GetData_ReturnCorrectResult()
        {
            // Arrange
            var userSession = SessionService.UserSession;

            using (var controller = CreateController())
            {
                const string ExpectedResult = "json result";
                _reportApiClient.PostStringAsync("api/CustomerWinLoss/Index",
                    Arg.Any<CustomerWinLossMetaModel>(), userSession.Language, TimeOutInSecond).Returns(ExpectedResult);

                // Action
                var result = await controller.Index(new CustomerWinLossMetaModel()) as JsonNetResult;

                // Assert
                Assert.That(result, Is.Not.Null);
            }
        }

        private CustomerWinLossReportController CreateController(ProductAccess expectedProductAccess = null,
            ILicenseeSettingService stubLicenseeSettingService = null)
        {
            var reportSettingService = Substitute.For<IReportSettingService>();
            reportSettingService.GetSetting(PermissionKeys.ReportCustomerWinLoss, Arg.Any<string>()).Returns(new ReportSetting());

            var productService = Substitute.For<IProductService>();
            productService.GetSingleWalletProductAccess(
                SessionService.LicenseeSession.LicenseeId,
                SessionService.UserSession.Language,
                FunctionNames.CustomerWinLoss).Returns(expectedProductAccess ?? new ProductAccess(new List<Product>()));

            var licenseeSettingService = stubLicenseeSettingService ?? Substitute.For<ILicenseeSettingService>();
            _reportApiClient = Substitute.For<IReportAPIClient>();

            return new CustomerWinLossReportController(reportSettingService, _reportApiClient)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService,
                ProductServiceInstance = productService,
                LicenseeSettingServiceInstance = licenseeSettingService
            };
        }
    }
}