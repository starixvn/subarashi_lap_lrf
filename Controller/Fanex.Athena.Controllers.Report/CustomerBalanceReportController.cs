// -----------------------------------------------------------------------
// <copyright file="ReportController.CustomerBalance.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Report
{
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using Model.Core.DataDomain;

    [FunctionAuthorization(PermissionKeys.ReportCustomerBalance)]
    public class CustomerBalanceReportController : ReportBaseController
    {
        private readonly IReportAPIClient _reportAPIClient;

        private const int ExcelPageSize = int.MaxValue - 1000;

        public CustomerBalanceReportController(IReportAPIClient reportAPIClient)
        {
            _reportAPIClient = reportAPIClient;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;

            var metaModel = new CustomerBalanceMetaModel
            {
                LicenseeId = licenseeSession.LicenseeId,
                CurrencyId = 0
            };

            var productAccess = ProductServiceInstance.GetSingleWalletProductAccess(
                licenseeSession.LicenseeId,
                userSession.Language,
                FunctionNames.CustomerBalance);
            var productOption = ToProductOptions(productAccess.ProductList.Where(i => i.ProductCode != Product.BA));

            metaModel.ProductOptions = productOption;
            var model = new CustomerBalanceViewModel
            {
                CurrencyList = userSession.CurrencyList,
                Param = metaModel,
                IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm,
                ProductAccess = productAccess
            };

            return View("~/Views/Desktop/Report/CustomerBalance/Main.cshtml", model);
        }

        [HttpPost]
        [AutoBindMetaModel(BindAgent = true)]
        [ValidationWebRequest]
        public async Task<ActionResult> Index(CustomerBalanceMetaModel metaModel)
        {
            var userSession = SessionServiceInstance.UserSession;

            return JsonString(await _reportAPIClient.PostStringAsync("api/CustomerBalance/Index", metaModel, userSession.Language).ConfigureAwait(false));
        }

        [HttpPost]
        [AutoBindMetaModel(BindAgent = true)]
        [ValidationWebRequest]
        public async Task<FileResult> ExportExcel(CustomerBalanceMetaModel metaModel)
        {
            var language = SessionServiceInstance.UserSession.Language;
            const string fileName = "CustomerBalance.csv";

            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var productAccess = ProductServiceInstance.GetSingleWalletProductAccess(
                licenseeSession.LicenseeId,
                language,
                FunctionNames.CustomerBalance);

            metaModel.IsAllowedBA = productAccess.IsAllowBA;
            metaModel.HasComm = licenseeSession.IsAllowedCustomerComm;
            metaModel.PageIndex = 1;
            metaModel.PageSize = ExcelPageSize;

            var httpResponse = await _reportAPIClient.PostAsync("api/CustomerBalance/ExportExcel", metaModel, language).ConfigureAwait(false);

            return File(httpResponse.Item1, httpResponse.Item2, fileName);
        }
    }
}