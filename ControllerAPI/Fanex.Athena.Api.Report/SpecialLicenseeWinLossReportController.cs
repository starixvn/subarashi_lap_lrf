namespace Fanex.Athena.Api.Report
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Base.Attributes;
    using DataAccess.Report.Interfaces;
    using Extension.Helper;
    using Extension.Utility;
    using Model.Auth.DataDomain;
    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;
    using Model.Core.DTO.Configuration;
    using Model.Report.DTO;
    using Model.Report.MetaModel;
    using Model.Report.ViewModel;
    using Service.Core.Common.Interfaces;
    using Service.StatelessCore.Interfaces;

    [ApiFunctionAuthorization(PermissionKeys.ReportLicenseeWinLoss, PermissionKeys.AuditLicenseeWinLoss, PermissionKeys.ReportGrossGamingRevenue)]
    public class SpecialLicenseeWinLossReportController : ApiReportBaseController
    {
        private readonly ISpecialLicenseeWinLossDataAccess _licenseeWinLossDataAccess;
        private readonly IReportSettingService _reportSettingService;

        public SpecialLicenseeWinLossReportController(
            IReportSettingService reportSettingService,
            ILanguageService langService,
            ISpecialLicenseeWinLossDataAccess licenseeWinLossDataAccess)
            : base(langService)
        {
            _reportSettingService = reportSettingService;
            _licenseeWinLossDataAccess = licenseeWinLossDataAccess;
        }

        [HttpPost]
        [ValidationApiRequest(IsValidCurrency = true)]
        public Task<dynamic> Index(SpecialLicenseeWinLossMetaModel metaModel)
        {
            return ProcessRequest(metaModel);
        }

        protected internal virtual bool IsValidParams(SpecialLicenseeWinLossMetaModel metaModel, ReportSetting setting)
        {
            return IsValidDateRange(metaModel, setting) &&
                   IsValidProduct(metaModel);
        }

        private static SpecialLicenseeWinLossGridViewModel MapToGridView(LicenseeWinLoss item)
        {
            var licenseeWinLossGrid = new SpecialLicenseeWinLossGridViewModel
            {
                CurrencyId = item.CurrencyId,
                CurrencyName = item.CurrencyName,
                CustomerWinLoss = item.CustomerWinLoss,
                TotalTransaction = item.TotalTransaction,
                Date = item.Date,
                DateString = item.DateString
            };
            SetLicenseeWinLossProductData(licenseeWinLossGrid, item.LicenseeWL);
            SetTurnOverProductData(licenseeWinLossGrid, item.TurnOver);

            return licenseeWinLossGrid;
        }

        private static void SetLicenseeWinLossProductData(
            SpecialLicenseeWinLossGridViewModel licenseeWinLoss,
            IDictionary<string, decimal> licenseeWLProducts)
        {
            licenseeWinLoss.LicenseeWLSB = licenseeWLProducts.GetValueOrDefault(Product.SB, 0);
            licenseeWinLoss.LicenseeWLNG = licenseeWLProducts.GetValueOrDefault(Product.NG, 0);
            licenseeWinLoss.LicenseeWLCS = licenseeWLProducts.GetValueOrDefault(Product.CS, 0);
            licenseeWinLoss.LicenseeWLLC = licenseeWLProducts.GetValueOrDefault(Product.LC, 0);
        }

        private static void SetTurnOverProductData(SpecialLicenseeWinLossGridViewModel licenseeWinLoss, IDictionary<string, decimal> turnOverProducts)
        {
            licenseeWinLoss.TurnOverSB = turnOverProducts.GetValueOrDefault(Product.SB, 0);
            licenseeWinLoss.TurnOverNG = turnOverProducts.GetValueOrDefault(Product.NG, 0);
            licenseeWinLoss.TurnOverCS = turnOverProducts.GetValueOrDefault(Product.CS, 0);
            licenseeWinLoss.TurnOverLC = turnOverProducts.GetValueOrDefault(Product.LC, 0);
        }

        private static bool IsValidDateRange(SpecialLicenseeWinLossMetaModel metaModel, ReportSetting setting)
        {
            return setting != null && metaModel.FromDate <= metaModel.ToDate &&
                   DateTimeHelper.IsBetween(metaModel.FromDate, setting.MinDate, setting.MaxDate) &&
                   DateTimeHelper.IsBetween(metaModel.ToDate, setting.MinDate, setting.MaxDate);
        }

        private async Task<dynamic> ProcessRequest(SpecialLicenseeWinLossMetaModel metaModel)
        {
            var setting = _reportSettingService.GetSetting(PermissionKeys.ReportLicenseeWinLoss
                , SessionService.LicenseeSession.LicenseeName);

            if (IsValidParams(metaModel, setting))
            {
                var userSession = SessionService.UserSession;
                var licenseeName = SessionService.LicenseeSession.LicenseeName;
                metaModel.BaseCurrencySetting = setting.BaseCurrencies;
                metaModel.SiteName = licenseeName;
                metaModel.CurrencyListXml = GenerateCurrencyListXml(metaModel);
                metaModel.DefaultBaseCurrency = userSession.DefaultBaseCurrency;

                var result = await _licenseeWinLossDataAccess.GetData(metaModel, userSession.CurrencyList, LicenseeSession.AuditCurrencies);

                if (result.DataList.Any())
                {
                    var summaryTotalView = result.SummaryTotal.ToDictionary(d => d.Key, d => MapToGridView(d.Value));
                    return new
                    {
                        Data = result.DataList.Select(MapToGridView).ToList(),
                        Total = result.TotalDataList.Select(MapToGridView).ToList(),
                        SummaryTotal = summaryTotalView
                    };
                }
            }

            return new
            {
                Data = new List<SpecialLicenseeWinLossGridViewModel>(),
                Total = new List<SpecialLicenseeWinLossGridViewModel>(),
                SummaryTotal = new Dictionary<string, SpecialLicenseeWinLossGridViewModel>()
            };
        }

        private string GenerateCurrencyListXml(SpecialLicenseeWinLossMetaModel metaModel)
        {
            var result = new StringBuilder("<ROOT>");
            var currencyList = SessionService.UserSession.CurrencyList
                .Where(i => i.Key == metaModel.CurrencyId || metaModel.CurrencyId <= 0)
                .ToList();

            foreach (var currency in currencyList)
            {
                result.AppendFormat("<CR Id=\"{0}\" Code=\"{1}\" />", currency.Key, currency.Value);
            }

            result.Append("</ROOT>");
            return result.ToString();
        }

        private bool IsValidProduct(SpecialLicenseeWinLossMetaModel metaModel)
        {
            if (metaModel.ProductCodeList == null)
            {
                return false;
            }

            var productAccess = ProductService.GetSingleWalletProductAccess(
                SessionService.LicenseeSession.LicenseeId,
                SessionService.UserSession.Language,
                FunctionNames.SpecialLicenseeWinLoss);
            var productList = productAccess.ProductList.Select(x => x.ProductCode);

            return productList.Intersect(metaModel.ProductCodeList).Count() == metaModel.ProductCodeList.Count();
        }
    }
}