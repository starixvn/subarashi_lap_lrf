namespace Fanex.Athena.Api.Report.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Http.Results;
    using Base.UnitTests;
    using DataAccess.Report.Interfaces;
    using Excel.Report;
    using Excel.Report.Models;
    using Fanex.Athena.Service.Core.Utility.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Core.DTO.Common;
    using Model.Core.MetaModel.Product;
    using Model.Report.DTO;
    using Model.Report.MetaModel;
    using Model.Report.ResultModel;
    using NPOI.SS.UserModel;
    using NSubstitute;
    using NUnit.Framework;
    using Report;
    using Resources;

    public class WinLossByProductReportControllerTest : BaseApiControllerHelperTest
    {
        private IWinLossByProductDataAccess _dataAccess;
        private WinLossByProductReportController _controller;
        private ILicenseeSettingService _licenseeSettingService;

        private ICurrencyValidation _currencyValidation;

        [SetUp]
        public void SetUp()
        {
            MockSessionData();
            _licenseeSettingService = Substitute.For<ILicenseeSettingService>();

            _currencyValidation = Substitute.For<ICurrencyValidation>();
            _currencyValidation.IsValidCurrency(Arg.Any<int>(), Arg.Any<bool>()).Returns(true);
            _dataAccess = Substitute.For<IWinLossByProductDataAccess>();
            CreateController();
        }

        private void CreateController()
        {
            _controller = Substitute.ForPartsOf<WinLossByProductReportController>(
                            LangService,
                            _dataAccess,
                            _currencyValidation,
                            _licenseeSettingService,
                            AppSetting
                            );
            _controller.SessionService = SessionService;
            _controller.ProductService = ProductService;
        }

        [TearDown]
        public override void FixtureTearDown()
        {
            _currencyValidation = null;
            _dataAccess = null;
            _controller = null;
            _licenseeSettingService = null;
        }

        [Test]
        public async Task Index_InvalidCurrency_ReturnBadRequestWithCorrectMessage()
        {
            // Arrange
            _currencyValidation.IsValidCurrency(Arg.Any<int>(), Arg.Any<bool>()).Returns(false);

            var metaModel = new WinLossByProductMetaModel { CurrencyId = -100 };

            // Action
            var result = await _controller.Index(metaModel) as BadRequestErrorMessageResult;

            // Assert
            Assert.That(result.Message, Is.EqualTo(ViewResources.InvalidParams));
        }

        [TestCase(100, "NoCustomerFoundMsg")]
        [TestCase(101, "MoreThanOneCustomerFoundMsg")]
        public async Task Index_Level0_GetCorrectDataFromService(int errorCode, string errorMessageKey)
        {
            // Arrange
            const int CurrencyId = -2, Level = 0, CustId = 1;
            var dataListResult = new List<WinLossByProduct>
            {
                new WinLossByProduct()
            };

            var metaModel = CreateValidMetaModel();
            var summaryTotalResult = new Dictionary<string, IEnumerable<WinLossByProduct>> { { "EUR", new List<WinLossByProduct>() } };
            _dataAccess.GetWinlossByProducts(metaModel, UserCurrencyList).Returns(new WinLossByProductResultModel
            {
                SummaryTotal = summaryTotalResult,
                ResultInfo = new ResultInfo
                {
                    Code = errorCode
                },
                DataList = dataListResult
            });

            // Action
            var result = await _controller.Index(metaModel, null, null, Level, CurrencyId, CustId).ConfigureAwait(false);

            // Assert
            Assert.Multiple(async () =>
            {
                await _dataAccess.Received().GetWinlossByProducts(Arg.Any<WinLossByProductMetaModel>(), Arg.Any<IDictionary<int, string>>());
                Assert.That(result.Data.Count, Is.EqualTo(1));
                Assert.That(result.SummaryTotal.Count, Is.EqualTo(1));
                Assert.That(result.ErrorMessage, Is.EqualTo(ViewResources.ResourceManager.GetString(errorMessageKey)));
            });
        }

        [Test]
        public async Task Index_Level0_MemberIdReturnFromSP()
        {
            // Arrange
            const int CurrencyId = -2, Level = 0, CustId = 1;
            var metaModel = CreateValidMetaModel();
            _dataAccess.GetWinlossByProducts(Arg.Any<WinLossByProductMetaModel>(), UserCurrencyList).Returns(
                new WinLossByProductResultModel
                {
                    ResultInfo = new ResultInfo
                    {
                        ExtendedData = "123;456"
                    },
                    DataList = new List<WinLossByProduct>()
                });

            // Action
            await _controller.Index(metaModel, null, null, Level, CurrencyId, CustId);

            // Assert
            Assert.That(metaModel.MemberId, Is.EqualTo(123));
        }

        [Test]
        public async Task Index_Level1_GetCorrectDataFromService()
        {
            // Arrange
            const int CurrencyId = -2, Level = 1, CustId = 1;
            var dataListResult = new List<WinLossByProduct>
            {
                new WinLossByProduct()
            };

            var summaryTotalResult = new Dictionary<string, IEnumerable<WinLossByProduct>> { { "EUR", new List<WinLossByProduct>() } };
            _dataAccess.GetWinlossByProductAgents(Arg.Any<WinLossByProductMetaModel>(), UserCurrencyList).Returns(
                new WinLossByProductResultModel
                {
                    SummaryTotal = summaryTotalResult,
                    DataList = dataListResult,
                    ResultInfo = new ResultInfo()
                });

            // Action
            var result = await _controller.Index(CreateValidMetaModel(), null, null, Level, CurrencyId, CustId);

            // Assert
            Assert.Multiple(() =>
            {
                _dataAccess.Received(1).GetWinlossByProductAgents(Arg.Any<WinLossByProductMetaModel>(), UserCurrencyList);
                Assert.That(result.Data.Count, Is.EqualTo(1));
                Assert.That(result.SummaryTotal.Count, Is.EqualTo(1));
            });
        }

        [Test]
        public async Task Index_Level2_GetCorrectDataFromService()
        {
            // Arrange
            const int CurrencyId = -2, Level = 2, CustId = 1;
            var dataListResult = new List<WinLossByProduct>
            {
                new WinLossByProduct()
            };

            var summaryTotalResult = new Dictionary<string, IEnumerable<WinLossByProduct>> { { "EUR", new List<WinLossByProduct>() } };
            _dataAccess.GetWinlossByProductCustomers(Arg.Any<WinLossByProductMetaModel>(), UserCurrencyList).Returns(
                new WinLossByProductResultModel
                {
                    SummaryTotal = summaryTotalResult,
                    DataList = dataListResult,
                    ResultInfo = new ResultInfo()
                });

            // Action
            var result = await _controller.Index(CreateValidMetaModel(), null, null, Level, CurrencyId, CustId);

            // Assert
            Assert.Multiple(async () =>
            {
                await _dataAccess.Received(1).GetWinlossByProductCustomers(Arg.Any<WinLossByProductMetaModel>(), UserCurrencyList);
                Assert.That(result.Data.Count, Is.EqualTo(1));
                Assert.That(result.SummaryTotal.Count, Is.EqualTo(1));
            });
        }

        [Test]
        public async Task Index_WhenReturnData_RestructureReturnedData()
        {
            // Arrange
            const int CurrencyId = -2, Level = 1, CustId = 1;
            var dataListResult = new List<WinLossByProduct>
            {
                new WinLossByProduct
                {
                    Date = DateTime.Today,
                    CurrencyName = "USD",
                    Index = 1
                },
                new WinLossByProduct
                {
                    Date = DateTime.Today,
                    CurrencyName = "USD",
                    Index = 2
                }
            };

            var summaryTotalResult = new Dictionary<string, IEnumerable<WinLossByProduct>> { { "EUR", new List<WinLossByProduct>() } };
            _dataAccess.GetWinlossByProductAgents(Arg.Any<WinLossByProductMetaModel>(), UserCurrencyList).Returns(
                new WinLossByProductResultModel
                {
                    SummaryTotal = summaryTotalResult,
                    DataList = dataListResult,
                    ResultInfo = new ResultInfo()
                });

            // Action
            var result = await _controller.Index(CreateValidMetaModel(), null, null, Level, CurrencyId, CustId);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Data.Count, Is.EqualTo(dataListResult.Count));
                Assert.That(result.Data[0].RowSpan, Is.EqualTo(2));
                Assert.That(result.Data[1].RowSpan, Is.EqualTo(-1));
            });
        }

        [TestCase(0, true)]
        [TestCase(1, false)]
        public async Task Index_IsExportExcelTrue_CallExcelStreamWithCorrectData(int level, bool isFakeLicensee)
        {
            // Arrange
            const int CurrencyId = -2, CustId = 1;
            var fromDate = new DateTime(2017, 4, 1);
            var toDate = new DateTime(2017, 4, 18);

            StubProductAccess(new string[0]);
            _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(isFakeLicensee);

            var excel = Substitute.ForPartsOf<WinlossByProductExcel>();
            excel.When(x => x.Export()).DoNotCallBase();

            _controller.CreateExcel(Arg.Any<string>(), Arg.Any<WinLossByProductExcelModel>()).ReturnsForAnyArgs(excel);
            _controller.When(x => x.ExcelStream(Arg.Any<IWorkbook>(), Arg.Any<string>())).DoNotCallBase();

            var metaModel = new WinLossByProductMetaModel
            {
                IsExportExcel = true,
                FromDate = fromDate.AddDays(1),
                ToDate = toDate.AddDays(1),
                Level = level
            };

            var summaryTotalResult = new Dictionary<string, IEnumerable<WinLossByProduct>> { { "EUR", new List<WinLossByProduct>() } };
            _dataAccess.GetWinlossByProducts(metaModel, UserCurrencyList).Returns(new WinLossByProductResultModel
            {
                SummaryTotal = summaryTotalResult,
                ResultInfo = new ResultInfo
                {
                    Code = 0
                },
                DataList = new List<WinLossByProduct>()
            });
            _dataAccess.GetWinlossByProductAgents(Arg.Any<WinLossByProductMetaModel>(), UserCurrencyList).Returns(
                new WinLossByProductResultModel
                {
                    SummaryTotal = summaryTotalResult,
                    DataList = new List<WinLossByProduct>(),
                    ResultInfo = new ResultInfo()
                });
            // Action
            await _controller.Index(metaModel, fromDate, toDate, level, CurrencyId, CustId);

            // Assert
            Assert.Multiple(() =>
            {
                _controller.Received().ExcelStream(Arg.Any<IWorkbook>(), Arg.Any<string>());
                Assert.That(metaModel.DrillDownFromDate, Is.EqualTo(fromDate));
                Assert.That(metaModel.DrillDownToDate, Is.EqualTo(toDate));
            });
        }

        [TestCase(true, 0, null, null)]
        [TestCase(false, 2, "2017/4/1", "2017/5/1")]
        public async Task Index_WhenCall_MetaModelAreAssignedDataCorrectly(bool isFakeLicensee, int memberId, DateTime? fromDate, DateTime? toDate)
        {
            // Arrange
            const int CustId = 1, CurrencyId = -2, Level = 1, MemberId = 1;
            const string SystemId = "pig", CurrencyName = "UUS";
            var metaModel = new WinLossByProductMetaModel
            {
                MemberId = memberId,
                DrillDownFromDate = new DateTime(2017, 1, 1),
                DrillDownToDate = new DateTime(2017, 2, 1),
                Username = ViewResources.ExternalId
            };

            _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(isFakeLicensee);

            var expectedFromDate = fromDate.HasValue ? fromDate : metaModel.DrillDownFromDate;
            var expectedToDate = toDate.HasValue ? toDate : metaModel.DrillDownToDate;
            var expectedmemberId = memberId == 0 ? MemberId : metaModel.MemberId;
            var expectedUserName = isFakeLicensee ? string.Empty : metaModel.Username;
            var summaryTotalResult = new Dictionary<string, IEnumerable<WinLossByProduct>> { { "EUR", new List<WinLossByProduct>() } };

            _dataAccess.GetWinlossByProductAgents(Arg.Any<WinLossByProductMetaModel>(), UserCurrencyList).Returns(
                new WinLossByProductResultModel
                {
                    SummaryTotal = summaryTotalResult,
                    DataList = new List<WinLossByProduct>(),
                    ResultInfo = new ResultInfo()
                });
            // Action
            await _controller.Index(metaModel, fromDate, toDate, Level, CurrencyId, CustId, MemberId, SystemId, CurrencyName);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(metaModel.DrillDownCurrencyId, Is.EqualTo(CurrencyId));
                Assert.That(metaModel.DrillDownCurrencyName, Is.EqualTo(CurrencyName));
                Assert.That(metaModel.MemberId, Is.EqualTo(expectedmemberId));
                Assert.That(metaModel.DrillDownFromDate, Is.EqualTo(expectedFromDate));
                Assert.That(metaModel.DrillDownToDate, Is.EqualTo(expectedToDate));
                Assert.That(metaModel.Username, Is.EqualTo(expectedUserName));
            });
        }

        private static WinLossByProductMetaModel CreateValidMetaModel()
        {
            return new WinLossByProductMetaModel
            {
                ProductOptions = new List<ProductOption>
                {
                    new ProductOption
                    {
                        Status = true
                    }
                }
            };
        }
    }
}