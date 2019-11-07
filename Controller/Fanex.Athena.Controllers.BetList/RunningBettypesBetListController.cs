// -----------------------------------------------------------------------
// <copyright file="RunningBettypesBetListController.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.BetList
{
    #region Using

    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Utility;
    using Fanex.Athena.Web.ActionFilter;

    using Model.BetList.MetaModel;
    using Model.BetList.ViewModel;
    using Model.Core.DataDomain;

    using Resources;

    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;

    #endregion Using

    /// <summary>
    /// RunningBetList contains bet list:.
    /// Mix Parlay              - bet type: 9.
    /// Clean Sheet             - bet type: 13.
    /// Double Chance           - bet type: 24.
    /// B/O/N team to score     - bet type: 26.
    /// To win to nil           - bet type: 27.
    /// 3-Way Handicap          - bet type: 28.
    /// </summary>
    public class RunningBettypesBetListController : BetListBaseController
    {
        private const string DoubleChangeBettypes = "24,151,186,410,431";

        private const string BONTeamToScoreBettypes = "26,145,146,170,188,427,433";

        private readonly int[] _parlayBettypes = new[] { (int)BetType.CombinationMixParlay, (int)BetType.SingleMatchParlay };

        [HttpGet]
        [FunctionAuthorization(PermissionKeys.TotalBetMixParlay)]
        [ValidationWebRequest]
        public async Task<ActionResult> MixParlay(BetListExcelMetaModel metaModel)
        {
            metaModel.MultipleBettype = string.Join(",", _parlayBettypes);
            ViewBag.ReportTitle = Menu.Menu_12;
            ViewBag.UserGuideName = "TotalBetsMixParlay";
            return await ProcessRequest(metaModel).ConfigureAwait(false);
        }

        [HttpGet]
        [FunctionAuthorization(PermissionKeys.TotalBetDoubleChance)]
        [ValidationWebRequest]
        public async Task<ActionResult> DoubleChange(BetListExcelMetaModel metaModel)
        {
            metaModel.MultipleBettype = DoubleChangeBettypes;
            ViewBag.ReportTitle = ViewResources.DoubleChance;
            ViewBag.UserGuideName = "TotalBetsDoubleChance";
            return await ProcessRequest(metaModel).ConfigureAwait(false);
        }

        [HttpGet]
        [FunctionAuthorization(PermissionKeys.TotalBetBONTeamToScore)]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> BONTeamToScore(BetListExcelMetaModel metaModel)
        {
            metaModel.MultipleBettype = BONTeamToScoreBettypes;
            ViewBag.ReportTitle = ViewResources.BONTeamToScore;
            ViewBag.UserGuideName = "TotalBetsBON";
            return await ProcessRequest(metaModel).ConfigureAwait(false);
        }

        private async Task<ActionResult> ProcessRequest(BetListExcelMetaModel metaModel)
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var currencies = userSession.CurrencyList;

            CreateDefaultMetaModel(metaModel);
            InitBaseCurrencyValue(metaModel);

            if (metaModel.IsExportExcel)
            {
                metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList, metaModel.CurrencyId);
                return await Excel(metaModel).ConfigureAwait(false);
            }

            var model = new BetListBaseViewModel
            {
                ShowEmptyContent = true,
                Param = metaModel,
                CurrencyList = currencies,
                ProductAccess = ProductService.GetProductAccess(metaModel.LicenseeId, userSession.Language),
                IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm
            };

            return View("~/Views/Desktop/BetList/RunningBetListMultipleBettypes/Main.cshtml", model);
        }

        private async Task<ActionResult> Excel(BetListExcelMetaModel metaModel)
        {
            metaModel.UspKey = "Lrf_BetList_SelRunningByBettypeList";

            metaModel.ShowingOption = new BetListShowingOption
            {
                CustomerCommVisible = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm,
            };

            var firstBettype = metaModel.MultipleBettype.Split(',').FirstOrDefault();
            metaModel.Title = $"{CacheRefAdapter.GetBettype(firstBettype)} - {GetViewInCurrency(metaModel)}";

            metaModel.IsShowSumStake = true;
            metaModel.HiddenColumns = HiddenColumnIndexes;

            return await ProcessExportExcel(metaModel, "RunningBetList").ConfigureAwait(false);
        }
    }
}