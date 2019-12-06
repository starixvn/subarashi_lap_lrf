using System.Threading.Tasks;
using Fanex.Athena.Api.Base.UnitTests;
using Fanex.Athena.DataAccess.Report.Interfaces;
using Fanex.Athena.Model.Core.ResultModel;
using Fanex.Athena.Model.Report.DTO;
using Fanex.Athena.Model.Report.MetaModel;
using Fanex.Athena.UnitTest.Common.Helpers;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Api.Report.UnitTests
{
    [TestFixture]
    public class CasinoTurnoverReportControllerTest : BaseApiControllerHelperTest
    {
        private ICasinoTurnoverDataAccess _casinoTurnoverDataAccess;

        [SetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            MockSessionData();

            _casinoTurnoverDataAccess = Substitute.For<ICasinoTurnoverDataAccess>();
        }

        [Test]
        public async Task GetData_WhenCall_ReturnCorrectData()
        {
            // Arrange
            var metaModel = FakeHelper.Create<CasinoTurnoverMetaModel>();
            var expectedData = FakeHelper.Create<ReportResultModel<CasinoTurnover>>();
            _casinoTurnoverDataAccess.GetData(metaModel).Returns(expectedData);

            using (var controller = CreateController())
            {
                // Action
                var result = await controller.GetData(metaModel);

                // Assert
                Assert.That(result.Data, Is.EqualTo(expectedData.DataList));
                Assert.That(result.Total, Is.EqualTo(expectedData.TotalData));
                Assert.That(result.TotalRows, Is.EqualTo(expectedData.TotalRows));
            }
        }

        private CasinoTurnoverReportController CreateController()
        {
            return new CasinoTurnoverReportController(
                LangService,
                _casinoTurnoverDataAccess)
            {
                ProductService = ProductService,
                SessionService = SessionService
            };
        }
    }
}