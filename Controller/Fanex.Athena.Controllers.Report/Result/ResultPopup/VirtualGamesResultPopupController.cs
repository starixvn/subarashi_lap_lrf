namespace Fanex.Athena.Controllers.Report.Result.ResultPopup
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    public class VirtualGamesResultPopupController : CultureBaseController
    {
        private readonly IBetListApiClient _betListApiClient;

        public VirtualGamesResultPopupController(IBetListApiClient betListApiClient)
        {
            _betListApiClient = betListApiClient;
        }

        [HttpGet]
        public async Task<string> Index(string gamePlayId, string platform = "d")
        {
            var language = SessionServiceInstance.UserSession.Language;
            var model = new
            {
                gamePlayId,
                languageCode = language,
                platform,
            };
            return await _betListApiClient.PostStringAsync("/VirtualGamesResultPopup/GetDetailResult", model, language).ConfigureAwait(false);
        }
    }
}