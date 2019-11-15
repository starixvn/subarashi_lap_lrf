namespace Fanex.Athena.Controllers.Customer.UnitTests
{
    using DataAccess.Core.Users.Interfaces;

    using Excel.Customer;

    using Fanex.Athena.Controllers.Base.UnitTests;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Model.Core.DTO.Common;
    using Model.Core.ResultModel;
    using Model.Customer.DTO;
    using Model.Customer.MetaModel;
    using Model.Customer.ViewModel;

    using NSubstitute;

    using NUnit.Framework;
    using Service.Customer.Interfaces;

    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Mvc;

    public partial class CustomerControllerTest : CultureBaseControllerHelperTest
    {
        private ICustomerListService _customerListService;
        private IGroupComService _groupComService;
        private ILicenseeDataAccess _licenseeDataAccess;
        private IProductService _productService;
        private ISubsidiaryService _subsidiaryService;
        private IAuthorizationService _authorizationService;
        private ILicenseeSettingService _licenseeSettingService;

        [SetUp]
        public void SetUp()
        {
            _licenseeSettingService = Substitute.For<ILicenseeSettingService>();
            _licenseeDataAccess = Substitute.For<ILicenseeDataAccess>();
        }

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();
            SetUpDefaultFakeData();
            _customerListService = Substitute.For<ICustomerListService>();
            _groupComService = Substitute.For<IGroupComService>();
            _licenseeDataAccess = Substitute.For<ILicenseeDataAccess>();
            _productService = Substitute.For<IProductService>();
            _subsidiaryService = Substitute.For<ISubsidiaryService>();
            _authorizationService = Substitute.For<IAuthorizationService>();
            AppSettings.GetValue(Arg.Any<string>()).Returns(string.Empty);
            _authorizationService.IsAllowedEditCommission(Arg.Any<UserAuthInfo>()).Returns(false);
            _authorizationService.IsAllowedSpecialBA(Arg.Any<UserAuthInfo>()).Returns(true);

            _groupComService.GetAllAsync(Arg.Any<int>()).Returns(new List<GroupCommMetaModel>());
            _groupComService.GetById(Arg.Any<int>(), Arg.Any<int>()).Returns(new GroupCommMetaModel());
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();
            _customerListService = null;
            _groupComService = null;
            _licenseeDataAccess = null;
            _productService = null;
        }

        [TearDown]
        public void TearDown()
        {
            _groupComService.ClearReceivedCalls();
            _customerListService.ClearReceivedCalls();
            _licenseeDataAccess = null;
            _licenseeSettingService = null;
        }

        [Test]
        public void LogInfo_WhenCall_CallServiceToGetData()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const int CustId = 1;

                StubLicenseeSessionData(DefaultLicenseeSession);
                _customerListService.GetCustomerLoginInfo(CustId, DefaultLicenseeSession.LicenseeId,
                    DefaultLicenseeSession.LicenseeName).Returns(new LogInfo());

                // Action
                var result = controller.LogInfo(CustId);

                // Assert
                _customerListService.Received().GetCustomerLoginInfo(CustId,
                    DefaultLicenseeSession.LicenseeId, DefaultLicenseeSession.LicenseeName);
            }
        }

        [Test]
        public void LogInfo_WhenCall_ReturnCorrectResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const int CustId = 2;
                const string ExpectedViewName = "Customer/CustomerDialog/LogInfo.cshtml";

                StubLicenseeSessionData(DefaultLicenseeSession);

                var productAccess = new ProductAccess(new List<Product> { new Product { ProductCode = Product.SB } });
                _productService.GetProductAccess(Arg.Any<int>(), Arg.Any<string>()).Returns(productAccess);

                var logInfo = new LogInfo { CustId = CustId };
                _customerListService.GetCustomerLoginInfo(CustId,
                    DefaultLicenseeSession.LicenseeId, DefaultLicenseeSession.LicenseeName).Returns(logInfo);

                // Action
                var result = controller.LogInfo(CustId) as ViewResult;
                var model = (LogInfoViewModel)result.Model;

                // Assert
                Assert.Multiple(() =>
                {
                    StringAssert.Contains(ExpectedViewName, result.ViewName);
                    Assert.That(model.LogInfo, Is.EqualTo(logInfo));
                    Assert.That(model.ProductAccess, Is.EqualTo(productAccess));
                });
            }
        }

        [Test]
        public async Task ExportExcel_ParameterIsNull_ReturnNull()
        {
            using (var controller = CreateController())
            {
                // Action
                var result = await controller.ExportExcel(null);

                // Assert
                Assert.That(result, Is.Null);
            }
        }

        [Test]
        public async Task ExportExcel_GridColumnIsEmpty_ReturnEmptyFile()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const string ExcelFileName = "Empty.xls";
                const string ExcelParam = "{'GridColumns': []}";

                // Action
                var result = await controller.ExportExcel(ExcelParam) as FileContentResult;

                // Assert
                Assert.That(result.FileDownloadName, Is.EqualTo(ExcelFileName));
            }
        }

        [TestCase(false)]
        [TestCase(true)]
        public async Task ExportExcel_IsConvertIsFalse_ExportWithCorrectReportTitleAsync(bool isConvert)
        {
            using (var controller = CreateController())
            {
                // Arrange
                const string CurrencyName = "CNY";
                const string BaseCurrency = "USD";
                const string Path = "";
                var excelParam = "{'CurrencyName': 'CNY', " + (isConvert ? "'BaseCurrency': 'USD' ," : string.Empty)
                    + "'GridColumns': [{'Name': 'Column1', 'Checked': 'true'}]}";

                controller.Server.MapPath(Arg.Any<string>()).Returns(Path);
                StubLicenseeSessionData(DefaultLicenseeSession);
                _productService.GetProductAccess(Arg.Any<int>(), Arg.Any<string>()).Returns(new ProductAccess(new List<Product>()));
                _authorizationService.IsAllowedEditCommission(DefaultUserSession).Returns(false);
                _authorizationService.IsAllowedSpecialBA(DefaultUserSession).Returns(false);
                _customerListService.GetActiveCustomersAsync(Arg.Any<CustomerListMetaModel>()).Returns(new ReportResultModel<CustomerDTO>
                {
                    DataList = new List<CustomerDTO>(),
                    TotalRows = 0
                });

                var actualReportTitle = string.Empty;
                var excel = Substitute.ForPartsOf<CustomerListExcel>(
                   Arg.Any<string>(),
                   Arg.Any<string>(),
                   new CustomerListViewModel { DataList = new List<CustomerDTO>(), Param = new CustomerListMetaModel { GridColumns = new List<CheckedItem>() } });
                excel.When(x => x.Export()).DoNotCallBase();

                var reportTitle = Resources.ViewResources.CustomerList + " - "
                        + string.Format(Resources.ViewResources.Viewin, isConvert ? BaseCurrency.ToUpperInvariant() : CurrencyName);
                var path = string.Empty;

                controller.CreateExcel(
                   path,
                   reportTitle,
                   new CustomerListViewModel {
                       DataList = new List<CustomerDTO>(),
                       Param = new CustomerListMetaModel {
                           GridColumns = new List<CheckedItem>()
                       }
                   }).ReturnsForAnyArgs(excel);

                controller.When(x => x.CreateExcel(Arg.Any<string>(), Arg.Any<string>(), Arg.Any<CustomerListViewModel>())).Do(x => actualReportTitle = (string)x[1]);

                // Action
                await controller.ExportExcel(excelParam);

                // Assert
                Assert.Multiple(() =>
                {
                    excel.Received().Export();
                    Assert.That(actualReportTitle, Is.EqualTo(reportTitle));
                });
            }
        }

        private CustomerController CreateController()
        {
            var result = Substitute.ForPartsOf<CustomerController>(
                _customerListService,
                _groupComService,
                _licenseeDataAccess,
                _productService,
                _subsidiaryService,
                _authorizationService);

            result.LangService = LangService;
            result.SessionServiceInstance = SessionService;
            result.AppSettingInstance = AppSettings;
            result.LicenseeSettingServiceInstance = _licenseeSettingService;
            result.ControllerContext = ControllerContext;

            return result;
        }
    }
}