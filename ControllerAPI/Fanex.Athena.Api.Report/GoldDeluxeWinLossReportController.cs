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

    using Fanex.Athena.Excel.Report;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Report.DTO;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Service.Core.Utility.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Utility;

    using Model.Core.ResultModel;

    using Service.Core.Common.Interfaces;

    [ApiFunctionAuthorization(PermissionKeys.ReportGoldDeluxeWinloss)]
    public class GoldDeluxeWinLossReportController : ApiReportBaseController
    {
        private readonly IGoldDeluxeWinLossDataAccess _dataAccess;
        private readonly ICurrencyValidation _currencyValidation;

        public GoldDeluxeWinLossReportController(
            IGoldDeluxeWinLossDataAccess dataAccess,
            ILanguageService langService,
            ICurrencyValidation currencyValidation
            )
            : base(langService)
        {
            _dataAccess = dataAccess;
            _currencyValidation = currencyValidation;
        }

        [HttpPost]
        [ValidationApiRequest(ObjectName = "metaModel", IsValidCurrency = true, IsIncludeKeanOcean = true)]
        public Task<dynamic> Index(
            ThirdPartyWinLossMetaModel metaModel,
            DateTime? fdate,
            DateTime? tdate,
            int level = 0,
            int currencyId = 0,
            int custId = 0)
        {
            return ProcessRequest(metaModel, fdate, tdate, level, currencyId, custId);
        }

        [HttpPost]
        [ValidationApiRequest(ObjectName = "metaModel", IsValidCurrency = true, IsIncludeKeanOcean = true)]
        public Task<dynamic> Index([FromBody] ThirdPartyWinLossMetaModel metaModel)
        {
            return ProcessRequest(metaModel, null, null);
        }

        protected internal virtual GoldDeluxeWinLossExcel CreateExcel(
            string templatePath,
            ThirdPartyWinLossMetaModel metaModel,
            ReportResultModel<GoldDeluxeWinLoss> data)
        {
            return new GoldDeluxeWinLossExcel(templatePath, metaModel, data);
        }

        private static string GetExcelFileName(ThirdPartyWinLossMetaModel metaModel, ref KeyValuePair<int, string> currency)
        {
            var fromDate = $"{(metaModel.DrillDownLevel > 0 ? metaModel.DrillDownFromDate : metaModel.FromDate):ddMMMyyyy}";
            var currencyName = currency.Key == 0 ? "All" : currency.Value;

            var exportedFileName = $"GDWinLoss_{fromDate}_{currencyName}.xls";
            return exportedFileName;
        }

        private HttpResponseMessage ExportExcel(
            ThirdPartyWinLossMetaModel metaModel,
            ReportResultModel<GoldDeluxeWinLoss> data)
        {
            var userSession = SessionService.UserSession;
            var templatePath = HostingEnvironment.MapPath(@"~/App_Data/Template/Reports/GoldDeluxeWinLoss.xls");
            var currency = userSession.CurrencyList.SingleOrDefault(i => i.Key == (metaModel.DrillDownLevel == 0 ? metaModel.CurrencyId : metaModel.DrillDownCurrencyId));

            var exportedFileName = GetExcelFileName(metaModel, ref currency);

            if (metaModel.DrillDownLevel > 0)
            {
                metaModel.FromDate = metaModel.DrillDownFromDate;
                metaModel.ToDate = metaModel.DrillDownToDate;
                metaModel.CurrencyId = metaModel.CurrencyId >= 0 ? metaModel.DrillDownCurrencyId : metaModel.CurrencyId;
                metaModel.CurrencyName = currency.Value;
            }

            var excel = CreateExcel(templatePath, metaModel, data);

            excel.Export();

            return ExcelStream(excel.Workbook, exportedFileName);
        }

        private async Task<ReportResultModel<GoldDeluxeWinLoss>> GetData(ThirdPartyWinLossMetaModel metaModel)
        {
            var userCurrencyList = SessionService.UserSession.CurrencyList;
            if (metaModel.DrillDownLevel == 0)
            {
                return await _dataAccess.GetSummaryWinloss(metaModel, userCurrencyList).ConfigureAwait(false);
            }
            else if (metaModel.DrillDownLevel == 1)
            {
                return await _dataAccess.GetAgentWinlossDetail(metaModel, userCurrencyList).ConfigureAwait(false);
            }
            else
            {
                return await _dataAccess.GetCustomerWinlossDetail(metaModel, userCurrencyList).ConfigureAwait(false);
            }
        }

        private async Task<dynamic> ProcessRequest(
            ThirdPartyWinLossMetaModel metaModel,
            DateTime? fdate,
            DateTime? tdate,
            int level = 0,
            int currencyId = 0,
            int custId = 0)
        {
            var userSession = SessionService.UserSession;
            if (_currencyValidation.IsValidCurrency(currencyId, true))
            {
                metaModel.DrillDownCurrencyId = currencyId;
                metaModel.DrillDownLevel = level;
                metaModel.DrillDownCustomerId = custId;
                metaModel.DrillDownFromDate = fdate.HasValue ? fdate.Value : metaModel.DrillDownFromDate;
                metaModel.DrillDownToDate = tdate.HasValue ? tdate.Value : metaModel.DrillDownToDate;
                metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList,
                    level == 0 ? metaModel.CurrencyId : currencyId, metaModel.IsExcludedTestData);
                metaModel.LicenseeId = SessionService.LicenseeSession.LicenseeId;
                metaModel.DefaultBaseCurrency = userSession.DefaultBaseCurrency;

                var result = await GetData(metaModel);

                if (metaModel.IsExportExcel)
                {
                    return ExportExcel(metaModel, result);
                }

                if (result.DataList != null && result.DataList.Any())
                {
                    return new
                    {
                        Data = result.DataList,
                        Total = result.TotalDataList,
                        result.SummaryTotal
                    };
                }
            }

            return new
            {
                Data = Enumerable.Empty<GoldDeluxeWinLoss>(),
                Total = Enumerable.Empty<GoldDeluxeWinLoss>(),
                SummaryTotal = new Dictionary<string, GoldDeluxeWinLoss>()
            };
        }
    }
}