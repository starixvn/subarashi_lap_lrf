using Fanex.Athena.Extension.Helper;
using Fanex.Athena.Extension.Utility.Internal;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
using Fanex.Athena.Model.Report.MetaModel;
using Fanex.Athena.Model.Report.ViewModel;
using Fanex.Athena.Resources;
using Fanex.Athena.Service.Customer.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.VendorAdapter.Interfaces;
using Fanex.Athena.Web.ActionFilter;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Fanex.Athena.Controllers.Report
{
    [FunctionAuthorization(PermissionKeys.ReportAbnormalBet)]
    public class AbnormalBetReportController : ReportBaseController
    {
        private readonly IReportSettingService _reportSettingService;
        private readonly ISportService _sportService;
        private readonly IPlayerSegmentationService _playerService;
        private readonly IBetTypeService _betTypeService;

        private readonly ConcurrentDictionary<string, AsyncLazy<IEnumerable<SubIssue>>> SubIssueListFromCache = new ConcurrentDictionary
            <string, AsyncLazy<IEnumerable<SubIssue>>>(StringComparer.OrdinalIgnoreCase);

        public AbnormalBetReportController(
            IReportSettingService reportSettingService,
            ISportService sportService,
            IPlayerSegmentationService playerService,
            IBetTypeService betTypeService
            )
        {
            _reportSettingService = reportSettingService;
            _sportService = sportService;
            _playerService = playerService;
            _betTypeService = betTypeService;
        }

        public async Task<ActionResult> Index()
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var reportSetting = _reportSettingService.GetSetting(PermissionKeys.ReportAbnormalBet,
                licenseeSession.LicenseeName);

            var sports = (await _sportService.GetSportAndProductAndSabaSport(licenseeSession.LicenseeId, userSession.Language, Product.SB).ConfigureAwait(true))
                    .Where(x => x.ParentId >= 0);
            var bettypes = await _betTypeService.GetBettypesByProduct(licenseeSession.LicenseeId, Product.SB, userSession.Language).ConfigureAwait(true);

            var lang = LangService.GetCurrentLanguage();
            var reasonList = await GetReasonList(lang);

            var model = new AbnormalBetViewModel
            {
                CurrencyList = userSession.CurrencyList,
                IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm,
                ReportSetting = reportSetting,
                Sports = sports.ToDictionary(x => x.ID, y => y.Name),
                Bettypes = bettypes.ToDictionary(x => x.ID, y => y.Name),
                LiveStatusList = GetLiveStatusList(),
                ReasonList = reasonList.ToDictionary(_ => _.SubIssueTypeId, _ => _.SubIssueTypeName)
            };

            ViewBag.DefaultSelectedBaseCurrency = userSession.DefaultBaseCurrency;
            ViewBag.LicenseeName = licenseeSession.LicenseeName;
            ViewBag.IsShowIpvn = userSession.IsShowIpvn;

            return View("~/Views/Desktop/Report/AbnormalBet/Main.cshtml", model);
        }

        private Task<IEnumerable<SubIssue>> GetReasonList(string lang)
        {
            var lazyTask = SubIssueListFromCache.GetOrAdd(lang, langKey => new AsyncLazy<IEnumerable<SubIssue>>(() => _playerService.GetAbnormalSubIssueAsync(langKey)));
            return lazyTask.Value;
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