namespace Fanex.Athena.Controllers.BetList
{
    #region Using

    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Service.Customer.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    using Model.BetList.MetaModel;
    using Model.BetList.ViewModel;

    using Resources;

    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using System.Web.SessionState;

    #endregion Using

    [SessionState(SessionStateBehavior.ReadOnly)]
    [UMFilter]
    [FunctionAuthorization(PermissionKeys.ReportLastBetsMonitoring)]
    public class LastBetsMonitoringBetListController : CultureBaseController
    {
        private readonly ISportService _sportService;
        private readonly IPlayerSegmentationService _playerService;

        public LastBetsMonitoringBetListController(
            ISportService sportService,
            IPlayerSegmentationService playerService)
        {
            _sportService = sportService;
            _playerService = playerService;
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
                CustomerClassList = await _playerService.GetCustomerClass(),
                Param = metaModel
            };

            return View("~/Views/Desktop/BetList/LastBetsMonitoringNew/Main.cshtml", model);
        }

        private async Task<IEnumerable<SelectListItem>> GetSports()
        {
            var ParlayId = ((int)SportType.Parlay).ToString();
            const int ProductType = -1;
            var licenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;
            var languageCode = SessionServiceInstance.UserSession.Language;
            var productCode = ProductServiceInstance.GetAllowedSubProductCodeList(
               SessionServiceInstance.LicenseeSession.OfferedSubProductList,
               Product.SB);

            var sports = await _sportService.GetSportAndProductAndSabaSport(licenseeId, languageCode, productCode).ConfigureAwait(false);
            var sportListItems = sports.Where(item => item.ParentId != ProductType).Select(item => new SelectListItem { Value = item.ID.ToString(), Text = item.Name }).ToList();
            sportListItems.Add(new SelectListItem { Value = ParlayId, Text = ViewResources.Parlay });

            return sportListItems;
        }
    }
}