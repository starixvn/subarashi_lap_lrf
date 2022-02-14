namespace Fanex.Athena.Controllers.Report.Result.ResultPopup
{
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using System.Threading.Tasks;
    using System.Web.Mvc;

    public class ThirdPartyResultPopupController : CultureBaseController
    {
        private readonly IBetListApiClient _betListApiClient;

        public ThirdPartyResultPopupController(
            IBetListApiClient betListApiClient)
        {
            _betListApiClient = betListApiClient;
        }

        [HttpGet]
        public async Task<string> Index(
            string custId,
            string transId3rd,
            string gameId3rd,
            string currencyId,
            string siteId,
            string betTypeId,
            string productPath)
        {
            var language = SessionServiceInstance.UserSession.Language;

            var model = new
            {
                custId,
                transId3rd,
                gameId3rd,
                currencyId,
                siteId,
                betTypeId,
                languageCode = language
            };

            return await _betListApiClient.PostStringAsync($"/{productPath}ResultPopup/Index",
               model, language).ConfigureAwait(false);
        }
    }
}