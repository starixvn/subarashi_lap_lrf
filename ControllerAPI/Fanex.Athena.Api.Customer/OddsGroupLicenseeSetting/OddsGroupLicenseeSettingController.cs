using Fanex.Athena.Api.Base;
using Fanex.Athena.Api.Base.Attributes;
using Fanex.Athena.DataAccess.Core.Configuration.Interfaces;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Customer.MetaModel;
using Fanex.Athena.Model.Customer.MetaModel.OddsGroupLicenseeSetting;
using Fanex.Athena.Service.Core.Common.Interfaces;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.Customer.Interfaces;
using Fanex.Athena.Service.StatelessCore.Utility;
using System.Linq;
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
            var result = await _oddsGroupLicenseeSettingService.GetCustomerOddsGroup(model, SessionService.UserSession.CurrencyList).ConfigureAwait(false);

            return Ok(result);
        }

        [HttpPost]
        public dynamic UpdateCustomerOddsGroup(UpdateCustomerOddsGroupMetaModel model)
        {
            UpdateMetaModel(model);
            var result = _oddsGroupLicenseeSettingService.UpdateCustomerOddsGroup(model);

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

            model.LicenseeId = licenseeSession.LicenseeId;

            string agentListXml = string.Empty;
            if (model.SubsidiarySearch)
            {
                var currencyAgentList = userSession.CurrencyAgentList;
                currencyAgentList = SubsidiaryService.GetCurrencyAgentList(licenseeSession.LicenseeName, currencyAgentList, model.SubsidiaryList);

                var currencyIdList = model.CurrencyIdList.Split(',').Select(int.Parse);
                agentListXml = AuthParameterHelper.GenerateAgentListStr(currencyAgentList, currencyIdList);
            }
            else
            {
                var agentIdListByCurrency = SubsidiaryService.GetCurrencyAgentList(userSession, licenseeSession.LicenseeName, model.SubsidiaryList);
                agentListXml = AuthParameterHelper.GenerateAgentListStr(userSession.CurrencyList, agentIdListByCurrency);
            }
            model.AgentListXml = agentListXml;
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
    }
}