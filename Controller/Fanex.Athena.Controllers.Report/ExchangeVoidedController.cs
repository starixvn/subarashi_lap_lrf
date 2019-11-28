using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;
using Fanex.Athena.DataAccess.Report.Interfaces;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Model.Report.DTO;
using Fanex.Athena.Model.Report.MetaModel;
using Fanex.Athena.Model.Report.ViewModel;
using Fanex.Athena.Service.Core.Common.Interfaces;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.Web.ActionFilter;

namespace Fanex.Athena.Controllers.Report
{
    public class ExchangeVoidedController : ContentBaseController
    {
        private readonly ILGAPIClient _lgClient;

        private readonly IAppSettings _appSetting;

        private readonly IExchangeVoidedDataAccess _dataAccess;

        public ExchangeVoidedController(
            ILanguageService languageService,
                  ISessionService sessionService,
                  ILGAPIClient lgClient,
                  IAppSettings appSetting,
                  IExchangeVoidedDataAccess dataAccess) : base(languageService, sessionService)
        {
            _lgClient = lgClient;
            _appSetting = appSetting;
            _dataAccess = dataAccess;
        }

        [HttpGet]
        public ActionResult Index()
        {
            return View("~/Views/Desktop/Report/ExchangeVoided/Index.cshtml");
        }

        [HttpPost]
        [ValidationWebRequest(ObjectName = "metaModel")]
        [AutoBindMetaModel(BindAgent = true)]
        public async Task<ActionResult> Index(ExchangeVoidedMetaModel metaModel)
        {
            var userName = metaModel.UserName?.Trim();
            var custId = 0;
            if (!string.IsNullOrEmpty(userName))
            {
                custId = _dataAccess.GetCustId(userName, metaModel.AgentListXml);

                if (custId == 0)
                {
                    return JsonNet(new ExchangeVoidedViewModel { DataList = new List<ExchangeVoidedItem>(), TotalPage = 0 });
                }
            }

            var apiMetaModel = new
            {
                CustId = custId,
                metaModel.RefNo,
                metaModel.SelectedDate,
                metaModel.PageIndex,
                _appSetting.Environment
            };

            const string apiPath = "/ExchangeSettleBetHistory/Index";

            return JsonNet(await _lgClient.PostAsync<ExchangeVoidedViewModel>(apiPath, apiMetaModel, SessionService.UserSession.Language).ConfigureAwait(false));
        }
    }
}