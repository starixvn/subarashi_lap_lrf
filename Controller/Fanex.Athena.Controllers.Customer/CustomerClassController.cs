namespace Fanex.Athena.Controllers.Customer
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Customer.Enum;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Service.Customer.Interfaces;

    public class CustomerClassController : CultureBaseController
    {
        private readonly ICustomerClassService _service;

        public CustomerClassController(ICustomerClassService service)
        {
            _service = service;
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
    }
}
