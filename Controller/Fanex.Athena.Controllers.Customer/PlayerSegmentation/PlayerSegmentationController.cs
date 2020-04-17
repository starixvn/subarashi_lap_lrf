namespace Fanex.Athena.Controllers.Customer
{
    using Fanex.Athena.DataAccess.Customer.Interfaces;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Customer.ViewModel;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using ONEbook.UM.Filters;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using System.Web.SessionState;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    [FunctionAuthorization(PermissionKeys.PlayerSegmentation)]
    public class PlayerSegmentationController : CultureBaseController
    {
        private static object lockObject = new object();

        private const string VIP_LIST_TEMPLATE_PATH = "~/App_Data/Template/Customers/PlayerSegmentation/VipPlayerUploadTemplate.xls";

        private static readonly IDictionary<string, string> _tabKeys = new Dictionary<string, string>
        {
            { PermissionKeys.PlayerProblemManagement, "ProblemPlayer" },
            { PermissionKeys.PlayerVIPManagement, "VipPlayerManagement" }
        };

        private static IDictionary<string, IDictionary<int, string>> ReasonListFromCache { get; set; } = new Dictionary<string, IDictionary<int, string>>
        {
            { Util.EnUSLangName, null },
            { Util.SimplifiedChineseLangName, null }
        };

        private readonly IAuthorizationService _authService;
        private readonly IPlayerSegmentationDataAccess _playerDataAccess;

        public PlayerSegmentationController(IAuthorizationService authService, IPlayerSegmentationDataAccess playerDataAccess)
        {
            _authService = authService;
            _playerDataAccess = playerDataAccess;
        }

        [FunctionAuthorization(PermissionKeys.PlayerProblemManagement, PermissionKeys.PlayerVIPManagement)]
        public async Task<ViewResult> Index()
        {
            var currencyList = SessionServiceInstance.UserSession.CurrencyList;
            var baseCurrency = SessionServiceInstance.UserSession.DefaultBaseCurrency;
            var hasVIPManangementPermission = HasVIPManagementPermission();
            var reasonList = await GetReasonList().ConfigureAwait(false);

            var model = new PlayerSegmentationViewModel
            {
                TabKeys = GetTabKeys(),
                HasVIPManagementPermission = hasVIPManangementPermission,
                ProblemPlayerVM = new ProblemPlayerViewModel
                {
                    CurrencyList = currencyList,
                    ReasonList = reasonList
                },
                VipPlayerVM = hasVIPManangementPermission ? new VipPlayerViewModel
                {
                    CurrencyList = currencyList,
                    VipOptions = GetVipOptions()
                } : null,
                BaseCurrency = baseCurrency
            };

            return View("~/Views/Desktop/Customer/PlayerSegmentation/Main.cshtml", model);
        }

        [HttpGet]
        [FunctionAuthorization(PermissionKeys.PlayerVIPManagement)]
        public FileResult DowloadVipListTemplate()
        {
            var templatePath = Server.MapPath(VIP_LIST_TEMPLATE_PATH);
            return File(templatePath, "application/vnd.ms-excel", "VipPlayerList.xls");
        }

        private bool HasVIPManagementPermission()
        {
            var result = _authService.HasPermissions(SessionServiceInstance.UserSession, PermissionKeys.PlayerVIPManagement);
            return result;
        }

        private IEnumerable<string> GetTabKeys()
        {
            var tabKeysByPermission = _tabKeys
                .Where(_ => _authService.HasPermissions(SessionServiceInstance.UserSession, _.Key))
                .Select(_ => _.Value);

            return tabKeysByPermission;
        }

        private static IDictionary<int, string> GetVipOptions()
        {
            return new Dictionary<int, string>
            {
                { 0, ViewResources.All },
                { 1, ViewResources.Yes },
                { 2, ViewResources.No },
            };
        }

        private async Task<IDictionary<int, string>> GetReasonList()
        {
            var langCode = CurrentLanguage;
            if (!ReasonListFromCache.ContainsKey(langCode))
            {
                langCode = DefaultLanguage;
            }

            if (ReasonListFromCache[langCode] != null && ReasonListFromCache[langCode].Any())
            {
                return ReasonListFromCache[langCode];
            }

            var reasonListFromDB = await _playerDataAccess.GetReasonGroupListAsync(langCode).ConfigureAwait(false);
            lock (lockObject)
            {
                ReasonListFromCache[langCode] = reasonListFromDB;
            }
            return reasonListFromDB;
        }
    }
}