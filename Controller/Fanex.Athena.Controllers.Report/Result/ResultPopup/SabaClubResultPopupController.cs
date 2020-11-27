namespace Fanex.Athena.Controllers.Report.Result.ResultPopup
{
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using System.Threading.Tasks;
    using System.Web.Mvc;

    public class SabaClubResultPopupController : CultureBaseController
    {
        private readonly IBetListApiClient _betListApiClient;

        public SabaClubResultPopupController(
            IBetListApiClient betListApiClient)
        {
            _betListApiClient = betListApiClient;
        }

        [HttpGet]
        public async Task<string> Index(string custId, string siteId, string gameRoundId, string gameId)
        {
            var language = SessionServiceInstance.UserSession.Language;
            var model = new
            {
                custId,
                siteId,
                gameRoundId,
                gameId,
                languageCode = language
            };
            return await _betListApiClient.PostStringAsync("/SabaClubResultPopup/Index", model, language).ConfigureAwait(false);
        }
    }
}