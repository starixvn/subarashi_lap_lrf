namespace Fanex.Athena.Controllers.Report.Result.ResultPopup
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    public class CardClubResultPopupController : ContentBaseController
    {
        private readonly IBetListApiClient _betListApiClient;

        public CardClubResultPopupController(
            ILanguageService languageService,
            ISessionService sessionService,
            IBetListApiClient betListApiClient)
            : base(languageService, sessionService)
        {
            _betListApiClient = betListApiClient;
        }

        [HttpGet]
        public async Task<string> Index(string custId, string gameTypeId, string transId3rd)
        {
            var language = SessionService.UserSession.Language;
            var model = new
            {
                custId,
                gameTypeId,
                transId3rd,
                languageCode = language
            };
            return await _betListApiClient.PostAsyncString("/CardClubResultPopup/Index", model, language).ConfigureAwait(false);
        }
    }
}