namespace Fanex.Athena.Controllers.Report.Result.ResultPopup
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    public class SportsLotteryResultPopupController : CultureBaseController
    {
        private readonly IBetListApiClient _betListApiClient;

        public SportsLotteryResultPopupController(IBetListApiClient betListApiClient)
        {
            _betListApiClient = betListApiClient;
        }

        [HttpGet]
        public async Task<string> Index(string custId, string transId3rd, string platform)
        {
            var language = SessionServiceInstance.UserSession.Language;
            var model = new
            {
                custId,
                transId3rd,
                platform,
                languageCode = language
            };

            return await _betListApiClient.PostStringAsync("/SportsLotteryResultPopup/Index", model, language).ConfigureAwait(false);
        }
    }
}