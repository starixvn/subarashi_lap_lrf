namespace Fanex.Athena.Api.Report.UnitTests
{
    using System;
    using System.Threading.Tasks;

    using Base.UnitTests;

    using DataAccess.Report.Interfaces;

    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Model.Core.DataDomain;
    using Model.Core.DTO.Configuration;
    using Model.Report.MetaModel;

    using NSubstitute;

    using NUnit.Framework;

    public class ExchangeWinLossReportControllerTest : BaseApiControllerHelperTest
    {
        private readonly DateTime _minDate = new DateTime(2018, 2, 3);
        private readonly DateTime _maxDate = new DateTime(2018, 8, 7);

        private IReportSettingService _reportSettingService;
        private IExchangeWinLossDataAccess _dataAccess;
        private ExchangeWinLossReportController _controller;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();
            _reportSettingService = Substitute.For<IReportSettingService>();
            _reportSettingService.GetSetting(PermissionKeys.ReportExchangeWinLoss, Arg.Any<string>()).Returns(new ReportSetting
            {
                MinDate = _minDate,
                MaxDate = _maxDate
            });

            _dataAccess = Substitute.For<IExchangeWinLossDataAccess>();
            CreateController();

            MockSessionData();
        }

        private void CreateController()
        {
            _controller = new ExchangeWinLossReportController(
                            LangService,
                            _reportSettingService,
                            _dataAccess)
            {
                SessionService = SessionService,
                ProductService = ProductService
            };
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _controller = null;
            _dataAccess = null;
        }

        [Test]
        public async Task Index_InvalidModel_ReturnEmptyData()
        {
            // Arrange
            var model = new ExchangeWinLossMetaModel
            {
                FromDate = DateTime.Now,
                ToDate = DateTime.Now.AddDays(-1),
                CurrencyId = -100
            };

            // Action
            var result = await _controller.Index(model);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.IsEmpty(result.DataList);
                Assert.IsEmpty(result.TotalDataList);
                Assert.IsEmpty(result.SummaryTotal);
            });
        }

        [Test]
        public async Task Index_Level0_GetMainDataAsync()
        {
            // Arrange
            var model = new ExchangeWinLossMetaModel
            {
                CurrencyId = 1,
                Level = 0,
                FromDate = _minDate,
                ToDate = _minDate
            };

            // Action
            await _controller.Index(model);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(model.LicenseeId, Is.EqualTo(SessionLicenseeId));
                _dataAccess.Received().GetMainWinloss(model, SessionService.UserSession.CurrencyList);
            });
        }

        [Test]
        public async Task Index_Level2_GetCustomerDataAsync()
        {
            // Arrange
            var model = new ExchangeWinLossMetaModel
            {
                CurrencyId = 1,
                Level = 2,
                FromDate = _minDate,
                ToDate = _minDate
            };

            // Action
            await _controller.Index(model);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(model.LicenseeId, Is.EqualTo(SessionLicenseeId));
                _dataAccess.Received().GetCustomerWinloss(model, SessionService.UserSession.CurrencyList);
            });
        }

        [Test]
        public async Task Index_Level1AndIsNotOneTwoBet_GetCustomerDataAsync()
        {
            // Arrange
            const int LicenseeId = LicenseeIdentity.OneTwoBet + 1;
            StubLicenseeSessionData(new LicenseeAuthInfo
            {
                LicenseeId = LicenseeId
            });

            var model = new ExchangeWinLossMetaModel
            {
                CurrencyId = 1,
                Level = 1,
                FromDate = _minDate,
                ToDate = _minDate
            };

            // Action
            await _controller.Index(model);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(model.LicenseeId, Is.EqualTo(LicenseeId));
                _dataAccess.Received().GetCustomerWinloss(model, SessionService.UserSession.CurrencyList);
            });
        }

        [Test]
        public async Task Index_Level1AndIsOneTwoBet_GetLicenseeDataAsync()
        {
            // Arrange
            StubLicenseeSessionData(new LicenseeAuthInfo
            {
                LicenseeId = LicenseeIdentity.OneTwoBet
            });

            var model = new ExchangeWinLossMetaModel
            {
                CurrencyId = 1,
                Level = 1,
                FromDate = _minDate,
                ToDate = _minDate
            };

            // Action
            await _controller.Index(model);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(model.LicenseeId, Is.EqualTo(LicenseeIdentity.OneTwoBet));
                _dataAccess.Received().GetLicenseeWinloss(model, SessionService.UserSession.CurrencyList);
            });
        }
    }
}