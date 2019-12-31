namespace Fanex.Athena.Controllers.Report.UnitTests.ReportAPI
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Mvc;

    using Base.UnitTests;

    using Model.Report.DTO;
    using Model.Report.MetaModel;

    using NSubstitute;

    using NUnit.Framework;

    using UnitTest.Common.Helpers;

    [TestFixture]
    public partial class ReportAPIControllerTest : CultureBaseControllerHelperTest
    {
        [Test]
        public async Task Turnover_WhenCall_ReturnCorrectViewResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new TurnoverMetaModel
                {
                    CurrencyId = CurrencyId
                };
                var data = new List<TurnoverDTO>
                    {
                        new TurnoverDTO()
                    };
                var total = new TurnoverDTO();
                _turnoverService.GetDataList(metaModel).Returns(data);
                _turnoverService.SumTotalData(data).Returns(total);

                // Action
                var result = await controller.Turnover(metaModel) as JsonResult;
                var resultData = ObjectHelper.ToDictionary(result.Data);

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(resultData["Data"], Is.EqualTo(data));
                    Assert.That(resultData["TotalData"], Is.EqualTo(total));
                });
            }
        }
    }
}