namespace Fanex.Athena.Api.Report.UnitTests
{
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Http;
    using System.Web.Http.Hosting;
    using Base.UnitTests;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Model.Core.DataDomain;
    using Model.Core.MetaModel.Product;
    using Model.Report.MetaModel;

    using NPOI.SS.UserModel;

    using NSubstitute;

    using NUnit.Framework;

    using Report;

    public class PlatformWinLossReportControllerTest : BaseApiControllerHelperTest
    {
        private PlatformWinLossReportController _controller;

        private IReportAPIClient _reportAPIClient;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            MockSessionData();

            _reportAPIClient = Substitute.For<IReportAPIClient>();
            _controller = Substitute.ForPartsOf<PlatformWinLossReportController>(SessionService, ProductService, LangService, _reportAPIClient);
            _controller.Request = new HttpRequestMessage();
            _controller.Request.Properties.Add(HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration());
            _controller.When(x => x.ExcelStream(Arg.Any<IWorkbook>(), Arg.Any<string>())).DoNotCallBase();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _reportAPIClient = null;
            _controller = null;
        }

        [Test]
        public async Task Index_WhenCallWithLevel0_CallCorrectApi()
        {
            // Arrange
            var metaModel = CreateMetaModel(0);

            // Action
            var result = await _controller.Index(metaModel);

            // Assert
            Assert.Multiple(async () =>
            {
                await _reportAPIClient.Received().PostAsync<dynamic>("api/PlatformWinLoss/GetSummaryData", metaModel, SessionLanguage);
            });
        }

        [Test]
        public async Task Index_WhenCallWithLevel1_CallCorrectApi()
        {
            // Arrange
            var metaModel = CreateMetaModel(1);

            // Action
            var result = await _controller.Index(metaModel);

            // Assert
            Assert.Multiple(async () =>
            {
                await _reportAPIClient.Received().PostAsync<dynamic>("api/PlatformWinLoss/GetMemberData", metaModel, SessionLanguage);
            });
        }

        [Test]
        public async Task Index_WhenExportWithLevel0_CallCorrectApi()
        {
            // Arrange
            const string FileName = "PlatformWinLossSummary.xls";
            var metaModel = CreateMetaModel(0, true);

            // Action
            var result = await _controller.Index(metaModel);

            // Assert
            Assert.Multiple(async () =>
            {
                await _reportAPIClient.Received().PostFileAsync("api/PlatformWinLoss/ExportSummaryData", metaModel, FileName, SessionLanguage);
            });
        }

        [Test]
        public async Task Index_WhenExportWithLevel1_CallCorrectApi()
        {
            // Arrange
            const string FileName = "PlatformWinLossMember.xls";
            var metaModel = CreateMetaModel(1, true);

            // Action
            var result = await _controller.Index(metaModel);

            // Assert
            Assert.Multiple(async () =>
            {
                await _reportAPIClient.Received().PostFileAsync("api/PlatformWinLoss/ExportMemberData", metaModel, FileName, SessionLanguage);
            });
        }

        private static PlatformWinLossMetaModel CreateMetaModel(int level, bool isExportExcel = false)
        {
            return new PlatformWinLossMetaModel
            {
                Level = level,
                PlatformType = PlatformType.Asia,
                Year = 2017,
                Month = 1,
                FromDay = 1,
                ToDay = 2,
                CurrencyId = 1,
                IsExportExcel = isExportExcel,
                ProductOptions = new List<ProductOption>
                {
                    new ProductOption
                    {
                        Code = "SB",
                        Status = true
                    }
                }
            };
        }
    }
}