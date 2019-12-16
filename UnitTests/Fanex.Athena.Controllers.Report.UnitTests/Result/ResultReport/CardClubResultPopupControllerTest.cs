namespace Fanex.Athena.Controllers.Report.UnitTests.Result.ResultReport
{
    using System.Threading.Tasks;
    using Base.UnitTests;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using NSubstitute;
    using NUnit.Framework;
    using Report.Result.ResultPopup;
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
            StubUserSessionData(new Model.Auth.UserAuthInfo
            {
                Language = Language
            });
            var betListApiClient = Substitute.For<IBetListApiClient>();

            betListApiClient.PostStringAsync(Url, Arg.Any<object>(), SessionService.UserSession.Language).Returns(ExpectedResult);
            using (var controller = CreateController(betListApiClient))
            {
                // Action
                var result = await controller.Index(CustId, GameTypeId, TransId3rd);

                // Assert
                Assert.Multiple(() =>
                {
                    betListApiClient.Received(1).PostStringAsync(
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

        private CardClubResultPopupController CreateController(IBetListApiClient betListApiClient)
        {
            return new CardClubResultPopupController(betListApiClient)
            {
                LangService = LangService,
                SessionServiceInstance = SessionService
            };
        }
    }
}