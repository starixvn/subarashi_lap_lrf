namespace Fanex.Athena.Controllers.Report.UnitTests
{
    using System;
    using System.IO;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Controllers.Base.UnitTests;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.UnitTest.Common.Helpers;
    using NSubstitute;
    using NUnit.Framework;

    public class PromotionPrizeReportControllerTest : CultureBaseControllerHelperTest
    {
        private IReportAPIClient _reportAPIClient;
        private IProductService _productService;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            _reportAPIClient = Substitute.For<IReportAPIClient>();
            _productService = Substitute.For<IProductService>();

            SetUpDefaultFakeData();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _reportAPIClient = null;
            _productService = null;
        }

        [TearDown]
        public void TeadDown()
        {
            _reportAPIClient.ClearReceivedCalls();
        }

        [Test]
        public async Task ExportExcel_WhenCall_ReturnsCorrectFileContent()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new PromotionPrizeMetaModel();
                var expectedData = FakeHelper.Create<Tuple<MemoryStream, string>>();
                _reportAPIClient.PostAsync("api/PromotionPrize/Export", metaModel, SessionService.UserSession.Language, MediaType.MsgPack).Returns(Task.FromResult(expectedData));

                // Action
                var result = await controller.ExportExcel(metaModel) as FileContentResult;

                // Assert
                Assert.That(result.FileContents, Is.EqualTo(expectedData.Item1));
                Assert.That(result.ContentType, Is.EqualTo(expectedData.Item2));
            }
        }

        private PromotionPrizeReportController CreateController()
        {
            var controller = Substitute.ForPartsOf<PromotionPrizeReportController>(_reportAPIClient);
            controller.ProductServiceInstance = _productService;
            controller.LangService = LangService;
            controller.SessionServiceInstance = SessionService;

            return controller;
        }
    }
}