// <copyright file="ReportController.CustomerWinloss.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Report
{
    using System;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    [FunctionAuthorization(PermissionKeys.ReportCustomerWinLoss)]
    public class CustomerWinLossReportController : ReportBaseController
    {
        private readonly IReportSettingService _reportSettingService;

        private readonly IReportAPIClient _reportAPIClient;

        public CustomerWinLossReportController(
            ILanguageService languageService,
            ISessionService sessionService,
            IProductService productService,
            IReportSettingService reportSettingService,
            ILicenseeSettingService licenseeSettingService,
            IReportAPIClient reportAPIClient
            )
            : base(languageService, sessionService, productService, licenseeSettingService)
        {
            _reportSettingService = reportSettingService;
            _reportAPIClient = reportAPIClient;
        }

        [HttpGet]
        public ActionResult Index()
        {
            return GetView(false);
        }

        [HttpGet]
        public ActionResult History()
        {
            return GetView(true);
        }

        [HttpPost]
        [AutoBindMetaModel(BindAgent = true)]
        [ValidationWebRequest(IsValidCurrency = true, IsIncludeKeanOcean = true)]
        public async Task<ActionResult> Index(CustomerWinLossMetaModel metaModel)
        {
            var userSession = SessionService.UserSession;
            if (metaModel.IsExportExcel)
            {
                AssignMetaModelForExcel(metaModel);
                const string FileName = "CustomerWinLoss.xls";
                var stream = await _reportAPIClient.PostByteContentAsync("api/CustomerWinLoss/ExportExcel",
                    metaModel, userSession.Language).ConfigureAwait(false);

                return File(stream, "application/octet-stream", FileName);
            }

            return JsonString(await _reportAPIClient.PostAsyncString("api/CustomerWinLoss/Index", metaModel, userSession.Language).ConfigureAwait(false));
        }

        private ActionResult GetView(bool isHistory)
        {
            var licenseeSession = SessionService.LicenseeSession;
            var userSession = SessionService.UserSession;
            var metaModel = new CustomerWinLossMetaModel
            {
                IsExcludedTestData = true,
                FromDate = isHistory ? new DateTime(DateTime.Today.Year, DateTime.Today.Month, 1)
                : DateTime.Today,
                BaseCurrency = userSession.DefaultBaseCurrency
            };

            var productAccess = ProductService.GetSingleWalletProductAccess(
                licenseeSession.LicenseeId,
                userSession.Language,
                FunctionNames.CustomerWinLoss);

            metaModel.ProductOptions = ToProductOptions(productAccess.ProductList);

            var reportSetting = _reportSettingService.GetSetting(PermissionKeys.ReportCustomerWinLoss, licenseeSession.LicenseeName);

            var model = new CustomerWinLossViewModel
            {
                IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm,
                CurrencyList = userSession.CurrencyList,
                Param = metaModel,
                IsHistory = isHistory,
                ProductAccess = productAccess,
                IsFakeLicensee = IsFakeLicensee(licenseeSession.LicenseeName),
                MinDate = reportSetting.MinDate,
                MaxDate = reportSetting.MaxDate
            };

            return View("~/Views/Desktop/Report/CustomerWinLoss/Main.cshtml", model);
        }

        private void AssignMetaModelForExcel(CustomerWinLossMetaModel metaModel)
        {
            var licenseeSession = SessionService.LicenseeSession;
            var productAccess = ProductService.GetSingleWalletProductAccess(
                licenseeSession.LicenseeId,
                SessionService.UserSession.Language,
                FunctionNames.CustomerWinLoss);

            metaModel.IsAllowedCustomerComm = licenseeSession.IsAllowedCustomerComm;
            metaModel.IsAllowBA = productAccess.IsAllowBA;
            metaModel.SystemIdVisible = !IsFakeLicensee(licenseeSession.LicenseeName);
        }
    }
}