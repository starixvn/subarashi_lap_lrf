using System.Collections.Generic;
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
        public IBalanceUpDataAccess BalanceUpDataAccessInstance { get; set; }

        public CustomerAdministrationController(ICustomerAdminService customerAdminService, ILanguageService languageService) : base(languageService)
        {
            _customerAdminService = customerAdminService;
        }

        [HttpPost]
        public async Task<JsonResult<CustomerInfo>> GetCustomerInfoByUserName(GetCustomerInfoMetaModel model)
        {
            var result = await _customerAdminService.GetCustomerInfoByUserName(model);

            return JsonApi(result);
        }

        [HttpPost]
        public async Task<JsonResult<ApiPagingResult<CustomerBetList>>> GetBetListByCustId(GetCustomerBetListMetaModel model)
        {
            var result = await _customerAdminService.GetBetListByCustId(model);

            return JsonApi(result);
        }

        [HttpPost]
        public async Task<JsonResult<IEnumerable<CustomerDepositHistory>>> GetDepositHistoryByCustId(GetCustomerInfoMetaModel model)
        {
            UpdateMetaModel(model);
            var result = await _customerAdminService.GetDepositHistoryByCustId(model);

            return JsonApi(result);
        }

        [HttpPost]
        public async Task<JsonResult<IEnumerable<CustomerWithdrawHistory>>> GetWithdrawHistoryByCustId(GetCustomerInfoMetaModel model)
        {
            UpdateMetaModel(model);
            var result = await _customerAdminService.GetWithdrawHistoryByCustId(model);

            return JsonApi(result);
        }

        private void UpdateMetaModel(GetCustomerInfoMetaModel metaModel)
        {
            metaModel.BUDate = BalanceUpDataAccessInstance.GetBalanceUp().BalanceUpDay.ToString("MM/dd/yyyy");
        }
    }
}