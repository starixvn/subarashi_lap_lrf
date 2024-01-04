namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Controllers.Base.UnitTests;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.DTO.Configuration;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using NSubstitute;
    using NUnit.Framework;

    public class DailyBetsReportControllerTest : CultureBaseControllerHelperTest
    {
        private const int DefaultLimitedMonthRange = 6;

        private ILicenseeSettingService _licenseeSettingService;

        private ISportService _sportService;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            _licenseeSettingService = Substitute.For<ILicenseeSettingService>();
            _sportService = Substitute.For<ISportService>();

            SetUpDefaultFakeData();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();
            _licenseeSettingService = null;
            _sportService = null;
        }

        [TestCase("test", "test name", "test name")]
        [TestCase(Product.CS, "test name", "RNG")]
        public async Task Index_WhenCall_ReturnCorrectResult(string productCode, string productName, string expectedProductName)
        {
            // Arrange
            var productList = new List<Product> { new Product { ProductCode = productCode, ProductName = productName } };
            using (var controller = CreateController(productList))
            {
                // Action
                var result = (await controller.Index()) as ViewResult;
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
        public async Task Index_LicenseeSettingHasTimeZone_ReturnsViewModelWithCorrectTime()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var licenseeSetting = new FakeLicenseeSetting { TimeZone = 1, LimitRecentMonths = 1 };
                _licenseeSettingService.GetFakeLicenseeSetting(DefaultLicenseeSession.LicenseeName).Returns(licenseeSetting);
                var expectedTodatGtm8 = DateTimeHelper.UtcNow.AddHours(licenseeSetting.TimeZone.Value);
                var expectedMinDate = expectedTodatGtm8.AddMonths(-licenseeSetting.LimitRecentMonths);

                // Action
                var result = ((await controller.Index()) as ViewResult).Model as DailyBetsViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.AreEqual(expectedTodatGtm8.Date, result.TodayByGmt8.Date);
                    Assert.AreEqual(expectedMinDate.Date, result.MinDate.Date);
                });
            }
        }

        [Test]
        public async Task Index_LicenseeSettingIsNull_ReturnsViewModelWithCorrectTime()
        {
            using (var controller = CreateController())
            {
                // Arrange
                FakeLicenseeSetting licenseeSetting = null;
                _licenseeSettingService.GetFakeLicenseeSetting(DefaultLicenseeSession.LicenseeName).Returns(licenseeSetting);
                var expectedTodatGtm8 = DateTimeHelper.Now;
                var expectedMinDate = expectedTodatGtm8.AddMonths(-DefaultLimitedMonthRange);

                // Action
                var result = ((await controller.Index()) as ViewResult).Model as DailyBetsViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.AreEqual(expectedTodatGtm8.Date, result.TodayByGmt8.Date);
                    Assert.AreEqual(expectedMinDate.Date, result.MinDate.Date);
                });
            }
        }

        [Test]
        public async Task Index_LicenseeSettingNotHasTimeZone_ReturnsViewModelWithCorrectTime()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var licenseeSetting = new FakeLicenseeSetting() { LimitRecentMonths = 1 };
                _licenseeSettingService.GetFakeLicenseeSetting(DefaultLicenseeSession.LicenseeName).Returns(licenseeSetting);
                var expectedTodatGtm8 = DateTimeHelper.Now;
                var expectedMinDate = expectedTodatGtm8.AddMonths(-licenseeSetting.LimitRecentMonths);

                // Action
                var result = ((await controller.Index()) as ViewResult).Model as DailyBetsViewModel;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.AreEqual(expectedTodatGtm8.Date, result.TodayByGmt8.Date);
                    Assert.AreEqual(expectedMinDate.Date, result.MinDate.Date);
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

            return new DailyBetsReportController(_sportService)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService,
                ProductServiceInstance = productService,
                LicenseeSettingServiceInstance = _licenseeSettingService
            };
        }
    }
}