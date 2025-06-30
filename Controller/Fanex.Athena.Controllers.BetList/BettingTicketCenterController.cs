namespace Fanex.Athena.Controllers.BetList
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using DataAccess.Core.Configuration.Interfaces;
    using Extension.Helper;
    using Model.Auth.DataDomain;
    using Model.Auth.Enum;
    using Model.BetList.ViewModel;
    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;
    using Model.Core.Helper;
    using Model.Core.MetaModel.Product;
    using Resources;
    using Service.Core.Users.Interfaces;
    using Service.Customer.Interfaces;
    using Service.StatelessCore.Interfaces;
    using Web.ActionFilter;

    [FunctionAuthorization(PermissionKeys.BettingTicketCenter)]
    [UMFilter]
    public class BettingTicketCenterController : CultureBaseController
    {
        private readonly IAuthorizationService _authService;

        private readonly IBalanceUpDataAccess _balanceUpDataAccess;

        private readonly ICustomerClassService _customerClassService;
        private readonly IProductService _productService;

        private readonly ISubsidiaryService _subsidiaryService;

        public BettingTicketCenterController(
            IProductService productService,
            IBalanceUpDataAccess balanceUpDataAccess,
            IAuthorizationService authService,
            ISubsidiaryService subsidiaryService,
            ICustomerClassService customerClassService)
        {
            _productService = productService;
            _balanceUpDataAccess = balanceUpDataAccess;
            _authService = authService;
            _subsidiaryService = subsidiaryService;
            _customerClassService = customerClassService;
        }

        private bool IsOneworksMaster =>
            SessionServiceInstance.UserSession.UserLevel == UserLevelType.Oneworks
            && SessionServiceInstance.UserSession.SubsidiaryViewType == (byte)SubsidiaryViewType.NormalManagement;

        [FunctionAuthorization(
            PermissionKeys.BtcSingleCustomer,
            PermissionKeys.BtcRefNo,
            PermissionKeys.BtcRunning,
            PermissionKeys.BtcAdvancedSearch)]
        public async Task<ActionResult> Index()
        {
            var tabList = GetEnableTabList();

            if (tabList.Any(x => PermissionKeys.BtcRefNo == x))
            {
                return RefNo();
            }

            if (tabList.Any(x => PermissionKeys.BtcSingleCustomer == x))
            {
                return SingleCustomer();
            }

            if (tabList.Any(x => PermissionKeys.BtcRunning == x))
            {
                return await Running();
            }

            if (tabList.Any(x => PermissionKeys.BtcAdvancedSearch == x))
            {
                return await AdvancedSearch();
            }

            if (tabList.Any(x => PermissionKeys.BtcBookedBet == x))
            {
                return BookedBet();
            }

            return RedirectToAction("AccessDenied", "Utility");
        }

        [FunctionAuthorization(PermissionKeys.BtcAdvancedSearch)]
        public async Task<ActionResult> AdvancedSearch()
        {
            var tabList = GetEnableTabList();
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var subsidiaryList = _subsidiaryService.GetWhiteLabelTree(userSession, licenseeSession.LicenseeName);
            var viewModel = new BettingTicketCenterViewModel
            {
                CurrencyList = GetCurrencyList(),
                LiveStatusList = GetLiveStatusList(),
                StatusList = GetStatusList(),
                ProductOptionList = GetProductOptionList(FunctionNames.BettingTicketCenterAdvancedSearch),
                MinDate = DateTimeHelper.Today.AddYears(-3),
                IsAllowedCustomerComm = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm,
                SelectedBaseCurrency = SessionServiceInstance.UserSession.DefaultBaseCurrency,
                SubsidiaryViewType = IsOneworksMaster ? (byte)SubsidiaryViewType.MasterManagement : userSession.SubsidiaryViewType,
                IsOneworksMaster = IsOneworksMaster,
                SubsidiaryList = subsidiaryList,
                HasExchange = tabList.Any() && HasExchange(),
                TabList = tabList,
                RiskLevels = await _customerClassService.GetAllRiskLevel(),
                PlatformList = PlatformHelper.GetPlatformList(licenseeSession.SpecialPlatform),
                IsOfferCashOutProduct = _productService.IsOfferCashOutProduct(licenseeSession.LicenseeId, SessionServiceInstance.UserSession.Language),
                OddsGroup = licenseeSession.OfferedOddsGroupsList
            };

            ViewBag.IsAllowTxIDColumn = licenseeSession.IsEnableSingleWallet;

            return View("~/Views/Desktop/BetList/BettingTicketCenter/AdvancedSearch.cshtml", viewModel);
        }

        [FunctionAuthorization(PermissionKeys.BtcSingleCustomer)]
        public ActionResult SingleCustomer()
        {
            var tabList = GetEnableTabList();
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var viewModel = new BettingTicketCenterViewModel
            {
                LiveStatusList = GetLiveStatusList(),
                StatusList = GetStatusList(),
                PlatformList = PlatformHelper.GetPlatformList(licenseeSession.SpecialPlatform),
                ProductOptionList = GetProductOptionList(FunctionNames.BettingTicketCenterSingleCustomer),
                IsAllowedCustomerComm = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm,
                SelectedBaseCurrency = SessionServiceInstance.UserSession.DefaultBaseCurrency,
                IsOfferCashOutProduct = _productService.IsOfferCashOutProduct(licenseeSession.LicenseeId, SessionServiceInstance.UserSession.Language),
                HasExchange = tabList.Any() && HasExchange(),
                TabList = tabList
            };

            ViewBag.IsAllowTxIDColumn = licenseeSession.IsEnableSingleWallet;

            return View("~/Views/Desktop/BetList/BettingTicketCenter/SingleCustomer.cshtml", viewModel);
        }

        [FunctionAuthorization(PermissionKeys.BtcRefNo)]
        public ActionResult RefNo()
        {
            var tabList = GetEnableTabList();
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var balanceUpDay = _balanceUpDataAccess.GetBalanceUp().BalanceUpDay.ToString(FormatKey.DateFormat);

            ViewBag.ProductsRequireUseNameNote = GetProductsRequireUseName();
            ViewBag.SelectedBaseCurrency = SessionServiceInstance.UserSession.DefaultBaseCurrency;
            ViewBag.HasExchange = tabList.Any() && HasExchange();
            ViewBag.TabList = tabList;
            ViewBag.IsAllowTxIDColumn = licenseeSession.IsEnableSingleWallet;
            ViewBag.IsAllowSabaCoins = _authService.HasPermissions(SessionServiceInstance.UserSession, PermissionKeys.SabaCoins);
            ViewBag.BalanceUpDay = balanceUpDay;
            ViewBag.ProductsRequireTxIdNote = string.Format(
                ViewResources.BettingTicketCenter_RefnoTabNote_TxIDSearch2,
                GetProductsSupportTxIDSearchOnly(),
                balanceUpDay);

            return View(
                "~/Views/Desktop/BetList/BettingTicketCenter/RefNo.cshtml",
                SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm);
        }

        [FunctionAuthorization(PermissionKeys.BtcRunning)]
        public async Task<ActionResult> Running()
        {
            var tabList = GetEnableTabList();
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var subsidiaryList = _subsidiaryService.GetWhiteLabelTree(userSession, licenseeSession.LicenseeName);

            var viewModel = new BettingTicketCenterViewModel
            {
                StatusList = GetRunningStatusList(),
                CurrencyList = GetCurrencyList(),
                ProductOptionList = GetProductOptionList(FunctionNames.BettingTicketCenterRunning),
                LiveStatusList = GetLiveStatusList(),
                RiskLevels = await _customerClassService.GetAllRiskLevel(),
                PlatformList = PlatformHelper.GetPlatformList(licenseeSession.SpecialPlatform),
                OddsGroup = licenseeSession.OfferedOddsGroupsList,
                IsAllowedCustomerComm = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm,
                SelectedBaseCurrency = SessionServiceInstance.UserSession.DefaultBaseCurrency,
                SubsidiaryViewType = IsOneworksMaster ? (byte)SubsidiaryViewType.MasterManagement : userSession.SubsidiaryViewType,
                IsOneworksMaster = IsOneworksMaster,
                SubsidiaryList = subsidiaryList,
                HasExchange = tabList.Any() && HasExchange(),
                TabList = tabList
            };

            ViewBag.IsAllowTxIDColumn = licenseeSession.IsEnableSingleWallet;

            return View("~/Views/Desktop/BetList/BettingTicketCenter/Running.cshtml", viewModel);
        }

        [FunctionAuthorization(PermissionKeys.BtcBookedBet)]
        public ActionResult BookedBet()
        {
            var tabList = GetEnableTabList();
            var licenseeSession = SessionServiceInstance.LicenseeSession;

            var viewModel = new BettingTicketCenterViewModel
            {
                StatusList = GetBookedBetStatusList(),
                CurrencyList = GetCurrencyList(),
                PlatformList = PlatformHelper.GetPlatformList(licenseeSession.SpecialPlatform),
                SelectedBaseCurrency = SessionServiceInstance.UserSession.DefaultBaseCurrency,
                HasExchange = tabList.Any() && HasExchange(),
                TabList = tabList
            };

            return View("~/Views/Desktop/BetList/BettingTicketCenter/BookedBet.cshtml", viewModel);
        }

        private IEnumerable<string> GetEnableTabList()
        {
            var userSession = SessionServiceInstance.UserSession;
            if (userSession.IsSuperAdmin)
            {
                return BtcViewInfo.TabList.ToList();
            }

            var userFunctionKeyList = userSession.ApplicationMode == AppMode.Parasitic
                ? userSession.PortalFunctionList.Select(x => x.FunctionKey)
                : userSession.FunctionList.Select(x => x.FunctionKey);

            return BtcViewInfo.TabList.Intersect(userFunctionKeyList);
        }

        private string GetProductsRequireUseName()
        {
            var productsDoesNotRequireUseName = new[]
            {
                Product.SB,
                Product.NG,
                Product.VS,
                Product.CO
            };

            return string.Join(", ", GetProductRequireNote(productsDoesNotRequireUseName, true));
        }

        private string GetProductsSupportTxIDSearchOnly()
        {
            var productsRequireTxId = new[]
            {
                Product.KN,
                Product.LT,
                Product.TG,
                Product.SLT
            };

            return string.Join(", ", GetProductRequireNote(productsRequireTxId));
        }

        private List<string> GetProductRequireNote(string[] productCode, bool isExclude = false)
        {
            var productAccess = _productService.GetSingleWalletProductAccess(
                SessionServiceInstance.LicenseeSession.LicenseeId,
                SessionServiceInstance.UserSession.Language,
                FunctionNames.BettingTicketCenter);

            var licProductsRequire = productAccess.ProductList
                .Where(product => (isExclude && !productCode.Contains(product.ProductCode)) || (!isExclude && productCode.Contains(product.ProductCode)))
                .Select(x => x.ProductName).ToList();

            var offeredSubProductList = SessionServiceInstance.LicenseeSession.OfferedSubProductList;

            if (offeredSubProductList.IsPresent(_ => _ == Product.SLT))
            {
                licProductsRequire.Add(productAccess.GetProductName(Product.SLT));
            }

            if (productAccess.IsAllow(Product.NG))
            {
                licProductsRequire.Add(ViewResources.Happy5LinkedGames);
            }

            return licProductsRequire;
        }

        private static IEnumerable<CheckedItem> GetRunningStatusList()
        {
            return new List<CheckedItem>
            {
                new CheckedItem { ID = StatusTypes.Waiting, Name = ViewResources.Running, Checked = true },
                new CheckedItem { ID = StatusTypes.DelayedPayout, Name = ViewResources.DelayedPayout, Checked = true },
                new CheckedItem { ID = StatusTypes.UnderSettlement, Name = ViewResources.UnderSettlement, Checked = true }
            };
        }

        private static IEnumerable<CheckedItem> GetStatusList()
        {
            return new List<CheckedItem>
            {
                new CheckedItem { ID = StatusTypes.Won, Name = ViewResources.Won, Checked = true },
                new CheckedItem { ID = StatusTypes.Lose, Name = ViewResources.Lost, Checked = true },
                new CheckedItem { ID = StatusTypes.Draw, Name = ViewResources.Draw, Checked = true },
                new CheckedItem { ID = StatusTypes.Void, Name = ViewResources.Void },
                new CheckedItem { ID = StatusTypes.AbnormalBet, Name = ViewResources.AbnormalBet },
                new CheckedItem { ID = StatusTypes.Reject, Name = ViewResources.Reject },
                new CheckedItem { ID = StatusTypes.Refund, Name = ViewResources.Refund },
                new CheckedItem { ID = StatusTypes.DelayedPayout, Name = ViewResources.DelayedPayout }
            };
        }

        private static IDictionary<int, string> GetLiveStatusList()
        {
            return new Dictionary<int, string>
            {
                { LiveStatusTypes.NonLive, ViewResources.NoneLive },
                { LiveStatusTypes.Live, ViewResources.Live },
                { LiveStatusTypes.Mix, ViewResources.MixLiveAndNoneLive }
            };
        }

        private static IEnumerable<CheckedItem> GetBookedBetStatusList()
        {
            return new List<CheckedItem>
            {
                new CheckedItem { ID = StatusTypes.Booking, Name = ViewResources.Booking, Checked = true },
                new CheckedItem { ID = StatusTypes.Successful, Name = ViewResources.Successful, Checked = true },
                new CheckedItem { ID = StatusTypes.Unsuccessful, Name = ViewResources.Unsuccessful, Checked = true },
                new CheckedItem { ID = StatusTypes.Cancelled, Name = ViewResources.Cancelled, Checked = true }
            };
        }

        private IDictionary<int, string> GetCurrencyList()
        {
            return SessionServiceInstance.UserSession.CurrencyList;
        }

        private IEnumerable<ProductOption> GetProductOptionList(string functionConfigKey = FunctionNames.BettingTicketCenter)
        {
            var productAccess = _productService.GetSingleWalletProductAccess(
                SessionServiceInstance.LicenseeSession.LicenseeId,
                SessionServiceInstance.UserSession.Language,
                functionConfigKey);

            return productAccess.ProductList.Select(i => new ProductOption
            {
                Code = i.ProductCode,
                Name = i.ProductName,
                Status = true
            }).ToList();
        }

        private bool HasExchange()
        {
            return _authService.CheckProductBelongsTo(SessionServiceInstance.LicenseeSession.LicenseeName, ProductTypes.Exchange);
        }
    }
}