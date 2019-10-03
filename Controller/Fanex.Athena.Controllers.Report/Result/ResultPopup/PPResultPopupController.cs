namespace Fanex.Athena.Controllers.Report.Result.ResultPopup
{
    using System.Threading.Tasks;
    using System.Web.Mvc;

    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    public class PPResultPopupController : ContentBaseController
    {
        private readonly IBetListApiClient _betListApiClient;

        public PPResultPopupController(
            ILanguageService languageService,
            ISessionService sessionService,
            IBetListApiClient betListApiClient
            )
            : base(languageService, sessionService)
        {
            _betListApiClient = betListApiClient;
        }

        [HttpGet]
        public async Task<string> Index(string custId, string gamePlayId)
        {
            var language = SessionService.UserSession.Language;
            var model = new
            {
                custId,
                gamePlayId,
                languageCode = language
            };
            return await _betListApiClient.PostAsyncString("/PPResultPopup/Index", model, language).ConfigureAwait(false);
        }
    }
}