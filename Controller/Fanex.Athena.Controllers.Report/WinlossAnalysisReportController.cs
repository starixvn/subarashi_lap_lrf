namespace Fanex.Athena.Controllers.BetList
{
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Controllers.Base.Helpers;
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
        private readonly ISubsidiaryService _subsidiaryService;
        private readonly ICustomerClassService _customerClassService;
        private readonly IAuthorizationService _authorizationService;

        private bool IsOneworksMaster =>
           SessionServiceInstance.UserSession.UserLevel == UserLevelType.Oneworks
           && SessionServiceInstance.UserSession.SubsidiaryViewType == (byte)SubsidiaryViewType.NormalManagement;

        public WinlossAnalysisReportController(
            IProductService productService,
            ISubsidiaryService subsidiaryService,
            ICustomerClassService customerClassService,
            IAuthorizationService authorizationService)
        {
            _productService = productService;
            _subsidiaryService = subsidiaryService;
            _customerClassService = customerClassService;
            _authorizationService = authorizationService;
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
                PlatformList = PlatformHelper.GetPlatformList(),
                IsOneworksMaster = IsOneworksMaster,
                IsHasPermissionViewVip = _authorizationService.HasPermissions(userSession, PermissionKeys.PlayerVIPManagement),
                OddGroups = licenseeSession.OfferedOddsGroupsList,
                IsOfferCashOutProduct = _productService.IsOfferCashOutProduct(licenseeSession.LicenseeId, userSession.Language),
                RiskLevels = await _customerClassService.GetAllRiskLevel()
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

        private IEnumerable<KeyValuePair<int, string>> GetCurrencyList()
        {
            return SessionServiceInstance.UserSession.CurrencyList.OrderBy(_ => _.Value);
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

        private static IEnumerable<Product> MoveBaProductToBelowSportBook(ReadOnlyCollection<Product> productList)
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
    }
}