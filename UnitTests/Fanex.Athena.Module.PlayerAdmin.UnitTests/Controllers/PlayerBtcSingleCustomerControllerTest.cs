using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Mvc;
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
    public class PlayerBtcSingleCustomerControllerTest : CultureBaseControllerHelperTest
    {
        private IProductService _productService;

        private IBetListApiClient _betListApiClient;

        [SetUp]
        public void SetUp()
        {
            base.FixtureSetUp();

            SetUpDefaultFakeData();

            _productService = Substitute.For<IProductService>();
            _betListApiClient = Substitute.For<IBetListApiClient>();
        }

        [TearDown]
        public void TearDown()
        {
            _productService = null;
            _betListApiClient = null;
        }

        [Test]
        public void Index_WhenCall_ReturnCorrectViewInfo()
        {
            // Arrange
            const string UserName = "test01";
            const string CurrencyName = "UUS";
            var productAccess = new ProductAccess(
                    new List<Product> { new Product { ProductCode = Product.SB },
                        new Product { ProductCode = Product.CS }});

            const string ExpectedProductCodeString = "SB,CS";

            var expectedModel = new PlayerBtcSingleCustomerViewModel
            {
                UserName = UserName,
                CurrencyName = CurrencyName,
                IsAllowedCustomerComm = SessionService.LicenseeSession.IsAllowedCustomerComm,
                ProductCodeListString = ExpectedProductCodeString
            };

            using (var controller = CreateController(productAccess))
            {
                // Action
                var viewResult = controller.Index(UserName, CurrencyName) as ViewResult;
                var model = viewResult.Model as PlayerBtcSingleCustomerViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(viewResult.ViewName, Is.EqualTo("~/Views/Desktop/Module/PlayerAdmin/SingleCustomer/Index.cshtml"));
                    Assert.That(model.UserName, Is.EqualTo(expectedModel.UserName));
                    Assert.That(model.CurrencyName, Is.EqualTo(expectedModel.CurrencyName));
                    Assert.That(model.IsAllowedCustomerComm, Is.EqualTo(expectedModel.IsAllowedCustomerComm));
                    Assert.That(model.ProductCodeListString, Is.EqualTo(expectedModel.ProductCodeListString));
                });
            }
        }

        [Test]
        public async Task PostIndex_GetData_MetaModelIsAssignedCorrectly()
        {
            // Arrange
            PlayerBtcSingleCustomerMetaModel passedMetaModel = null;
            const byte AllPlatform = 0;
            var statusList = new[]
            {
                StatusTypes.Won, StatusTypes.Lose, StatusTypes.Draw, StatusTypes.Void,
                StatusTypes.AbnormalBet, StatusTypes.Reject, StatusTypes.Refund
            };
            var liveStatusList = new[] { LiveStatusTypes.NonLive, LiveStatusTypes.Live, LiveStatusTypes.Mix };

            var now = DateTime.Now;
            var metaModel = new PlayerBtcSingleCustomerMetaModel
            {
                IsExport = false
            };

            _betListApiClient.PostAsync<dynamic>("/BettingTicketCenter/GetBySingleCustomer", metaModel, SessionService.UserSession.Language)
                .Returns(x =>
                {
                    passedMetaModel = x.ArgAt<PlayerBtcSingleCustomerMetaModel>(1);

                    return new object();
                });

            using (var controller = CreateController())
            {
                // Action
                var result = await controller.Index(metaModel);

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(passedMetaModel.Status, Is.EqualTo(string.Join(",", statusList)));
                    Assert.That(passedMetaModel.Platform, Is.EqualTo(AllPlatform));
                    Assert.That(passedMetaModel.ProductCodeList, Is.Empty);
                    Assert.That(passedMetaModel.LiveStatus, Is.EqualTo(string.Join(",", liveStatusList)));
                    Assert.That(passedMetaModel.BaseCurrency, Is.Empty);
                    Assert.That(passedMetaModel.FromDate, Is.EqualTo(new DateTime(now.Year, now.Month, 1)));
                    Assert.That(passedMetaModel.ToDate.Date, Is.EqualTo(now.Date));
                });
            }
        }

        [Test]
        public async Task PostIndex_ExportExcelWithNoContent_ReturnCorrectResult()
        {
            // Arrange
            var metaModel = new PlayerBtcSingleCustomerMetaModel
            {
                IsExport = true
            };
            var expectedResponse = new HttpResponseMessage(HttpStatusCode.NoContent);
            _betListApiClient.PostAsync("/BettingTicketCenter/GetBySingleCustomer", metaModel, SessionService.UserSession.Language)
                .Returns(expectedResponse);

            using (var controller = CreateController())
            {
                // Action
                var result = await controller.Index(metaModel) as HttpStatusCodeResult;

                // Assert
                Assert.That(result.StatusCode, Is.EqualTo((int)HttpStatusCode.NoContent));
            }
        }

        private PlayerBtcSingleCustomerController CreateController(ProductAccess expectedProductAccess = null)
        {
            var productService = Substitute.For<IProductService>();
            productService.GetSingleWalletProductAccess(
                SessionService.LicenseeSession.LicenseeId,
                SessionService.UserSession.Language,
                FunctionNames.BettingTicketCenter).Returns(expectedProductAccess ?? new ProductAccess(new List<Product>()));

            var result = new PlayerBtcSingleCustomerController(_betListApiClient, productService);
            result.LangService = LangService;
            result.SessionServiceInstance = SessionService;

            return result;
        }
    }
}