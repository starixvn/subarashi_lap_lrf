namespace Fanex.Athena.Controllers.Report.UnitTests.Result
{
    using System.IO;
    using System.Net;
    using System.Text;
    using System.Web.Mvc;

    using Base.UnitTests;

    using Model.Report.MetaModel.Result;

    using NSubstitute;

    using NUnit.Framework;

    [TestFixture]
    public partial class ResultReportControllerTest : CultureBaseControllerHelperTest
    {
        [Test]
        public void ResultExcel_InvalidModelState_ReturnBadRequestResponse()
        {
            using (var controller = CreateController())
            {
                // Arrange
                controller.ModelState.AddModelError("error", "hihi");
                var response = controller.HttpContext.Response;
                var metaModel = new ResultMetaModel();

                // Action
                var result = controller.ResultExcel(metaModel).Result as HttpStatusCodeResult;

                // Assert
                Assert.That(result.StatusCode, Is.EqualTo((int)HttpStatusCode.BadRequest));
            }
        }

        [Test]
        public void ResultExcel_ValidModelState_ReturnCorrectResponse()
        {
            // Arrange
            const string ExpectedDataContent = "Hello everyone";
            using (var controller = CreateController())
            {
                var byteContent = Encoding.UTF8.GetBytes(ExpectedDataContent);
                var metaModel = new ResultMetaModel();
                const string Url = "/ResultReport/ResultExcel";
                _betListApiClient.PostStreamAsync(Url, metaModel, SessionService.UserSession.Language).Returns(new MemoryStream(byteContent));

                // Action
                var result = controller.ResultExcel(metaModel).Result as FileStreamResult;

                // Assert
                Assert.That(result.FileDownloadName, Is.EqualTo("LRF-Result.xls"));
                Assert.That(result.FileStream, Is.Not.Null);
            }
        }
    }
}