namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Base.UnitTests;
    using DataAccess.Core.Common.Interfaces;
    using Excel.Report;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Model.Core.DTO.Common;
    using Model.Core.ResultModel;
    using Model.Report.DTO;
    using Model.Report.MetaModel;
    using Model.Report.ViewModel;
    using Newtonsoft.Json;
    using NSubstitute;
    using NUnit.Framework;
    using Report;
    using Service.Report.Interfaces;
    using Web.ResultExtension;

    [TestFixture]
    public class CustomerTurnoverReportControllerTest : CultureBaseControllerHelperTest
    {
        private ISportTypeDataAccess _sportTypeDataAccess;

        private ICustomerTurnoverService _customerTurnoverService;

        private readonly IAppSettings _appSettings;

        private readonly ICompressService _compressService;

        private readonly IFileService _fileService;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            _sportTypeDataAccess = Substitute.For<ISportTypeDataAccess>();
            _customerTurnoverService = Substitute.For<ICustomerTurnoverService>();

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
                var viewModel = viewResult.Model as CustomerTurnoverViewModel;

                // Assert
                Assert.Multiple((TestDelegate)(() =>
                {
                    Assert.That(viewResult.ViewName, Is.EqualTo("~/Views/Desktop/Report/CustomerTurnover/Main.cshtml"));
                    Assert.That(viewModel.Param.LicenseeId, Is.EqualTo((object)SessionService.LicenseeSession.LicenseeId));
                    Assert.That(viewModel.CurrencyList, Is.EqualTo(SessionService.UserSession.CurrencyList));
                }));
            }
        }

        [Test]
        public async Task GetSportsAndProducts_WhenCall_ReturnCorrectResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var fakeData = new List<SportProductItem>
                {
                    new SportProductItem { ID = 1 },
                    new SportProductItem { ID = 2 }
                };
                var subProductCodes = $"{Product.SB},{Product.NG},{Product.VS}";

                StubGetAllowedSubProductCodeList($"{Product.SB},{Product.NG},{Product.VS}", subProductCodes);

                _sportTypeDataAccess.GetSportsAndProducts(
                    SessionService.LicenseeSession.LicenseeId,
                    SessionService.UserSession.Language,
                    subProductCodes)
                    .Returns(fakeData);

                // Action
                var result = await controller.GetSportsAndProducts() as JsonResult;

                var expectedData = fakeData.ToList();
                expectedData.Add(new SportProductItem
                {
                    Checked = true,
                    ID = ProductTypes.Parlay,
                    Name = ViewResources.Parlay,
                    ParentId = ProductTypes.Sportsbook
                });

                // Assert
                Assert.That(JsonConvert.SerializeObject(result.Data), Is.EqualTo(JsonConvert.SerializeObject(expectedData)));
            }
        }

        [Test]
        public async Task Excel_EmptyExcelParam_ReturnNull()
        {
            using (var controller = CreateController())
            {
                // Arrange
                MockCreatingExcel(controller);

                // Action
                var result = await controller.Excel(string.Empty);

                // Assert
                Assert.That(result, Is.Null);
            }
        }

        [Test]
        public async Task Excel_ModelIsNotValid_ReturnCorrectRedirectResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var excelParam = "{\"FromDate\": \"2017/2/2\", \"ToDate\": \"2017/1/1\"}";
                MockCreatingExcel(controller);

                // Action
                var result = await controller.Excel(excelParam) as RedirectResult;

                // Assert
                Assert.IsNull(result);
            }
        }

        [TestCase(1, "MM/dd/yyyy")]
        [TestCase(2, "MM/yyyy")]
        [TestCase(0, "MM/yyyy")]
        public async Task Excel_ModelIsValid_ReturnCorrectRedictResult(int reportBy, string expectedFormatDate)
        {
            using (var controller = CreateController())
            {
                // Arrange
                var excelParam = @"{""fromdate"":""11/01/2017"",""todate"":""11/30/2017"",""reportby"":" + reportBy + @",""showwin"":true,
                                ""SportProducts"":[{""Checked"":true}],""bettypes"":""1""}";
                MockCreatingExcel(controller);
                var resultModel = new ReportResultModel<CustTurnover>
                {
                    DataList = Enumerable.Empty<CustTurnover>(),
                    TotalDataList = Enumerable.Empty<CustTurnover>(),
                };
                _customerTurnoverService.GetDataList(
                    Arg.Any<CustomerTurnoverMetaModel>(),
                    UserCurrencyList,
                    SessionService.UserSession.Language).Returns(resultModel);

                // Action
                var result = await controller.Excel(excelParam) as ExcelResult;

                // Assert
                Assert.Multiple(() =>
                {
                    controller.Received(1).CreateExcel(
                        Arg.Any<string>(),
                        expectedFormatDate,
                        Arg.Any<ShowingOption>(),
                        resultModel,
                        "Customer Turnover, 11/01/2017 --> 11/30/2017 - Currency:  - Minimum odds: 0 ");
                    Assert.That(result, Is.Not.Null);
                });
            }
        }

        private static void MockCreatingExcel(CustomerTurnoverReportController controller)
        {
            var excel = Substitute.ForPartsOf<CustomerTurnoverExcel>();
            excel.When(x => x.Export()).DoNotCallBase();
            controller.CreateExcel(string.Empty, string.Empty, null, null, string.Empty).ReturnsForAnyArgs(excel);
        }

        private CustomerTurnoverReportController CreateController()
        {
            var controller = Substitute.ForPartsOf<CustomerTurnoverReportController>(_sportTypeDataAccess, _customerTurnoverService, _appSettings, _compressService, _fileService);
            controller.LangService = LangService;
            controller.SessionServiceInstance = SessionService;
            controller.When(x => x.CreateExcel(string.Empty, string.Empty, null, null, string.Empty)).DoNotCallBase();
            controller.ProductServiceInstance = ProductService;

            return controller;
        }
    }
}