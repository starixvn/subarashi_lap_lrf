namespace Fanex.Athena.Api.Report
{
    using System.Threading.Tasks;
    using System.Web.Http;

    using Base.Attributes;

    using DataAccess.Report.Interfaces;
    using Fanex.Athena.Model.Auth.DataDomain;

    using Model.Report.MetaModel;

    using Service.Core.Common.Interfaces;

    [ApiFunctionAuthorization(PermissionKeys.ReportLicenseeWinLossByTimeZone)]
    public class LicenseeWinLossByTimeZoneReportController : ApiReportBaseController
    {
        private readonly ILicenseeWinLossByTimeZoneDataAccess _licenseeWinLossByTimeZoneDataAccess;

        public LicenseeWinLossByTimeZoneReportController(
            ILanguageService langService,
            ILicenseeWinLossByTimeZoneDataAccess licenseeWinLossByTimeZoneDataAccess)
            : base(langService)
        {
            _licenseeWinLossByTimeZoneDataAccess = licenseeWinLossByTimeZoneDataAccess;
        }

        [HttpPost]
        [ValidationApiRequest]
        [ApiAutoBindMetaModel(BindAgent = true)]
        public async Task<dynamic> Index(LicenseeWinLossByTimeZoneMetaModel metaModel)
        {
            var userSession = SessionService.UserSession;
            var userCurrencyList = userSession.CurrencyList;

            var result = await _licenseeWinLossByTimeZoneDataAccess.GetData(metaModel, userCurrencyList).ConfigureAwait(false);

            return new
            {
                Data = result.DataList,
                Total = result.TotalData
            };
        }
    }
}