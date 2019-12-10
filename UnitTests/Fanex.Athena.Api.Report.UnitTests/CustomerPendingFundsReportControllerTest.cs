namespace Fanex.Athena.Api.Report.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Base.UnitTests;
    using Excel.Report;
    using Excel.Report.Models;
    using Fanex.Athena.DataAccess.Report.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Core.ResultModel;
    using Model.Report.DTO;
    using Model.Report.MetaModel;
    using NPOI.SS.UserModel;
    using NSubstitute;
    using NUnit.Framework;

    public class CustomerPendingFundsReportControllerTest : BaseApiControllerHelperTest
    {
        private ICustPendingFundsDataAccess _dataAccess;
        private CustomerPendingFundsReportController _controller;
        private ILicenseeSettingService _licenseeSettingService;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();
            _licenseeSettingService = Substitute.For<ILicenseeSettingService>();
            _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(false);

            _dataAccess = Substitute.For<ICustPendingFundsDataAccess>();
            CreateController();

            MockSessionData();
        }

        private void CreateController()
        {
            _controller = Substitute.ForPartsOf<CustomerPendingFundsReportController>
                            (_dataAccess, LangService, _licenseeSettingService);
            _controller.SessionService = SessionService;
            _controller.ProductService = ProductService;
            _controller.When(x => x.ExcelStream(Arg.Any<IWorkbook>(), Arg.Any<string>())).DoNotCallBase();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _controller = null;
            _dataAccess = null;
            _licenseeSettingService = null;
        }

        [Test]
        public async Task Index_ValidModel_GetDataFromDataAccess()
        {
            // Arrange
            var metaModel = CreateValidMetaModel();
            var expectedData = SetUpForGettingData(metaModel);

            // Action
            var result = await _controller.Index(metaModel);

            // Assert
            Assert.That(result.Data, Is.EqualTo(expectedData));
        }

        [TestCase(true)]
        [TestCase(false)]
        public async Task ExportExcel_ExportToExcel_ExportWithCorrectData(bool isFakeLicensee)
        {
            // Arrange
            var metaModel = CreateValidMetaModel();
            SetUpForGettingData(metaModel);
            const int PageSizeExcel = int.MaxValue - 1000;
            _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(isFakeLicensee);

            var excel = Substitute.ForPartsOf<CustomerPendingFundsExcel>();
            excel.When(x => x.Export()).DoNotCallBase();

            _controller.CreateExcel(Arg.Any<string>(), Arg.Any<CustomerPendingFundsExcelModel>()).ReturnsForAnyArgs(excel);

            // Action
            await _controller.ExportExcel(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(metaModel.PageIndex, Is.EqualTo(1));
                Assert.That(metaModel.PageSize, Is.EqualTo(PageSizeExcel));
            });
        }

        private static CustomerPendingFundsMetaModel CreateValidMetaModel()
        {
            return new CustomerPendingFundsMetaModel
            {
                CurrencyId = 1,
                AgentListXml = string.Empty
            };
        }

        private IEnumerable<CustPendingFunds> SetUpForGettingData(CustomerPendingFundsMetaModel metaModel)
        {
            var expectedData = new List<CustPendingFunds>();

            var random = new Random();
            var total = random.Next(5, 10);
            for (int i = 0; i < total; i++)
            {
                var item = new CustPendingFunds
                {
                    CustId = random.Next(1, 10),
                    ExternalId = random.Next(1, 10).ToString(),
                    SystemId = random.Next(1, 10).ToString(),
                    BetCounts = random.Next(1, 10),
                    PendingFunds = random.Next(1, 10)
                };
                expectedData.Add(item);
            }

            _dataAccess.GetDataList(metaModel).Returns(x =>
            {
                return new ReportResultModel<CustPendingFunds>
                {
                    TotalData = new CustPendingFunds(),
                    TotalRows = total,
                    DataList = expectedData
                };
            });

            return expectedData;
        }
    }
}