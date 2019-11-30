using System;
using System.Collections.Generic;
using System.IO;
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
            var language = SessionService.UserSession.Language;
            var metaModel = new PlayerWinLossMetaModel { IsExportExcel = true };

            var productAccess = new ProductAccess(
                    new List<Product> { new Product { ProductCode = Product.BA } });

            var expectedResponseData = new Tuple<Stream, string>(new MemoryStream(new byte[] { 1 }), "application/octet-stream");

            using (var controller = CreateController(productAccess))
            {
                _reportApiClient.PostAsync("api/CustomerWinLoss/ExportExcel", metaModel, language, MediaType.MsgPack).Returns(expectedResponseData);

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
            var metaModel = new PlayerWinLossMetaModel();

            using (var controller = CreateController())
            {
                const string ExpectedResult = "json result";
                _reportApiClient.PostStringAsync("api/CustomerWinLoss/Index", metaModel, userSession.Language).Returns(ExpectedResult);

                // Action
                var result = await controller.Index(metaModel) as JsonNetResult;

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

            var result = new PlayerWinLossController(
                productService,
                _reportApiClient);
            result.LangService = LangService;
            result.LicenseeSettingServiceInstance = licenseeSettingService;
            result.SessionServiceInstance = SessionService;

            return result;
        }
    }
}