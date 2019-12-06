namespace Fanex.Athena.Api.Report.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Base.UnitTests;

    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.Report.Interfaces;

    using Model.Core.DataDomain;
    using Model.Report.DTO.SubsidiaryPerformance;
    using Model.Report.MetaModel;

    using NSubstitute;

    using NUnit.Framework;

    [TestFixture]
    public partial class SubsidiaryPerformanceReportControllerTest : BaseApiControllerHelperTest
    {
        private ISubsidiaryService _subsidiaryService;

        private ISubsidiaryPerformanceService _service;

        private SubsidiaryPerformanceReportController _controller;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();
            _subsidiaryService = Substitute.For<ISubsidiaryService>();
            _service = Substitute.For<ISubsidiaryPerformanceService>();
            CreateController();
            MockSessionData();
        }

        private void CreateController()
        {
            _controller = new SubsidiaryPerformanceReportController(LangService, _subsidiaryService, _service)
            {
                SessionService = SessionService,
                ProductService = ProductService
            };
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _service = null;
            _controller = null;
        }

        [TearDown]
        public void TearDown()
        {
            SessionService.ClearReceivedCalls();
            _subsidiaryService.ClearReceivedCalls();
            _service.ClearReceivedCalls();
        }

        [Test]
        public async Task Index_SubsidiaryView_DoNotCallServiceToGetSubsidiaryList()
        {
            // Arrange
            var metaModel = GetMetaModel();
            StubSingleWalletProductAccess(new[] { "SB", "BA" });
            SessionService.UserSession.Returns(new UserAuthInfo
            {
                SubsidiaryViewType = (byte)SubsidiaryViewType.NormalManagement,
                UserLevel = UserLevelType.Subsidiary,
                CurrencyAgentList = new Dictionary<int, int[]>()
            });

            var resultData = new SubsidiaryResultViewModel
            {
                Total = new Dictionary<string, SubsidiaryPerformanceBase>()
            };
            _service.GetData(Arg.Any<SubsidiaryPerformanceMetaModel>(), Arg.Any<IDictionary<int, string>>()).Returns(resultData);

            // Action
            await _controller.Index(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                _subsidiaryService.DidNotReceiveWithAnyArgs().GetCurrencyAgentList(Arg.Any<UserAuthInfo>(), Arg.Any<string>(), Arg.Any<string>(), Arg.Any<bool>(), 0);
            });
        }

        [Test]
        public async Task Index_LicenseeView_CallServiceToGetSubsidiaryList()
        {
            // Arrange
            var metaModel = GetMetaModel();
            StubSingleWalletProductAccess(new[] { "SB", "BA" });
            var user = new UserAuthInfo
            {
                SubsidiaryViewType = (byte)SubsidiaryViewType.NormalManagement,
                UserLevel = UserLevelType.Licensee,
                CurrencyAgentList = new Dictionary<int, int[]> { { 1, new[] { 1, 2, 3 } } },
                CurrencyList = new Dictionary<int, string> { { 1, "USD" }, { 2, "EUR" }, { 3, "VND" } }
            };
            SessionService.UserSession.Returns(user);

            var currencyAgentList = new Dictionary<int, IEnumerable<int>> { { 1, new[] { 1, 2, 3 } } };
            _subsidiaryService.GetCurrencyAgentList(Arg.Any<UserAuthInfo>(), Arg.Any<string>(), Arg.Any<string>(), Arg.Any<bool>(), 0)
                .Returns(currencyAgentList);

            var resultData = new SubsidiaryResultViewModel
            {
                Total = new Dictionary<string, SubsidiaryPerformanceBase>()
            };
            _service.GetData(Arg.Any<SubsidiaryPerformanceMetaModel>(), Arg.Any<IDictionary<int, string>>()).Returns(resultData);

            // Action
            await _controller.Index(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                _subsidiaryService.Received().GetCurrencyAgentList(user, SessionLicenseeName, metaModel.SubsidiaryList, metaModel.IsExcludeTest, 0);
            });
        }

        private static SubsidiaryPerformanceMetaModel GetMetaModel()
        {
            return new SubsidiaryPerformanceMetaModel
            {
                FromDate = new DateTime(2017, 8, 30),
                ToDate = new DateTime(2017, 8, 30),
                ProductCodeList = "SB,BA",
                SubsidiaryList = "New York,India",
                BaseCurrency = "USD",
            };
        }
    }
}