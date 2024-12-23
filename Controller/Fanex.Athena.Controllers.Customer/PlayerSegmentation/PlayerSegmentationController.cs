namespace Fanex.Athena.Controllers.Customer
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using System.Web.SessionState;
    using Model.Auth.DataDomain;
    using Model.Core.DataDomain;
    using Model.Customer.ViewModel;
    using Resources;
    using Service.Core.Users.Interfaces;
    using Service.Customer.Interfaces;
    using Service.StatelessCore.Interfaces;
    using Web.ActionFilter;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [UMFilter]
    [FunctionAuthorization(PermissionKeys.PlayerSegmentation)]
    public partial class PlayerSegmentationController : CultureBaseController
    {
        private static readonly IDictionary<string, string> TabKeys = new Dictionary<string, string>
        {
            { PermissionKeys.MonitoredPlayer, "MonitoredPlayer" },
            { PermissionKeys.PlayerVIPManagement, "VipPlayerManagement" }
        };

        private readonly IAuthorizationService _authService;
        private readonly ICustomerClassService _customerClassService;
        private readonly ISubsidiaryService _subsidiaryService;

        public PlayerSegmentationController(
            IAuthorizationService authService,
            ISubsidiaryService subsidiaryService,
            ICustomerClassService customerClassService
        )
        {
            _authService = authService;
            _subsidiaryService = subsidiaryService;
            _customerClassService = customerClassService;
        }

        [FunctionAuthorization(PermissionKeys.PlayerVIPManagement, PermissionKeys.MonitoredPlayer)]
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
            var hasVIPManangementPermission = HasVIPManagementPermission();
            var hasVIPManangementEditPermission = HasVIPManagementEditPermission();
            var hasMonitoredPlayerPermission = _authService.HasPermissions(SessionServiceInstance.UserSession, PermissionKeys.MonitoredPlayer);
            var subsidiaryList = _subsidiaryService.GetSubsidiaryTree(userSession, licenseeSession.LicenseeName);
            var viewType = !subsidiaryList.Any() ? SubsidiaryViewType.NotManagement : (SubsidiaryViewType)userSession.SubsidiaryViewType;
            var riskLevels = await _customerClassService.GetAllRiskLevel();

            var model = new PlayerSegmentationViewModel
            {
                TabKeys = GetTabKeys(),
                HasVIPManagementPermission = hasVIPManangementPermission,
                HasVIPManagementEditPermission = hasVIPManangementEditPermission,
                VipPlayerVM = hasVIPManangementPermission
                    ? new VipPlayerViewModel
                    {
                        CurrencyList = currencyList,
                        VipOptions = GetVipOptions(),
                        RiskLevels = riskLevels
                    }
                    : null,
                MonitoredPlayerVM = hasMonitoredPlayerPermission
                    ? new MonitoredPlayerViewModel
                    {
                        CanEdit = _authService.HasPermissions(SessionServiceInstance.UserSession, PermissionKeys.MonitoredPlayer_Write),
                        CurrencyList = currencyList
                    }
                    : null,
                ViewType = viewType,
                SubsidiaryList = subsidiaryList,
                IsHideSaba = IsHideSaba
            };

            return model;
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
                { 2, ViewResources.No }
            };
        }
    }
}