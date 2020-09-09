namespace Fanex.Athena.Controllers.Customer
{
    using System;
    using System.Collections.Concurrent;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using System.Web.SessionState;
    using Fanex.Athena.Extension.Utility.Internal;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Customer.MetaModel.PlayerSegmentation;
    using Fanex.Athena.Model.Customer.ViewModel;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.Customer.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using ONEbook.UM.Filters;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    [FunctionAuthorization(PermissionKeys.PlayerSegmentation)]
    public partial class PlayerSegmentationController : CultureBaseController
    {
        private const string VIP_LIST_TEMPLATE_PATH = "~/App_Data/Template/Customers/PlayerSegmentation/VipPlayerUploadTemplate.xls";

        private static readonly IDictionary<string, string> TabKeys = new Dictionary<string, string>
        {
            { PermissionKeys.PlayerProblemManagement, "ProblemPlayer" },
            { PermissionKeys.PlayerVIPManagement, "VipPlayerManagement" }
        };

        private static readonly ConcurrentDictionary<string, AsyncLazy<IDictionary<int, string>>> ReasonListFromCache = new ConcurrentDictionary
            <string, AsyncLazy<IDictionary<int, string>>>(StringComparer.OrdinalIgnoreCase);

        private readonly IAuthorizationService _authService;
        private readonly ISubsidiaryService _subsidiaryService;
        private readonly IPlayerSegmentationService _playerService;

        public PlayerSegmentationController(IAuthorizationService authService,
            ISubsidiaryService subsidiaryService,
            IPlayerSegmentationService playerService)
        {
            _authService = authService;
            _subsidiaryService = subsidiaryService;
            _playerService = playerService;
        }

        [FunctionAuthorization(PermissionKeys.PlayerProblemManagement, PermissionKeys.PlayerVIPManagement)]
        public async Task<ViewResult> Index()
        {
            var model = await BuildViewModel();
            return View("~/Views/Desktop/Customer/PlayerSegmentation/Main.cshtml", model);
        }

        [FunctionAuthorization(PermissionKeys.PlayerProblemManagement)]
        public async Task<ViewResult> CustomerClassInformation()
        {
            var model = await _playerService.GetCustomerClassInformation(new GetCustomerClassInformationMetaModel
            {
                SiteName = SessionServiceInstance.LicenseeSession.LicenseeName
            });

            return View("~/Views/Desktop/Customer/PlayerSegmentation/CustomerClassInformation.cshtml", model);
        }

        [HttpGet]
        [FunctionAuthorization(PermissionKeys.PlayerVIPManagement)]
        public FileResult DowloadVipListTemplate()
        {
            var templatePath = Server.MapPath(VIP_LIST_TEMPLATE_PATH);
            return File(templatePath, "application/vnd.ms-excel", "VipPlayerList.xls");
        }

        private async Task<PlayerSegmentationViewModel> BuildViewModel()
        {
            var currencyList = SessionServiceInstance.UserSession.CurrencyList;
            var baseCurrency = SessionServiceInstance.UserSession.DefaultBaseCurrency;
            var lang = LangService.GetCurrentLanguage();

            var hasVIPManangementPermission = HasVIPManagementPermission();
            var subsidiaryList = _subsidiaryService.GetSubsidiaryTree(SessionServiceInstance.UserSession, SessionServiceInstance.LicenseeSession.LicenseeName);
            var viewType = (byte)_playerService.GetViewType(subsidiaryList.Any());
            var reasonList = await GetReasonList(lang).ConfigureAwait(false);

            var model = new PlayerSegmentationViewModel
            {
                TabKeys = GetTabKeys(),
                HasVIPManagementPermission = hasVIPManangementPermission,
                ProblemPlayerVM = new ProblemPlayerViewModel
                {
                    CurrencyList = currencyList,
                    ReasonList = reasonList,
                },
                VipPlayerVM = hasVIPManangementPermission ? new VipPlayerViewModel
                {
                    CurrencyList = currencyList,
                    VipOptions = GetVipOptions()
                } : null,
                BaseCurrency = baseCurrency,
                ViewType = viewType,
                SubsidiaryList = subsidiaryList
            };

            return model;
        }

        private async Task<IDictionary<int, string>> GetReasonList(string lang)
        {
            var lazyTask = ReasonListFromCache.GetOrAdd(lang, langKey => new AsyncLazy<IDictionary<int, string>>(() => _playerService.GetReasonGroupListAsync(langKey)));
            return await lazyTask.Value.ConfigureAwait(false);
        }

        private bool HasVIPManagementPermission()
        {
            var result = _authService.HasPermissions(SessionServiceInstance.UserSession, PermissionKeys.PlayerVIPManagement);
            return result;
        }

        private IEnumerable<string> GetTabKeys()
        {
            var tabKeysByPermission = TabKeys
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
    }
}
