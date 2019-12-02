using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;
using Fanex.Athena.Controllers.Base.UnitTests;
using Fanex.Athena.DataAccess.Report.Interfaces;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Report.DTO;
using Fanex.Athena.Model.Report.MetaModel;
using Fanex.Athena.Model.Report.ViewModel;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Newtonsoft.Json;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Controllers.Report.UnitTests
{
    [TestFixture]
    public class ExchangeVoidedControllerTest : CultureBaseControllerHelperTest
    {
        private const string Environment = "TEST";

        private ILGAPIClient _lgAPIClient;

        private IExchangeVoidedDataAccess _dataAccess;

        private IProductService _productService;

        [SetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            _lgAPIClient = Substitute.For<ILGAPIClient>();
            _dataAccess = Substitute.For<IExchangeVoidedDataAccess>();
            _productService = Substitute.For<IProductService>();

            SetUpDefaultFakeData();
        }

        [TearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _lgAPIClient = null;
            _dataAccess = null;
            _productService = null;
        }

        [Test]
        public void Index_WhenCall_ReturnCorrectView()
        {
            // Arrange
            const string ExpectedView = "~/Views/Desktop/Report/ExchangeVoided/Index.cshtml";

            using (var controller = CreateController())
            {
                // Action
                var result = controller.Index() as ViewResult;

                // Assert
                Assert.That(result.ViewName, Is.EqualTo(ExpectedView));
                Assert.That((bool)result.Model, Is.True);
            }
        }

        [Test]
        public async Task Index_DoNotHavePermission_ReturnEmptyResult()
        {
            // Arrange
            var metaModel = new ExchangeVoidedMetaModel();

            using (var controller = CreateController(new List<Product>()))
            {
                var expectedResult = JsonConvert.SerializeObject(
                    new ExchangeVoidedViewModel { DataList = new List<ExchangeVoidedItem>(), TotalPage = 0 });

                // Action
                var result = await controller.Index(metaModel) as JsonResult;
                var jsonData = JsonConvert.SerializeObject(result.Data);

                // Assert
                Assert.That(jsonData, Is.EqualTo(expectedResult));
                await _lgAPIClient.DidNotReceiveWithAnyArgs().PostAsync<ExchangeVoidedViewModel>(default, default, default);
            }
        }

        [Test]
        public async Task Index_UserNameHasValueButCanNotGetCustId_ReturnEmptyResult()
        {
            // Arrange
            var metaModel = new ExchangeVoidedMetaModel
            {
                UserName = "test",
                AgentListXml = "AgentList",
                RefNo = 123,
                SelectedDate = new System.DateTime(2019, 11, 29),
                PageIndex = 1
            };
            var expectedResult = JsonConvert.SerializeObject(
                new ExchangeVoidedViewModel { DataList = new List<ExchangeVoidedItem>(), TotalPage = 0 });

            const int ExpectedCustId = 0;

            using (var controller = CreateController())
            {
                _dataAccess.GetCustIdAsync(metaModel.UserName, metaModel.AgentListXml)
                    .Returns(Task.FromResult(ExpectedCustId));

                // Action
                var result = await controller.Index(metaModel) as JsonResult;
                var jsonData = JsonConvert.SerializeObject(result.Data);

                // Assert
                Assert.That(jsonData, Is.EqualTo(expectedResult));
                await _lgAPIClient.DidNotReceiveWithAnyArgs().PostAsync<ExchangeVoidedViewModel>(default, default, default);
            }
        }

        [Test]
        public async Task Index_UserNameHasValueAndGetCorrectCustId_CallClientApiWithCorrectParameter()
        {
            // Arrange
            var metaModel = new ExchangeVoidedMetaModel
            {
                UserName = "test",
                AgentListXml = "AgentList",
                RefNo = 123,
                SelectedDate = new System.DateTime(2019, 11, 29),
                PageIndex = 1
            };
            const int ExpectedCustId = 1;
            var apiMetaModel = new
            {
                CustId = ExpectedCustId,
                metaModel.RefNo,
                metaModel.SelectedDate,
                metaModel.PageIndex,
                Environment
            };
            var expectedResult = JsonConvert.SerializeObject(apiMetaModel);

            using (var controller = CreateController())
            {
                const string apiPath = "/ExchangeBetHistory/Index";
                var language = SessionService.UserSession.Language;
                object passedParam = null;

                _dataAccess.GetCustIdAsync(metaModel.UserName, metaModel.AgentListXml)
                    .Returns(Task.FromResult(ExpectedCustId));

                _lgAPIClient.PostAsync<ExchangeVoidedViewModel>(apiPath, Arg.Any<object>(), language)
                    .Returns(x =>
                    {
                        passedParam = x.ArgAt<object>(1);

                        return new ExchangeVoidedViewModel();
                    });

                // Action
                await controller.Index(metaModel);
                var jsonPassedParam = JsonConvert.SerializeObject(passedParam);

                // Assert
                Assert.That(jsonPassedParam, Is.EqualTo(expectedResult));
            }
        }

        [Test]
        public async Task Index_UserNameIsEmpty_DoNotGetCustIdAndCallClientApiWithCorrectParameter()
        {
            // Arrange
            var metaModel = new ExchangeVoidedMetaModel
            {
                UserName = null,
                AgentListXml = "AgentList",
                RefNo = 123,
                SelectedDate = new System.DateTime(2019, 11, 29),
                PageIndex = 1
            };
            var apiMetaModel = new
            {
                CustId = 0,
                metaModel.RefNo,
                metaModel.SelectedDate,
                metaModel.PageIndex,
                Environment
            };
            var expectedResult = JsonConvert.SerializeObject(apiMetaModel);

            using (var controller = CreateController())
            {
                const string apiPath = "/ExchangeBetHistory/Index";
                var language = SessionService.UserSession.Language;
                object passedParam = null;
                _lgAPIClient.PostAsync<ExchangeVoidedViewModel>(apiPath, Arg.Any<object>(), language)
                    .Returns(x =>
                    {
                        passedParam = x.ArgAt<object>(1);

                        return new ExchangeVoidedViewModel();
                    });

                // Action
                await controller.Index(metaModel);
                var jsonPassedParam = JsonConvert.SerializeObject(passedParam);

                // Assert
                Assert.That(jsonPassedParam, Is.EqualTo(expectedResult));
                await _dataAccess.DidNotReceiveWithAnyArgs().GetCustIdAsync(default, default);
            }
        }

        private ExchangeVoidedController CreateController(IList<Product> productList = null)
        {
            var appSetting = Substitute.For<IAppSettings>();
            appSetting.Environment.Returns(Environment);

            var fakeProductList = productList ??
                new List<Product>
                {
                    new Product { ProductCode = Product.Exchange }
                };
            var licenseeId = SessionService.LicenseeSession.LicenseeId;
            var language = SessionService.UserSession.Language;
            _productService.GetProductList(licenseeId, language).Returns(fakeProductList);

            return new ExchangeVoidedController(
                _lgAPIClient,
                appSetting,
                _dataAccess,
                _productService
                )
            {
                SessionServiceInstance = SessionService
            };
        }
    }
}