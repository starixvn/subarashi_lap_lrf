namespace Fanex.Athena.Api.Report.UnitTests
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Base.UnitTests;
    using Fanex.Athena.Model.Auth;
    using Model.Core.ResultModel;
    using Model.Report.DTO.SubsidiaryPerformance;

    using NSubstitute;

    using NUnit.Framework;

    [TestFixture]
    public partial class SubsidiaryPerformanceReportControllerTest : BaseApiControllerHelperTest
    {
        [Test]
        public async Task Detail_EmptyAgentList_ReturnEmptyData()
        {
            // Arrange
            var metaModel = GetMetaModel();
            StubSingleWalletProductAccess(new[] { "SB", "BA" });
            _subsidiaryService.GetCurrencyAgentList(Arg.Any<UserAuthInfo>(), Arg.Any<string>(), Arg.Any<string>(), Arg.Any<bool>()).Returns(new Dictionary<int, IEnumerable<int>>());

            // Action
            var result = await _controller.Detail(metaModel);

            // Assert
            Assert.That(result.Data, Is.Empty);
        }

        [Test]
        public async Task Detail_WhenCall_ReturnDataFromService()
        {
            // Arrange
            var metaModel = GetMetaModel();
            var agentList = new Dictionary<int, IEnumerable<int>>
            {
                { 1, new[] { 100 } }
            };
            var resultData = new ReportResultModel<SubsidiaryPerformanceDetail>
            {
                DataList = new SubsidiaryPerformanceDetail[] { new SubsidiaryPerformanceDetail() },
                SummaryTotal = new Dictionary<string, SubsidiaryPerformanceDetail> { { "abc", new SubsidiaryPerformanceDetail() } },
                TotalData = new SubsidiaryPerformanceDetail()
            };
            _subsidiaryService.GetCurrencyAgentList(Arg.Any<UserAuthInfo>(), Arg.Any<string>(), Arg.Any<string>(), Arg.Any<bool>()).Returns(agentList);
            _service.GetDetailData(metaModel, Arg.Any<IDictionary<int, string>>()).Returns(resultData);

            // Action
            var result = await _controller.Detail(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Data, Is.EqualTo(resultData.DataList));
                Assert.That(result.Total, Is.EqualTo(resultData.SummaryTotal));
                Assert.That(result.GrandTotal, Is.EqualTo(resultData.TotalData));
            });
        }
    }
}