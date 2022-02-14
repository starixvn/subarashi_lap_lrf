namespace Fanex.Athena.Controllers.Report.Result.ResultPopup
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    public class Happy5LinkedGamesResultPopupController : CultureBaseController
    {
        private readonly IBetListApiClient _betListApiClient;

        public Happy5LinkedGamesResultPopupController(IBetListApiClient betListApiClient)
        {
            _betListApiClient = betListApiClient;
        }

        [HttpGet]
        public async Task<string> Soccer5(string matchId, string balls, string platform)
        {
            var language = SessionServiceInstance.UserSession.Language;
            var model = new
            {
                matchId,
                balls,
                platform,
                languageCode = language
            };

            return await _betListApiClient.PostStringAsync("/Happy5LinkedGamesResultPopup/Soccer5", model, language).ConfigureAwait(false);
        }
    }
}