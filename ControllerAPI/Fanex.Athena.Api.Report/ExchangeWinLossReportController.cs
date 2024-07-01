namespace Fanex.Athena.Api.Report
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Base.Attributes;
    using DataAccess.Report.Interfaces;
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
        private readonly IExchangeWinLossDataAccess _dataAccess;
        private readonly ILGAPIClient _lgClient;

        public ExchangeWinLossReportController(
            ILanguageService langService,
            IExchangeWinLossDataAccess dataAccess,
            ILGAPIClient lgClient)
            : base(langService)
        {
            _dataAccess = dataAccess;
            _lgClient = lgClient;
        }

        [HttpPost]
        [ValidationApiRequest(IsValidCurrency = true)]
        [ApiAutoBindMetaModel(BindAgent = true, ApplySubsidiaryBusiness = true)]
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

        [HttpGet]
        public async Task<bool> IsUnderMaintenance()
        {
            const string apiPath = "/Exchange/IsUnderMaintenance";
            const string langCode = "en";

            return await _lgClient.PostAsync<bool>(apiPath, null, langCode).ConfigureAwait(false);
        }

        private bool IsValidParams(ExchangeWinLossMetaModel metaModel)
        {
            return metaModel.FromDate <= metaModel.ToDate;
        }
    }
}