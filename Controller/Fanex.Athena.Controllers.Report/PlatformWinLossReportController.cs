// -----------------------------------------------------------------------
// <copyright file="ReportController.PlatformWinLoss.cs" company="">
// ReportController copyright.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Report
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    using Model.Core.DataDomain;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    [FunctionAuthorization(PermissionKeys.ReportPlatformWinLoss)]
    public class PlatformWinLossReportController : ReportBaseController
    {
        private readonly IReportAPIClient _reportAPIClient;

        public PlatformWinLossReportController(
            ILanguageService languageService,
            ISessionService sessionService,
            IProductService productService, IReportAPIClient reportAPIClient)
            : base(languageService, sessionService, productService)
        {
            _reportAPIClient = reportAPIClient;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var licenseeSession = SessionService.LicenseeSession;
            var userSession = SessionService.UserSession;
            var licenseeId = licenseeSession.LicenseeId;
            var metaModel = new PlatformWinLossMetaModel
            {
                LicenseeId = licenseeId,
                BaseCurrency = userSession.DefaultBaseCurrency,
            };
            var productAccess = ProductService.GetSingleWalletProductAccess(
                licenseeId,
                userSession.Language,
                FunctionNames.PlatformWinloss);

            metaModel.ProductOptions = ToProductOptions(productAccess.ProductList);

            var model = new PlatformWinLossViewModel
            {
                Param = metaModel,
                CurrencyList = userSession.CurrencyList,
                ProductAccess = productAccess,
                IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm,
            };

            return View("~/Views/Desktop/Report/PlatformWinLoss/Main.cshtml", model);
        }

        [HttpPost]
        [ValidationWebRequest(IsValidCurrency = true, IsIncludeKeanOcean = true)]
        [AutoBindMetaModel(BindAgent = true, BindCurrencyList = true)]
        public async Task<ActionResult> Index(PlatformWinLossMetaModel metaModel)
        {
            return await ProcessRequest(metaModel);
        }

        private async Task<ActionResult> ProcessRequest(PlatformWinLossMetaModel metaModel)
        {
            var userSession = SessionService.UserSession;
            metaModel.HasComm = SessionService.LicenseeSession.IsAllowedCustomerComm;

            return metaModel.Level == (int)ReportLevel.Main
                ? await ProcessSummaryLevel(metaModel, userSession.Language)
                : await ProcessMemberLevel(metaModel, userSession.Language);
        }

        private async Task<ActionResult> ProcessMemberLevel(PlatformWinLossMetaModel metaModel, string language)
        {
            const string FileName = "PlatformWinLossMember.xls";

            if (metaModel.IsExportExcel)
            {

                var response = await _reportAPIClient.PostAsync("api/PlatformWinLoss/ExportMemberData", metaModel,
                language, MediaType.MsgPack).ConfigureAwait(false);
                return File(response.Item1, "application/octet-stream", FileName);

            }
            else
            {
                return JsonString(await _reportAPIClient.PostAsyncString("api/PlatformWinLoss/GetMemberData", metaModel, language).ConfigureAwait(false));
            }
        }

        private async Task<ActionResult> ProcessSummaryLevel(PlatformWinLossMetaModel metaModel, string language)
        {
            if (metaModel.IsExportExcel)
            {
                const string FileName = "PlatformWinLossSummary.xlsx";

                var response = await _reportAPIClient.PostAsync("api/PlatformWinLoss/ExportSummaryData",
                 metaModel, language, MediaType.MsgPack).ConfigureAwait(false);
                return File(response.Item1, "application/octet-stream", FileName);

            }
            else
            {
                return JsonString(await _reportAPIClient.PostAsyncString("api/PlatformWinLoss/GetSummaryData", metaModel, language).ConfigureAwait(false));
            }
        }
    }
}