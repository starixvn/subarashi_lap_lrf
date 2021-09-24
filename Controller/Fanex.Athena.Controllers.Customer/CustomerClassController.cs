namespace Fanex.Athena.Controllers.Customer
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Customer.Enum;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Service.Customer.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    public class CustomerClassController : CultureBaseController
    {
        private readonly ICustomerClassService _service;
        private readonly IPortalApiService _portalApiService;

        public CustomerClassController(ICustomerClassService service, IPortalApiService portalApiService)
        {
            _service = service;
            _portalApiService = portalApiService;
        }

        public async Task<ViewResult> CustomerClassInformation(byte tabKey = 1)
        {
            ViewBag.TabKey = tabKey;

            var metaModel = new GetCustomerClassInformationMetaModel
            {
                SiteName = SessionServiceInstance.LicenseeSession.LicenseeName,
                CurrencyList = SessionServiceInstance.UserSession.CurrencyList,
                Language = SessionServiceInstance.UserSession.Language
            };

            var viewModel = await (tabKey == (byte)CustomerClassTabType.SettingPolicy ? _service.GetSettingPolicy(metaModel) : _service.GetSpreadSettingPolicy(metaModel));


            return View("~/Views/Desktop/Customer/CustomerClass/CustomerClassInformation.cshtml", viewModel);
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        public async Task<JsonResult> GetLimitLeagues(GetLimitLeaguesMetaModel metaModel)
        {
            var result = await _portalApiService.GetLimitLeaguesAsync(
                SessionServiceInstance.LicenseeSession.LicenseeName,
                metaModel.SportType, metaModel.LeagueGroupId,
                SessionServiceInstance.UserSession.Language);

            return Json(result);
        }
    }
}
