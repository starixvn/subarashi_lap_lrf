namespace Fanex.Athena.Api.Report
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Hosting;
    using System.Web.Http;

    using Base.Attributes;

    using DataAccess.Report.Interfaces;

    using Excel.Report.Models;
    using Fanex.Athena.Excel.Base.Entities;
    using Fanex.Athena.Excel.Report;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Report.DTO;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Utility;

    using Model.Core.DataDomain;
    using Model.Core.MetaModel.Product;
    using Model.Core.ResultModel;

    using Service.Core.Common.Interfaces;

    [ApiFunctionAuthorization(PermissionKeys.ReportSabaVirtualSportsWinLoss)]
    public class SabaVirtualSportsWinLossReportController : ApiReportBaseController
    {
        private readonly IReportSettingService _reportSettingService;
        private readonly ISabaVirtualSportsWinLossDataAccess _sabaVirtualSportsWinLossDataAccess;

        public SabaVirtualSportsWinLossReportController(
            IReportSettingService reportSettingService,
            ILanguageService langService,
            ISabaVirtualSportsWinLossDataAccess sabaVirtualSportsWinLossDataAccess)
            : base(langService)
        {
            _reportSettingService = reportSettingService;
            _sabaVirtualSportsWinLossDataAccess = sabaVirtualSportsWinLossDataAccess;
        }

        [HttpPost]
        [ValidationApiRequest(ObjectName = "metaModel", IsValidCurrency = true)]
        public Task<dynamic> Index(
            SabaVirtualSportsWinLossMetaModel metaModel,
            DateTime? fdate,
            DateTime? tdate,
            int level = 0,
            int currencyId = 0,
            int custId = 0,
            string currencyName = null)
        {
            return ProcessRequest(metaModel, fdate, tdate, level, currencyId, custId, currencyName);
        }

        [HttpPost]
        [ValidationApiRequest(ObjectName = "metaModel", IsValidCurrency = true)]
        public Task<dynamic> Index([FromBody] SabaVirtualSportsWinLossMetaModel metaModel)
        {
            return ProcessRequest(metaModel, null, null);
        }

        private static dynamic GetEmptyResult(IEnumerable<ProductOption> productOptions, string promotionPrize = "0")
        {
            return new
            {
                Data = new List<LicenseeWinLossGridViewModel>(),
                Total = new List<LicenseeWinLossGridViewModel>(),
                SummaryTotal = new Dictionary<string, LicenseeWinLossGridViewModel>(),
                ProductOptions = productOptions.ToJson(),
                PromotionPrize = promotionPrize
            };
        }

        private static void SortData(SortableList<LicenseeWinLoss> dataList, string sortBy, string sortOrder = "asc")
        {
            if (string.IsNullOrEmpty(sortBy))
            {
                return;
            }

            var propertyName = sortBy;

            // Sort for grouping columns, get the real column name
            if (sortBy.EndsWith("Single", StringComparison.OrdinalIgnoreCase))
            {
                propertyName = sortBy.Remove(sortBy.LastIndexOf("Single", StringComparison.OrdinalIgnoreCase));
            }

            var property = typeof(LicenseeWinLoss).GetProperty(propertyName);

            if (property == null)
            {
                string productCode;

                if (propertyName.Contains(nameof(LicenseeWinLoss.LicenseeWL)))
                {
                    const string LicenseeWLColumn = nameof(LicenseeWinLoss.LicenseeWL);

                    productCode = propertyName.Substring(LicenseeWLColumn.Length);
                    propertyName = LicenseeWLColumn;
                }
                else
                {
                    const string TurnOverColumn = nameof(LicenseeWinLoss.TurnOver);

                    productCode = propertyName.Substring(TurnOverColumn.Length);
                    propertyName = TurnOverColumn;
                }

                dataList.SortByDictionary(productCode, propertyName, sortOrder.Equals("asc", StringComparison.OrdinalIgnoreCase), nameof(LicenseeWinLoss.Index), true);
            }
            else
            {
                dataList.Sort(propertyName, sortOrder.Equals("asc", StringComparison.OrdinalIgnoreCase), nameof(LicenseeWinLoss.Index), true);
            }
        }

        private static SabaVirtualSportsWinLossGridViewModel MapToGridView(LicenseeWinLoss item)
        {
            var sabaVirtualSportsWinLossGrid = new SabaVirtualSportsWinLossGridViewModel
            {
                Index = item.Index,
                CashOutCommission = item.CashOutCommission,
                CurrencyId = item.CurrencyId,
                SystemId = item.SystemId,
                CurrencyName = item.CurrencyName,
                CustomerComm = item.CustomerComm,
                CustomerWinLoss = item.CustomerWinLoss,
                TotalTransaction = item.TotalTransaction,
                CustomerId = item.CustomerId,
                Date = item.Date,
                ExternalId = item.ExternalId,
            };
            SetLicenseeWinLossProductData(sabaVirtualSportsWinLossGrid, item.LicenseeWL);
            SetTurnOverProductData(sabaVirtualSportsWinLossGrid, item.TurnOver);

            return sabaVirtualSportsWinLossGrid;
        }

        private static void SetLicenseeWinLossProductData(SabaVirtualSportsWinLossGridViewModel licenseeWinLoss, IDictionary<string, decimal> licenseeWLProducts)
        {
            licenseeWinLoss.LicenseeWLSB = licenseeWLProducts.GetValueOrDefault(Product.SB, 0);
            licenseeWinLoss.LicenseeWLCO = licenseeWLProducts.GetValueOrDefault(Product.CO, 0);
        }

        private static void SetTurnOverProductData(SabaVirtualSportsWinLossGridViewModel licenseeWinLoss, IDictionary<string, decimal> turnOverProducts)
        {
            licenseeWinLoss.TurnOverSB = turnOverProducts.GetValueOrDefault(Product.SB, 0);
        }

        private static bool IsProductVisible(IEnumerable<ProductOption> productOptions, ProductAccess productAccess, string productCode)
        {
            return productOptions.Any(x => x.Status && x.Code == productCode) && productAccess.IsAllow(productCode);
        }

        private HttpResponseMessage ExportExcel(
            SabaVirtualSportsWinLossMetaModel metaModel,
            SortableReportResultModel<LicenseeWinLoss> data)
        {
            var licenseeSession = SessionService.LicenseeSession;
            var userSession = SessionService.UserSession;
            const string FileName = "SabaVirtualSportsWinLoss.xls";
            var templatePath = HostingEnvironment.MapPath(@"~/App_Data/Template/Reports/SabaVirtualSportsWinLoss.xls");
            var productAccess = ProductService.GetProductAccess(licenseeSession.LicenseeId, userSession.Language);

            if (metaModel.DrillDownLevel > 0)
            {
                metaModel.FromDate = metaModel.DrillDownFromDate;
                metaModel.ToDate = metaModel.DrillDownToDate;
                metaModel.CurrencyId = metaModel.CurrencyId > 0 ? metaModel.DrillDownCurrencyId : metaModel.CurrencyId;
                metaModel.CurrencyName = metaModel.DrillDownCurrencyName;
            }
            var convertingOption = new ConvertingOption
            {
                IsConvert = metaModel.IsConvert,
                BaseCurrency = metaModel.BaseCurrency,
                CurrencyName = metaModel.DrillDownLevel == 0 ? metaModel.CurrencyName : metaModel.DrillDownCurrencyName
            };

            if (data.DataList.Any())
            {
                SortData(data.DataList, metaModel.SortBy, metaModel.SortOrder);
            }

            var excelModel = new SabaVirtualSportsWinLossExcelModel
            {
                ConvertingOption = convertingOption,
                DataList = data.DataList,
                MetaModel = metaModel,
                SummaryTotal = data.SummaryTotal,
                TotalData = data.TotalDataList,
                SBVisible = IsProductVisible(metaModel.ProductOptions, productAccess, Product.SB),
                COVisible = IsProductVisible(metaModel.ProductOptions, productAccess, Product.CO),
                CustomerCommVisible = licenseeSession.IsAllowedCustomerComm
            };

            var excel = CreateExcel(templatePath, excelModel);

            excel.Export();

            return ExcelStream(excel.Workbook, FileName);
        }

        protected internal virtual SabaVirtualSportsExcel CreateExcel(string templatePath, SabaVirtualSportsWinLossExcelModel excelModel)
        {
            return new SabaVirtualSportsExcel(templatePath, excelModel);
        }

        private async Task<SortableReportResultModel<LicenseeWinLoss>> GetData(SabaVirtualSportsWinLossMetaModel metaModel)
        {
            if (metaModel.IsValid)
            {
                var userCurrencyList = SessionService.UserSession.CurrencyList;
                SortableReportResultModel<LicenseeWinLoss> result;
                if (metaModel.DrillDownLevel == 0)
                {
                    result = await _sabaVirtualSportsWinLossDataAccess.GetSummaryWinloss(metaModel, userCurrencyList).ConfigureAwait(false);
                }
                else if (metaModel.LicenseeId != LicenseeIdentity.OneTwoBet || metaModel.DrillDownLevel == (int)ReportLevel.Customer)
                {
                    result = await _sabaVirtualSportsWinLossDataAccess.GetCustomerWinlossDetail(metaModel, userCurrencyList).ConfigureAwait(false);
                }
                else
                {
                    result = await _sabaVirtualSportsWinLossDataAccess.GetAgentWinlossDetail(metaModel, userCurrencyList).ConfigureAwait(false);
                }

                return result;
            }

            return new SortableReportResultModel<LicenseeWinLoss>
            {
                TotalDataList = new List<LicenseeWinLoss>(),
                SummaryTotal = new Dictionary<string, LicenseeWinLoss>(),
                DataList = new SortableList<LicenseeWinLoss>()
            };
        }

        private async Task<dynamic> ProcessRequest(
            SabaVirtualSportsWinLossMetaModel metaModel,
            DateTime? fdate,
            DateTime? tdate,
            int level = 0,
            int currencyId = 0,
            int custId = 0,
            string currencyName = null)
        {
            var userSession = SessionService.UserSession;
            metaModel.DefaultBaseCurrency = userSession.DefaultBaseCurrency;
            metaModel.DrillDownLevel = level;
            metaModel.DrillDownFromDate = fdate ?? metaModel.DrillDownFromDate;
            metaModel.DrillDownToDate = tdate ?? metaModel.DrillDownToDate;

            if (IsValidParams(metaModel))
            {
                metaModel.LicenseeId = SessionService.LicenseeSession.LicenseeId;
                metaModel.DrillDownCurrencyId = currencyId;
                metaModel.DrillDownCurrencyName = currencyName;
                metaModel.DrillDownCustomerId = custId;

                metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList,
                    level == 0 ? metaModel.CurrencyId : currencyId, metaModel.IsExcludedTestData);
                var result = await GetData(metaModel);

                if (metaModel.IsExportExcel)
                {
                    return ExportExcel(metaModel, result);
                }

                if (!result.DataList.Any())
                {
                    return GetEmptyResult(metaModel.ProductOptions, result.AdditionalInfo);
                }

                var summaryTotalView = result.SummaryTotal.ToDictionary(d => d.Key, d => MapToGridView(d.Value));
                return new
                {
                    Data = result.DataList.Select(MapToGridView).ToList(),
                    Total = result.TotalDataList.Select(MapToGridView).ToList(),
                    SummaryTotal = summaryTotalView,
                    ProductOptions = metaModel.ProductOptions.ToJson()
                };
            }

            return GetEmptyResult(metaModel.ProductOptions);
        }

        protected internal virtual bool IsValidParams(SabaVirtualSportsWinLossMetaModel metaModel)
        {
            var setting = _reportSettingService.GetSetting(PermissionKeys.ReportSabaVirtualSportsWinLoss,
                SessionService.LicenseeSession.LicenseeName);
            if (setting == null)
            {
                return true;
            }

            var fromDate = metaModel.DrillDownLevel == 0 ? metaModel.FromDate : metaModel.DrillDownFromDate;
            var toDate = metaModel.DrillDownLevel == 0 ? metaModel.ToDate : metaModel.DrillDownToDate;
            return DateTimeHelper.IsBetween(fromDate, setting.MinDate, setting.MaxDate) &&
                DateTimeHelper.IsBetween(toDate, setting.MinDate, setting.MaxDate);
        }
    }
}