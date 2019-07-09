namespace Fanex.Athena.Controllers.TotalBets.UnitTests
{
    using System.Threading.Tasks;
    using Base.UnitTests;
    using NSubstitute;
    using NUnit.Framework;
    using Report.Result.ResultPopup;
    using Service.Core.Utility.Interfaces;
    using UnitTest.Common.Extensions;

    [TestFixture]
    public partial class PPResultPopupControllerTest : CultureBaseControllerHelperTest
    {
        [Test]
        public async Task Index_WhenCall_CallBetListApi()
        {
            // Arrange
            const string CustId = "123";
            const string GameTypeId = "345";
            const string TransId3rd = "789";
            const string ExpectedResult = "aaaaaaaaaaaa";
            const string Url = "/CardClubResultPopup/Index";
            const string Language = "vi-VN";
            StubUserSessionData(new Session.Model.UserSession
            {
                Language = Language
            });
            var betListApiClient = Substitute.For<IBetListApiClient>();

            betListApiClient.PostAsyncString(Url, Arg.Any<object>(), SessionService.UserSession.Language).Returns(ExpectedResult);
            using (var controller = new CardClubResultPopupController(LangService, SessionService, AppSettings, betListApiClient))
            {
                // Action
                var result = await controller.Index(CustId, GameTypeId, TransId3rd);

                // Assert
                Assert.Multiple(() =>
                {
                    betListApiClient.Received(1).PostAsyncString(
                        Url,
                        Arg.Is<object>(
                            x => (string)x.GetValue("custId") == CustId &&
                                (string)x.GetValue("gameTypeId") == GameTypeId &&
                                (string)x.GetValue("transId3rd") == TransId3rd &&
                                (string)x.GetValue("languageCode") == Language), Language);
                    Assert.That(result, Is.EqualTo(ExpectedResult));
                });
            }
        }
    }
}