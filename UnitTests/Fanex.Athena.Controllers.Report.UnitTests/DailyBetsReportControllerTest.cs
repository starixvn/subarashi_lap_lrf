namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Controllers.Base;
    using Fanex.Athena.Controllers.Base.UnitTests;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.DTO.Configuration;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using NSubstitute;
    using NUnit.Framework;

    public class DailyBetsReportControllerTest : CultureBaseControllerHelperTest
    {
        private const int DefaultLimitedMonthRange = 3;

        private IReportAPIClient _reportAPIClient;

        private ILicenseeSettingService _licenseeSettingService;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            _reportAPIClient = Substitute.For<IReportAPIClient>();
            _licenseeSettingService = Substitute.For<ILicenseeSettingService>();

            SetUpDefaultFakeData();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();
            _reportAPIClient = null;
            _licenseeSettingService = null;
        }

        [TearDown]
        public void TearDown()
        {
            _reportAPIClient.ClearReceivedCalls();
        }

        [TestCase("test", "test name", "test name")]
        [TestCase(Product.CS, "test name", "RNG")]
        public void Index_WhenCall_ReturnCorrectResult(string productCode, string productName, string expectedProductName)
        {
            // Arrange
            var productList = new List<Product> { new Product { ProductCode = productCode, ProductName = productName } };
            using (var controller = CreateController(productList))
            {
                // Action
                var result = controller.Index() as ViewResult;
                var model = result.Model as DailyBetsViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(model.ProductOptions.Count, Is.EqualTo(productList.Count));
                    Assert.That(model.ProductOptions.First().Name, Is.EqualTo(expectedProductName));
                    Assert.That(model.CurrencyList, Is.EqualTo(DefaultUserSession.CurrencyList));

                    Assert.That(result.ViewName, Is.EqualTo("~/Views/Desktop/Report/DailyBets/Index.cshtml"));
                });
            }
        }

        [Test]
        public void Index_LicenseeSettingHasTimeZone_ReturnsViewModelWithCorrectTime()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var licenseeSetting = new FakeLicenseeSetting { TimeZone = 1 };
                _licenseeSettingService.GetFakeLicenseeSetting(DefaultLicenseeSession.LicenseeName).Returns(licenseeSetting);
                var expectedTodatGtm8 = DateTime.UtcNow.AddHours(licenseeSetting.TimeZone.Value);
                var expectedMinDate = expectedTodatGtm8.AddMonths(-licenseeSetting.LimitRecentMonths);

                // Action
                var result = (controller.Index() as ViewResult).Model as DailyBetsViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.AreEqual(expectedTodatGtm8.Date, result.TodayByGmt8.Date);
                    Assert.AreEqual(expectedMinDate.Date, result.MinDate.Date);
                });
            }
        }

        [Test]
        public void Index_LicenseeSettingIsNull_ReturnsViewModelWithCorrectTime()
        {
            using (var controller = CreateController())
            {
                // Arrange
                FakeLicenseeSetting licenseeSetting = null;
                _licenseeSettingService.GetFakeLicenseeSetting(DefaultLicenseeSession.LicenseeName).Returns(licenseeSetting);
                var expectedTodatGtm8 = DateTime.Now;
                var expectedMinDate = expectedTodatGtm8.AddMonths(-DefaultLimitedMonthRange);

                // Action
                var result = (controller.Index() as ViewResult).Model as DailyBetsViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.AreEqual(expectedTodatGtm8.Date, result.TodayByGmt8.Date);
                    Assert.AreEqual(expectedMinDate.Date, result.MinDate.Date);
                });
            }
        }

        [Test]
        public void Index_LicenseeSettingNotHasTimeZone_ReturnsViewModelWithCorrectTime()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var licenseeSetting = new FakeLicenseeSetting();
                _licenseeSettingService.GetFakeLicenseeSetting(DefaultLicenseeSession.LicenseeName).Returns(licenseeSetting);
                var expectedTodatGtm8 = DateTime.Now;
                var expectedMinDate = expectedTodatGtm8.AddMonths(-licenseeSetting.LimitRecentMonths);

                // Action
                var result = (controller.Index() as ViewResult).Model as DailyBetsViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.AreEqual(expectedTodatGtm8.Date, result.TodayByGmt8.Date);
                    Assert.AreEqual(expectedMinDate.Date, result.MinDate.Date);
                });
            }
        }

        [Test]
        public async Task IndexPost_NotExportExcel_ReturnsJsonResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new DailyBetsMetaModel
                {
                    IsExportExcel = false
                };

                // Action
                var result = await controller.Index(metaModel);

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.IsInstanceOf<JsonNetResult>(result);
                    _reportAPIClient.Received(1).PostStringAsync("api/DailyBets/Index", metaModel, DefaultUserSession.Language);
                });
            }
        }

        [Test]
        public async Task IndexPost_ExportExcel_ReturnsCorrectFileContent()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new DailyBetsMetaModel
                {
                    IsExportExcel = true
                };

                var expectedFileContent = new Tuple<Stream, string>(new MemoryStream(new byte[] { 1 }), "application/octet-stream");
                _reportAPIClient.PostAsync("api/DailyBets/Export", metaModel, DefaultUserSession.Language).Returns(expectedFileContent);

                // Action
                var result = await controller.Index(metaModel) as FileStreamResult;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.FileStream, Is.EqualTo(expectedFileContent.Item1));
                    Assert.That(result.ContentType, Is.EqualTo(expectedFileContent.Item2));
                });
            }
        }

        private DailyBetsReportController CreateController(IList<Product> productList = null)
        {
            var productService = Substitute.For<IProductService>();
            productService.GetSingleWalletProductAccess(
                DefaultLicenseeSession.LicenseeId,
                DefaultUserSession.Language,
                FunctionNames.DailyBets).ReturnsForAnyArgs(new ProductAccess(productList ?? new List<Product>()));

            return new DailyBetsReportController(_reportAPIClient)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService,
                ProductServiceInstance = productService,
                LicenseeSettingServiceInstance = _licenseeSettingService
            };
        }
    }
}