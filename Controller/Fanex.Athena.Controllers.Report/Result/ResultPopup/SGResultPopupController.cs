namespace Fanex.Athena.Controllers.Report.Result.ResultPopup
{
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using System.Threading.Tasks;
    using System.Web.Mvc;

    public class SGResultPopupController : CultureBaseController
    {
        private readonly IBetListApiClient _betListApiClient;

        public SGResultPopupController(
            IBetListApiClient betListApiClient
            )
        {
            _betListApiClient = betListApiClient;
        }

        [HttpGet]
        public async Task<string> Index(string custId, string gamePlayId)
        {
            var language = SessionServiceInstance.UserSession.Language;
            var model = new
            {
                custId,
                gamePlayId,
                languageCode = language
            };
            return await _betListApiClient.PostStringAsync("/SGResultPopup/Index", model, language).ConfigureAwait(false);
        }
    }
}