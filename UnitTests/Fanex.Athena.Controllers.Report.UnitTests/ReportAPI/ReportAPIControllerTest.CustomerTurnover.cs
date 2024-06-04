namespace Fanex.Athena.Controllers.Report.UnitTests.ReportAPI
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Base.UnitTests;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Core.DTO.Common;
    using Model.Core.ResultModel;
    using Model.Report.DTO;
    using Model.Report.MetaModel;
    using NSubstitute;
    using NUnit.Framework;
    using Report;
    using Service.Report.Interfaces;
    using UnitTest.Common.Helpers;

    [TestFixture]
    public partial class ReportAPIControllerTest : CultureBaseControllerHelperTest
    {
        private const int CurrencyId = 134;

        private IBetTypeService _betTypeService;
        private ICustomerTurnoverService _customerTurnoverService;
        private ITurnoverService _turnoverService;
        private ILicenseeSettingService _licenseeSettingService;
        private IDataPermissionService _dataPermissionService;

        [SetUp]
        public void SetUp()
        {
            _licenseeSettingService = Substitute.For<ILicenseeSettingService>();
        }

        [TearDown]
        public void TearDown()
        {
            _licenseeSettingService = null;
        }

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();
            _betTypeService = Substitute.For<IBetTypeService>();
            _customerTurnoverService = Substitute.For<ICustomerTurnoverService>();
            _turnoverService = Substitute.For<ITurnoverService>();
            _dataPermissionService = Substitute.For<IDataPermissionService>();
            SetUpDefaultFakeData();
        }

        [Test]
        public async Task GetBettypesBySport_EmptySport_ReturnCorrectViewResult()
        {
            using (var controller = CreateController())
            {
                // Action
                var result = await controller.GetBettypesBySport(new List<SportProductItem>()) as JsonResult;
                var resultData = result.Data as IEnumerable<BettypeProductItem>;

                // Assert
                Assert.That(resultData, Is.Empty);
            }
        }

        [Test]
        public async Task GetBettypesBySport_WhenCall_ReturnCorrectViewResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var sports = new List<SportProductItem>
                {
                    new SportProductItem()
                };
                var dataList = new List<BettypeProductItem>
                {
                    new BettypeProductItem()
                };

                _betTypeService.GetBettypes(
                    sports,
                    SessionService.UserSession.Language,
                    controller.IsHideSaba).Returns(dataList);

                // Action
                var result = await controller.GetBettypesBySport(sports) as JsonResult;
                var resultData = result.Data as IEnumerable<BettypeProductItem>;

                // Assert
                Assert.That(resultData, Is.EqualTo(dataList));
            }
        }

        [Test]
        public async Task CustomerTurnover_WhenCall_ReturnCorrectViewResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new CustomerTurnoverMetaModel
                {
                    CurrencyId = CurrencyId
                };
                var data = new ReportResultModel<CustTurnover>
                {
                    DataList = new List<CustTurnover>
                    {
                        new CustTurnover()
                    },
                    TotalData = new CustTurnover(),
                    TotalRows = 999
                };
                _customerTurnoverService.GetDataList(metaModel, UserCurrencyList, SessionService.UserSession.Language).Returns(data);

                // Action
                var result = await controller.CustomerTurnover(metaModel) as JsonResult;
                var resultData = ObjectHelper.ToDictionary(result.Data);

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(resultData["Data"], Is.EqualTo(data.DataList));
                    Assert.That(resultData["Total"], Is.EqualTo(data.TotalData));
                    Assert.That(resultData["TotalRow"], Is.EqualTo(data.TotalRows));
                });
            }
        }

        private ReportAPIController CreateController()
        {
            var productService = Substitute.For<IProductService>();
            productService.GetAllowedSubProductCodeList(DefaultLicenseeSession.OfferedSubProductList, Arg.Any<string>()).Returns("SB");

            return new ReportAPIController(
                _betTypeService,
                _customerTurnoverService,
                _turnoverService,
                _licenseeSettingService,
                _dataPermissionService)
            {
                SessionServiceInstance = SessionService
            };
        }
    }
}