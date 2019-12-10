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
    using NSubstitute;
    using NUnit.Framework;

    public class PromotionPrizeReportControllerTest : CultureBaseControllerHelperTest
    {
        private IReportAPIClient _reportAPIClient;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            _reportAPIClient = Substitute.For<IReportAPIClient>();

            SetUpDefaultFakeData();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _reportAPIClient = null;
        }

        [Test]
        public async Task ExportExcel_WhenCall_ReturnsCorrectFileContent()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new PromotionPrizeMetaModel();
                var expectedData = new Tuple<Stream, string>(new MemoryStream(new byte[0]), "application/octet-stream");
                _reportAPIClient.PostAsync(
                    "api/PromotionPrize/Export",
                    metaModel,
                    DefaultUserSession.Language,
                    MediaType.MsgPack)
                    .Returns(Task.FromResult(expectedData));

                // Action
                var result = await controller.ExportExcel(metaModel) as FileStreamResult;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.FileStream, Is.EqualTo(expectedData.Item1));
                    Assert.That(result.ContentType, Is.EqualTo(expectedData.Item2));
                });
            }
        }

        private PromotionPrizeReportController CreateController()
        {
            return new PromotionPrizeReportController(_reportAPIClient)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService
            };
        }
    }
}