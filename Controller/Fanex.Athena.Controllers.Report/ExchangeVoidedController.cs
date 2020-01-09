using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Auth.Enum;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Report.DTO;
using Fanex.Athena.Model.Report.MetaModel;
using Fanex.Athena.Model.Report.ViewModel;
using Fanex.Athena.Service.Report.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.Web.ActionFilter;

namespace Fanex.Athena.Controllers.Report
{
    [FunctionAuthorization(PermissionKeys.BettingTicketCenter)]
    public class ExchangeVoidedController : ReportBaseController
    {
        private readonly IAppSettings _appSetting;

        private readonly IAuthorizationService _authService;

        private readonly IExchangeVoidedService _exchangeService;

        public ExchangeVoidedController(
                  IAppSettings appSetting,
                  IAuthorizationService authService,
                  IExchangeVoidedService exchangeService)
        {
            _appSetting = appSetting;
            _authService = authService;
            _exchangeService = exchangeService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var tabList = GetEnableTabList();
            var hasPermission = HasPermission(tabList.Any());
            ViewBag.TabList = tabList;

            return View("~/Views/Desktop/Report/ExchangeVoided/Index.cshtml", model: hasPermission);
        }

        [HttpPost]
        [ValidationWebRequest(ObjectName = "metaModel")]
        [AutoBindMetaModel(BindAgent = true, BindSiteName = true)]
        public async Task<ActionResult> Index(ExchangeVoidedMetaModel metaModel)
        {
            if (!HasPermission(GetEnableTabList().Any()))
            {
                return JsonNet(new ExchangeVoidedViewModel { DataList = new List<ExchangeVoidedItem>(), TotalPage = 0 });
            }

            metaModel.Environment = _appSetting.Environment;
            metaModel.Language = SessionServiceInstance.UserSession.Language;

            return JsonNet(await _exchangeService.GetData(metaModel).ConfigureAwait(false));
        }

        private bool HasPermission(bool hasActivedTab)
        {
            return hasActivedTab && _authService.CheckProductBelongsTo(SessionServiceInstance.LicenseeSession.LicenseeName, ProductTypes.Exchange);
        }

        private IEnumerable<string> GetEnableTabList()
        {
            var userSession = SessionServiceInstance.UserSession;
            if (userSession.IsSuperAdmin)
            {
                return BtcViewInfo.TabList.ToList();
            }

            var userFunctionKeyList = userSession.ApplicationMode == AppMode.Parasitic ?
                userSession.PortalFunctionList.Select(x => x.FunctionKey) :
                userSession.FunctionList.Select(x => x.FunctionKey);

            return BtcViewInfo.TabList.Intersect(userFunctionKeyList);
        }
    }
}