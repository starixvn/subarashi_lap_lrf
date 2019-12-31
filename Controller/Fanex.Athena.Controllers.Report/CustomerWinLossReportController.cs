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

    [FunctionAuthorization(PermissionKeys.ReportCustomerWinLoss)]
    public class CustomerWinLossReportController : ReportBaseController
    {
        private readonly IReportSettingService _reportSettingService;

        private readonly IReportAPIClient _reportAPIClient;

        private const int TimeOutInSecond = 180;

        public CustomerWinLossReportController(
            IReportSettingService reportSettingService,
            IReportAPIClient reportAPIClient
            )
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
        [AutoBindMetaModel(BindAgent = true, BindLicenseeContract = true)]
        [ValidationWebRequest(IsValidCurrency = true, IsIncludeKeanOcean = true)]
        public async Task<ActionResult> Index(CustomerWinLossMetaModel metaModel)
        {
            var userSession = SessionServiceInstance.UserSession;
            if (metaModel.IsExportExcel)
            {
                const string FileName = "CustomerWinLoss";
                var httpResponse = await _reportAPIClient.PostAsync("api/CustomerWinLoss/ExportExcel",
                    metaModel, userSession.Language, timeOut: TimeOutInSecond).ConfigureAwait(false);

                return File(httpResponse.Item1, httpResponse.Item2, FileName);
            }

            return JsonString(await _reportAPIClient.PostStringAsync("api/CustomerWinLoss/Index", metaModel, userSession.Language, TimeOutInSecond).ConfigureAwait(false));
        }

        private ActionResult GetView(bool isHistory)
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var metaModel = new CustomerWinLossMetaModel
            {
                IsExcludedTestData = true,
                FromDate = isHistory ? new DateTime(DateTime.Today.Year, DateTime.Today.Month, 1)
                : DateTime.Today,
                BaseCurrency = userSession.DefaultBaseCurrency
            };

            var productAccess = ProductServiceInstance.GetSingleWalletProductAccess(
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
    }
}