// --------------------------------------------------------------------------
// <copyright file="PlatformWinLossReportController.cs" company="">
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
    using Extension.Utility;
    using Fanex.Athena.DataAccess.Core.Configuration.Interfaces;
    using Fanex.Athena.Excel.Base.Entities;
    using Fanex.Athena.Excel.Report;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Report.DTO;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;
    using Model.Core.MetaModel.Product;
    using Model.Core.ResultModel;
    using Resources;
    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    [ApiFunctionAuthorization(PermissionKeys.ReportPlatformWinLoss)]
    public class PlatformWinLossReportController : ApiReportBaseController
    {
        private readonly IPlatformWinLossDataAccess _platformWinLossDataAccess;
        private readonly IReportAPIClient _reportAPIClient;
        public PlatformWinLossReportController(
            ISessionService sessionService,
            IProductService productService,
            ILanguageService langService,
            IReportAPIClient reportAPIClient,
            IPlatformWinLossDataAccess platformWinLossDataAccess)
            : base(sessionService, productService, langService)
        {
            _platformWinLossDataAccess = platformWinLossDataAccess;
            _reportAPIClient = reportAPIClient;
        }

        [HttpPost]
        [ValidationApiRequest(IsValidCurrency = true, IsIncludeKeanOcean = true)]
        public Task<dynamic> Index(PlatformWinLossMetaModel metaModel)
        {
            return ProcessRequest(metaModel);
        }

        protected internal virtual PlatformWinLossSummaryExcel CreateExcelSummary(
            string templatePath,
            PlatformWinLossMetaModel metaModel,
            IEnumerable<PlatformWinLossSummary> dataList,
            PlatformWinLossSummary total)
        {
            return new PlatformWinLossSummaryExcel(templatePath, metaModel, dataList, total);
        }

        protected internal virtual PlatformWinLossMemberExcel CreateExcelMember(
            string templatePath,
            PlatformWinLossViewModel excelModel,
            ShowingOption showingOption)
        {
            return new PlatformWinLossMemberExcel(templatePath, excelModel, showingOption);
        }

        private static ShowingOption CreateShowingOption(IEnumerable<ProductOption> productOptions, bool isAllowedCustomerComm)
        {
            return new ShowingOption
            {
                BAVisible = productOptions.Any(p => p.Code == Product.BA && p.Status),
                NGVisible = productOptions.Any(p => p.Code == Product.NG && p.Status),
                SBVisible = productOptions.Any(p => p.Code == Product.SB && p.Status),
                VSVisible = productOptions.Any(p => p.Code == Product.VS && p.Status),
                CSVisible = productOptions.Any(p => p.Code == Product.CS && p.Status),
                KNVisible = productOptions.Any(p => p.Code == Product.KN && p.Status),
                CustomerCommVisible = isAllowedCustomerComm
            };
        }

        private static void SortMemberData(SortableList<PlatformWinLossMember> dataList, string sortBy, string sortOrder = "asc")
        {
            if (!string.IsNullOrEmpty(sortBy) &&
                !string.IsNullOrEmpty(sortOrder) &&
                typeof(PlatformWinLossMember).GetProperty(sortBy) != null)
            {
                dataList.Sort(sortBy, sortOrder.Equals("asc", StringComparison.OrdinalIgnoreCase), nameof(PlatformWinLossMember.Index), true);
            }
        }

        private HttpResponseMessage ExportExcelMember(
            PlatformWinLossMetaModel metaModel,
            SortableList<PlatformWinLossMember> dataList,
            PlatformWinLossMember totalData)
        {
            const string FileName = "PlatformWinLossMember.xls";
            var licenseeSession = SessionService.LicenseeSession;
            var userSession = SessionService.UserSession;
            var templatePath = HostingEnvironment.MapPath(@"~/App_Data/Template/Reports/PlatformWinLossMember.xls");

            var productAccess = ProductService.GetProductAccess(
                licenseeSession.LicenseeId,
                userSession.Language,
                FunctionNames.PlatformWinloss);

            if (dataList.Any())
            {
                SortMemberData(dataList, metaModel.SortBy, metaModel.SortOrder);
            }

            var excelModel = new PlatformWinLossViewModel
            {
                MainResult = dataList,
                TotalResult = totalData,
                Param = metaModel,
                CurrencyList = userSession.CurrencyList,
                ProductAccess = productAccess,
                Colspan = 7 + (productAccess.IsAllowBA ? 2 : 0),
                IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm
            };

            var showingOption = CreateShowingOption(metaModel.ProductOptions, licenseeSession.IsAllowedCustomerComm);

            var platformWinLossExcel = CreateExcelMember(templatePath, excelModel, showingOption);
            platformWinLossExcel.Export();

            return ExcelStream(platformWinLossExcel.Workbook, FileName);
        }

        private async Task<dynamic> ProcessRequest(PlatformWinLossMetaModel metaModel)
        {
            metaModel.AgentListXml = SessionService.GenerateAgentListXml(metaModel.CurrencyId, metaModel.IsExcludedTestData);
            var language = SessionService.UserSession.Language;

            if (metaModel.Level == 0)
            {
                return await ProcessSummaryLevel(metaModel, language);
            }
            else
            {
                return await ProcessMemberLevel(metaModel, language);

            }
        }

        private async Task<dynamic> ProcessMemberLevel(PlatformWinLossMetaModel metaModel, string language)
        {
            const string FileName = "PlatformWinLossMember.xls";

            metaModel.CurrencyList = SessionService.UserSession.CurrencyList
                .Select(x => new Currency { ID = x.Key, Name = x.Value }).ToList();
            metaModel.HasComm = SessionService.LicenseeSession.IsAllowedCustomerComm;
            if (metaModel.IsExportExcel)
            {
                return await _reportAPIClient.PostFileAsync("/api/PlatformWinLoss/ExportMemberData", metaModel, FileName, language)
                   .ConfigureAwait(false);
            }

            var result = await _reportAPIClient.PostAsync<SortableReportResultModel<PlatformWinLossMember>>("/api/PlatformWinLoss/GetMemberData", metaModel, language)
                .ConfigureAwait(false);
            return (dynamic)new
            {
                Data = result.DataList,
                Total = result.TotalData,
                ProductOptions = metaModel.ProductOptions.ToJson()
            };
        }

        private async Task<dynamic> ProcessSummaryLevel(PlatformWinLossMetaModel metaModel, string language)
        {
            const string FileName = "PlatformWinLossSummary.xls";

            if (metaModel.IsExportExcel)
            {
                return await _reportAPIClient.PostFileAsync("/api/PlatformWinLoss/ExportSummaryData", metaModel, FileName, language)
                    .ConfigureAwait(false);

            }
            var result =
                await _reportAPIClient.PostAsync<ReportResultModel<PlatformWinLossSummary>>("/api/PlatformWinLoss/GetSummaryData", metaModel, language)
                .ConfigureAwait(false);
            return (dynamic)new
            {
                Data = result.DataList,
                Total = result.TotalData,
                ProductOptions = metaModel.ProductOptions.ToJson()
            };
        }
    }
}