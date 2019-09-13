namespace Fanex.Athena.Controllers.TotalBets.UnitTests
{
    using System.Collections.Generic;
    using System.IO;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Base.UnitTests;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel.Api;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;
    using Model.Core.DTO.Configuration;
    using Model.Report.ViewModel;
    using Newtonsoft.Json;
    using NSubstitute;
    using NUnit.Framework;
    using Report;

    [TestFixture]
    public class CustomerWinLossReportControllerTest : CultureBaseControllerHelperTest
    {
        private IReportAPIClient _reportApiClient;

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
        public async Task PostIndex_ExportExcel_MetaModelIsAssignedCorrectly()
        {
            // Arrange
            StubLicenseeSessionData(new Model.Auth.LicenseeAuthInfo
            {
                LicenseeId = 100,
                LicenseeName = "Spondemo",
                IsAllowedCustomerComm = true
            });
            var licenseeSession = SessionService.LicenseeSession;
            var userSession = SessionService.UserSession;
            var expectedLanguage = userSession.Language;

            var productAccess = new ProductAccess(
                    new List<Product> { new Product { ProductCode = Product.BA } });

            var licenseeSettingService = Substitute.For<ILicenseeSettingService>();
            licenseeSettingService.IsFakeLicensee(licenseeSession.LicenseeName).Returns(true);

            using (var controller = CreateController(productAccess, licenseeSettingService))
            {
                _reportApiClient.PostAsyncStream(Arg.Any<string>(),
                Arg.Any<CustomerWinLossMetaModel>(), Arg.Any<string>())
                .Returns(Task.FromResult<Stream>(new MemoryStream(0)));

                // Action
                await controller.Index(new CustomerWinLossMetaModel { IsExportExcel = true });

                // Assert
                Assert.Multiple(() =>
                {
                    _reportApiClient.Received(1).PostAsyncStream(
                    Arg.Is<string>(x => x == "api/CustomerWinLoss/ExportExcel"),
                        Arg.Is<CustomerWinLossMetaModel>(x =>
                        x.IsAllowedCustomerComm && x.IsAllowBA && !x.SystemIdVisible),
                        Arg.Is<string>(x => x == expectedLanguage));
                });
            }
        }

        [Test]
        public async Task PostIndex_GetData_ReturnCorrectResult()
        {
            // Arrange
            var licenseeSession = SessionService.LicenseeSession;
            var userSession = SessionService.UserSession;

            using (var controller = CreateController())
            {
                var expectedResult = new CustomerWinLossApiViewModel();
                _reportApiClient.PostAsync<CustomerWinLossApiViewModel>("api/CustomerWinLoss/Index",
                    Arg.Any<CustomerWinLossMetaModel>(), userSession.Language).Returns(expectedResult);

                // Action
                var result = await controller.Index(new CustomerWinLossMetaModel()) as ContentResult;

                // Assert
                Assert.That(result.Content, Is.EqualTo(JsonConvert.SerializeObject(expectedResult)));
                Assert.That(result.ContentType, Is.EqualTo("application/json"));
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

            return new CustomerWinLossReportController(
                LangService,
                SessionService,
                productService,
                reportSettingService,
                licenseeSettingService,
                _reportApiClient);
        }
    }
}