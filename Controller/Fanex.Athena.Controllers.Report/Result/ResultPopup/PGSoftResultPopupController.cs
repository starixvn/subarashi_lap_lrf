namespace Fanex.Athena.Controllers.Report.Result.ResultPopup
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    public class PGSoftResultPopupController : CultureBaseController
    {
        private readonly IBetListApiClient _betListApiClient;

        public PGSoftResultPopupController(IBetListApiClient betListApiClient)
        {
            _betListApiClient = betListApiClient;
        }

        [HttpGet]
        public async Task<string> Index(string custid, string gamePlayId, string gameId3rd, string siteId)
        {
            var language = SessionServiceInstance.UserSession.Language;
            var model = new
            {
                custid,
                gamePlayId,
                gameId3rd,
                siteId,
                languageCode = language
            };

            return await _betListApiClient.PostStringAsync("/PGSoftResultPopup/Index", model, language).ConfigureAwait(false);
        }
    }
}
