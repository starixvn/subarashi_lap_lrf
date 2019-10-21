using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Mvc;
using Fanex.Athena.Controllers.Base;
using Fanex.Athena.Controllers.Base.UnitTests;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.Controllers;
using Fanex.Athena.Module.PlayerAdmin.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.ViewModels;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Controllers
{
    [TestFixture]
    public class PlayerWinLossControllerTest : CultureBaseControllerHelperTest
    {
        private IReportAPIClient _reportApiClient;

        [SetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            SetUpDefaultFakeData();
        }

        [Test]
        public void Index_WhenGet_ReturnCorrectViewResult()
        {
            // Arrange
            const string UserName = "test01";
            const string CurrencyName = "UUS";
            var productAccess = new ProductAccess(
                    new List<Product> { new Product { ProductCode = Product.SB },
                        new Product { ProductCode = Product.CS },
                    new Product { ProductCode = Product.BA }});

            const string ExpectedProductCodeString = "SB,CS,BA";

            using (var controller = CreateController(productAccess))
            {
                // Action
                var viewResult = controller.Index(UserName, CurrencyName) as ViewResult;
                var viewModel = viewResult.Model as PlayerFastCrossLinkViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(viewResult.ViewName, Is.EqualTo("~/Views/Desktop/Module/PlayerAdmin/PlayerWinLoss/Index.cshtml"));
                    Assert.That(viewModel.UserName, Is.EqualTo(UserName));
                    Assert.That(viewModel.CurrencyName, Is.EqualTo(CurrencyName));
                    Assert.That(viewModel.ProductCodeListString, Is.EqualTo(ExpectedProductCodeString));
                    Assert.That(viewModel.IsAllowedCustomerCommission, Is.False);
                    Assert.That(viewModel.IsAllowedBA, Is.True);
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
                _reportApiClient.PostAsync(Arg.Any<string>(),
                Arg.Any<PlayerWinLossMetaModel>(), Arg.Any<string>())
                .Returns(new HttpResponseMessage { Content = new ByteArrayContent(new byte[] { 1 }) });

                // Action
                await controller.Index(new PlayerWinLossMetaModel { IsExportExcel = true });

                // Assert
                Assert.Multiple(() =>
                {
                    _reportApiClient.Received(1).PostAsync(
                    Arg.Is<string>(x => x == "api/CustomerWinLoss/ExportExcel"),
                        Arg.Is<PlayerWinLossMetaModel>(x =>
                        x.IsAllowedCustomerComm && x.IsAllowBA && !x.SystemIdVisible),
                        Arg.Is<string>(x => x == expectedLanguage),
                        MediaType.MsgPack);
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
                const string ExpectedResult = "json result";
                _reportApiClient.PostAsyncString("api/CustomerWinLoss/Index",
                    Arg.Any<PlayerWinLossMetaModel>(), userSession.Language).Returns(ExpectedResult);

                // Action
                var result = await controller.Index(new PlayerWinLossMetaModel()) as JsonNetResult;

                // Assert
                Assert.That(result, Is.Not.Null);
            }
        }

        private PlayerWinLossController CreateController(ProductAccess expectedProductAccess = null,
            ILicenseeSettingService stubLicenseeSettingService = null)
        {
            var productService = Substitute.For<IProductService>();
            productService.GetSingleWalletProductAccess(
                SessionService.LicenseeSession.LicenseeId,
                SessionService.UserSession.Language,
                FunctionNames.CustomerWinLoss).Returns(expectedProductAccess ?? new ProductAccess(new List<Product>()));

            var licenseeSettingService = stubLicenseeSettingService ?? Substitute.For<ILicenseeSettingService>();
            _reportApiClient = Substitute.For<IReportAPIClient>();

            return new PlayerWinLossController(
                LangService,
                SessionService,
                productService,
                _reportApiClient,
                licenseeSettingService);
        }
    }
}