// -----------------------------------------------------------------------
// <copyright file="CorrectScoreBetListController.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.BetList
{
    using System.Threading.Tasks;

    #region Using

    using System.Web.Mvc;

    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Web.ActionFilter;

    using Model.BetList.MetaModel;
    using Model.BetList.ViewModel;

    using Resources;

    #endregion Using

    [FunctionAuthorization(PermissionKeys.TotalBetCorrectScore)]
    public class CorrectScoreBetListController : BetListBaseController
    {
        [HttpGet]
        public ActionResult Index()
        {
            var metaModel = CreateDefaultMetaModel();
            InitBaseCurrencyValue(metaModel);

            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;

            var model = new BetListBaseViewModel
            {
                ShowEmptyContent = true,
                Param = metaModel,
                CurrencyList = userSession.CurrencyList,
                ProductAccess = ProductService.GetProductAccess(metaModel.LicenseeId, userSession.Language),
                IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm,
            };

            return View("~/Views/Desktop/BetList/CorrectScoreBetList/Main.cshtml", model);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Index(BetListExcelMetaModel metaModel)
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            const string UspKey = "Lrf_TotalBets_Sel430";

            CreateDefaultMetaModel(metaModel);
            InitBaseCurrencyValue(metaModel);
            metaModel.IsShowSumStake = true;
            metaModel.UspKey = UspKey;

            metaModel.ShowingOption = new BetListShowingOption
            {
                CustomerCommVisible = licenseeSession.IsAllowedCustomerComm,
            };

            metaModel.Title = ViewResources.CorrectScore + " - " + GetViewInCurrency(metaModel);
            metaModel.HiddenColumns = HiddenColumnIndexes;
            return await ProcessExportExcel(metaModel, "CorrectScoreBetList").ConfigureAwait(false);
        }
    }
}