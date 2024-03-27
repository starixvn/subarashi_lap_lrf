using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Core;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Report.ViewModel;
using Fanex.Athena.Resources;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.Web.ActionFilter;

namespace Fanex.Athena.Controllers.Report
{
    [FunctionAuthorization(PermissionKeys.ReportAbnormalBet)]
    public class AbnormalBetReportController : ReportBaseController
    {
        private readonly IReportSettingService _reportSettingService;
        private readonly ISportService _sportService;
        private readonly IBetTypeService _betTypeService;

        public AbnormalBetReportController(
            IReportSettingService reportSettingService,
            ISportService sportService,
            IBetTypeService betTypeService)
        {
            _reportSettingService = reportSettingService;
            _sportService = sportService;
            _betTypeService = betTypeService;
        }

        public async Task<ActionResult> Index()
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var reportSetting = _reportSettingService.GetSetting(PermissionKeys.ReportAbnormalBet,
                licenseeSession.LicenseeName);
            var isHideSaba = SabaHelper.IsHideSaba(licenseeSession.SpecialPlatform);

            var sports = (await _sportService.GetSportAndProductAndSabaSport(licenseeSession.LicenseeId, userSession.Language, isHideSaba, Product.SB).ConfigureAwait(true))
                    .Where(x => x.ParentId >= 0);
            var bettypes = await _betTypeService.GetBettypesByProduct(licenseeSession.LicenseeId, Product.SB, userSession.Language).ConfigureAwait(true);

            var model = new AbnormalBetViewModel
            {
                CurrencyList = userSession.CurrencyList,
                IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm,
                ReportSetting = reportSetting,
                Sports = sports.ToDictionary(x => x.ID, y => y.Name),
                Bettypes = bettypes.ToDictionary(x => x.ID, y => y.Name),
                LiveStatusList = GetLiveStatusList()
            };

            ViewBag.DefaultSelectedBaseCurrency = userSession.DefaultBaseCurrency;
            ViewBag.LicenseeName = licenseeSession.LicenseeName;
            ViewBag.IsShowIpvn = userSession.IsShowIpvn;

            return View("~/Views/Desktop/Report/AbnormalBet/Main.cshtml", model);
        }

        private static IDictionary<int, string> GetLiveStatusList()
        {
            return new Dictionary<int, string>
            {
                { LiveStatusTypes.NonLive, ViewResources.NoneLive },
                { LiveStatusTypes.Live, ViewResources.Live },
                { LiveStatusTypes.Mix, ViewResources.MixLiveAndNoneLive }
            };
        }
    }
}