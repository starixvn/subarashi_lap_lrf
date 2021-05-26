using System.Threading.Tasks;
using System.Web.Mvc;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Controllers.Report.Result.ResultPopup
{
    public class BGGResultPopupController : CultureBaseController
    {
        private readonly IBetListApiClient _betListApiClient;

        public BGGResultPopupController(IBetListApiClient betListApiClient)
        {
            _betListApiClient = betListApiClient;
        }

        [HttpGet]
        public async Task<string> Index(string custId, string transId3rd, string currencyId, string siteId)
        {
            var language = SessionServiceInstance.UserSession.Language;
            var model = new
            {
                custId,
                transId3rd,
                currencyId,
                siteId,
                languageCode = language
            };

            return await _betListApiClient.PostStringAsync("/BGGResultPopup/Index", model, language).ConfigureAwait(false);
        }
    }
}
