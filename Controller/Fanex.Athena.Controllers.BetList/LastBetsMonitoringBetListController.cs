// -----------------------------------------------------------------------
// <copyright file="LastBetsMonitoringBetListController.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.BetList
{
    #region Using

    using DataAccess.Core.Common.Interfaces;

    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Web.ActionFilter;

    using Model.BetList.MetaModel;
    using Model.BetList.ViewModel;

    using ONEbook.UM.Filters;

    using Resources;

    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using System.Web.SessionState;

    #endregion Using

    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    [FunctionAuthorization(PermissionKeys.ReportLastBetsMonitoring)]
    public class LastBetsMonitoringBetListController : CultureBaseController
    {
        private readonly ISportTypeDataAccess _sportTypeDataAccess;

        public LastBetsMonitoringBetListController(
            ISportTypeDataAccess sportTypeDataAccess)
        {
            _sportTypeDataAccess = sportTypeDataAccess;
        }

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            var metaModel = new BetListMetaModel
            {
                LicenseeId =
                SessionServiceInstance.LicenseeSession.LicenseeId,
                BaseCurrency = SessionServiceInstance.UserSession.DefaultBaseCurrency
            };

            var model = new LastBetsMonitoringViewModel
            {
                CurrencyList = SessionServiceInstance.UserSession.CurrencyList,
                SportsList = await GetSports().ConfigureAwait(false),
                Param = metaModel
            };

            return View("~/Views/Desktop/BetList/LastBetsMonitoringNew/Main.cshtml", model);
        }

        private async Task<IEnumerable<SelectListItem>> GetSports()
        {
            const string ParlayId = "999";
            var sports = await this._sportTypeDataAccess.GetAllSports().ConfigureAwait(false);
            var sportListItems = sports.Select(item => new SelectListItem { Value = item.Key.ToString(), Text = item.Value }).ToList();
            sportListItems.Insert(0, new SelectListItem { Value = "0", Text = ViewResources.All, Selected = true });
            sportListItems.Add(new SelectListItem { Value = ParlayId, Text = ViewResources.Parlay });

            return sportListItems;
        }
    }
}