namespace Fanex.Athena.Api.Report
{
    using System.Net.Http;
    using System.Web.Hosting;

    using Base.Attributes;

    using DataAccess.Report.Interfaces;

    using Excel.Report;
    using Excel.Report.Helpers;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Utility;

    using Model.Core.ResultModel;
    using Model.Report;
    using Model.Report.MetaModel;

    using Resources;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    [ApiFunctionAuthorization(PermissionKeys.ReportLicenseeWinLoss, PermissionKeys.ReportCustomerWinLoss)]
    public class PromotionPrizeReportController : ApiReportBaseController
    {
        private readonly IPromotionPrizeDataAccess _dataAccess;

        public PromotionPrizeReportController(
            ISessionService sessionService,
            IProductService productService,
            ILanguageService langService,
            IPromotionPrizeDataAccess dataAccess)
            : base(sessionService, productService, langService)
        {
            _dataAccess = dataAccess;
        }

        protected internal virtual HttpResponseMessage CreareExcel(string template, string title, string fileName, ReportResultModel<PromotionPrize> data)
        {
            var excel = new PromotionPrizeExcel(template, title, data);
            excel.Export();

            return ExcelStream(excel.Workbook, fileName);
        }

        [ValidationApiRequest(IsValidCurrency = true, IsIncludeKeanOcean = true)]
        public HttpResponseMessage ExportExcel(PromotionPrizeMetaModel metaModel)
        {
            const string FileName = "PP_PromotionPrize.xls";
            var templatePath = HostingEnvironment.MapPath(@"~/App_Data/Template/Reports/PP_PromotionPrize.xls");

            var userSession = SessionService.UserSession;

            metaModel.DefaultBaseCurrency = userSession.DefaultBaseCurrency;
            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList, metaModel.CurrencyId, metaModel.IsExcludedTestData);

            var data = _dataAccess.GetData(metaModel, userSession.CurrencyList);

            var title = ReportExcelHelper.GenerateReportTitle(
                ViewResources.ProductPP + " - " + @ViewResources.PromotionPrize,
                metaModel.FromDate,
                metaModel.ToDate,
                metaModel.CurrencyId <= 0 ? ViewResources.AllCurrencies : metaModel.CurrencyName);

            return CreareExcel(templatePath, title, FileName, data);
        }
    }
}