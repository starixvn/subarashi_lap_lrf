namespace Fanex.Athena.Controllers.Customer
{
    using System;
    using System.Collections.Concurrent;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using System.Web.SessionState;
    using Fanex.Athena.Controllers.Customer.Helpers;
    using Fanex.Athena.Extension.Utility.Internal;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core;
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
            { PermissionKeys.MonitoredPlayer, "MonitoredPlayer" },
            { PermissionKeys.SabaVirtualSetting, "SabaVirtualSetting" },
            { PermissionKeys.PlayerVIPManagement, "VipPlayerManagement" }
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

        [FunctionAuthorization(PermissionKeys.PlayerVIPManagement, PermissionKeys.MonitoredPlayer, PermissionKeys.SabaVirtualSetting)]
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
            var hasSabaVirtualSettingPermission = _authService.HasPermissions(SessionServiceInstance.UserSession, PermissionKeys.SabaVirtualSetting);
            var subsidiaryList = _subsidiaryService.GetSubsidiaryTree(userSession, licenseeSession.LicenseeName);
            var viewType = !subsidiaryList.Any() ? SubsidiaryViewType.NotManagement : (SubsidiaryViewType)userSession.SubsidiaryViewType;
            var reasonList = await GetReasonList(lang);
            var problemPlayerCustomerClass = reasonList.OrderBy(_ => _.CustomerClass).Select(_ => _.CustomerClass.ToString()).Distinct();
            var riskLevels = await _customerClassService.GetAllRiskLevel();

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
                    RiskLevels = riskLevels
                } : null,
                MonitoredPlayerVM = hasMonitoredPlayerPermission ? new MonitoredPlayerViewModel
                {
                    CanEdit = _authService.HasPermissions(SessionServiceInstance.UserSession, PermissionKeys.MonitoredPlayer_Write),
                    CurrencyList = currencyList
                } : null,
                DangerLevelVM = hasSabaVirtualSettingPermission ? new DangerLevelViewModel
                {
                    CurrencyList = currencyList,
                    LevelList = SabaVirtualSettingHelper.GenerateDangerLevelList(true),
                    SportList = GetDangerLevelSportList()
                } : null,
                ViewType = viewType,
                SubsidiaryList = subsidiaryList,
                IsHideSaba = SabaHelper.IsHideSaba(licenseeSession.SpecialPlatform)
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

        private static IDictionary<int, string> GetDangerLevelSportList()
        {
            return new Dictionary<int, string>
            {
                { (int)SportType.Soccer, ViewResources.Soccer },
                { (int)SportType.BasketBall, ViewResources.Basketball },
            };
        }
    }
}