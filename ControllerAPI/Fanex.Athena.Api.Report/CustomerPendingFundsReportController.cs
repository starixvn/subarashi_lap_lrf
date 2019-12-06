namespace Fanex.Athena.Api.Report
{
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Hosting;
    using System.Web.Http;

    using DataAccess.Report.Interfaces;

    using Excel.Base.Entities;
    using Excel.Report;
    using Excel.Report.Models;

    using Fanex.Athena.Api.Base.Attributes;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Report.MetaModel;

    using Service.Core.Common.Interfaces;

    [ApiFunctionAuthorization(PermissionKeys.ReportCustomerPendingFunds)]
    public class CustomerPendingFundsReportController : ApiReportBaseController
    {
        private const int PageSizeExcel = int.MaxValue - 1000;

        private readonly ILicenseeSettingService _licenseeSettingService;

        private readonly ICustPendingFundsDataAccess _custPendingFundsDataAccess;

        public CustomerPendingFundsReportController(
            ICustPendingFundsDataAccess custPendingFundsDataAccess,
            ILanguageService langService,
            ILicenseeSettingService licenseeSettingService
            )
            : base(langService)
        {
            _licenseeSettingService = licenseeSettingService;
            _custPendingFundsDataAccess = custPendingFundsDataAccess;
        }

        [HttpPost]
        [ValidationApiRequest(IsValidCurrency = true, IsIncludeKeanOcean = true)]
        [ApiAutoBindMetaModel(BindAgent = true)]
        public async Task<dynamic> Index(CustomerPendingFundsMetaModel metaModel)
        {
            var data = await _custPendingFundsDataAccess.GetDataList(metaModel).ConfigureAwait(false);

            return new
            {
                Data = data.DataList,
                Total = data.TotalData,
                data.TotalRows
            };
        }

        [HttpPost]
        [ValidationApiRequest]
        [ApiAutoBindMetaModel(BindAgent = true)]
        public async Task<HttpResponseMessage> ExportExcel(CustomerPendingFundsMetaModel metaModel)
        {
            const string FileName = "CustomerPendingFunds.xls";
            const string TemplatePath = @"~/App_Data/Template/CustomerReports/CustomerPendingFunds.xls";

            var templatePath = HostingEnvironment.MapPath(TemplatePath);

            var convertingOption = new ConvertingOption
            {
                IsConvert = metaModel.IsConvert,
                BaseCurrency = metaModel.BaseCurrency,
                CurrencyName = metaModel.CurrencyName
            };

            metaModel.PageIndex = 1;
            metaModel.PageSize = PageSizeExcel;
            var licenseeName = SessionService.LicenseeSession.LicenseeName;

            var data = await _custPendingFundsDataAccess.GetDataList(metaModel).ConfigureAwait(false);
            var excelModel = new CustomerPendingFundsExcelModel
            {
                ConvertingOption = convertingOption,
                DataList = data.DataList,
                TotalData = data.TotalData,
                SystemIdVisible = !_licenseeSettingService.IsFakeLicensee(licenseeName)
            };
            var custPendingFundsExcel = CreateExcel(templatePath, excelModel);
            custPendingFundsExcel.Export();

            return ExcelStream(custPendingFundsExcel.Workbook, FileName);
        }

        protected internal virtual CustomerPendingFundsExcel CreateExcel(string templatePath, CustomerPendingFundsExcelModel excelModel)
        {
            return new CustomerPendingFundsExcel(templatePath, excelModel);
        }
    }
}