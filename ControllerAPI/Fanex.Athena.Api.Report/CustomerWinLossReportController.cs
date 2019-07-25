namespace Fanex.Athena.Api.Report
{
    using System.Linq;
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Hosting;
    using System.Web.Http;
    using DataAccess.Report.Interfaces;
    using Excel.Base.Entities;
    using Excel.Report;
    using Excel.Report.Models;
    using Extension.Utility;
    using Fanex.Athena.Api.Base.Attributes;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Utility;
    using Model.Core.ResultModel;
    using Model.Report.DTO;
    using Model.Report.MetaModel;
    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    [ApiFunctionAuthorization(PermissionKeys.ReportCustomerWinLoss)]
    public class CustomerWinLossReportController : ApiReportBaseController
    {
        private readonly ILicenseeSettingService _licenseeSettingService;

        private readonly ICustWinlossDataAccess _custWinlossDataAccess;

        public CustomerWinLossReportController(
            ICustWinlossDataAccess custWinlossDataAccess,
            ISessionService sessionService,
            IProductService productService,
            ILanguageService langService,
            ILicenseeSettingService licenseeSettingService
            )
            : base(sessionService, productService, langService)
        {
            _licenseeSettingService = licenseeSettingService;
            _custWinlossDataAccess = custWinlossDataAccess;
        }

        [HttpPost]
        [ValidationApiRequest(IsValidCurrency = true, IsIncludeKeanOcean = true)]
        public async Task<dynamic> Index(CustomerWinLossMetaModel metaModel)
        {

            return metaModel.IsExportExcel ?
                await ExportExcel(metaModel).ConfigureAwait(false) :
                await ProcessRequest(metaModel).ConfigureAwait(false);
        }

        protected internal virtual CustomerWinLossExcel CreateExcel(string templatePath, CustomerWinLossExcelModel excelModel)
        {
            return new CustomerWinLossExcel(templatePath, excelModel);
        }

        private async Task<dynamic> ProcessRequest(CustomerWinLossMetaModel metaModel)
        {
            var result = await GetData(metaModel).ConfigureAwait(false);

            return new
            {
                Data = result.DataList,
                Total = result.TotalData,
                result.TotalRows,
                PromotionPrize = result.AdditionalInfo
            };
        }

        private async Task<HttpResponseMessage> ExportExcel(CustomerWinLossMetaModel metaModel)
        {
            const string FileName = "CustomerWinLoss.xls";
            const string TemplatePath = @"~/App_Data/Template/CustomerReports/CustomerWinLoss.xls";

            var templatePath = HostingEnvironment.MapPath(TemplatePath);

            var licenseeSession = SessionService.LicenseeSession;
            var productAccess = ProductService.GetSingleWalletProductAccess(
                licenseeSession.LicenseeId,
                SessionService.UserSession.Language,
                FunctionNames.CustomerBalance);

            var convertingOption = new ConvertingOption
            {
                IsConvert = metaModel.IsConvert,
                BaseCurrency = metaModel.BaseCurrency,
                CurrencyName = metaModel.CurrencyName
            };

            var result = await GetData(metaModel).ConfigureAwait(false);
            var excelModel = new CustomerWinLossExcelModel
            {
                ConvertingOption = convertingOption,
                DataList = result.DataList,
                MetaModel = metaModel,
                TotalData = result.TotalData,
                BAVisible = productAccess.IsAllowBA,
                CustomerCommVisible = licenseeSession.IsAllowedCustomerComm,
                SystemIdVisible = !_licenseeSettingService.IsFakeLicensee(licenseeSession.LicenseeName)
            };

            var excel = CreateExcel(templatePath, excelModel);
            excel.Export();

            return ExcelStream(excel.Workbook, FileName);
        }

        private async Task<ReportResultModel<CustomerWinLoss>> GetData(CustomerWinLossMetaModel metaModel)
        {
            var userSession = SessionService.UserSession;
            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList, metaModel.CurrencyId, metaModel.IsExcludedTestData);
            return await _custWinlossDataAccess.GetDataList(metaModel).ConfigureAwait(false);

        }
    }
}