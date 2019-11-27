using System.Threading.Tasks;
using System.Web.Mvc;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Model.BetList.MetaModel;
using Fanex.Athena.Service.Core.Common.Interfaces;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Controllers.BetList
{
    public class ExchangeVoidedController : ContentBaseController
    {
        private readonly ILGAPIClient _lgClient;
        private readonly IAppSettings _appSetting;

        public ExchangeVoidedController(
            ILanguageService languageService,
                  ISessionService sessionService,
                  ILGAPIClient lgClient,
                  IAppSettings appSetting) : base(languageService, sessionService)
        {
            _lgClient = lgClient;
            _appSetting = appSetting;
        }

        [HttpGet]
        public ActionResult Index()
        {
            return View("~/Views/Desktop/BetList/ExchangeVoided/Index.cshtml");
        }

        [HttpPost]
        public async Task<ActionResult> Index(ExchangeVoidedMetaModel metaModel)
        {
            metaModel.Environment = _appSetting.Environment;
            const string apiPath = "/ExchangeSettleBetHistory/Index";
            return JsonNet(await _lgClient.PostAsync<dynamic>(apiPath, metaModel, SessionService.UserSession.Language).ConfigureAwait(false));
        }
    }
}