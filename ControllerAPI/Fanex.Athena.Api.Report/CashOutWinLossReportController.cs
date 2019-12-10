// --------------------------------------------------------------------------
// <copyright file="CashOutWinLossReportController.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

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
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.Core.Utility.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Utility;

    using Model.Core.ResultModel;

    using Resources;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    [ApiFunctionAuthorization(PermissionKeys.ReportCashOutWinLoss)]
    public class CashOutWinLossReportController : ApiReportBaseController
    {
        private readonly ICashOutWinLossDataAccess _cashOutWinLossDataAccess;
        private readonly ICurrencyValidation _currencyValidation;

        public CashOutWinLossReportController(
            ICashOutWinLossDataAccess cashOutWinLossDataAccess,
            ILanguageService langService,
            ICurrencyValidation currencyValidation
            )
            : base(langService)
        {
            _cashOutWinLossDataAccess = cashOutWinLossDataAccess;
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

        protected internal virtual CashOutWinLossExcel CreateExcel(
            string templatePath,
            string exportingFileName,
            ThirdPartyWinLossMetaModel metaModel,
            CashOutWinLossViewModel viewModel)
        {
            return new CashOutWinLossExcel(templatePath, metaModel, viewModel);
        }

        private static dynamic GetEmptyResult()
        {
            return new
            {
                Data = new List<CashOutWinLoss>(),
                Total = new List<CashOutWinLoss>(),
                SummaryTotal = new Dictionary<string, CashOutWinLoss>()
            };
        }

        private HttpResponseMessage ExportExcel(
            ThirdPartyWinLossMetaModel metaModel,
            IList<CashOutWinLoss> dataList,
            IEnumerable<CashOutWinLoss> totalData,
            IDictionary<string, CashOutWinLoss> summaryTotal)
        {
            var userSession = SessionService.UserSession;
            var templatePath = HostingEnvironment.MapPath(@"~/App_Data/Template/Reports/CashOutWinLoss.xls");

            var currencyList = userSession.CurrencyList;

            var currency = currencyList.SingleOrDefault(i => i.Key == (metaModel.DrillDownLevel == 0 ? metaModel.CurrencyId : metaModel.DrillDownCurrencyId));
            var exportedFileName = string.Format(
                "CashOutWinLoss_{0:ddMMMyyyy}_{1}.xls",
                metaModel.DrillDownLevel > 0 ? metaModel.DrillDownFromDate : metaModel.FromDate,
                currency.Key == 0 ? "All" : currency.Value);

            metaModel.CurrencyId = metaModel.DrillDownLevel > 0 && metaModel.CurrencyId >= 0
                                    ? metaModel.DrillDownCurrencyId
                                    : metaModel.CurrencyId;

            if (metaModel.DrillDownLevel > 0)
            {
                metaModel.FromDate = metaModel.DrillDownFromDate;
                metaModel.ToDate = metaModel.DrillDownToDate;
                metaModel.CurrencyName = currency.Key == 0 ? ViewResources.All : currency.Value;
            }

            var excelModel = new CashOutWinLossViewModel
            {
                IsLicenseeOfferBA = SessionService.LicenseeSession.IsEnableBA,
                MainResult = dataList,
                TotalData = totalData,
                SummaryTotal = summaryTotal
            };

            var excel = CreateExcel(templatePath, exportedFileName, metaModel, excelModel);

            excel.Export();

            return ExcelStream(excel.Workbook, exportedFileName);
        }

        private async Task<dynamic> ProcessRequest(
            ThirdPartyWinLossMetaModel metaModel,
            DateTime? fdate,
            DateTime? tdate,
            int level = 0,
            int currencyId = 0,
            int custId = 0)
        {
            if (!_currencyValidation.IsValidCurrency(currencyId, true))
            {
                return GetEmptyResult();
            }

            UpdateMetaModel(metaModel, fdate, tdate, level, currencyId, custId);
            var result = await GetData(metaModel);

            if (metaModel.IsExportExcel)
            {
                return ExportExcel(metaModel, result.DataList, result.TotalDataList, result.SummaryTotal);
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

            return GetEmptyResult();
        }

        private void UpdateMetaModel(
            ThirdPartyWinLossMetaModel metaModel,
            DateTime? fdate,
            DateTime? tdate,
            int level,
            int currencyId,
            int custId)
        {
            var userSession = SessionService.UserSession;
            metaModel.DrillDownCurrencyId = currencyId;
            metaModel.DrillDownLevel = level;
            metaModel.DrillDownCustomerId = custId;
            metaModel.DrillDownFromDate = fdate ?? metaModel.DrillDownFromDate;
            metaModel.DrillDownToDate = tdate ?? metaModel.DrillDownToDate;
            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList,
                level > 0 ? currencyId : metaModel.CurrencyId, metaModel.IsExcludedTestData);
            metaModel.DefaultBaseCurrency = userSession.DefaultBaseCurrency;
        }

        private async Task<SortableReportResultModel<CashOutWinLoss>> GetData(ThirdPartyWinLossMetaModel metaModel)
        {
            var userCurrencyList = SessionService.UserSession.CurrencyList;
            return metaModel.DrillDownLevel == 0 ?
                await _cashOutWinLossDataAccess.GetSummary(metaModel, userCurrencyList).ConfigureAwait(false) :
                await _cashOutWinLossDataAccess.GetDetail(metaModel, userCurrencyList).ConfigureAwait(false);
        }
    }
}