using Fanex.Athena.Api.Base;
using Fanex.Athena.Api.Base.Attributes;
using Fanex.Athena.DataAccess.Core.Configuration.Interfaces;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Customer.MetaModel;
using Fanex.Athena.Model.Customer.MetaModel.OddsGroupLicenseeSetting;
using Fanex.Athena.Resources;
using Fanex.Athena.Service.Core.Common.Interfaces;
using Fanex.Athena.Service.Customer.Interfaces;
using Fanex.Athena.Service.StatelessCore.Utility;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Fanex.Athena.Api.Customer.CustomerAdmin
{
    [ApiFunctionAuthorization(PermissionKeys.OddsGroupLicenseeSetting)]
    public class OddsGroupLicenseeSettingController : BaseApiController
    {
        private readonly IOddsGroupLicenseeSettingService _oddsGroupLicenseeSettingService;

        public IBalanceUpDataAccess BalanceUpDataAccessInstance { get; set; }

        public OddsGroupLicenseeSettingController(
            IOddsGroupLicenseeSettingService oddsGroupLicenseeSettingService,
            ILanguageService languageService) : base(languageService)
        {
            _oddsGroupLicenseeSettingService = oddsGroupLicenseeSettingService;
        }

        [HttpPost]
        [ValidationApiRequest(IsValidCurrencyList = true)]
        public async Task<dynamic> GetCustomerOddsGroup(GetCustomerOddsGroupMetaModel model)
        {
            UpdateMetaModel(model);

            var subsidiaries = SubsidiaryService.GetSubsidiaryList(SessionService.UserSession, SessionService.LicenseeSession.LicenseeName, model.SubsidiaryList);
            var result = await _oddsGroupLicenseeSettingService.GetCustomerOddsGroup(model, subsidiaries, SessionService.UserSession.CurrencyList).ConfigureAwait(false);

            return Ok(result);
        }

        [HttpPost]
        [ValidationApiRequest(IsValidCurrency = true)]
        public async Task<dynamic> UpdateCustomerOddsGroup(UpdateCustomerOddsGroupMetaModel model)
        {
            if (!IsValidMetaModel(model))
            {
                return new HttpResponseMessage
                {
                    StatusCode = HttpStatusCode.Forbidden,
                    Content = new StringContent(ViewResources.InvalidRequestMsg)
                };
            }

            UpdateMetaModel(model);

            var result = await _oddsGroupLicenseeSettingService.UpdateCustomerOddsGroup(model).ConfigureAwait(false);

            if (result.IsSuccessful && !string.IsNullOrEmpty(model.CustIds))
            {
                _oddsGroupLicenseeSettingService.WriteCustomerOddsGroupLog(model);
            }

            return Json(result);
        }

        [HttpPost]
        public async Task<dynamic> GetLogList(UserLogMetaModel model)
        {
            model.LicenseeId = SessionService.LicenseeSession.LicenseeId;

            var result = await _oddsGroupLicenseeSettingService.GetLoglist(model).ConfigureAwait(false);

            return Ok(result);
        }

        private void UpdateMetaModel(GetCustomerOddsGroupMetaModel model)
        {
            var userSession = SessionService.UserSession;
            var licenseeSession = SessionService.LicenseeSession;
            var currencyAgentList = userSession.CurrencyAgentList;
            var currencyIdList = model.CurrencyIdList.Split(',').Select(int.Parse);

            if (model.SubsidiarySearch)
            {
                currencyAgentList = SubsidiaryService.GetCurrencyAgentList(licenseeSession.LicenseeName, currencyAgentList, model.SubsidiaryList);
            }

            model.AgentListXml = AuthParameterHelper.GenerateAgentListStr(currencyAgentList, currencyIdList);
            model.LicenseeId = licenseeSession.LicenseeId;
        }

        private void UpdateMetaModel(UpdateCustomerOddsGroupMetaModel model)
        {
            var userSession = SessionService.UserSession;
            var licenseeSession = SessionService.LicenseeSession;

            model.UserId = userSession.UserId;
            model.UserName = userSession.UserName;
            model.SiteName = licenseeSession.LicenseeName;
            model.LicenseeCustId = licenseeSession.LicenseeId;
            model.IP = HttpContext.Current.Request.UserHostAddress;
            model.Language = userSession.Language;
        }

        private bool IsValidMetaModel(UpdateCustomerOddsGroupMetaModel model)
        {
            var offeredOddsGroupsList = SessionService.LicenseeSession.OfferedOddsGroupsList;

            return offeredOddsGroupsList.Any(_ => _ == model.NewValue)
                && (string.IsNullOrEmpty(model.OldValue)
                || offeredOddsGroupsList.Any(_ => _ == model.OldValue));
        }
    }
}