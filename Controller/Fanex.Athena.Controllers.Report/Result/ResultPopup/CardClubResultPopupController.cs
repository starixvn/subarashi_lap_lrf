namespace Fanex.Athena.Controllers.Report.Result.ResultPopup
{
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using System.Threading.Tasks;
    using System.Web.Mvc;

    public class CardClubResultPopupController : CultureBaseController
    {
        private readonly IBetListApiClient _betListApiClient;

        public CardClubResultPopupController(
            IBetListApiClient betListApiClient)
        {
            _betListApiClient = betListApiClient;
        }

        [HttpGet]
        public async Task<string> Index(string custId, string gameTypeId, string transId3rd)
        {
            var language = SessionServiceInstance.UserSession.Language;
            var model = new
            {
                custId,
                gameTypeId,
                transId3rd,
                languageCode = language
            };
            return await _betListApiClient.PostStringAsync("/CardClubResultPopup/Index", model, language).ConfigureAwait(false);
        }
    }
}