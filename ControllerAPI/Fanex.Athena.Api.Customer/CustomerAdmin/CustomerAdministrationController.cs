using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;
using Fanex.Athena.Api.Base;
using Fanex.Athena.Api.Base.Attributes;
using Fanex.Athena.DataAccess.Core.Configuration.Interfaces;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Customer.DTO.CustomerAdmin;
using Fanex.Athena.Model.Customer.MetaModel.CustomerAdmin;
using Fanex.Athena.Service.Core.Common.Interfaces;
using Fanex.Athena.Service.Customer.Interfaces;

namespace Fanex.Athena.Api.Customer.CustomerAdmin
{
    [ApiFunctionAuthorization(PermissionKeys.PlayerReport)]
    public class CustomerAdministrationController : BaseApiController
    {
        private readonly ICustomerAdminService _customerAdminService;
        private readonly ICustomerAdminAPIService _customerAdminAPIService;
        private readonly IList<string> _ivorySites = new List<string> { "N8I", "N88" };
        public IBalanceUpDataAccess BalanceUpDataAccessInstance { get; set; }

        public CustomerAdministrationController(
            ICustomerAdminService customerAdminService,
            ICustomerAdminAPIService customerAdminAPIService,
            ILanguageService languageService) : base(languageService)
        {
            _customerAdminService = customerAdminService;
            _customerAdminAPIService = customerAdminAPIService;
        }

        [HttpPost]
        public async Task<JsonResult<CustomerInfo>> GetCustomerInfoByUserName(GetCustomerInfoMetaModel model)
        {
            var result = await _customerAdminAPIService.GetCustomerInfoByUserName(model)
                ?? await _customerAdminService.GetCustomerInfoByUserName(model);

            return JsonApi(result);
        }

        [HttpPost]
        public async Task<JsonResult<CustomerInfoIvory>> GetCustomerInfoIvoryByUserName(GetCustomerInfoMetaModel model)
        {
            model.SiteName = SessionService.LicenseeSession.LicenseeName;
            var result = GetCustomerInfoFromBothN88Site(model)
                ?? await _customerAdminService.GetCustomerInfoIvoryByUserName(model);

            if (_ivorySites.Contains(result?.LicenseeName, StringComparer.InvariantCultureIgnoreCase))
            {
                model.SabaId = result.RegisteredUserName;
                result = _customerAdminAPIService.GetCustomerInfoIvoryByUserName(model, result.LicenseeName) ?? result;
            }

            return JsonApi(result);
        }

        private CustomerInfoIvory GetCustomerInfoFromBothN88Site(GetCustomerInfoMetaModel model)
        {
            foreach (var siteName in _ivorySites)
            {
                var result = _customerAdminAPIService.GetCustomerInfoIvoryByUserName(model, siteName);
                if (result != null)
                {
                    return result;
                }
            }

            return null;
        }

        [HttpPost]
        public async Task<JsonResult<ApiPagingResult<CustomerBetList>>> GetBetListByCustId(GetCustomerBetListMetaModel model)
        {
            model.SiteName = SessionService.LicenseeSession.LicenseeName;
            var result = await _customerAdminService.GetBetListByCustId(model);

            return JsonApi(result);
        }

        [HttpPost]
        public async Task<JsonResult<IEnumerable<CustomerDepositHistory>>> GetDepositHistoryByCustId(GetCustomerInfoMetaModel model)
        {
            UpdateMetaModel(model);

            if (string.Equals(model.SiteName, "IvoryBet", StringComparison.InvariantCultureIgnoreCase))
            {
                foreach (var siteName in _ivorySites)
                {
                    var apiResult = _customerAdminAPIService.GetIvoryDepositHistoryByUserName(model, siteName);

                    if (apiResult != null)
                    {
                        return JsonApi(apiResult);
                    }
                }
            }

            var result = await _customerAdminService.GetDepositHistoryByCustId(model);

            return JsonApi(result);
        }

        [HttpPost]
        public async Task<JsonResult<IEnumerable<CustomerWithdrawHistory>>> GetWithdrawHistoryByCustId(GetCustomerInfoMetaModel model)
        {
            UpdateMetaModel(model);

            if (string.Equals(model.SiteName, "IvoryBet", StringComparison.InvariantCultureIgnoreCase))
            {
                foreach (var siteName in _ivorySites)
                {
                    var apiResult = _customerAdminAPIService.GetIvoryWithdrawHistoryByUserName(model, siteName);

                    if (apiResult != null)
                    {
                        return JsonApi(apiResult);
                    }
                }
            }

            var result = await _customerAdminService.GetWithdrawHistoryByCustId(model);

            return JsonApi(result);
        }

        private void UpdateMetaModel(GetCustomerInfoMetaModel metaModel)
        {
            metaModel.BUDate = BalanceUpDataAccessInstance.GetBalanceUp().BalanceUpDay.ToString("MM/dd/yyyy");
            metaModel.SiteName = SessionService.LicenseeSession.LicenseeName;
        }
    }
}