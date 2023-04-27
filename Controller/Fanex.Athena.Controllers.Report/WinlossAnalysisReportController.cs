namespace Fanex.Athena.Controllers.BetList
{
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.DataAccess.Core.Configuration.Interfaces;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.Customer.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Core.DTO.Common;
    using Model.Core.MetaModel.Product;
    using Resources;
    using Web.ActionFilter;

    [FunctionAuthorization(PermissionKeys.ReportWinlossAnalysis)]
    public class WinlossAnalysisReportController : CultureBaseController
    {
        private const string ProductListFunctionKey = "WinlossAnalysis";

        private readonly IProductService _productService;

        private readonly IAuthorizationService _authService;

        private readonly ISubsidiaryService _subsidiaryService;

        private readonly ICustomerClassService _customerClassService;

        private bool IsOneworksMaster =>
           SessionServiceInstance.UserSession.UserLevel == UserLevelType.Oneworks
           && SessionServiceInstance.UserSession.SubsidiaryViewType == (byte)SubsidiaryViewType.NormalManagement;

        public WinlossAnalysisReportController(
            IProductService productService,
            IAuthorizationService authService,
            ISubsidiaryService subsidiaryService,
            ICustomerClassService customerClassService)
        {
            _productService = productService;
            _authService = authService;
            _subsidiaryService = subsidiaryService;
            _customerClassService = customerClassService;
        }

        public async Task<ActionResult> Index()
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var subsidiaryList = _subsidiaryService.GetWhiteLabelTree(userSession, licenseeSession.LicenseeName);
            var customerClassIds = await _customerClassService.GetAllCustomerClassId();

            var viewModel = new WinlossAnalysisReportViewModel
            {
                CurrencyList = GetCurrencyList(),
                LiveStatusList = GetLiveStatusList(),
                StatusList = GetStatusList(),
                ProductOptionList = GetProductOptionList(),
                MinDate = DateTime.Today.AddYears(-3),
                MaxDate = DateTime.Today,
                IsAllowedCustomerComm = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm,
                SelectedBaseCurrency = SessionServiceInstance.UserSession.DefaultBaseCurrency,
                SubsidiaryViewType = IsOneworksMaster ? (byte)SubsidiaryViewType.MasterManagement : userSession.SubsidiaryViewType,
                SubsidiaryList = subsidiaryList,
                PlatformList = GetPlatformList(),
                IsOneworksMaster = IsOneworksMaster,
                CustomerClass = customerClassIds,
                OddGroups = licenseeSession.OfferedOddsGroupsList,
                IsOfferCashOutProduct = _productService.IsOfferCashOutProduct(licenseeSession.LicenseeId, userSession.Language)
            };
            return View("~/Views/Desktop/Report/WinlossAnalysis/Index.cshtml", viewModel);
        }

        private static IEnumerable<CheckedItem> GetStatusList()
        {
            return new List<CheckedItem>
            {
                new CheckedItem { ID = StatusTypes.Won, Name = ViewResources.Won, Checked = true },
                new CheckedItem { ID = StatusTypes.Lose, Name = ViewResources.Lose, Checked = true },
                new CheckedItem { ID = StatusTypes.Draw, Name = ViewResources.Draw, Checked = true }
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

        private IDictionary<int, string> GetCurrencyList()
        {
            return SessionServiceInstance.UserSession.CurrencyList;
        }

        private IEnumerable<ProductOption> GetProductOptionList()
        {
            var productAccess = _productService.GetProductAccess(
                SessionServiceInstance.LicenseeSession.LicenseeId,
                SessionServiceInstance.UserSession.Language,
                ProductListFunctionKey);

            var list = MoveBaProductToBelowSportBook(productAccess.ProductList);

            return list.Select(i => new ProductOption
            {
                Code = i.ProductCode,
                Name = i.ProductName,
                Status = true
            }).ToList();
        }

        private IEnumerable<Product> MoveBaProductToBelowSportBook(ReadOnlyCollection<Product> productList)
        {
            var list = productList.ToList();
            var baProduct = list.FirstOrDefault(c => c.ProductID == ProductTypes.BA);
            var sbProduct = list.FirstOrDefault(c => c.ProductID == ProductTypes.Sportsbook);
            if(baProduct != null && sbProduct != null) 
            {
                list.Remove(baProduct);
                list.Insert(list.IndexOf(sbProduct) + 1, baProduct);
            }
            return list;
        }

        private static IDictionary<int, string> GetPlatformList()
        {
            return new Dictionary<int, string>
            {
                { PlatformType.DesktopNewAsia, ViewResources.DesktopNewAsia },
                { PlatformType.DesktopChina, ViewResources.DesktopChina },
                { PlatformType.DesktopOthers, ViewResources.DesktopOthers },
                { PlatformType.MobileStandard, ViewResources.MobileStandard },
                { PlatformType.MobileEuro, ViewResources.MobileEuro },
                { PlatformType.MobileCompact, ViewResources.MobileCompact },
                { PlatformType.MobileOthers, ViewResources.MobileOthers },
                { PlatformType.ESportsDesktop, ViewResources.ESportsDesktop },
                { PlatformType.ESportsMobile, ViewResources.ESportsMobile },
                { PlatformType.ESportsApp, ViewResources.ESportsApp },
                { PlatformType.MobileApp, ViewResources.MobileApp },
                { PlatformType.NativeApp, ViewResources.NativeApp },
                { PlatformType.Tablet, ViewResources.Tablet },
                { PlatformType.DeepLink, ViewResources.DeepLink },
                { PlatformType.WAP, ViewResources.Wap },
                { PlatformType.BetfromOthers, ViewResources.BetfromOthers }
            };
        }
    }
}