namespace Fanex.Athena.Controllers.Report
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    [FunctionAuthorization(PermissionKeys.ReportLicenseeWinLoss, PermissionKeys.ReportCustomerWinLoss)]
    public class PromotionPrizeReportController : ReportBaseController
    {
        private readonly IReportAPIClient _reportAPIClient;

        public PromotionPrizeReportController(
            ILanguageService languageService,
            ISessionService sessionService,
            IProductService productService, IReportAPIClient reportAPIClient)
            : base(languageService, sessionService, productService)
        {
            _reportAPIClient = reportAPIClient;
        }

        [ValidationWebRequest(IsValidCurrency = true, IsIncludeKeanOcean = true)]
        [AutoBindMetaModel(BindAgent = true)]
        public async Task<ActionResult> ExportExcel(PromotionPrizeMetaModel metaModel)
        {
            var userSession = SessionService.UserSession;
            metaModel.DefaultBaseCurrency = userSession.DefaultBaseCurrency;

            var result = await _reportAPIClient.PostAsync("api/PromotionPrize/Export", metaModel, userSession.Language, MediaType.MsgPack).ConfigureAwait(false);
            return File(result.Item1, result.Item2);
        }
    }
}