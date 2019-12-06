namespace Fanex.Athena.Api.Report
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Http;

    using Base.Attributes;

    using DataAccess.Report.Interfaces;

    using Extension.Helper;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Model.Core.DataDomain;
    using Model.Core.ResultModel;
    using Model.Report.DTO;
    using Model.Report.MetaModel;

    using Service.Core.Common.Interfaces;

    [ApiFunctionAuthorization(PermissionKeys.ReportExchangeWinLoss)]
    public class ExchangeWinLossReportController : ApiReportBaseController
    {
        private readonly IReportSettingService _reportSettingService;

        private readonly IExchangeWinLossDataAccess _dataAccess;

        public ExchangeWinLossReportController(
            ILanguageService langService,
            IReportSettingService reportSettingService,
            IExchangeWinLossDataAccess dataAccess)
            : base(langService)
        {
            _reportSettingService = reportSettingService;
            _dataAccess = dataAccess;
        }

        [HttpPost]
        [ValidationApiRequest(IsValidCurrency = true, IsIncludeKeanOcean = true)]
        [ApiAutoBindMetaModel(BindAgent = true)]
        public async Task<dynamic> Index(ExchangeWinLossMetaModel metaModel)
        {
            var userSession = SessionService.UserSession;
            var currencyList = userSession.CurrencyList;
            if (IsValidParams(metaModel))
            {
                metaModel.LicenseeId = SessionService.LicenseeSession.LicenseeId;
                metaModel.DefaultBaseCurrency = userSession.DefaultBaseCurrency;
                if (metaModel.Level == (int)ReportLevel.Main)
                {
                    return await _dataAccess.GetMainWinloss(metaModel, currencyList).ConfigureAwait(false);
                }

                return metaModel.LicenseeId != LicenseeIdentity.OneTwoBet || metaModel.Level == (int)ReportLevel.Customer
                            ? await _dataAccess.GetCustomerWinloss(metaModel, currencyList).ConfigureAwait(false)
                            : await _dataAccess.GetLicenseeWinloss(metaModel, currencyList).ConfigureAwait(false);
            }

            return new ReportResultModel<ExchangeWinLoss>
            {
                DataList = Enumerable.Empty<ExchangeWinLoss>(),
                TotalDataList = Enumerable.Empty<ExchangeWinLoss>(),
                SummaryTotal = new Dictionary<string, ExchangeWinLoss>()
            };
        }

        private bool IsValidParams(ExchangeWinLossMetaModel metaModel)
        {
            var setting = _reportSettingService.GetSetting(PermissionKeys.ReportExchangeWinLoss
                , SessionService.LicenseeSession.LicenseeName);
            if (setting == null)
            {
                return true;
            }

            return DateTimeHelper.IsBetween(metaModel.FromDate, setting.MinDate, setting.MaxDate) &&
                DateTimeHelper.IsBetween(metaModel.ToDate, setting.MinDate, setting.MaxDate);
        }
    }
}