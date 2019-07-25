namespace Fanex.Athena.Controllers.TotalBets.UnitTests
{
    using System.Threading.Tasks;
    using Base.UnitTests;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using NSubstitute;
    using NUnit.Framework;
    using Report.Result.ResultPopup;
    using Service.Core.Utility.Interfaces;
    using UnitTest.Common.Extensions;

    [TestFixture]
    public partial class CardClubResultPopupControllerTest : CultureBaseControllerHelperTest
    {
        [Test]
        public async Task Index_WhenCall_CallBetListApi()
        {
            // Arrange
            const string CustId = "123";
            const string GamePlayId = "345";
            const string ExpectedResult = "aaaaaaaaaaaa";
            const string Url = "/PPResultPopup/Index";
            const string Language = "vi-VN";
            StubUserSessionData(new UserAuthInfo
            {
                Language = Language
            });
            var betListApiClient = Substitute.For<IBetListApiClient>();

            betListApiClient.PostAsyncString(Url, Arg.Any<object>(), SessionService.UserSession.Language).Returns(ExpectedResult);
            using (var controller = new PPResultPopupController(LangService, SessionService, betListApiClient))
            {
                // Action
                var result = await controller.Index(CustId, GamePlayId);

                // Assert
                Assert.Multiple(() =>
                {
                    betListApiClient.Received(1).PostAsyncString(
                        Url,
                        Arg.Is<object>(
                            x => (string)x.GetValue("custId") == CustId &&
                                (string)x.GetValue("gamePlayId") == GamePlayId &&
                                (string)x.GetValue("languageCode") == Language), Language);
                    Assert.That(result, Is.EqualTo(ExpectedResult));
                });
            }
        }
    }
}