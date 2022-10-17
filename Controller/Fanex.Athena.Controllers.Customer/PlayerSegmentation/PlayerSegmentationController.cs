namespace Fanex.Athena.Controllers.Customer
{
    using System;
    using System.Collections.Concurrent;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using System.Web.SessionState;
    using Fanex.Athena.Excel.Customer.PlayerSegmentation;
    using Fanex.Athena.Extension.Utility.Internal;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
    using Fanex.Athena.Model.Customer.ViewModel;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.Customer.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [UMFilter]
    [FunctionAuthorization(PermissionKeys.PlayerSegmentation)]
    public partial class PlayerSegmentationController : CultureBaseController
    {

        private static readonly IDictionary<string, string> TabKeys = new Dictionary<string, string>
        {
            { PermissionKeys.PlayerProblemManagement, "ProblemPlayer" },
            { PermissionKeys.PlayerVIPManagement, "VipPlayerManagement" },
            { PermissionKeys.MonitoredPlayer, "MonitoredPlayer" }
        };

        private static readonly ConcurrentDictionary<string, AsyncLazy<IEnumerable<ReasonGroup>>> ReasonListFromCache = new ConcurrentDictionary
            <string, AsyncLazy<IEnumerable<ReasonGroup>>>(StringComparer.OrdinalIgnoreCase);

        private readonly IAuthorizationService _authService;
        private readonly ISubsidiaryService _subsidiaryService;
        private readonly IPlayerSegmentationService _playerService;
        private readonly ICustomerClassService _customerClassService;

        public PlayerSegmentationController(IAuthorizationService authService,
            ISubsidiaryService subsidiaryService,
            IPlayerSegmentationService playerService,
            ICustomerClassService customerClassService
            )
        {
            _authService = authService;
            _subsidiaryService = subsidiaryService;
            _playerService = playerService;
            _customerClassService = customerClassService;
        }

        [FunctionAuthorization(PermissionKeys.PlayerProblemManagement, PermissionKeys.PlayerVIPManagement, PermissionKeys.MonitoredPlayer)]
        public async Task<ViewResult> Index()
        {
            var model = await BuildViewModel();
            return View("~/Views/Desktop/Customer/PlayerSegmentation/Main.cshtml", model);
        }

        private async Task<PlayerSegmentationViewModel> BuildViewModel()
        {
            var userSession = SessionServiceInstance.UserSession;
            var licenseeSession = SessionServiceInstance.LicenseeSession;

            var currencyList = userSession.CurrencyList;
            var lang = LangService.GetCurrentLanguage();

            var hasVIPManangementPermission = HasVIPManagementPermission();
            var hasVIPManangementEditPermission = HasVIPManagementEditPermission();
            var hasMonitoredPlayerPermission = _authService.HasPermissions(SessionServiceInstance.UserSession, PermissionKeys.MonitoredPlayer);
            var subsidiaryList = _subsidiaryService.GetSubsidiaryTree(userSession, licenseeSession.LicenseeName);
            var viewType = !subsidiaryList.Any() ? SubsidiaryViewType.NotManagement : (SubsidiaryViewType)userSession.SubsidiaryViewType;
            var reasonList = await GetReasonList(lang);
            var problemPlayerCustomerClass = reasonList.OrderBy(_ => _.CustomerClass).Select(_ => _.CustomerClass.ToString()).Distinct();
            var vipMngCustomerClass = await _customerClassService.GetAllCustomerClassId();

            var model = new PlayerSegmentationViewModel
            {
                TabKeys = GetTabKeys(),
                HasVIPManagementPermission = hasVIPManangementPermission,
                HasVIPManagementEditPermission = hasVIPManangementEditPermission,
                ProblemPlayerVM = new ProblemPlayerViewModel
                {
                    CurrencyList = currencyList,
                    ReasonList = reasonList.ToDictionary(_ => _.ReasonGroupID, _ => _.ReasonGroupName),
                    CustomerClass = problemPlayerCustomerClass
                },
                VipPlayerVM = hasVIPManangementPermission ? new VipPlayerViewModel
                {
                    CurrencyList = currencyList,
                    VipOptions = GetVipOptions(),
                    CustomerClass = vipMngCustomerClass
                } : null,
                MonitoredPlayerVM = hasMonitoredPlayerPermission ? new MonitoredPlayerViewModel
                {
                    CanEdit = _authService.HasPermissions(SessionServiceInstance.UserSession, PermissionKeys.MonitoredPlayer_Write),
                    CurrencyList = currencyList
                } : null,
                ViewType = viewType,
                SubsidiaryList = subsidiaryList
            };

            return model;
        }

        private Task<IEnumerable<ReasonGroup>> GetReasonList(string lang)
        {
            var lazyTask = ReasonListFromCache.GetOrAdd(lang, langKey => new AsyncLazy<IEnumerable<ReasonGroup>>(() => _playerService.GetReasonGroupListAsync(langKey)));
            return lazyTask.Value;
        }

        private bool HasVIPManagementPermission()
        {
            var result = _authService.HasPermissions(SessionServiceInstance.UserSession, PermissionKeys.PlayerVIPManagement);
            return result;
        }

        private bool HasVIPManagementEditPermission()
        {
            var result = _authService.HasPermissions(SessionServiceInstance.UserSession, PermissionKeys.PlayerVIPManagement_Write);
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