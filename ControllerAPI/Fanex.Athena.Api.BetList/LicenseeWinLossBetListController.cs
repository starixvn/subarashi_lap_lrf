namespace Fanex.Athena.Api.BetList
{
    using System;
    using System.Threading.Tasks;
    using System.Web.Http;

    using Base.Attributes;

    using DataAccess.Core.Configuration.Interfaces;

    using Extension.Helper;
    using Fanex.Athena.Model.Auth.DataDomain;

    using Model.BetList.MetaModel;

    using Service.Core.Common.Interfaces;
    using Service.StatelessCore.Interfaces;

    [ApiFunctionAuthorization(PermissionKeys.ReportLicenseeWinLoss, PermissionKeys.ReportWinLossByProduct, PermissionKeys.ReportColossusBetsWinLoss)]
    [ApiBetListAuthorization]
    public class LicenseeWinLossBetListController : ApiBetListBaseController
    {
        private readonly IReportSettingService _reportSettingService;

        public LicenseeWinLossBetListController(
            ILanguageService languageService,
            IAuthorizationService authorizationService,
            IBetListApiClient betListApiClient,
            IBalanceUpDataAccess balanceUpDataAccess,
            IReportSettingService reportSettingService)
        : base(languageService, authorizationService, betListApiClient, balanceUpDataAccess)
        {
            _reportSettingService = reportSettingService;
        }

        [HttpPost]
        [ValidationApiRequest(IsValidCurrency = true, IsIncludeKeanOcean = true)]
        public async Task<dynamic> Index(BetListMetaModel metaModel)
        {
            if (!IsValidDateRange(metaModel.FromDate, metaModel.ToDate))
            {
                return null;
            }

            const string UspKey = "Lrf_BetList_SelWinloss_Mem";
            return await GetBetListResult(metaModel, UspKey).ConfigureAwait(false);
        }

        private bool IsValidDateRange(DateTime fromDate, DateTime toDate)
        {
            var setting = _reportSettingService.GetSetting(PermissionKeys.ReportLicenseeWinLoss,
                SessionService.LicenseeSession.LicenseeName);
            if (setting == null)
            {
                return true;
            }

            return DateTimeHelper.IsBetween(fromDate, setting.MinDate, setting.MaxDate) &&
                DateTimeHelper.IsBetween(toDate, setting.MinDate, setting.MaxDate);
        }
    }
}