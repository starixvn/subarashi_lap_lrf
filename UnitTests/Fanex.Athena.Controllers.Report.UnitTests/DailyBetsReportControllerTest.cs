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
    using Fanex.Athena.Model.Core.MetaModel.Product;
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
            _licenseeSettingService.ClearReceivedCalls();
        }

        [Test]
        public void Index_WhenCall_ReturnsDailyBetsReportView()
        {
            using (var controller = CreateController())
            {
                // Action
                var result = controller.Index() as ViewResult;

                // Assert
                StringAssert.Contains("Views/Desktop/Report/DailyBets/Index.cshtml", result.ViewName);
            }
        }

        [Test]
        public void Index_WhenCall_ReturnsViewModelWithCorrectCurrencyList()
        {
            using (var controller = CreateController())
            {
                // Action
                var result = (controller.Index() as ViewResult).Model as DailyBetsViewModel;

                // Assert
                Assert.That(result.CurrencyList, Is.EqualTo(SessionService.UserSession.CurrencyList));
            }
        }

        [Test]
        public void Index_LicenseeSettingHasTimeZone_ReturnsViewModelWithCorrectTime()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var licenseeSetting = new FakeLicenseeSetting();
                licenseeSetting.TimeZone = 1;
                _licenseeSettingService.GetFakeLicenseeSetting(SessionService.LicenseeSession.LicenseeName).Returns(licenseeSetting);
                var expectedTodatGtm8 = DateTime.UtcNow.AddHours(licenseeSetting.TimeZone.Value);
                var expectedMinDate = expectedTodatGtm8.AddMonths(-licenseeSetting.LimitRecentMonths);

                // Action
                var result = (controller.Index() as ViewResult).Model as DailyBetsViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.AreEqual(expectedTodatGtm8.Date, result.TodayByGmt8.Date);
                    Assert.AreEqual(expectedTodatGtm8.Hour, result.TodayByGmt8.Hour);
                    Assert.AreEqual(expectedTodatGtm8.Minute, result.TodayByGmt8.Minute);
                    Assert.AreEqual(expectedTodatGtm8.Second, result.TodayByGmt8.Second);
                    Assert.AreEqual(expectedMinDate.Date, result.MinDate.Date);
                    Assert.AreEqual(expectedMinDate.Hour, result.MinDate.Hour);
                    Assert.AreEqual(expectedMinDate.Minute, result.MinDate.Minute);
                    Assert.AreEqual(expectedMinDate.Second, result.MinDate.Second);
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
                _licenseeSettingService.GetFakeLicenseeSetting(SessionService.LicenseeSession.LicenseeName).Returns(licenseeSetting);
                var expectedTodatGtm8 = DateTime.Now;
                var expectedMinDate = expectedTodatGtm8.AddMonths(-DefaultLimitedMonthRange);

                // Action
                var result = (controller.Index() as ViewResult).Model as DailyBetsViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.AreEqual(expectedTodatGtm8.Date, result.TodayByGmt8.Date);
                    Assert.AreEqual(expectedTodatGtm8.Hour, result.TodayByGmt8.Hour);
                    Assert.AreEqual(expectedTodatGtm8.Minute, result.TodayByGmt8.Minute);
                    Assert.AreEqual(expectedTodatGtm8.Second, result.TodayByGmt8.Second);
                    Assert.AreEqual(expectedMinDate.Date, result.MinDate.Date);
                    Assert.AreEqual(expectedMinDate.Hour, result.MinDate.Hour);
                    Assert.AreEqual(expectedMinDate.Minute, result.MinDate.Minute);
                    Assert.AreEqual(expectedMinDate.Second, result.MinDate.Second);
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
                _licenseeSettingService.GetFakeLicenseeSetting(SessionService.LicenseeSession.LicenseeName).Returns(licenseeSetting);
                var expectedTodatGtm8 = DateTime.Now;
                var expectedMinDate = expectedTodatGtm8.AddMonths(-licenseeSetting.LimitRecentMonths);

                // Action
                var result = (controller.Index() as ViewResult).Model as DailyBetsViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.AreEqual(expectedTodatGtm8.Date, result.TodayByGmt8.Date);
                    Assert.AreEqual(expectedTodatGtm8.Hour, result.TodayByGmt8.Hour);
                    Assert.AreEqual(expectedTodatGtm8.Minute, result.TodayByGmt8.Minute);
                    Assert.AreEqual(expectedTodatGtm8.Second, result.TodayByGmt8.Second);
                    Assert.AreEqual(expectedMinDate.Date, result.MinDate.Date);
                    Assert.AreEqual(expectedMinDate.Hour, result.MinDate.Hour);
                    Assert.AreEqual(expectedMinDate.Minute, result.MinDate.Minute);
                    Assert.AreEqual(expectedMinDate.Second, result.MinDate.Second);
                });
            }
        }

        [Test]
        public void Index_WhenCall_ReturnsViewModelWithCorrectProductOptions()
        {
            var productIdList = new List<int> { ProductTypes.AgCasino };
            using (var controller = CreateController(productIdList))
            {
                // Arrange
                var productList = productIdList.Select(x => new Product { ProductID = x });
                var expectedProductOptions = productList.Select(i => new ProductOption
                {
                    Code = i.ProductCode,
                    Name = i.ProductCode.Equals(Product.CS, StringComparison.InvariantCultureIgnoreCase) ? "RNG" : i.ProductName,
                    Status = true
                }).ToList();

                // Action
                var result = (controller.Index() as ViewResult).Model as DailyBetsViewModel;

                // Assert
                Assert.AreEqual(expectedProductOptions, result.ProductOptions);
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
                    _reportAPIClient.Received(1).PostAsyncString("api/DailyBets/Index", metaModel, SessionService.UserSession.Language);
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

                var expectedFileContent = new Tuple<MemoryStream, string>(new MemoryStream(new byte[] { 1 }), "application/octet-stream");
                _reportAPIClient.PostAsync("api/DailyBets/Export", metaModel, SessionService.UserSession.Language).Returns(expectedFileContent);

                // Action
                var result = await controller.Index(metaModel) as FileStreamResult;

                // Assert
                Assert.That(result.FileStream, Is.EqualTo(expectedFileContent.Item1));
                Assert.That(result.ContentType, Is.EqualTo(expectedFileContent.Item2));
            }
        }

        private DailyBetsReportController CreateController(IEnumerable<int> productIdList = null)
        {
            var productList = productIdList == null ?
                new List<Product>() :
                productIdList.Select(x => new Product { ProductID = x });

            var productService = Substitute.For<IProductService>();
            productService.GetSingleWalletProductAccess(
                SessionService.LicenseeSession.LicenseeId,
                SessionService.UserSession.Language,
                FunctionNames.DailyBets).ReturnsForAnyArgs(new ProductAccess(productList.ToList()));

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